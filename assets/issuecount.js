// Source with comments: tools/site/assets/issuecount.js in the company repository.
(() => {
'use strict';
var S = window.CompanySite, D = document, me = D.currentScript, K = 'company.issues.count', AGE = 6e4, KEEP = ['emergency', 'urgent', 'approval', 'pitch'];
var DAY = 864e5, SM = '<!-- site-state issues -->', SL = 'company.issues.state';
function etMs(d, t) {
var g = Date.parse(d + 'T' + (t || '23:59') + ':00Z'), o = 0;
try {
var p = {}; new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
.formatToParts(new Date(g)).forEach((x) => { p[x.type] = x.value; });
o = Date.UTC(+p.year, p.month - 1, +p.day, +p.hour, +p.minute) - g;
} catch (e) { o = -5 * 36e5; }
return g - o;
}
function dl(body) { var m = /^[ \t>*_-]*Deadline\b[*_:\s]*(\d{4}-\d\d-\d\d)(?:[ T]+(\d\d:\d\d))?/im.exec(String(body || '')); return m ? etMs(m[1], m[2]) || 0 : 0; }
function due(n, o, st) { var v = st.d[n]; return v === undefined ? (o.dl || 0) : v; }
function queue(n, o, st, now) { var v = due(n, o, st); return !v || v - now <= DAY || o.l.indexOf('emergency') >= 0 ? 'N' : 'L'; }
function badged(n, o, st, now) { return (queue(n, o, st, now) === 'N' ? st.m : st.a).indexOf(n) < 0; }
function ints(a) { return Array.isArray(a) ? a.filter((v) => v > 0 && v % 1 === 0).slice(-300) : []; }
function norm(x) {
var b = { d: {}, m: [], a: [], q: {}, s: null, t: 0 };
if (!x || typeof x !== 'object') return b;
['d', 'q'].forEach((k) => { if (x[k] && typeof x[k] === 'object') Object.keys(x[k]).forEach((n) => { if (/^\d+$/.test(n) && (k === 'q' ? x.q[n] === 'N' || x.q[n] === 'L' : typeof x.d[n] === 'number')) b[k][n] = x[k][n]; }); });
b.m = ints(x.m); b.a = ints(x.a); if (Array.isArray(x.s)) b.s = ints(x.s); b.t = +x.t || 0;
return b;
}
function drop(a, n) { var k = a.indexOf(n); if (k >= 0) a.splice(k, 1); }
function act(st, n, o, kind, v, now) {
if (kind === 'delay') {
st.d[n] = v; drop(st.m, n); drop(st.a, n);
var q = queue(n, o, st, now); st.q[n] = q; (q === 'N' ? st.m : st.a).push(n);
} else if (kind === 'mute') st.m.push(n); else st.a.push(n);
}
function settle(st, open, now, all) {
var moved = [], fresh = [], seen = st.s === null ? null : st.s;
Object.keys(open).forEach((s) => {
var n = +s, q = queue(n, open[s], st, now);
if (st.q[n] === 'L' && q === 'N') { drop(st.m, n); drop(st.a, n); moved.push(n); }
st.q[n] = q;
if (seen && seen.indexOf(n) < 0) { fresh.push(n); seen.push(n); }
});
if (seen === null) st.s = Object.keys(open).map(Number);
if (all) { ['d', 'q'].forEach((k) => { Object.keys(st[k]).forEach((n) => { if (!open[n]) delete st[k][n]; }); }); ['m', 'a'].forEach((k) => { st[k] = st[k].filter((n) => open[n]); }); }
return { moved: moved, fresh: fresh };
}
function login(u) { return String((u && u.login) || '').toLowerCase(); }
function answered(i, last, inv) { return last ? /\(automatic receipt\)\s*$/.test(last.body || '') || inv(login(last.user || last.author)) : inv(login(i.user || i.author)); }
function count(b, open, all, st, now) {
var n = b.rest || 0, ans = 0, shown = {};
function off(o, k) { return b.skip.indexOf(k) >= 0 || ['main', 'site-state'].some((x) => o.l.indexOf(x) >= 0) || (o.l.indexOf('proposal') >= 0 && b.props.indexOf(k) < 0); }
function add(o, k) { if (o && o.ans) ans++; else if (!st || badged(k, o, st, now)) n++; }
(b.rows || []).forEach((ns) => {
ns.forEach((k) => { shown[k] = 1; });
var live = ns.filter((k) => !all || (open[k] && !off(open[k], k)));
if (live.length) add(open[live[0]], live[0]);
});
Object.keys(open).forEach((s) => {
var k = +s, o = open[s];
if (!shown[k] && b.named.indexOf(k) < 0 && !off(o, k) && o.l.indexOf('unrelated') < 0 && o.l.some((x) => KEEP.indexOf(x) >= 0)) add(o, k);
});
return { n: n, ans: ans };
}
function hm(t) { return new Date(t).toLocaleString([], { hour: 'numeric', minute: '2-digit' }); }
function draw(c) {
var a = D.querySelector('nav a[data-issues]'), b = a && a.querySelector('.nb');
if (!a || c.n == null) return;
if (!c.n) { if (b) b.remove(); return; }
if (!b) { a.appendChild(D.createTextNode(' ')); b = a.appendChild(S.el('span', 'nb')); }
var t = c.n + ' waiting on the Investors' + (c.live ? ', read from GitHub at ' + hm(c.t) : ' at the site build, ' + new Date(c.t).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }))
+ (c.ans ? '; ' + c.ans + ' answered, waiting on the company' : '');
b.textContent = String(c.n); b.title = t; b.setAttribute('aria-label', t);
}
function put(n, ans) { var c = { n: n, ans: ans, t: Date.now(), live: 1 }; try { sessionStorage.setItem(K, JSON.stringify(c)); } catch (e) { /* private mode */ } draw(c); }
window.IssueCount = { answered: answered, count: count, put: put };
window.IssueQ = { dl: dl, queue: queue, badged: badged, act: act, settle: settle, norm: norm, due: due, DAY: DAY };
if (!S || !S.getToken || !S.getToken() || !me) return;
var Q = 'query($o:String!,$r:String!){repository(owner:$o,name:$r){a:object(expression:"HEAD:investors/allowlist.md"){...on Blob{text}}'
+ 'i:issues(states:OPEN,first:100){pageInfo{hasNextPage}nodes{number body author{login}labels(first:20){nodes{name}}comments(last:1){nodes{author{login}body}}}}}}';
function json(r) { if (!r.ok) throw new Error(S.said(r)); return r.json(); }
var LS = localStorage, rem = null, hno = 0, busy = 0, dirty = null, rp = '';
function who() {
var t = S.getToken().slice(-6), c = (LS.getItem('company.issues.login') || '').split(':');
if (c[0] === t && c[1]) return Promise.resolve(c[1]);
return S.gh('/user').then(json).then((u) => { var l = login(u); if (l) LS.setItem('company.issues.login', t + ':' + l); return l; });
}
function home(repo) {
var n = +LS.getItem('company.docs.issue');
if (n) return Promise.resolve(n);
return S.gh('/repos/' + repo + '/issues?labels=site-state&state=all&per_page=1').then(json).then((l) => { n = l[0] && l[0].number; if (n) LS.setItem('company.docs.issue', String(n)); return n || 0; });
}
function mine(list, l) { return list.filter((c) => c.user && login(c.user) === l && String(c.body || '').indexOf(SM) === 0).sort((a, b) => (a.created_at < b.created_at ? -1 : 1))[0] || null; }
function lget() { try { return norm(JSON.parse(LS.getItem(SL))); } catch (e) { return norm(); } }
function load(repo) {
var st = lget();
rp = repo;
return who().then((l) => home(repo).then((no) => {
hno = no; if (!no) return st;
return S.gh('/repos/' + repo + '/issues/' + no + '/comments?per_page=100').then(json).then((list) => {
rem = mine(list, l);
var r = norm(rem && (() => { try { return JSON.parse(rem.body.slice(SM.length)); } catch (e) { return null; } })());
if (r.t > st.t) { st = r; try { LS.setItem(SL, JSON.stringify(st)); } catch (e) { /* full */ } }
return st;
});
})).catch(() => st);
}
function save(st) {
st.t = Date.now();
try { LS.setItem(SL, JSON.stringify(st)); sessionStorage.removeItem(K); } catch (e) { /* blocked */ }
if (!hno) return;
if (busy) { dirty = st; return; }
busy = 1;
var h = S.hdrs(); h['Content-Type'] = 'application/json';
var body = JSON.stringify({ body: SM + '\n' + JSON.stringify(st) });
fetch(S.API + '/repos/' + rp + (rem ? '/issues/comments/' + rem.id : '/issues/' + hno + '/comments'), { method: rem ? 'PATCH' : 'POST', headers: h, body: body }).then(S.checkAuth).then(json)
.then((c) => { rem = c; }, () => { /* the local copy keeps it; the next save tries again */ })
.then(() => { busy = 0; if (dirty) { var d = dirty; dirty = null; save(d); } });
}
function note(n, due) {
if (typeof Notification === 'undefined' || Notification.permission !== 'granted' || LS.getItem('company.notify') !== 'on') return;
try { new Notification(due ? 'Issue #' + n + ' now needs you' : 'New issue #' + n, { body: due ? 'Its deadline is within 24 hours.' : 'Open Issues on the company site.', tag: 'company-issue-' + n + (due ? 'd' : '') }); } catch (e) { /* not allowed here */ }
}
function sync(st, open, now, all) {
var before = JSON.stringify(st), z = settle(st, open, now, all);
z.fresh.forEach((n) => note(n, 0)); z.moved.forEach((n) => note(n, 1));
if (JSON.stringify(st) !== before) save(st);
}
window.IssueQ.load = load; window.IssueQ.save = save; window.IssueQ.sync = sync;
function read(force) {
var c = null; try { c = JSON.parse(sessionStorage.getItem(K) || 'null'); } catch (e) { /* read it */ }
if (!force && c && Date.now() - c.t < AGE) return draw(c);
var root = D.getElementById('needs-root'); if (root && !root.getAttribute('data-mode')) return;
fetch(me.getAttribute('data-count'), { cache: 'no-store' }).then(json).then((b) => {
var rp = String(b.repo || '').split('/'), h = S.hdrs(); h['Content-Type'] = 'application/json';
return fetch(S.API + '/graphql', { method: 'POST', headers: h, body: JSON.stringify({ query: Q, variables: { o: rp[0], r: rp[1] } }) }).then(S.checkAuth).then(json).then((g) => {
var r = g && g.data && g.data.repository, open = {}, names;
if (!r || !r.i) throw new Error('no data');
names = S.parseAllow(r.a && r.a.text);
r.i.nodes.forEach((i) => {
open[i.number] = { l: i.labels.nodes.map((x) => String(x.name).toLowerCase()), ans: answered(i, i.comments.nodes[0] || null, (l) => names.indexOf(l) >= 0), dl: dl(i.body) };
});
var all = !r.i.pageInfo.hasNextPage, now = Date.now(), qs = {};
Object.keys(open).forEach((k) => { var o = open[k]; if (o.l.some((x) => KEEP.indexOf(x) >= 0) && o.l.indexOf('unrelated') < 0 && o.l.indexOf('main') < 0 && o.l.indexOf('site-state') < 0) qs[k] = o; });
return load(b.repo).then((st) => { sync(st, qs, now, all); var x = count(b, open, all, st, now); put(x.n, x.ans); });
}, () => draw({ n: b.n, t: Date.parse(b.at) }));
}).catch(() => { /* no issues.json: the layout's count stays */ });
}
read();
D.addEventListener('visibilitychange', () => { if (!D.hidden) read(); });
})();
