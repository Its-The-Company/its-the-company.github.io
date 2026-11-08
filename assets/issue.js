// Source with comments: tools/site/assets/issue.js in the company repository.
(() => {
'use strict';
var S = window.CompanySite, C = S && S.core, root = document.getElementById('issue-root');
if (!C || !S.compose || !root || !S.getToken()) return;
var anon = document.getElementById('issue-anon'); if (anon) anon.hidden = true;
var repo = root.getAttribute('data-repo'), RI = C.use(repo), el = S.el, LS = localStorage, names = [], MAXF = 10 * 1048576;
var KEEP = ['emergency', 'urgent', 'approval', 'pitch', 'proposal', 'chat'], MAIL = /[\w.+-]{1,64}@[\w-]+(?:\.[\w-]+)+/g;
var PO = ['Approve', 'Hold', 'No'].map((k) => ({ key: k, label: k, reply: k.toLowerCase() }));
function mk(p, tag, cls, text) { return p.appendChild(el(tag, cls, text)); }
function txt(p, t) { p.appendChild(document.createTextNode(t)); }
function inv(l) { return names.indexOf(l) >= 0; }
function labels(i) { return (i.labels || []).map((x) => String(x.name || x).toLowerCase()); }
function num() { var m = /^#(\d{1,7})$/.exec(location.hash || ''); return m ? +m[1] : 0; }
function gh(a, n) { a.href = 'https://github.com/' + repo + '/issues/' + n; a.target = '_blank'; a.rel = 'noopener'; return a; }
function Q() { return window.IssueQ; }
function ox(i) { return { l: labels(i), dl: Q().dl(i.body) }; }
function scope(r) { return S.said(r) + (r.status === 403 || r.status === 404 ? ' (does your token have Issues: Read and write?)' : ''); }
var N = 0, I = null, log = null, meta = null, cnt = null, files = [], fly = 0, doubt = null, btns = [], draw = 0;
var dock = el('div', 'cv-dock'), pick = el('input'), add = el('button', 'cv-tool', 'Add files'), list = el('ul', 'ny-files');
pick.type = 'file'; pick.multiple = true; pick.hidden = true; add.type = 'button'; add.onclick = () => pick.click();
var cp = S.compose(dock, { key: () => 'company.draft.' + N, keep: () => N > 0, tools: [add, pick], after: [list], send: () => go(),
ph: 'Your reply', bar: () => 'Reply to #' + N + '...', to: (t) => { txt(t, 'To '); mk(t, 'b', null, '#' + N + (I && I.state === 'closed' ? ' (sending reopens it)' : '')); },
drawn: () => { mark(); } });
var ta = cp.ta;
cp.can = ((f) => () => (!!doubt && !cp.busy && !S.rejected()) || f())(cp.can);
function mark() { var top = ta.value.trim().split('\n')[0].trim(); btns.forEach((b) => { b.setAttribute('aria-pressed', b.getAttribute('data-r') === top ? 'true' : 'false'); }); return top; }
ta.addEventListener('input', mark);
function opt(o) {
var top = mark(), v = ta.value.trim(), on = /^[A-Fa-f]$/.test(top) || btns.some((b) => b.getAttribute('data-r') === top);
if (on) v = v.slice(top.length).trim();
LS.setItem('company.draft.' + N, v ? o.reply + '\n\n' + v : o.reply);
cp.open = true; cp.draw(); if (ta.focus) ta.focus();
}
function drawFiles() {
list.textContent = '';
files.forEach((f, k) => {
var it = mk(list, 'li', null, f.name + ' (' + Math.ceil(f.size / 1024) + ' KB) '), x = mk(it, 'button', 'cv-tool', 'Remove'); x.type = 'button';
x.setAttribute('aria-label', 'Remove ' + f.name); x.onclick = () => { files.splice(k, 1); drawFiles(); };
});
}
function take(fl) {
Array.prototype.forEach.call(fl || [], (f) => { if (f.size > MAXF) cp.state('failed', f.name + ' is over 10 MB; attach it on GitHub instead.'); else if (files.length < 5) files.push(f); });
drawFiles();
}
pick.onchange = () => { take(pick.files); pick.value = ''; };
ta.addEventListener('paste', (ev) => { var fl = ev.clipboardData && ev.clipboardData.files; if (fl && fl.length) { take(fl); if (!ev.clipboardData.getData('text')) ev.preventDefault(); } });
var lastDay = '';
function msg(x, ask, me) {
var d = new Date(x.created_at).toDateString();
if (d !== lastDay) { lastDay = d; mk(log, 'p', 'cv-day', new Date(x.created_at).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })); }
var l = C.who(x), a = /<!-- ?as: ?([^>]{1,40}?) ?-->/.exec(x.body || ''), y = me || inv(l), m = mk(log, 'div', 'cv-msg' + (y ? ' cv-inv' : '')), f = mk(m, 'div', 'cv-from');
mk(f, 'b', null, y ? (a ? a[1] : l || 'You') : 'Company'); txt(f, ' '); mk(f, 'span', null, C.day(x.created_at));
if (ask) { m.id = 'iq-ask'; txt(f, ' '); mk(f, 'span', 'tag ny-tag-q', 'Your reply answers this'); }
var t = String(x.body || '').replace(C.NOTE, '').replace(MAIL, '[email]').trim();
C.md(mk(mk(m, 'div', 'cv-body'), 'div', 'md'), t || '(no text)', !ask);
return m;
}
function metaLine() {
meta.textContent = '';
var k = KEEP.filter((x) => labels(I).indexOf(x) >= 0)[0];
if (k) mk(meta, 'span', 'tag ' + k, k.charAt(0).toUpperCase() + k.slice(1));
if (I.state === 'closed') mk(meta, 'span', 'tag iq-closed', 'Closed');
txt(meta, 'Opened by ' + (inv(C.who(I)) ? C.who(I) : 'the company') + ' · ' + I.comments + ' repl' + (I.comments === 1 ? 'y' : 'ies') + ' · ');
gh(mk(meta, 'a', null, 'On GitHub'), N);
if (cnt) cnt.textContent = 'all ' + (I.comments + 1) + ' messages';
}
function card(p, ask) {
var c = mk(p, 'section', 'iq-card'), src = C.plain(ask.body || I.body), a = /^[\W_]*Ask:[*_\s]*(.+)$/im.exec(src), q = mk(c, 'p', 'iq-ask');
c.setAttribute('aria-label', 'What the company asks');
mk(q, 'b', null, 'Ask'); txt(q, C.clean(a ? a[1] : src.split('\n').filter((x) => x.trim())[0] || I.title).slice(0, 300));
if (ask.answered && ask.lastInv) mk(c, 'p', 'meta ny-done', 'You answered ' + C.when(ask.lastInv.created_at) + ': "' + C.plain(ask.lastInv.body).slice(0, 80) + '". The company closes the issue once it has read it.');
if ((ask.imgs || []).length) { var g = mk(c, 'div', 'ny-imgs'); ask.imgs.forEach((im) => C.pic(mk(g, 'div', 'ny-col'), im)); }
var o = mk(c, 'div', 'ny-opts'); o.setAttribute('role', 'group'); o.setAttribute('aria-label', 'Answers');
btns = ask.opts.map((x) => {
var b = mk(o, 'button', 'cv-tool iq-opt'); b.type = 'button'; mk(b, 'b', null, x.key);
if (x.label && x.label !== x.key) txt(b, ' ' + x.label);
b.setAttribute('data-r', x.reply); b.title = 'Fill the reply with ' + x.reply; b.onclick = () => opt(x); return b;
});
if (!btns.length) c.removeChild(o);
mark();
}
function side(p) {
var s = mk(mk(p, 'aside', 'iq-side'), 'div', 'iq-when'), due, w, set, st, x;
mk(s, 'p', 'iq-k', 'Due'); due = mk(s, 'p', 'iq-due big'); w = mk(s, 'input', 'iq-in'); set = mk(s, 'button', 'cv-tool', 'Set deadline');
x = mk(s, 'button', 'cv-tool', 'Close #' + N); st = mk(s, 'p', 'meta');
st.setAttribute('role', 'status'); w.type = 'datetime-local'; w.setAttribute('aria-label', 'New deadline for #' + N); set.type = x.type = 'button';
function paint(qs) { var v = Q().due(N, ox(I), qs), late = !v || v < Date.now(); due.className = 'iq-due big' + (late ? ' late' : ''); due.textContent = v ? (v < Date.now() ? 'Past due: ' : '') + C.day(new Date(v).toISOString()) : 'No deadline: Urgent'; }
function shut() { w.hidden = set.hidden = x.hidden = I.state === 'closed'; }
Q().load(repo).then((qs) => {
if (I.state !== 'closed' && Q().badged(N, ox(I), qs, Date.now())) { Q().act(qs, N, ox(I), 'read', 0, Date.now()); Q().save(qs); if (window.IssueCount && window.IssueCount.read) window.IssueCount.read(1); }
paint(qs);
set.onclick = () => { var v = Date.parse(w.value); if (!v) { w.focus(); return; } Q().act(qs, N, ox(I), 'delay', v, Date.now()); Q().save(qs); paint(qs); st.textContent = 'Deadline set.'; };
});
shut();
x.onclick = () => {
if (!confirm('Close #' + N + ' on GitHub? Do this when it is settled. A follow-up from this page reopens it.')) return;
x.disabled = true; st.textContent = 'Closing...';
C.send('PATCH', RI + '/' + N, { state: 'closed', state_reason: 'completed' }).then((r) => { if (!r.ok) throw new Error(scope(r)); return r.json(); })
.then((i) => { I.state = (i && i.state) || 'closed'; metaLine(); shut(); x.disabled = false; st.textContent = 'Closed #' + N + '. A follow-up here reopens it.'; cp.draw(); },
(e) => { x.disabled = false; st.textContent = 'Not closed: ' + e.message + '.'; });
};
return shut;
}
var reside = null;
function show() {
var n = num(), k = ++draw;
N = n; I = null; files = []; doubt = null; btns = []; lastDay = ''; cnt = null; reside = null; root.textContent = ''; dock.hidden = true;
var pg = mk(root, 'div', 'iq-page'), hd = mk(pg, 'header', 'iq-hd'), back = mk(hd, 'a', 'iq-back', '← Issues');
back.href = root.getAttribute('data-list') || '../';
if (!n) { mk(hd, 'p', 'meta', 'No issue number in the address. Open an issue from the Issues list.'); return; }
var h = mk(hd, 'h1', 'iq-it', 'Issue #' + n), say = mk(hd, 'p', 'meta', 'Reading #' + n + '...');
meta = mk(hd, 'p', 'iq-meta');
Promise.all([C.allow().then((a) => { names = a.map((x) => String(x).toLowerCase()); }), C.getJ(RI + '/' + n)]).then((r) => C.thread(I = r[1]).then((cs) => {
if (k !== draw) return;
say.remove(); h.textContent = I.title + ' '; mk(h, 'span', 'iq-num', '#' + n); document.title = I.title + ' #' + n;
var ask = C.pickAsk(I, cs, inv, repo);
if (labels(I).indexOf('proposal') >= 0 && !ask.opts.length) ask.opts = PO;
card(hd, ask);
if (window.IssueQ && !I.pull_request) reside = side(pg);
var th = mk(pg, 'section', 'iq-th'), sh = mk(th, 'h2', 'iq-sh', 'Thread ');
cnt = mk(sh, 'small'); metaLine();
log = mk(th, 'div', 'cv-log'); log.setAttribute('aria-label', 'The issue and its replies');
if (I.comments > 100) mk(log, 'p', 'meta', 'Earlier replies are on GitHub; the latest 100 follow.');
[I].concat(cs).forEach((x) => { msg(x, x === ask.src); });
var dk = 'company.draft.' + n;
if (ask.answered && ask.lastInv && C.plain(ask.lastInv.body) === (LS.getItem(dk) || '').trim()) LS.removeItem(dk);
th.appendChild(dock); cp.draw(); drawFiles();
})).catch((e) => { if (k === draw) say.textContent = 'Could not read #' + n + ': ' + e.message + '.'; });
}
function upload(n, f) {
var safe = (f.name || 'file').replace(/[^A-Za-z0-9._-]+/g, '-').replace(/^[.-]+/, '').slice(-80) || 'file';
var path = 'research/inbound/' + n + '/' + new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + '-' + safe;
return new Promise((y, no) => { var r = new FileReader(); r.onload = () => y(String(r.result).split(',')[1] || ''); r.onerror = () => no(new Error('could not read ' + f.name)); r.readAsDataURL(f); })
.then((c) => C.send('PUT', '/repos/' + repo + '/contents/' + path.split('/').map(encodeURIComponent).join('/'), { message: 'Investor file for #' + n + ': ' + safe, content: c }))
.then((r) => {
if (r.status === 403 || r.status === 404) throw { nw: 1, message: 'no write' };
if (!r.ok) throw new Error(S.said(r) + ' saving ' + f.name);
return r.json().then((j) => { var u = j.content && j.content.html_url; return (/^image\//.test(f.type) ? '![' + safe + '](' + u + '?raw=true)' : '[' + safe + '](' + u + ')'); });
});
}
function go() { if (fly || S.rejected() || !I) return; if (doubt) doubt(); else if (ta.value.trim()) post(true); }
function post(withFiles) {
var n = N, i = I, re = i.state === 'closed', text = ta.value.trim(), sent = withFiles ? files.slice() : [], links = [], seen = i.comments, out = 0, body;
var name = (LS.getItem(S.NAME) || '').replace(/[^A-Za-z0-9 _.-]/g, '').trim().slice(0, 40);
fly = 1; cp.set(true); cp.state('', sent.length ? 'Saving files...' : 'Sending...');
function won(c) {
c = c || {}; fly = 0;
var v = ta.value.trim();
if (v === text) ta.value = ''; else if (text && v.indexOf(text + '\n') === 0) ta.value = v.slice(text.length).trim();
files = files.filter((f) => sent.indexOf(f) < 0); drawFiles(); cp.save(); cp.set(false); mark();
if (n !== N) return;
if (c.created_at) { c.body = c.body || body; msg(c, null, !c.user); i.comments++; if (re) { i.state = 'open'; if (reside) reside(); } metaLine(); }
cp.state('sent', (re ? 'Reopened #' + n + ' and sent ' : 'Sent ') + C.when(c.created_at || Date.now()) + (links.length ? ' with ' + links.length + ' file' + (links.length > 1 ? 's' : '') : '') + '. The company reads it within minutes.' + (ta.value.trim() || files.length ? ' What is still in the box has not been sent.' : ''));
}
function lost(e) {
fly = 0; cp.set(false);
if (e && e.shut) cp.state('failed', 'Not sent: #' + n + ' has closed. Your text is kept; reload the page to send it as a follow-up, which reopens it.');
else if (e && e.nw) cp.state('failed', 'Not sent. Your token cannot save files to the repository yet: it needs Contents: Read and write (what #61 asks for). Remove the files to send the text alone, or attach them on GitHub.');
else cp.state('failed', 'Not sent: ' + e.message + '. Your text is kept; tap Send to retry.');
}
function check(e) {
doubt = null; fly = 1; cp.set(true); cp.state('', 'Checking whether it reached #' + n + '...');
return new Promise((y) => setTimeout(y, 2000)).then(() => C.getJ(RI + '/' + n)).then(C.thread).then((cs) => {
var c = cs.slice(seen % 100).filter((x) => C.plain(x.body) === C.plain(body))[0];
if (c) won(c); else lost(e);
}, (x) => { doubt = () => check(e); fly = 0; cp.set(false); cp.state('failed', 'May have been sent: ' + e.message + ', and #' + n + ' could not be read to check (' + x.message + '). Your text is kept. Tap Send to check again; it posts nothing.'); });
}
return (re ? Promise.resolve() : C.getJ(RI + '/' + n).then((x) => { if (x.state === 'closed') throw { shut: 1 }; seen = x.comments; }))
.then(() => sent.reduce((p, f) => p.then(() => upload(n, f).then((l) => { links.push(l); })), Promise.resolve()))
.then(() => re && C.send('PATCH', RI + '/' + n, { state: 'open' }).then((r) => { if (!r.ok) throw new Error(S.said(r) + ' reopening #' + n); })).then(() => {
cp.state('', 'Sending...');
body = [text, links.length ? 'Files:\n' + links.map((l) => '- ' + l).join('\n') : ''].filter(Boolean).join('\n\n') + (name ? '\n\n<!-- as: ' + name + ' -->' : '');
out = 1;
return C.send('POST', RI + '/' + n + '/comments', { body: body }).then((r) => {
if (r.ok) return r.json();
out = r.status >= 500;
throw new Error(scope(r));
});
}).then(won, (e) => (out ? check(e) : lost(e)));
}
window.addEventListener('hashchange', show);
show();
})();
