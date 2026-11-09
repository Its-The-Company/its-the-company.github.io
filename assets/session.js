// Source with comments: tools/site/assets/session.js in the company repository.
(function () {
var S = window.CompanySite || {}, D = document, H = D.getElementById('lk-sess'), P = D.getElementById('ts-page'), box = P || H, C = D.getElementById('ts-chart');
if (!box || !C) return;
var STEPS = [['claimed', 'Claimed'], ['packet', 'Packet out'], ['worker', 'Worker'], ['testq', 'Tests queued'], ['macbook', 'On the MacBook'], ['landing', 'Landing']];
var KEYS = STEPS.map(x => x[0]), WORKER = KEYS.indexOf('worker'), KIND = { plan: 'Plan', personal: 'Personal', key: 'API key' };
var soon = box.querySelector('.ts-soon'), meta = D.getElementById('ts-meta'), base = box.getAttribute('data-img') || '', pic = {};
[].forEach.call(D.querySelectorAll('.lk-team a'), a => {
var m = /cast\/([^/.]+)\.html/.exec(a.getAttribute('href') || ''), g = a.querySelector('img');
if (m && g) pic[m[1]] = g.getAttribute('src');
});
function mk(p, t, c, x) { var e = D.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; if (p) p.appendChild(e); return e; }
function add(p, x) { p.appendChild(D.createTextNode(x)); }
function list(x) { return Array.isArray(x) ? x.filter(r => r && typeof r === 'object') : []; }
function num(x) { return typeof x === 'number' && isFinite(x) ? x : null; }
function txt(x) { return typeof x === 'string' ? x : ''; }
function mins(s) { return Math.max(0, Math.floor(s / 60)); }
function cell(s) { var m = mins(s); return m >= 60 ? Math.floor(m / 60) + 'h ' + m % 60 + 'm' : m + 'm'; }  // in a cell: 12m, 1h 12m
function span(s) { var m = mins(s); return m >= 60 ? Math.floor(m / 60) + ' h ' + m % 60 + ' min' : m + ' min'; }  // in text: the site's _span
function clock(t, opt) {
if (num(t) === null) return '';
return new Date(t * 1e3).toLocaleString('en-US', Object.assign({ timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit', hour12: true }, opt));  // 12-hour, AM/PM (T-3742)
}
function until(t, now) { return clock(t, t - now > 86400 ? { weekday: 'short' } : null).replace(',', ''); }  // a week limit says its day
function times(n) { return n === 1 ? 'once' : n + ' times'; }
function path(t, end) {
var st = list(t.steps).filter(x => KEYS.indexOf(x.s) >= 0 && num(x.at) !== null), sec = {};
st.forEach((x, i) => { sec[x.s] = (sec[x.s] || 0) + Math.max(0, (i + 1 < st.length ? st[i + 1].at : end) - x.at); });
return { sec: sec, cur: st.length ? KEYS.indexOf(st[st.length - 1].s) : -1, first: st.length ? st[0].at : null };
}
function ended(t) { return t.end === 'landed' || t.end === 'failed'; }
function stop(t, now) { return ended(t) && num(t.end_at) !== null ? t.end_at : now; }
function workers(s, label) { return list(s.flow).filter(t => t.acct === label && path(t, 0).cur === WORKER); }
function furthest(s, now) {
return list(s.flow).map(t => [path(t, now), t]).sort((a, b) => b[0].cur - a[0].cur || (a[0].first || 0) - (b[0].first || 0)).map(x => x[1]);
}
function inFlight(s) { return Math.max(num(s.flow_n) || 0, list(s.flow).length); }
function ends(s, k) { var n = num(s[k === 'landed' ? 'landed' : 'failed']); return n !== null ? n : list(s.done).filter(t => t.end === k).length; }
function face(w) {
var k = txt(w).toLowerCase();
return /^[a-z][a-z0-9-]*$/.test(k) ? pic[k] || (base && base + k + '.svg') : '';
}
function step(o, cls, sr, b) { var li = mk(o, 'li', cls); mk(li, 'span', 'ts-sr', sr); mk(li, 'b', null, b); return li; }
function track(t, now) {
var o = mk(null, 'ol', 'ts-trk'), done = ended(t), p = path(t, stop(t, now)), li;
STEPS.forEach((x, i) => {
var was = p.sec[x[0]] !== undefined;
if (i > p.cur) step(o, 'n', x[1], '');
else if (i < p.cur && !was) step(o, 'p', x[1] + ': skipped', '–');
else {
li = i === p.cur && !done ? step(o, 'c', x[1] + ' (now): ', cell(p.sec[x[0]])) : step(o, 'p', x[1] + ': ', cell(p.sec[x[0]]));
if (i === WORKER && txt(t.acct)) mk(li, 'small', null, t.acct);
}
});
if (t.end === 'landed') mk(step(o, 'ok', 'Landed: ', 'Landed'), 'small', null, clock(t.end_at));
else if (t.end === 'failed') mk(step(o, 'no', 'Failed: ', 'Failed'), 'small', null, txt(t.why));
else step(o, 'n', 'Landed', '');
return o;
}
function nowLine(t, now) {
var d = mk(null, 'div', 'ts-now'), p = path(t, stop(t, now)), all = p.first === null ? 0 : stop(t, now) - p.first, name = (STEPS[p.cur] || [])[1];
if (t.end === 'landed') { mk(d, 'b', null, 'Landed'); add(d, ' ' + clock(t.end_at) + ' · ' + span(all) + ' in all'); }
else if (t.end === 'failed') {
mk(d, 'b', null, name ? 'Failed at ' + name : 'Failed');
add(d, (txt(t.why) ? ': ' + t.why : '') + ' · ' + span(all) + ' in all');
} else if (name) { add(d, 'Now: '); mk(d, 'b', null, name); add(d, ' · ' + span(p.sec[KEYS[p.cur]])); }
return d;
}
function row(t, now) {
var li = mk(null, 'li', 'ts-row'), w = mk(li, 'div', 'ts-who'), src = face(t.w), g, n;
if (src) { g = mk(w, 'img'); g.src = src; g.alt = ''; g.width = g.height = 24; }
n = mk(w, 'span'); mk(n, 'code', null, txt(t.t)); add(n, txt(t.name));
li.appendChild(track(t, now)); li.appendChild(nowLine(t, now));
return li;
}
function rows(p, l, now, label) {
var u = mk(p, 'ul', 'ts-rows');
if (label) u.setAttribute('aria-label', label);
l.forEach(t => u.appendChild(row(t, now)));
}
function dots(p, slots, run) {
var d = mk(p, 'span', 'ts-dots'), i;
d.setAttribute('aria-hidden', 'true');
for (i = 0; i < Math.min(slots, 16); i++) mk(d, 'i', i < run ? 'on' : null);
}
function slots(x) { return Math.max(0, Math.floor(num(x.slots) || 0)); }
function atLimit(x, now) { return num(x.until) !== null && x.until > now; }
var NOSRC = 'Accounts show here once the coordinator reports them.';  // T-3296's slice carries no sources yet
function arrow(p) { mk(p, 'span', 'ts-ar').setAttribute('aria-hidden', 'true'); }
function flow(p, s, now) {
var f = mk(p, 'div', 'ts-flow'), a = mk(f, 'div'), b, c, n, u, r = num(s.coord.restarts) || 0, l, seen = {};
mk(a, 'p', 'ts-k', 'Coordinator'); n = mk(a, 'div', 'ts-node'); mk(n, 'b', null, 'One session');
mk(n, 'span', null, 'Claims tasks, writes packets, starts workers.' + (r ? ' Restarted ' + times(r) + ' from its handoff.' : ''));
arrow(f);
b = mk(f, 'div'); mk(b, 'p', 'ts-k', 'Workers, by account'); u = mk(b, 'ul', 'ts-srcl');
if (!list(s.sources).length) mk(b, 'p', 'ts-note', NOSRC);
list(s.sources).forEach(x => {
var off = atLimit(x, now), run = workers(s, x.label).length, li = mk(u, 'li', off ? 'off' : null);
mk(li, 'span', null, txt(x.label)); dots(li, slots(x), run);
mk(li, 'small', null, off ? 'back ' + until(x.until, now) : run + '/' + slots(x));
});
arrow(f);
c = mk(f, 'div'); mk(c, 'p', 'ts-k', 'Each task’s path'); l = mk(c, 'ol', 'ts-steps'); l.setAttribute('aria-label', 'Tasks at each step');
list(s.flow).forEach(t => { var k = KEYS[path(t, 0).cur]; if (k) seen[k] = (seen[k] || 0) + 1; });
STEPS.forEach(x => { var li = mk(l, 'li', seen[x[0]] ? 'has' : null); mk(li, 'b', null, String(seen[x[0]] || 0)); mk(li, 'span', null, x[1]); });
var li = mk(l, 'li', 'end' + (ends(s, 'landed') + ends(s, 'failed') ? ' has' : '')), e = mk(li, 'b', null, String(ends(s, 'landed')));
mk(e, 'em', null, ' · ' + ends(s, 'failed')); mk(li, 'span', null, 'Landed · failed');
}
function jobs(p, s) {
var l = list(s.beside), land = l.filter(x => x.job === 'Lands')[0], rest = l.filter(x => x !== land), o, last, bits = [];
if (!l.length) return;
o = mk(p, 'p', 'ts-bes'); add(o, 'On their own clock: ');
if (land) {
mk(o, 'b', null, 'Lands');
add(o, ' ' + [txt(land.every).split(',')[0], land.last ? 'last ' + clock(land.last) : ''].filter(x => x).join(', ') + (txt(land.doing) ? ' (' + land.doing + ')' : ''));
}
if (rest.length) {
if (land) add(o, ' · ');
last = Math.max.apply(null, rest.map(x => num(x.last) || 0));
bits = [rest.length + (rest.length === 1 ? ' job' : ' jobs')].concat(last ? ['last ' + clock(last)] : []);
mk(o, 'b', null, 'Jobs loop'); add(o, ', ' + bits.join(', '));
}
}
function panel(p, s, now) {
var l = furthest(s, now), more = inFlight(s) - 3, done = ends(s, 'landed') + ends(s, 'failed'), words;
flow(p, s, now);
if (l.length) rows(p, l.slice(0, 3), now, 'Furthest along');
words = [more > 0 ? more + ' more in flight' : '', done ? done + ' finished' : ''].filter(x => x).join(' and ');
mk(p, 'p', 'ts-more', words ? words + ' on the full chart.' : inFlight(s) ? '' : 'Nothing in flight.');
jobs(p, s);
}
function coord(p, s, now) {
var c = s.coord, top = mk(p, 'div', 'ts-top'), a = mk(top, 'div'), b = mk(top, 'div'), n, h, r = num(c.restarts) || 0, up = num(c.started), t, when = clock(c.last_handoff);
mk(a, 'p', 'ts-k', 'Coordinator'); n = mk(a, 'div', 'ts-node'); mk(n, 'b', null, 'One session');
mk(n, 'span', null, [up !== null ? 'Up ' + span(now - up) + '.' : '',
r ? 'Restarted ' + times(r) + ' from its handoff file' + (when ? ', at ' + when : '') + '; the workers kept running.' : ''].filter(x => x).join(' '));
mk(n, 'span', null, 'Claims a task, writes its packet, and starts a plain worker on any account with a free slot. Starts no build agents itself.');
h = mk(n, 'ul', 'ts-hold'); h.setAttribute('aria-label', 'It holds');
['Inbox', 'Board', 'Plans', 'Review assignments', 'Reports'].forEach(x => mk(h, 'li', null, x));
if (!list(s.beside).length) { top.removeChild(b); top.className += ' one'; return; }  // T-3296's slice carries no beside yet
mk(b, 'p', 'ts-k', 'On their own clock, beside the workers');
t = mk(mk(b, 'div', 'ts-clock'), 'table');
list(s.beside).forEach(x => {
var tr = mk(t, 'tr'), l = mk(tr, 'td', null, txt(x.job)), w = mk(tr, 'td', null, clock(x.last));
if (txt(x.every)) mk(l, 'small', null, x.every);
if (txt(x.doing)) mk(w, 'small', null, x.doing);
});
}
function down(p, x) { var d = mk(p, 'p', 'ts-down'); mk(d, 'i'); add(d, x); }
function sources(p, s, now, pub) {
var u = mk(p, 'ul', 'ts-srcs');
if (!list(s.sources).length) mk(p, 'p', 'ts-note', NOSRC);
list(s.sources).forEach(x => {
var off = atLimit(x, now), run = workers(s, x.label), li = mk(u, 'li', off ? 'off' : null), m;
mk(li, 'b', null, txt(x.label)); mk(li, 'small', null, KIND[x.kind] || '');
dots(li, slots(x), run.length); mk(li, 'span', null, run.length + ' of ' + slots(x) + ' workers');
if (run.length) { m = mk(li, 'span'); run.forEach((t, i) => { if (i) add(m, ' '); mk(m, 'code', null, txt(t.t)); }); }
else if (!off) mk(li, 'span', null, 'Free slot');
if (off) mk(li, 'em', null, 'At its limit until ' + until(x.until, now));
if (!pub && num(x.pct) !== null) mk(li, 'small', null, 'Week ' + Math.round(x.pct) + ' %');
});
}
function header(p) {
var h = mk(p, 'div', 'ts-ph'), o;
h.setAttribute('aria-hidden', 'true'); mk(h, 'span', null, 'Task'); o = mk(h, 'ol');
STEPS.forEach(x => mk(o, 'li', null, x[1])); mk(o, 'li', null, 'Landed or failed');
}
function full(p, s, now, pub) {
var l = furthest(s, now), d = list(s.done), cut = inFlight(s) - l.length;
coord(p, s, now); down(p, 'starts workers on');
mk(p, 'p', 'ts-k', 'Accounts, each a source of workers'); sources(p, s, now, pub); down(p, 'then each task runs this path');
mk(p, 'h2', null, 'In flight');
if (l.length) { header(p); rows(p, l, now); } else mk(p, 'p', 'ts-note', 'Nothing in flight.');
if (cut > 0) mk(p, 'p', 'ts-note', cut + ' more in flight did not fit in the live status.');
mk(p, 'h2', null, 'Finished this session');
if (d.length) { header(p); rows(p, d, now); } else mk(p, 'p', 'ts-note', 'Nothing finished yet.');
mk(p, 'p', 'ts-note', 'Times are minutes spent at each step, from the coordinator’s step records. Visitors see the same chart without the week percents.');
}
function model(st) {
var n = {}, best = '';
if (!(st.session || {}).active) return '';
list((st.tasks || {}).run).forEach(r => {
if (!txt(r.m)) return;
var k = r.m.charAt(0).toUpperCase() + r.m.slice(1) + (txt(r.e) ? ', ' + r.e : '');
n[k] = (n[k] || 0) + 1;
});
Object.keys(n).sort().forEach(k => { if (!best || n[k] > n[best]) best = k; });
return best;
}
function head(st, s, now) {
var live = box.querySelector('.ts-live'), m = box.querySelector('.lk-m'), rep = box.querySelector('.lk-rep'), up = s ? num(s.coord.started) : null;
var r = (st && st.reply) || {}, sec = num(r.seconds), name = s ? model(st) : '', sent = Date.parse(r.sent) / 1e3;
live.hidden = !s; live.textContent = s ? 'Live' + (up !== null ? ' · coordinator up ' + span(now - up) : '') : '';
m.hidden = !name; m.textContent = name;
rep.hidden = sec === null;  /* T-3117's reply time stays in the coming state too */ rep.textContent = sec === null ? '' : 'Last Investor reply: ' + (sec / 60).toFixed(1) + ' min';
rep.className = 'lk-rep' + (sec > 300 ? ' late' : ''); rep.title = sent ? 'Message sent ' + clock(sent) : '';
}
function draw(st, pub) {
var s = st && st.session, now = Date.now() / 1e3, n = mk(null, 'div'), f;
if (!s || !s.coord || s.coord.active !== true) s = null;
if (soon) soon.hidden = !!s;
C.hidden = !s;
if (H && !P) head(st, s, now);
if (meta) {
meta.hidden = !s; meta.textContent = '';
if (s) {
mk(meta, 'span', 'ts-live', 'Live'); f = inFlight(s);
add(meta, ' · read every 30 s · last read ' + clock(now, { second: '2-digit' }) + ' · ' + f + (f === 1 ? ' task' : ' tasks') + ' in flight');
}
}
if (s) { if (P) full(n, s, now, pub); else panel(n, s, now); }
if (n.innerHTML !== C.innerHTML) { C.textContent = ''; while (n.firstChild) C.appendChild(n.firstChild); }
}
if (!P) {  // Home
if (S.onStatus) { S.onStatus.push(draw); if (S.status && S.status()) draw(S.status(), true); }
return;
}
var repo = P.getAttribute('data-repo'), etag = null, last = null, busy = 0;
function read() {
if (busy) return;
busy = 1;
var tok = S.getToken && S.getToken() && repo && !(S.rejected && S.rejected());
var v = tok ? S.gh('/repos/' + repo + '/actions/variables/COMPANY_STATUS', { etag: etag }).then(r => {
if (r.status === 304 && last) return last;
if (!r.ok) throw new Error(r.status);
etag = r.headers.get('ETag'); return r.json().then(x => (last = JSON.parse(x.value)));
}).then(st => draw(st, false)) : Promise.reject();
v.catch(() => {
etag = null; last = null;
return fetch(P.getAttribute('data-status'), { cache: 'no-store' }).then(r => r.json()).then(st => draw(st, true));
}).catch(() => {}).then(() => { busy = 0; });
}
read();
setInterval(() => { if (!D.hidden) read(); }, 3e4);  // a hidden tab skips its turn
D.addEventListener('visibilitychange', () => { if (!D.hidden) read(); });
})();
