// Source with comments: tools/site/assets/bell.js in the company repository.
(function () {
'use strict';
var S = window.CompanySite, D = document, LS = localStorage;
if (!S) return;
var el = S.el, on = S.on, later = S.later;
function add(b, t, c, x) { return b.appendChild(el(t, c, x)); }
var me = D.currentScript, base = me && me.src ? me.src.replace(/assets\/bell\.js.*$/, '') : '/', basePath = '/';
try { basePath = new URL(base, location.href).pathname; } catch (e) { /* the root */ }
function href(u) { return basePath + String(u || '').replace(/^\//, ''); }
function here() { var p = location.pathname || '/'; return p.indexOf(basePath) === 0 ? '/' + p.slice(basePath.length) : p; }
var hd = D.querySelector('header.site'), DE = D.documentElement;
if (hd && window.ResizeObserver) new ResizeObserver(function () { DE.style.setProperty('--hdr-h', hd.getBoundingClientRect().height + 'px'); }).observe(hd);
var NL = 'company.notify', NC = 'company.notify.count', CK = 'company.bell.chat', SK = 'company.bell.seen', RK = 'company.bell.read', GAP = 12e4, WEEK = 6048e5;
var bellB = null, bellP = null, bellOpen = false, known = null, lastNote = 0, held = [], heldT = 0, title0 = D.title;
var docs = [], rep = null, repo = '';
function json(k, d, st) { try { return JSON.parse((st || LS).getItem(k)) || d; } catch (e) { return d; } }
function flagOn() { var r = S.byId('chat-root'); return !(r && r.getAttribute('data-notify') === 'off'); }
function hasN() { return typeof Notification !== 'undefined'; }
function iPhone() { var n = typeof navigator !== 'undefined' ? navigator : {}; return /iP(hone|ad|od)/.test(n.userAgent || '') && !n.standalone; }
function allowed() { return flagOn() && hasN() && Notification.permission === 'granted' && LS.getItem(NL) === 'on'; }
function weekKey() { var d = new Date(Date.now()); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - (d.getDay() + 6) % 7); return d.toDateString(); }
function weekCount(n) {
var c = json(NC, {});
if (c.w !== weekKey()) c = { w: weekKey(), n: 0 };
if (n) { c.n += n; LS.setItem(NC, JSON.stringify(c)); }
return c.n;
}
function plain(b) {
b = String(b || '').replace(/<!--[\s\S]*?-->|<[^>]*>/g, '').replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
.replace(/^\s*(#+|>|[-*+]|\d+\.)\s+/gm, '').replace(/[*_\x60~]+/g, '').replace(/\s+/g, ' ').trim(); return b.length > 140 ? b.slice(0, 137) + '...' : b; }
function opened() {
var s = {};
for (var k = 0; k < LS.length; k++) {
var key = LS.key(k) || '';
if (key === SK || key.indexOf('company.docs.seen.') === 0) json(key, []).forEach(function (i) { s[i] = 1; });
}
return s;
}
if (!LS.getItem('company.seen0')) try { LS.setItem('company.seen0', new Date().toISOString()); } catch (e) { /* blocked */ }
function seenAt(n) { var s0 = LS.getItem('company.seen0') || '', x = LS.getItem('company.seen.' + n); return x && x > s0 ? x : s0; }
function chatRows() { return (rep || json(CK, [])).filter(function (x) { return x.t > seenAt(x.n); }); }
function isChat(ls) { return ls.some(function (l) { return l === 'main' || l === 'chat' || l.indexOf('topic:') === 0; }); }
function lab(i) { return (i.labels || []).map(function (l) { return String(l.name || l).toLowerCase(); }); }
function company(who, body, names) { return names.indexOf(who) < 0 && !/\(automatic receipt\)\s*$/.test(body || ''); }
function feed(issues, comments, names) {
var chat = {};
issues.forEach(function (i) { if (i.state === 'open' && isChat(lab(i))) chat[i.number] = 1; });
took(comments.map(function (c) {
return { n: +String(c.issue_url || '').split('/').pop(), id: c.id, w: String((c.user && c.user.login) || '').toLowerCase(), t: c.created_at, b: c.body };
}).filter(function (c) { return chat[c.n]; }), names);
}
function took(cs, names) {
rep = [];
cs.forEach(function (c) { if (company(c.w, c.b, names) && c.t > seenAt(c.n)) rep.push({ k: 'c' + c.id, n: c.n, t: c.t, b: plain(c.b) }); });
rep.sort(function (a, b) { return a.t < b.t ? 1 : -1; });
rep = rep.slice(0, 20);
try { LS.setItem(CK, JSON.stringify(rep)); } catch (e) { /* full: this page still shows them */ }
var fresh = rep.filter(function (x) { return known && !known[x.k]; });
known = known || {}; rep.forEach(function (x) { known[x.k] = 1; });
if (fresh.length && allowed()) { held = held.concat(fresh); if (!heldT) heldT = later(flush, Math.max(0, lastNote + GAP - Date.now())); }
draw();
}
var Q = 'query($o:String!,$r:String!){repository(owner:$o,name:$r){a:object(expression:"HEAD:investors/allowlist.md"){...on Blob{text}}'
+ 'i:issues(states:OPEN,first:30,orderBy:{field:UPDATED_AT,direction:DESC}){nodes{number labels(first:10){nodes{name}}comments(last:10){nodes{databaseId author{login}body createdAt}}}}}}';
function read() {
if (!repo || !S.getToken || !S.getToken() || S.byId('chat-root') || (S.rejected && S.rejected())) return;
var c = json(RK, null, sessionStorage);
if (c && Date.now() - c.at < 6e4) return took(c.cs, c.names);
var rp = repo.split('/'), h = S.hdrs(); h['Content-Type'] = 'application/json';
fetch(S.API + '/graphql', { method: 'POST', headers: h, body: JSON.stringify({ query: Q, variables: { o: rp[0], r: rp[1] } }) }).then(S.checkAuth)
.then(function (r) { if (!r.ok) throw new Error(S.said(r)); return r.json(); }).then(function (g) {
var r = g && g.data && g.data.repository, cs = [];
if (!r || !r.i) return;
r.i.nodes.forEach(function (i) {
if (!isChat(lab({ labels: i.labels.nodes }))) return;
i.comments.nodes.forEach(function (x) { cs.push({ n: i.number, id: x.databaseId, w: String((x.author && x.author.login) || '').toLowerCase(), t: x.createdAt, b: x.body }); });
});
var names = S.parseAllow(r.a && r.a.text);
try { sessionStorage.setItem(RK, JSON.stringify({ at: Date.now(), cs: cs, names: names })); } catch (e) { /* private mode */ }
took(cs, names);
}).catch(function () { /* offline: the last kept read still counts */ });
}
function flush() {
heldT = 0; var h = held; held = [];
if (!h.length || !allowed()) return;
lastNote = Date.now();
var one = h.length === 1 ? h[0] : null;
var n = new Notification(one ? 'Reply on #' + one.n : h.length + ' new replies', { body: one ? one.b : 'Open the bell on the company site.', tag: 'company-bell' });
weekCount(1);
n.onclick = function () { if (window.focus) window.focus(); if (one) location.href = href('/chat/#t=' + one.n); else show(true); if (n.close) n.close(); };
draw();
}
function issuesN() { var b = D.querySelector('nav a[data-issues] .nb'); return b && !b.hidden ? +b.textContent || 0 : 0; }
function groups() {
var o = opened(), cut = new Date(Date.now() - WEEK).toISOString(), fresh = docs.filter(function (d) { return !o[d.i] && d.t > cut; }), k = issuesN();
return [['Chat', chatRows().map(function (x) { return { n: x.n, b: x.b, u: '/chat/#t=' + x.n }; })],
['Issues', k ? [{ b: k + (k > 1 ? ' issues wait' : ' issue waits') + ' on you', u: '/issues/', c: k }] : []],
['Reports', fresh.filter(function (d) { return d.f === 'reports'; }).map(row)], ['Documents', fresh.filter(function (d) { return d.f !== 'reports'; }).map(row)]];
}
function row(d) { return { b: d.n || d.u, u: d.u }; }
function len(g) { return g[1].reduce(function (s, r) { return s + (r.c || 1); }, 0); }
function svg(tag, a) {
var e = D.createElementNS('http://www.w3.org/2000/svg', tag);
Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); return e;
}
function ui() {
var w = hd && hd.querySelector('.wrap');
if (!w || !D.createElementNS) return;
w.style.position = 'relative';
bellB = add(w, 'button', 'bell'); bellB.type = 'button';
bellP = add(w, 'div', 'bellp'); bellP.setAttribute('role', 'dialog'); bellP.setAttribute('aria-label', 'Notifications'); bellP.hidden = true;
bellB.onclick = function (e) { if (e && e.stopPropagation) e.stopPropagation(); show(!bellOpen); };
on(D, 'keydown', function (e) { if (bellOpen && e.key === 'Escape') { show(false); bellB.focus(); } });
on(D, 'click', function (e) { var t = e.target; if (bellOpen && bellP.contains && !bellP.contains(t) && !bellB.contains(t)) show(false); });
}
function show(open) { bellOpen = open; draw(); }
function tab(nav, sel, n, what) {
var a = D.querySelector(nav + ' a[href$="' + sel + '"]'), b = a && a.querySelector(':scope > .nb');
if (!a) return;
if (!b && n) { a.appendChild(D.createTextNode(' ')); b = add(a, 'span', 'nb'); }
if (b) { b.textContent = String(n); b.hidden = !n; b.setAttribute('aria-label', n + ' new ' + what); }
}
function draw() {
var g = groups(), n = g.reduce(function (s, x) { return s + len(x); }, 0);
tab('header.site .tabs', '/chat/', len(g[0]), 'in the chat');
tab('header.site .tabs', '/reports/', len(g[2]) + len(g[3]), 'reports and documents');
tab('nav.subtabs[aria-label="Reports"]', '/reports/', len(g[2]), 'reports');
if (!bellB) return;
var s = svg('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8', 'aria-hidden': 'true' });
s.appendChild(svg('path', { d: 'M12 3.5a5.5 5.5 0 0 0-5.5 5.5v3.6L4.8 15.8h14.4l-1.7-3.2V9A5.5 5.5 0 0 0 12 3.5z', 'stroke-linejoin': 'round' }));
s.appendChild(svg('path', { d: 'M9.8 18.6a2.3 2.3 0 0 0 4.4 0', 'stroke-linecap': 'round' }));
bellB.textContent = ''; bellB.appendChild(s);
if (n) add(bellB, 'span', 'badge', String(n));  // today's colour until #170 Q3 is answered (Ines 11-04 08:23)
bellB.setAttribute('aria-label', 'Notifications, ' + (n ? n + ' new or waiting' : 'nothing new'));
bellB.setAttribute('aria-expanded', bellOpen ? 'true' : 'false');
D.title = (n ? '(' + n + ') ' : '') + title0;
bellP.hidden = !bellOpen;
if (!bellOpen) return;
bellP.textContent = '';
trial(add(bellP, 'div', 'trial'));
g.forEach(function (x) {
if (!x[1].length) return;
add(bellP, 'h4', null, x[0] + ' ' + len(x));
x[1].forEach(function (r) {
var a = add(bellP, 'a', 'item'); a.href = href(r.u);
if (r.n) add(a, 'span', 'ref', '#' + r.n);
add(a, 'span', null, r.b);
});
});
if (!n) add(bellP, 'p', 'muted', 'Nothing new.');
}
function trial(t) {
function say(b, small) { add(t, 'b', null, b); if (small) add(t, 'small', 'muted', small); }
if (!flagOn()) return say('Notifications are off', 'Turned off for both of you on #24. The bell still lists everything.');
if (iPhone()) return say('Notifications', 'On iPhone, Safari sends them only to a site added to the Home Screen (iOS 16.4 or later). Share, then Add to Home Screen.');
if (!hasN()) return say('Notifications', 'This browser does not offer them. The bell still lists everything.');
if (Notification.permission === 'denied') return say('Notifications', 'Blocked in this browser’s settings for this site. The bell still lists everything.');
if (Notification.permission !== 'granted' || !LS.getItem(NL)) {
add(t, 'b', null, 'Try notifications (trial)');
var b = add(t, 'button', 'btn primary', 'Turn on'); b.type = 'button';
b.onclick = function () {
function done() { if (Notification.permission === 'granted') LS.setItem(NL, 'on'); draw(); }
var r = Notification.requestPermission(done); if (r && r.then) r.then(done);
};
return add(t, 'small', 'muted', 'Only while a site page is open. One per item, at most one every 2 minutes.');
}
add(t, 'b', null, 'Notifications');
var seg = add(t, 'span', 'seg2'), cur = LS.getItem(NL);
['On', 'Off'].forEach(function (w) {
var a = add(seg, 'a', null, w); a.href = '#';
if (cur === w.toLowerCase()) a.setAttribute('aria-current', 'true');
a.onclick = function (e) { if (e && e.preventDefault) e.preventDefault(); LS.setItem(NL, w.toLowerCase()); draw(); };
});
add(t, 'small', 'muted', 'Trial · ' + weekCount(0) + ' this week · off for both of you: write "notifications off" on #24');
}
if (typeof fetch === 'function') fetch(href('/doc-new.json'), { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : null; }).then(function (j) {
if (!j) return;
repo = String(j.repo || '');
docs = (Array.isArray(j.docs) ? j.docs : []).filter(function (d) { return d.f !== 'reports'; })
.concat((Array.isArray(j.reports) ? j.reports : []).map(function (d) { return { i: d.i, u: d.u, n: d.n, t: d.t, f: 'reports' }; }));
var p = here(), mine = docs.filter(function (d) { return d.u === p || d.u === p.replace(/index\.html$/, ''); });
if (mine.length) { var s = json(SK, []); mine.forEach(function (d) { if (s.indexOf(d.i) < 0) s.push(d.i); }); try { LS.setItem(SK, JSON.stringify(s.slice(-500))); } catch (e) { /* full */ } }
draw(); read();
}).catch(function () { /* the bell keeps what it has */ });
S.feed = feed;
S.onReject.push(function () { rep = []; LS.removeItem(CK); if (bellB) bellB.hidden = bellP.hidden = true; D.title = title0; draw(); });
on(window, 'storage', function () { draw(); });
on(D, 'visibilitychange', function () { if (!D.hidden) read(); });
var ia = D.querySelector('nav a[data-issues]');
if (ia && window.MutationObserver) new MutationObserver(function () { draw(); }).observe(ia, { childList: true, subtree: true, characterData: true });
ui(); draw();
if (S.fed) feed.apply(null, S.fed);  // a chat read from before this file ran (app.js keeps it)
})();
