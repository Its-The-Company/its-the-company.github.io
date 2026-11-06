// Source with comments: tools/site/assets/issuecount.js in the company repository.
(() => {
'use strict';
var S = window.CompanySite, D = document, me = D.currentScript, K = 'company.issues.count', AGE = 6e4, KEEP = ['emergency', 'urgent', 'pitch'];
function login(u) { return String((u && u.login) || '').toLowerCase(); }
function answered(i, last, inv) { return last ? /\(automatic receipt\)\s*$/.test(last.body || '') || inv(login(last.user || last.author)) : inv(login(i.user || i.author)); }
function count(b, open, all) {
var n = b.rest || 0, ans = 0, shown = {};
function off(o, k) { return b.skip.indexOf(k) >= 0 || ['main', 'site-state'].some((x) => o.l.indexOf(x) >= 0) || (o.l.indexOf('proposal') >= 0 && b.props.indexOf(k) < 0); }
function add(o) { if (o && o.ans) ans++; else n++; }
(b.rows || []).forEach((ns) => {
ns.forEach((k) => { shown[k] = 1; });
var live = ns.filter((k) => !all || (open[k] && !off(open[k], k)));
if (live.length) add(open[live[0]]);
});
Object.keys(open).forEach((s) => {
var k = +s, o = open[s];
if (!shown[k] && b.named.indexOf(k) < 0 && !off(o, k) && o.l.indexOf('unrelated') < 0 && o.l.some((x) => KEEP.indexOf(x) >= 0)) add(o);
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
if (!S || !S.getToken || !S.getToken() || !me) return;
var Q = 'query($o:String!,$r:String!){repository(owner:$o,name:$r){a:object(expression:"HEAD:investors/allowlist.md"){...on Blob{text}}'
+ 'i:issues(states:OPEN,first:100){pageInfo{hasNextPage}nodes{number author{login}labels(first:20){nodes{name}}comments(last:1){nodes{author{login}body}}}}}}';
function json(r) { if (!r.ok) throw new Error(S.said(r)); return r.json(); }
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
open[i.number] = { l: i.labels.nodes.map((x) => String(x.name).toLowerCase()), ans: answered(i, i.comments.nodes[0] || null, (l) => names.indexOf(l) >= 0) };
});
var x = count(b, open, !r.i.pageInfo.hasNextPage); put(x.n, x.ans);
}, () => draw({ n: b.n, t: Date.parse(b.at) }));
}).catch(() => { /* no issues.json: the layout's count stays */ });
}
read();
D.addEventListener('visibilitychange', () => { if (!D.hidden) read(); });
})();
