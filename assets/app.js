// Source with comments: tools/site/assets/app.js in the company repository.
(function () {
'use strict';
var API = 'https://api.github.com';
var KEY = 'company-chat-token', NAME = 'company-chat-name';
var later = typeof setTimeout === 'function' ? setTimeout : function () { return 0; };
var stop = typeof clearTimeout === 'function' ? clearTimeout : function () {};
function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
function byId(id) { return document.getElementById(id); }
function on(target, ev, fn) { if (target && target.addEventListener) target.addEventListener(ev, fn); }
function getToken() { return sessionStorage.getItem(KEY) || localStorage.getItem(KEY) || ''; }
function setToken(t, remember) {
sessionStorage.removeItem(KEY); localStorage.removeItem(KEY);
if (t) (remember ? localStorage : sessionStorage).setItem(KEY, t);
}
function gh(path, opts) {
var h = { 'Accept': 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' };
var t = getToken(); if (t) h['Authorization'] = 'Bearer ' + t;
if (opts && opts.etag) h['If-None-Match'] = opts.etag;
return fetch(API + path, { headers: h, cache: 'no-store' });
}
function cap(s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }
function ago(iso) {
var s = Math.max(0, (Date.now() - Date.parse(iso)) / 1000);
if (isNaN(s)) return '';
return s < 90 ? Math.round(s) + ' s' : s < 5400 ? Math.round(s / 60) + ' min' : s < 172800 ? Math.round(s / 3600) + ' h' : Math.round(s / 86400) + ' d';
}
function clock(iso) { return iso ? new Date(iso).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : ''; }
function pctText(m) {
if (!m || m.pct == null) return 'not read yet';
var r = clock(m.resets_at);
return Math.round(m.pct) + '% used' + (r ? ', resets ' + r : '');
}
function setText(id, text) { var e = byId(id); if (e && text != null) e.textContent = text; }
function list(items, fmt) { var ul = el('ul'); items.forEach(function (x) { ul.appendChild(el('li', null, fmt(x))); }); return ul; }
var toggled = false;  // once the reader opens or closes the panel, the live status no longer does
function showNow(box, open) {
box.hidden = !open;
var b = document.querySelector && document.querySelector('.now-toggle');
if (b) { b.setAttribute('aria-expanded', open ? 'true' : 'false'); var d = b.querySelector('.dot'); if (d) d.className = 'dot ' + (open ? 'live' : 'idle'); }
}
function renderStrip(st) {
var m = st.meter || {}, q = st.queue || {};
if (m.five_hour && m.five_hour.pct != null) {
setText('s-5h', Math.round(m.five_hour.pct) + '%');
if (m.five_hour.resets_at) setText('s-5h-r', '(resets ' + clock(m.five_hour.resets_at) + ')');
}
if (m.weekly && m.weekly.pct != null) setText('s-wk', Math.round(m.weekly.pct) + '%');
if (q.runnable_count != null) setText('s-ready', String(q.runnable_count));
if (q.blocked_count != null) setText('s-blocked', String(q.blocked_count));
}
function renderNow(box, st, source) {
var s = st.session || {}, ws = st.workers || [];
var headLine = s.active ? 'A ' + (s.kind || 'work') + ' session is running' + (s.started ? ' (started ' + ago(s.started) + ' ago).' : '.') : 'No session is running; the next one starts at the next 15-minute tick.';
var head = box.querySelector ? box.querySelector('.now-head') : null;
var body = box.querySelector ? box.querySelector('.now-body') : null;
if (!body) { box.textContent = ''; box.appendChild(el('h3', null, 'Now')); head = box.appendChild(el('p', 'now-head')); body = box.appendChild(el('div', 'now-body')); }
head.textContent = headLine;
var carded = {};
var cards = box.querySelectorAll ? Array.prototype.slice.call(box.querySelectorAll('[data-worker]')) : [];
cards.forEach(function (c) {
var slug = c.getAttribute('data-worker'), w = null, k;
for (k = 0; k < ws.length; k++) if ((ws[k].name || '').toLowerCase() === slug) w = ws[k];
var t = c.querySelector('.t'), d = c.querySelector('.dot');
c.className = 'card ' + (w ? 'live' : 'idle');
if (d) d.className = 'dot ' + (w ? 'live' : 'idle');
if (t) t.textContent = w ? (w.task || '') + (w.model ? ' [' + w.model + ']' : '') + (w.started ? ', for ' + ago(w.started) : '') : 'idle';
if (w) carded[slug] = true;
});
body.textContent = '';
var rest = ws.filter(function (w) { return !carded[(w.name || '').toLowerCase()]; });
if (rest.length) {
body.appendChild(el('p', 'now-sub', 'Working now'));
body.appendChild(list(rest, function (w) { return cap(w.name) + ': ' + (w.task || '') + (w.model ? ' [' + w.model + ']' : '') + (w.started ? ', for ' + ago(w.started) : ''); }));
} else if (s.active && !ws.length) body.appendChild(el('p', 'muted', 'No worker call is running at this moment.'));
var rec = (st.recent || []).slice(0, 3);
if (rec.length) {
body.appendChild(el('p', 'now-sub', 'Just finished'));
body.appendChild(list(rec, function (w) { return cap(w.name) + ': ' + (w.task || '') + (w.finished ? ', ' + ago(w.finished) + ' ago' : ''); }));
}
var q = st.queue || {};
body.appendChild(el('p', 'now-sub', 'Queue: ' + (q.runnable_count || 0) + ' tasks ready, ' + (q.blocked_count || 0) + ' blocked'));
if ((q.runnable || []).length) body.appendChild(list(q.runnable.slice(0, 5), function (t) { return '[' + t.kind + '] ' + t.text; }));
var m = st.meter || {};
body.appendChild(el('p', null, '5-hour limit: ' + pctText(m.five_hour) + '. Week: ' + pctText(m.weekly) + '.'));
body.appendChild(el('p', 'muted', source + (st.at ? ' · updated ' + ago(st.at) + ' ago' : '')));
renderStrip(st);
if (!toggled) showNow(box, !!s.active);
}
function nowPanel(box) {
var repo = box.getAttribute('data-repo'), etag = null, last = null, busy = false;
var b = document.querySelector && document.querySelector('.now-toggle');
if (b) b.onclick = function () { toggled = true; showNow(box, box.hidden); };
function pub() {
return fetch(box.getAttribute('data-status'), { cache: 'no-store' }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
.then(function (st) { renderNow(box, st, 'public copy, refreshed with each site build (every 15 minutes or so)'); }).catch(function () {});
}
function live(force) {
if (busy || (document.hidden && force !== true)) return; busy = true;
var p = (!getToken() || !repo) ? pub() : gh('/repos/' + repo + '/actions/variables/COMPANY_STATUS', { etag: etag }).then(function (r) {
if (r.status === 304 && last) return last;
if (!r.ok) throw new Error(r.status);
etag = r.headers.get('ETag'); return r.json().then(function (v) { last = JSON.parse(v.value); return last; });
}).then(function (st) { renderNow(box, st, 'live copy, seconds old while a session runs'); }).catch(function () { etag = null; last = null; return pub(); });
p.then(function () { busy = false; }, function () { busy = false; });
}
live(true); setInterval(live, getToken() ? 5000 : 60000);
on(document, 'visibilitychange', function () { if (!document.hidden) live(); });
}
function tokenBox(root) {
var repo = root.getAttribute('data-repo');
var bar = el('div', 'chat-bar'), input = el('input'); input.type = 'password'; input.autocomplete = 'off';
input.placeholder = 'Fine-grained GitHub token (github_pat_...)'; input.setAttribute('aria-label', 'GitHub token');
var remember = el('input'); remember.type = 'checkbox'; var rl = el('label', null, ' remember on this device'); rl.insertBefore(remember, rl.firstChild);
var save = el('button', 'btn primary', 'Save token'), forget = el('button', 'btn', 'Forget token'), out = el('p', 'state', '');
save.type = forget.type = 'button';
[input, rl, save, forget].forEach(function (x) { bar.appendChild(x); });
root.appendChild(bar); root.appendChild(out);
function show() {
var t = getToken();
out.className = 'state'; out.textContent = t ? 'A token is saved in this browser (' + (localStorage.getItem(KEY) ? 'on this device' : 'until this tab closes') + ').' : 'No token is saved in this browser.';
}
save.onclick = function () {
var t = input.value.trim(); if (!t) { out.textContent = 'Paste the token first.'; return; }
setToken(t, remember.checked); input.value = ''; out.textContent = 'Checking the token with GitHub...';
gh('/repos/' + repo).then(function (r) {
if (!r.ok) throw new Error('GitHub answered ' + r.status + (r.status === 401 ? ' (the token was not accepted)' : r.status === 404 ? ' (the token cannot see the company repository: check steps 3 and 5)' : ''));
out.className = 'state sent'; out.textContent = 'Saved, and it can read the company repository. ';
var a = el('a', null, 'Go to the home page to send a message.'); a.href = root.getAttribute('data-home') || './'; out.appendChild(a);
}).catch(function (e) { out.className = 'state failed'; out.textContent = 'Saved, but it does not work yet: ' + e.message + '. Forget it and try again.'; });
};
forget.onclick = function () { setToken('', false); show(); };
show();
}
var KINDS = { urgent: 'Urgent', report: 'Report', pitch: 'Pitch', chat: 'Chat', other: 'Other' };
var FILTERS = [['all', 'All'], ['urgent', 'Urgent'], ['report', 'Reports'], ['pitch', 'Pitches'], ['chat', 'Chat']];
function labelsOf(i) { return (i.labels || []).map(function (x) { return String(x.name || x).toLowerCase(); }); }
function kindOf(i) {
var ls = labelsOf(i);
if (ls.indexOf('emergency') >= 0 || ls.indexOf('urgent') >= 0) return 'urgent';
if (ls.indexOf('report') >= 0) return 'report';
if (ls.indexOf('pitch') >= 0) return 'pitch';
if (ls.indexOf('chat') >= 0 || ls.some(function (l) { return l.indexOf('topic:') === 0; })) return 'chat';
return 'other';
}
var DEADLINE = /^[ \t]*(?:[-*+][ \t]+)?\**[ \t]*(?:deadline\**[ \t]*:|(?:needed|answer|decide) by\**[ \t]*:?)\**[ \t]*(.+)$/im;
function etOffset(y, mo, d) {
function sunday(m, n) { var first = new Date(Date.UTC(y, m - 1, 1)).getUTCDay(); return 1 + (7 - first) % 7 + 7 * (n - 1); }
return ((mo > 3 && mo < 11) || (mo === 3 && d >= sunday(3, 2)) || (mo === 11 && d < sunday(11, 1))) ? 4 : 5;
}
function deadlineTime(text) {
var d = /(\d{4})-(\d{2})-(\d{2})/.exec(text);
if (!d) return null;
var y = +d[1], mo = +d[2], day = +d[3], rest = text.slice(d.index + d[0].length);
var h = /(?:^|[^\d])(\d{1,2}):(\d{2})/.exec(rest), hh = h ? +h[1] : 23, mm = h ? +h[2] : 59;
if (mo < 1 || mo > 12 || day < 1 || day > 31 || hh > 23 || mm > 59) return null;
var off = /\b(?:UTC|GMT)\b|\d{2}Z\b/.test(rest) ? 0 : etOffset(y, mo, day);
return Date.UTC(y, mo - 1, day, hh + off, mm);
}
function deadlineOf(i) {
var m = DEADLINE.exec(i.body || '');
if (!m) return null;
var text = m[1].replace(/\*+/g, '').trim().replace(/\.$/, '');
if (text.length > 80) text = text.slice(0, 77) + '...';
return text ? { text: text, t: deadlineTime(text) } : null;
}
function chat(root) {
var repo = root.getAttribute('data-repo');
var composerOn = root.getAttribute('data-composer') === 'on';
var threadsBox = byId('threads') || root.appendChild(el('div', 'threads'));
var filtersBox = byId('filters') || root.appendChild(el('div', 'filters'));
var publicBox = byId('public');
var status = el('p', 'chat-status muted', '');
if (!getToken()) return;  // the static "Connect your GitHub token" block and the public list stay as built
var connect = root.querySelector ? root.querySelector('.connect') : null; if (connect) connect.parentNode.removeChild(connect);
var etags = {}, cache = {}, issuesList = [], allowNames = [], issuesSig = null, filter = 'all', lastDraw = null;
var comp = el('form', 'composer'); comp.setAttribute('action', '#');
var sel = el('select', 'field'); sel.setAttribute('aria-label', 'Thread');
var topicIn = el('input', 'field'); topicIn.type = 'text'; topicIn.maxLength = 30; topicIn.placeholder = 'Topic for the new chat (letters, digits, dashes)';
var msgIn = el('textarea', 'field'); msgIn.rows = 3; msgIn.placeholder = 'Message the company. It is handled as if typed into Claude Code.'; msgIn.setAttribute('aria-label', 'Message');
var nameIn = el('input', 'field'); nameIn.type = 'text'; nameIn.maxLength = 40; nameIn.placeholder = 'Display name (optional)'; nameIn.value = localStorage.getItem(NAME) || '';
var urg = el('input'); urg.type = 'checkbox'; var ul2 = el('label', 'check', ' Mark urgent'); ul2.insertBefore(urg, ul2.firstChild);
var send = el('button', 'btn primary send', 'Send'); send.type = 'submit';
var out = el('p', 'state', ''); out.setAttribute('role', 'status');
var tokenLink = el('a', 'meta', 'Token connected · change'); tokenLink.href = root.getAttribute('data-connect') || 'connect.html';
var foot = el('div', 'foot');
[ul2, nameIn, send].forEach(function (x) { foot.appendChild(x); });
[sel, topicIn, msgIn, foot, out].forEach(function (x) { comp.appendChild(x); });
if (composerOn) root.appendChild(comp);
else root.appendChild(el('p', 'muted', 'Sending from this page is switched off; reply on GitHub for now. The threads below are read with your token.'));
root.appendChild(status); root.appendChild(tokenLink);
var clearTimer = 0;
function state(kind, text, ms) {
stop(clearTimer); out.className = 'state' + (kind ? ' ' + kind : ''); out.textContent = text;
if (ms) clearTimer = later(function () { out.className = 'state'; out.textContent = ''; }, ms);
}
on(msgIn, 'input', function () { if (/failed/.test(out.className)) state('', ''); });
function openIssues(list) { return list.filter(function (i) { return !i.pull_request && i.state === 'open'; }); }
function setIssues(list, pick) {
var open = openIssues(list).slice(0, 40);
var sig = open.map(function (i) { return i.number + ':' + i.title; }).join('|');
issuesList = list;
if (sig === issuesSig && !pick) return;
issuesSig = sig; var keep = pick || sel.value; sel.textContent = '';
open.forEach(function (i) {
sel.appendChild(Object.assign(el('option', null, '#' + i.number + ' ' + i.title.slice(0, 60)), { value: String(i.number) }));
});
sel.appendChild(Object.assign(el('option', null, 'New chat...'), { value: 'new' }));
sel.value = keep || (open[0] ? String(open[0].number) : 'new');
if (!sel.value) sel.value = open[0] ? String(open[0].number) : 'new';
topicIn.hidden = sel.value !== 'new';
}
sel.onchange = function () { topicIn.hidden = sel.value !== 'new'; };
function post(path, body) {
return fetch(API + path, { method: 'POST', headers: { 'Accept': 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'Authorization': 'Bearer ' + getToken(), 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
.then(function (r) { if (!r.ok) throw new Error('GitHub answered ' + r.status + (r.status === 403 || r.status === 404 ? ' (does the token have Issues: read and write?)' : '')); return r.json(); });
}
function cleanName(n) { return (n || '').replace(/[^A-Za-z0-9 _.-]/g, '').trim().slice(0, 40); }
function mentions(names) { return names.length ? 'Urgent: ' + names.map(function (n) { return '@' + n; }).join(' ') : ''; }
function stamp(text, name, cc) { return text.replace(/<!--[\s\S]*?-->/g, '').trim() + (cc ? '\n\n' + cc : '') + (name ? '\n\n<!-- as: ' + name + ' -->' : ''); }
var sending = false;
function doSend() {
if (!composerOn || sending) return;
var text = msgIn.value.trim(), name = cleanName(nameIn.value), urgent = urg.checked, target = sel.value;
if (!text) { state('failed', 'Write a message first.', 4000); return; }
localStorage.setItem(NAME, name); sending = true; send.disabled = true; state('sending', 'Sending...');
var warn = '';
var who = (!urgent || allowNames.length) ? Promise.resolve(allowNames) : allow();
var p = who.then(function (names) {
var cc = urgent ? mentions(names) : '';
if (target === 'new') {
var topic = topicIn.value.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/^-+|-+$/g, '').slice(0, 30);
var labels = ['chat']; if (topic) labels.push('topic:' + topic); if (urgent) labels.push('urgent');
return post('/repos/' + repo + '/issues', { title: (topic ? topic + ': ' : 'Chat: ') + text.replace(/\s+/g, ' ').slice(0, 60), body: stamp(text, name, cc), labels: labels });
}
return post('/repos/' + repo + '/issues/' + target + '/comments', { body: stamp(text, name, cc) }).then(function (r) {
return urgent ? post('/repos/' + repo + '/issues/' + target + '/labels', { labels: ['urgent'] })
.then(function () { return r; }, function (e) { warn = ' The urgent label was not added (' + e.message + '); the mentions were sent.'; return r; }) : r;
});
});
p.then(function (r) {
msgIn.value = ''; urg.checked = false; topicIn.value = '';
state('sent', 'Sent' + (r.number ? ' as #' + r.number : '') + '. A receipt follows within a tick; the reply appears in the thread.' + warn, warn ? 15000 : 8000);
etags = {}; load(r.number && target === 'new' ? String(r.number) : null);
}).catch(function (e) { state('failed', 'Not sent: ' + e.message + '. Your text is kept; press Send to retry.', 30000); })
.then(function () { sending = false; send.disabled = false; });
}
comp.onsubmit = function (ev) { if (ev && ev.preventDefault) ev.preventDefault(); doSend(); return false; };
send.onclick = function (ev) { if (ev && ev.preventDefault) ev.preventDefault(); doSend(); };
function get(path) {
return gh(path, { etag: etags[path] }).then(function (r) {
if (r.status === 304) return cache[path];
if (!r.ok) throw new Error('GitHub answered ' + r.status);
etags[path] = r.headers.get('ETag'); return r.json().then(function (j) { cache[path] = j; return j; });
});
}
function allow() {
return get('/repos/' + repo + '/contents/investors/allowlist.md').then(function (f) {
var text = atob(f.content.replace(/\n/g, ''));
allowNames = text.split('\n').map(function (l) { return l.replace(/^[\s*\-]+/, '').replace(/^@/, '').trim().toLowerCase(); })
.filter(function (l) { return /^[a-z0-9-]{1,39}$/.test(l); });
return allowNames;
});
}
function load(pick) {
if (document.hidden && !pick && lastDraw) return;
if (!lastDraw) status.textContent = 'Loading the threads...';
Promise.all([allow(), get('/repos/' + repo + '/issues?state=all&per_page=100&sort=updated'), get('/repos/' + repo + '/issues/comments?per_page=100&sort=created&direction=desc')])
.then(function (res) {
var same = lastDraw && lastDraw[1] === res[1] && lastDraw[2] === res[2] && lastDraw[0] === res[0];
setIssues(res[1], pick); if (!same) { lastDraw = res; draw(); }
if (publicBox) publicBox.hidden = true;
status.textContent = 'Updated ' + new Date().toLocaleTimeString() + '; refreshes every 30 seconds while this tab is open.';
})
.catch(function (e) { status.textContent = 'Could not load the threads: ' + e.message + '. Check the token on the connect page.'; });
}
function hue(login) { var h = 0, k; for (k = 0; k < login.length; k++) h = (h * 31 + login.charCodeAt(k)) >>> 0; return 'c' + (h % 6); }
function isInvestor(login, names) { return names.indexOf((login || '').toLowerCase()) >= 0; }
function sender(login, body, names) {
var l = (login || '').toLowerCase(), m = /<!--\s*as:\s*([^>]{1,40}?)\s*-->/.exec(body || ''), inv = isInvestor(l, names);
var chip = el('span', 'chip sender ' + (inv ? hue(l) : 'company'), inv ? (m ? m[1] : login) : 'Company');
chip.title = login || '';
return chip;
}
function plain(body) { return (body || '').replace(/<!--[\s\S]*?-->/g, '').trim().slice(0, 600); }
function msgEl(login, body, when, names) {
var m = el('div', 'msg ' + (isInvestor(login, names) ? 'investor' : 'company'));
var from = el('div', 'from'); from.appendChild(sender(login, body, names)); if (when) from.appendChild(el('small', null, ago(when) + ' ago'));
m.appendChild(from); m.appendChild(el('div', 'body', plain(body)));
return m;
}
function setFilter(f) { filter = f; draw(); }
function drawFilters(counts) {
filtersBox.textContent = ''; filtersBox.hidden = false;
FILTERS.forEach(function (f) {
var b = el('button', 'filter', f[1] + (f[0] === 'urgent' ? ' ' + (counts.urgent || 0) : '')); b.type = 'button';
b.setAttribute('aria-pressed', filter === f[0] ? 'true' : 'false'); b.onclick = function () { setFilter(f[0]); };
filtersBox.appendChild(b);
});
}
function draw() {
if (!lastDraw) return;
var names = lastDraw[0], issues = lastDraw[1].filter(function (i) { return !i.pull_request; }), comments = lastDraw[2];
var by = {}; (comments || []).forEach(function (c) { var n = (c.issue_url || '').split('/').pop(); (by[n] = by[n] || []).push(c); });
var counts = {}; openIssues(issues).forEach(function (i) { var k = kindOf(i); counts[k] = (counts[k] || 0) + 1; });
drawFilters(counts);
var recent = Date.now() - 3 * 86400000, shown;
if (filter === 'urgent') {
shown = openIssues(issues).filter(function (i) { return kindOf(i) === 'urgent'; }).map(function (i) { return { i: i, d: deadlineOf(i) }; })
.sort(function (a, b) {
var x = a.d && a.d.t, y = b.d && b.d.t;
if (x && y) return x - y; if (x) return -1; if (y) return 1;
return Date.parse(a.i.created_at) - Date.parse(b.i.created_at);
});
} else {
shown = issues.filter(function (i) { return (i.state === 'open' || Date.parse(i.closed_at || i.updated_at) > recent) && (filter === 'all' || kindOf(i) === filter); })
.slice(0, 30).map(function (i) { return { i: i, d: kindOf(i) === 'urgent' ? deadlineOf(i) : null }; });
}
threadsBox.textContent = '';
if (!shown.length) threadsBox.appendChild(el('p', 'muted', filter === 'urgent' ? 'Nothing is waiting on you.' : 'No threads here yet.'));
shown.forEach(function (x) {
var i = x.i, k = kindOf(i), t = el('article', 'thread ' + k);
var head = el('div', 'thread-head');
head.appendChild(el('span', 'chip ' + k, KINDS[k])); head.appendChild(el('span', 'ref meta', '#' + i.number));
head.appendChild(el('h3', null, i.title + (i.state === 'closed' ? ' (closed)' : '')));
if (x.d) {
var dl = head.appendChild(el('span', 'deadline', 'Deadline: ' + x.d.text));
if (x.d.t) dl.setAttribute('data-t', new Date(x.d.t).toISOString());
}
head.appendChild(el('span', 'meta', 'updated ' + ago(i.updated_at) + ' ago'));
t.appendChild(head);
var msgs = el('div', 'msgs'); t.appendChild(msgs);
msgs.appendChild(msgEl(i.user && i.user.login, i.body, i.created_at, names));
var last = (by[i.number] || []).slice(0, 5).reverse();
last.forEach(function (c) { msgs.appendChild(msgEl(c.user && c.user.login, c.body, c.created_at, names)); });
if ((i.comments || 0) > last.length) {
var more = el('button', 'more', 'Show all ' + i.comments + ' replies'); more.type = 'button';
more.onclick = function () {
more.disabled = true; more.textContent = 'Loading...';
get('/repos/' + repo + '/issues/' + i.number + '/comments?per_page=100').then(function (all) {
msgs.textContent = ''; msgs.appendChild(msgEl(i.user && i.user.login, i.body, i.created_at, names));
all.forEach(function (c) { msgs.appendChild(msgEl(c.user && c.user.login, c.body, c.created_at, names)); });
more.hidden = true;
}).catch(function (e) { more.disabled = false; more.textContent = 'Could not load (' + e.message + '); retry'; });
};
t.appendChild(more);
}
var reply = el('button', 'reply', 'Reply'); reply.type = 'button';
reply.onclick = function () { if (!composerOn) return; sel.value = String(i.number); topicIn.hidden = true; if (msgIn.focus) msgIn.focus(); };
if (composerOn && i.state === 'open') t.appendChild(reply);
threadsBox.appendChild(t);
});
}
var waiting = document.querySelector ? document.querySelector('[data-filter="urgent"]') : null;
if (waiting) {
var whoEl = waiting.querySelector ? waiting.querySelector('[data-who]') : null;
if (whoEl) whoEl.textContent = 'waiting on you';
waiting.onclick = function () { if (lastDraw) setFilter('urgent'); };
}
load(); setInterval(load, 30000);
}
var n = byId('now-panel'); if (n) nowPanel(n);
var c = byId('chat-root'); if (c) chat(c);
var t = byId('token-root'); if (t) tokenBox(t);
})();
