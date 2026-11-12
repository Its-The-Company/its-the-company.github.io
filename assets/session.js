// Source with comments: tools/site/assets/session.js in the company repository.
(function () {
var S = window.CompanySite || {}, D = document, H = D.getElementById('lk-reply'), P = D.getElementById('ts-page');
function clock(ms) {  // 12-hour, AM/PM, Eastern (T-3742)
return new Date(ms).toLocaleString('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit', hour12: true });
}
if (H) {
var rep = H.querySelector('.lk-rep');
var reply = function (st) {
var r = (st && st.reply) || {}, sec = typeof r.seconds === 'number' && isFinite(r.seconds) ? r.seconds : null, sent = Date.parse(r.sent);
rep.hidden = sec === null; rep.textContent = sec === null ? '' : 'Last Investor reply: ' + (sec / 60).toFixed(1) + ' min';
rep.className = 'lk-rep' + (sec > 300 ? ' late' : ''); rep.title = sent ? 'Message sent ' + clock(sent) : '';
};
if (rep && S.onStatus) { S.onStatus.push(reply); if (S.status && S.status()) reply(S.status()); }
}
if (!P) return;
function store(name) { try { return window[name]; } catch (e) { return null; } }
function load(st, key) { try { return JSON.parse(st.getItem(key)) || {}; } catch (e) { return {}; } }
function save(st, key, v) { try { st.setItem(key, JSON.stringify(v)); } catch (e) {} }
var KEEP = { w: [store('localStorage'), 'ts-workers'], t: [store('sessionStorage'), 'ts-tasks'] };
var mem = { w: load(KEEP.w[0], KEEP.w[1]), t: load(KEEP.t[0], KEEP.t[1]) }, seen = {};
function kind(d) { return d.classList.contains('ts-w') ? 'w' : 't'; }
[].forEach.call(P.querySelectorAll('details[id]'), function (d) {
var m = mem[kind(d)];
if (kind(d) === 't') seen[d.id] = 1;
if (Object.prototype.hasOwnProperty.call(m, d.id)) d.open = !!m[d.id];
});
Object.keys(mem.t).forEach(function (k) { if (!seen[k]) delete mem.t[k]; });  // a task that left the page is forgotten
var at = Date.parse(P.getAttribute('data-at')), age = D.getElementById('ts-age');
function ago() {
if (!age || !at) return;
var m = Math.floor((Date.now() - at) / 6e4);
age.textContent = m < 0 ? '' : ' (' + (m < 1 ? 'under a minute' : m < 60 ? m + ' min' : Math.floor(m / 60) + ' h ' + m % 60 + ' min') + ' ago)';
}
P.addEventListener('click', function (e) {
var s = e.target.closest ? e.target.closest('summary') : null, d = s && s.parentNode;
if (!d || !d.id || d.tagName !== 'DETAILS') return;
setTimeout(function () { var k = kind(d); mem[k][d.id] = d.open ? 1 : 0; save(KEEP[k][0], KEEP[k][1], mem[k]); ago(); }, 0);
});
function show() {  // #T-1234: open the task and the worker it is under
var id = '', el;
try { id = decodeURIComponent(location.hash.slice(1)); } catch (e) {}
el = id && D.getElementById(id);
if (!el || !P.contains(el)) return;
for (var n = el; n && n !== P; n = n.parentNode) if (n.tagName === 'DETAILS') n.open = true;
el.scrollIntoView();
}
var COL = { coding: 1, review: 1, testq: 1, testing: 3, mergeq: 2, merging: 3, simq: 4, mergetest: 4, merged: 5 },
WD = { coding: 'Building', review: 'Building', testq: 'Building', testing: 'Testing', mergeq: 'Merge Queue', merging: 'Testing',
simq: 'Simulator Queue', mergetest: 'Simulator', merged: 'Merged' }, NOW = { a: 1, q: 1, m: 1, f: 1 };
function span(m) { return m < 1 ? 'under 1 min' : m < 60 ? m + ' min' : m < 1440 ? Math.floor(m / 60) + ' h' + (m % 60 ? ' ' + m % 60 + ' min' : '') : Math.floor(m / 1440) + ' d' + (Math.floor(m / 60) % 24 ? ' ' + Math.floor(m / 60) % 24 + ' h' : ''); }
function live(st) {
var g = st && st.stg, s = g && g.s;
if (!s || !(Date.parse(g.at) >= at)) return;
Object.keys(s).forEach(function (id) {
var v = s[id], d = D.getElementById(id), k = COL[v[0]], c, b, old = -1;
if (!d || !P.contains(d) || k == null) return;
c = d.querySelectorAll('.ts-trk i'); b = d.querySelector('.ts-nw b');
[].forEach.call(c, function (i, n) { if (NOW[i.className]) old = n; });
if (old !== k && c[k]) {
if (c[old]) c[old].className = old < k ? 'd' : '';
c[k].className = v[0] === 'merged' ? 'm' : v[0] === 'mergeq' || v[0] === 'simq' ? 'q' : 'a';
}
if (b) {  // the time after the stage, keeping " · retry N"; Merged says its clock
var t = b.nextSibling, r = t && t.nodeType === 3 ? (/ · retry \d+$/.exec(t.textContent) || [''])[0] : null;
b.textContent = WD[v[0]];
if (r !== null) t.textContent = (v[0] === 'merged' ? ' ' + String(v[1] || '').replace(/^on main ?/, '')
: v[2] ? ' · ' + span(Math.max(0, Math.round((Date.now() - v[2]) / 6e4))) : '') + r;
}
});
}
show(); window.addEventListener('hashchange', show);
ago(); window.addEventListener('pageshow', ago);
D.addEventListener('visibilitychange', function () { if (!D.hidden) ago(); });
if (S.onStatus) { S.onStatus.push(ago); S.onStatus.push(live); if (S.status && S.status()) live(S.status()); }
})();
