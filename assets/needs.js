// Source with comments: tools/site/assets/needs.js in the company repository.
(() => {
'use strict';
var S = window.CompanySite, root = document.getElementById('needs-root'), C = S && S.core;
if (!C || !root || !S.getToken()) return;
var anon = document.getElementById('needs-anon'); if (anon) anon.hidden = true;
var chatTab = document.querySelector('nav.hometabs [data-chat-tab]'); if (chatTab) chatTab.hidden = false;
var repo = root.getAttribute('data-repo'), RI = C.use(repo), LS = localStorage, el = S.el;
var options = C.options, pickAsk = C.pickAsk, answered = C.answered, md = C.md, pic = C.pic, who = C.who, NOTE = C.NOTE, plain = C.plain, when = C.when, day = C.day,
getJ = C.getJ, send = C.send, allow = C.allow, thread = C.thread;
function nums(a) { return (root.getAttribute(a) || '').split(/\s+/).filter(Boolean).map(Number); }
var named = nums('data-named'), skip = nums('data-skip'), props = nums('data-props'), shut = document.getElementById('needs-closed'), cl = null, cn = 0, cnum = null;
var P = root.getAttribute('data-mode') === 'proposals', R = root.getAttribute('data-mode') === 'report', show = nums('data-show'), rest = nums('data-rest')[0] || 0;
var KEEP = P ? ['proposal'] : ['emergency', 'urgent', 'approval', 'pitch'], MAXF = 10 * 1048576, names = [];
var PO = ['Approve', 'Hold', 'No'].map((k) => ({ key: k, label: k, reply: k.toLowerCase() }));
function mk(p, tag, cls, text) { return p.appendChild(el(tag, cls, text)); }
function labels(i) { return (i.labels || []).map((x) => String(x.name || x).toLowerCase()); }
function inv(l) { return names.indexOf(l) >= 0; }
function off(i) { var q = labels(i).indexOf('proposal') >= 0; return skip.indexOf(i.number) >= 0 || labels(i).indexOf('main') >= 0 || labels(i).indexOf('site-state') >= 0 || (P ? !q : q && props.indexOf(i.number) < 0); }
function b64file(f) {
return new Promise((res, rej) => { var r = new FileReader(); r.onload = () => res(String(r.result).split(',')[1] || ''); r.onerror = () => rej(new Error('could not read ' + f.name)); r.readAsDataURL(f); });
}
function NoWrite() { this.message = 'no write'; }
var SHUT = { message: 'closed' }, W = ' ny-warn';
function scope(r) { return S.said(r) + (r.status === 403 || r.status === 404 ? ' (does your token have Issues: Read and write?)' : ''); }
function upload(n, f) {
var safe = (f.name || 'file').replace(/[^A-Za-z0-9._-]+/g, '-').replace(/^[.-]+/, '').slice(-80) || 'file';
var path = 'research/inbound/' + n + '/' + new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + '-' + safe;
return b64file(f).then((c) => send('PUT', '/repos/' + repo + '/contents/' + path.split('/').map(encodeURIComponent).join('/'), { message: 'Investor file for #' + n + ': ' + safe, content: c }))
.then((r) => {
if (r.status === 403 || r.status === 404) throw new NoWrite();
if (!r.ok) throw new Error(S.said(r) + ' saving ' + f.name);
return r.json().then((j) => { var u = j.content && j.content.html_url; return (/^image\//.test(f.type) ? '![' + safe + '](' + u + '?raw=true)' : '[' + safe + '](' + u + ')'); });
});
}
function box(li, n, i, ask, re, cs, onSent) {
var b = li.querySelector('.ny-box') || li.appendChild(el('div', 'ny-box')), files = [], dk = 'company.draft.' + n, head = '', btns = [], fly = 0, doubt = null;
var card = !re && li.classList && li.classList.contains('ic') ? li : null, picks = card ? card.querySelectorAll('.ic-opt[data-r]') : [];
var multi = !!card && card.getAttribute('data-multi') === '1';
if (picks.length) ask = Object.assign({}, ask, { opts: [] });
b.textContent = '';
if (cs && card) { var th = mk(b, 'details', 'ic-th'); th.open = !picks.length; mk(th, 'summary', null, 'The issue and its replies (' + (cs.length + 1) + ')'); talk(th, i, cs, ask); } else if (cs) talk(b, i, cs, ask);
if (ask.answered && ask.lastInv) mk(b, 'p', 'meta ny-done', 'You answered ' + when(ask.lastInv.created_at) + ': "' + plain(ask.lastInv.body).slice(0, 80) + '". The company closes the issue once it has read it.');
var cols = {}, grid = (ask.imgs || []).length ? mk(b, 'div', 'ny-imgs') : null;
(ask.imgs || []).forEach((im) => {
var c = cols[im.key], o = ask.opts.filter((y) => y.key === im.key)[0];
if (!c) { c = cols[im.key] = mk(grid, 'div', 'ny-col'); mk(c, 'p', 'ny-key', im.key ? im.key + (o && o.label ? ': ' + o.label : '') : 'Images'); }
pic(c, im);
});
var ta = el('textarea'), opts = mk(b, 'div', 'ny-opts'), form = mk(b, 'div', 'ny-form');
ask.opts.forEach((o) => {
var c = cols[o.key], btn = c ? mk(c, 'button', 'cv-tool', 'Choose ' + o.key) : mk(opts, 'button', 'cv-tool', o.key === o.label || !o.label ? o.key : o.key + ': ' + o.label); btn.type = 'button';
btn.setAttribute('aria-pressed', 'false'); btn.setAttribute('data-r', o.reply); btn.title = 'Fill the reply with ' + o.reply; btns.push(btn);
btn.onclick = () => {
var v = ta.value.trim().slice(head.length).trim();
ta.value = v ? o.reply + '\n\n' + v : o.reply;
ta.focus(); save(); mark(); sync();
};
});
if (!opts.firstChild) b.removeChild(opts);
Array.prototype.forEach.call(picks, (d) => {
var btn = d;
if (d.tagName !== 'BUTTON') { btn = el('button', d.className); while (d.firstChild) btn.appendChild(d.firstChild); btn.setAttribute('data-r', d.getAttribute('data-r')); d.parentNode.replaceChild(btn, d); }
btn.type = 'button'; btn.setAttribute('aria-pressed', 'false'); btns.push(btn);
btn.onclick = () => {
var v = ta.value.trim().slice(head.length).trim(), r = btn.getAttribute('data-r'), cur = head ? head.split(/\s+and\s+/) : [];
if (multi) { cur = cur.indexOf(r) >= 0 ? cur.filter((x) => x !== r) : cur.concat(r); cur = btns.map((x) => x.getAttribute('data-r')).filter((x) => cur.indexOf(x) >= 0); } else cur = [r];
var h = cur.join(' and ');
ta.value = h ? (v ? h + '\n\n' + v : h) : v;
save(); mark(); sync();
};
});
ta.placeholder = re ? 'A follow-up on #' + n + ' (sending reopens it)' : picks.length ? 'A note with your answer (optional)' : ask.opts.length ? 'Tap an option or write your answer to #' + n : 'Your answer to #' + n;
ta.setAttribute('aria-label', 'Your reply to #' + n); ta.value = LS.getItem(dk) || ''; form.appendChild(ta);
if (ask.answered && plain(ask.lastInv.body) === ta.value.trim()) { ta.value = ''; save(); }
mark();
var list = mk(form, 'ul', 'ny-files'), bar = mk(form, 'div', 'ny-bar'), pick = el('input'), add = mk(bar, 'button', 'cv-tool', 'Add files');
pick.type = 'file'; pick.multiple = true; pick.hidden = true; bar.appendChild(pick); add.type = 'button';
add.onclick = () => pick.click();
var cgo = card && card.querySelector('.ic-go'), go = cgo ? el('button', 'btn primary ic-go ny-send', 'Answer') : mk(bar, 'button', 'cv-tool ny-send', re ? 'Send and reopen' : 'Send');
if (cgo) cgo.parentNode.replaceChild(go, cgo);
var st = mk(form, 'p', 'meta', ''), extra = mk(form, 'div', 'ny-bar');
go.type = 'button'; st.setAttribute('role', 'status'); extra.hidden = true;
function save() { if (ta.value.trim()) LS.setItem(dk, ta.value); else LS.removeItem(dk); }
function sync() { go.disabled = fly || !(doubt || ta.value.trim() || files.length) || S.rejected(); }
function mark() {
var top = ta.value.trim().split('\n')[0].trim(), parts = top.split(/\s+and\s+/), on = /^[A-Fa-f]$/.test(top);
btns.forEach((x) => { var y = parts.indexOf(x.getAttribute('data-r')) >= 0; x.setAttribute('aria-pressed', y); on = on || y; });
if (on && parts.length > 1) on = parts.every((p) => btns.some((x) => x.getAttribute('data-r') === p));
head = on ? top : '';
}
function say(c, t) { st.className = 'meta' + c; st.textContent = t; }
function drawFiles() {
list.textContent = '';
files.forEach((f, k) => {
var it = mk(list, 'li', null, f.name + ' (' + Math.ceil(f.size / 1024) + ' KB) '), x = mk(it, 'button', 'cv-tool', 'Remove'); x.type = 'button';
x.setAttribute('aria-label', 'Remove ' + f.name); x.onclick = () => { files.splice(k, 1); drawFiles(); };
});
sync();
}
function take(fl) {
Array.prototype.forEach.call(fl || [], (f) => {
if (f.size > MAXF) { say(W, f.name + ' is over 10 MB; attach it on GitHub instead.'); return; }
if (files.length < 5) files.push(f);
});
drawFiles();
}
pick.onchange = () => { take(pick.files); pick.value = ''; };
ta.addEventListener('paste', (ev) => { var fl = ev.clipboardData && ev.clipboardData.files; if (fl && fl.length) { take(fl); if (!ev.clipboardData.getData('text')) ev.preventDefault(); } });
ta.addEventListener('input', () => { save(); mark(); sync(); });
function post(withFiles) {
var text = ta.value.trim(), sent = withFiles ? files.slice() : [], name = (LS.getItem(S.NAME) || '').replace(/[^A-Za-z0-9 _.-]/g, '').trim().slice(0, 40), links = [], seen = i.comments, out = 0, body;
fly = 1; sync(); extra.hidden = true; extra.textContent = ''; say('', withFiles && files.length ? 'Saving files...' : 'Sending...');
function won(c) {
c = c || {}; fly = 0;
var v = ta.value.trim();
if (v === text) ta.value = ''; else if (text && v.indexOf(text + '\n') === 0) ta.value = v.slice(text.length).trim();
files = files.filter((f) => sent.indexOf(f) < 0); drawFiles(); save(); mark();
say(' ny-done', (re ? 'Reopened #' + n + ' and sent ' : 'Sent ') + when(c.created_at || Date.now()) + (links.length ? ' with ' + links.length + ' file' + (links.length > 1 ? 's' : '') : '') + '. The company reads it within minutes and closes the issue once it is settled.' + (ta.value.trim() || files.length ? ' What is still in the box has not been sent.' : ''));
if (re && c.created_at) re(c);
if (onSent) onSent();
}
function lost(e) {
fly = 0; sync();
if (e === SHUT) say(W, 'Not sent: #' + n + ' has closed. Your text is kept; to add to it, reopen it from Closed issues on the Issues page.');
else if (e instanceof NoWrite) {
say(W, 'Not sent. Your token cannot save files to the repository yet: it needs Contents: Read and write (what #61 asks for). Your text and files are kept here.');
extra.hidden = false;
if (text) { var t = mk(extra, 'button', 'cv-tool', 'Send the text without the files'); t.type = 'button'; t.onclick = () => post(false); }
var g = mk(extra, 'a', null, 'Attach them on GitHub instead'); g.href = 'https://github.com/' + repo + '/issues/' + n; g.target = '_blank'; g.rel = 'noopener';
} else say(W, 'Not sent: ' + e.message + '. Your text is kept; tap Send to retry.');
}
function check(e) {
doubt = null; fly = 1; sync(); say('', 'Checking whether it reached #' + n + '...');
return new Promise((y) => setTimeout(y, 2000)).then(() => getJ(RI + '/' + n)).then(thread).then((cs) => {
var c = cs.slice(seen % 100).filter((x) => plain(x.body) === plain(body))[0];
if (c) won(c); else lost(e);
}, (x) => { doubt = () => check(e); fly = 0; sync(); say(W, 'May have been sent: ' + e.message + ', and #' + n + ' could not be read to check (' + x.message + '). Your text is kept. Tap Send to check again; it posts nothing.'); });
}
return (re ? Promise.resolve() : getJ(RI + '/' + n).then((x) => { if (x.state === 'closed') throw SHUT; seen = x.comments; })).then(() => (withFiles ? sent : []).reduce((p, f) => p.then(() => upload(n, f).then((l) => { links.push(l); })), Promise.resolve()))
.then(() => re && send('PATCH', RI + '/' + n, { state: 'open' }).then((r) => { if (!r.ok) throw new Error(S.said(r) + ' reopening #' + n); })).then(() => {
say('', 'Sending...');
body = [text, links.length ? 'Files:\n' + links.map((l) => '- ' + l).join('\n') : ''].filter(Boolean).join('\n\n') + (name ? '\n\n<!-- as: ' + name + ' -->' : '');
out = 1;
return send('POST', RI + '/' + n + '/comments', { body: body }).then((r) => {
if (r.ok) return r.json();
out = r.status >= 500;
throw new Error(scope(r));
});
}).then(won, (e) => (out ? check(e) : lost(e)));
}
go.onclick = () => (doubt || post)(true);
sync();
}
function closer(li, ns) {
var w = mk(li.querySelector('.ny-box'), 'div', 'ny-bar ny-shut'), t = ns.map((n) => '#' + n).join(' and '), c = mk(w, 'button', 'cv-tool', 'Close ' + t), st = mk(w, 'span', 'meta', '');
c.type = 'button'; st.setAttribute('role', 'status');
c.onclick = () => {
if (!confirm('Close ' + t + ' on GitHub? Do this when it is settled. A follow-up from Closed issues reopens it.')) return;
c.disabled = true; st.className = 'meta'; st.textContent = 'Closing...';
ns.reduce((p, n) => p.then(() => send('PATCH', RI + '/' + n, { state: 'closed', state_reason: 'completed' }).then((r) => {
if (!r.ok) throw new Error(scope(r));
return r.json();
}).then((x) => { if (cl) cRow(x, 1); })), Promise.resolve()).then(() => {
li.hidden = true; fold(); tally(); live.textContent = 'Closed ' + t + '. It is under Closed issues below.';
}, (e) => { c.disabled = false; st.className = 'meta ny-warn'; st.textContent = 'Not closed: ' + e.message + '.'; });
};
}
function tell(p, x, ask) {
var l = who(x), a = /<!-- ?as: ?([^>]{1,40}?) ?-->/.exec(x.body || ''), m = mk(p, 'div', 'ny-msg' + (inv(l) ? ' ny-inv' : '') + (ask ? ' ny-ask' : '')),
h = mk(m, 'p', 'meta', (inv(l) ? (a ? a[1] : l) : 'Company') + ' \u00b7 ' + day(x.created_at));
if (ask) { h.appendChild(document.createTextNode(' ')); mk(h, 'span', 'tag ny-tag-q', 'Your reply answers this'); }
var t = String(x.body || '').replace(NOTE, '').replace(/[\w.+-]{1,64}@[\w-]+(?:\.[\w-]+)+/g, '[email]').trim();
md(mk(m, 'div', 'md'), t || '(no text)', !(ask && ask.imgs && ask.imgs.length));
return m;
}
function talk(p, i, cs, ask) {
var t = mk(p, 'div', 'ny-msgs'), all = [i].concat(cs), k0 = ask && ask.src ? all.indexOf(ask.src) : -1, hid = [], more = null;
if (i.comments > 100) mk(t, 'p', 'meta', 'Earlier replies are on GitHub; the latest 100 follow.');
all.forEach((x, k) => {
var m = tell(t, x, k === k0 ? ask : null);
if (all.length > 5 && k > 0 && k < all.length - 3 && k !== k0) { m.hidden = true; hid.push(m); }
if (k === 0 && all.length > 5) more = mk(t, 'button', 'cv-tool ny-more-msgs');
});
if (more) {
if (!hid.length) more.remove(); else {
more.type = 'button'; more.textContent = 'Show ' + hid.length + ' earlier repl' + (hid.length === 1 ? 'y' : 'ies');
more.onclick = () => { hid.forEach((m) => { m.hidden = false; }); more.remove(); };
}
}
return t;
}
function cRow(i, top) {
var li = el('li', 'ny ny-cl'), d = mk(li, 'details', 'ny-th'), s = mk(d, 'summary'), k = KEEP.concat('chat').filter((x) => labels(i).indexOf(x) >= 0)[0];
if (k) { mk(s, 'span', 'tag ' + k, k.charAt(0).toUpperCase() + k.slice(1)); s.appendChild(document.createTextNode(' ')); }
mk(s, 'span', 'ref', '#' + i.number); var on = mk(s, 'span', 'meta', ' closed ' + day(i.closed_at)); mk(s, 'span', 'ny-t', i.title);
var t = mk(d, 'div', 'ny-msgs');
d.addEventListener('toggle', () => {
if (!d.open || d.got) return; d.got = 1; t.textContent = 'Reading #' + i.number + '...';
thread(i).then((cs) => {
t.textContent = ''; var th = talk(t, i, cs, null);
box(d, i.number, i, { opts: [] }, (c) => { tell(th, c); on.textContent = ' reopened ' + day(c.created_at); });
}, (e) => { d.got = 0; t.textContent = 'Could not read #' + i.number + ': ' + e.message + '.'; });
});
if (top) cl.insertBefore(li, cl.firstChild); else cl.appendChild(li);
cnum.textContent = String(++cn);
}
var ROWS = [], ansU = null, ansN = null;
function place(x, ans, quiet) {
x.ans = ans;
if (ans && !R) {
if (!ansU) {
var sec = el('section', 'ny-ans-sec'), h = mk(sec, 'h2', null, 'Answered, waiting on the company ');
h.id = 'ny-ans-h'; sec.setAttribute('aria-labelledby', h.id); ansN = mk(h, 'span', 'num ny-count', '0');
mk(sec, 'p', 'meta', 'You have replied to these. The company reads your reply and closes the issue; they do not count in the Issues badge. You can still add to one or close it.');
ansU = mk(sec, 'ul', 'list needs'); ansU.setAttribute('data-group', 'answered');
(shut ? shut.parentNode : root).insertBefore(sec, shut);
}
var hd = x[0].querySelector('.ic-head') || x[0];
if (!x[0].querySelector('.ny-tag-ans')) { hd.insertBefore(document.createTextNode(' '), hd.firstChild); hd.insertBefore(el('span', 'tag ny-tag-ans', '\u2713 Answered'), hd.firstChild); }
x[0].classList.add('ny-ans'); ansU.appendChild(x[0]);
Array.prototype.forEach.call(ansU.parentNode.children, (e) => { e.hidden = false; });
fold();
}
if (!quiet) tally();
}
var QST = null, QS = null, OPEN = {};
function ox(x) { var i = OPEN[x[1]]; return { l: labels(i), dl: window.IssueQ.dl(i.body) }; }
function dueText(v) { return v ? 'Due ' + day(new Date(v).toISOString()) : 'No deadline: Urgent'; }
function qsec(k) {
var sec = el('section', 'ny-q-sec'), h = mk(sec, 'h2', null, k === 'N' ? 'Needs you ' : 'Later ');
h.id = 'ny-q-' + k; sec.setAttribute('aria-labelledby', h.id);
QS[k] = { sec: sec, n: mk(h, 'span', 'num ny-count', '0'), none: mk(sec, 'p', 'meta', k === 'N' ? 'Nothing needs you right now.' : 'Nothing is waiting for later.') };
mk(sec, 'p', 'meta', k === 'N' ? 'A deadline within 24 hours, or none. Mark Read takes the badge off and leaves the issue here.' : 'A deadline more than 24 hours away. It moves to Needs you by itself when the deadline is within 24 hours. Mark Read takes the badge off, and it stays off in Later.');
QS[k].ul = mk(sec, 'ul', 'list needs'); QS[k].ul.setAttribute('data-queue', k);
return sec;
}
function ctl(x) {
var Q = window.IssueQ, n = x[1], b = x[0].querySelector('.ny-shut') || mk(x[0].querySelector('.ny-box') || x[0], 'div', 'ny-bar ny-shut'), w = mk(b, 'input'), g;
b.classList.add('ny-dl');
x.info = mk(b, 'span', 'meta ny-due');
w.type = 'datetime-local'; w.setAttribute('aria-label', 'New deadline for #' + n);
function btn(t, f) { var c = mk(b, 'button', 'cv-tool ny-act-b', t); c.type = 'button'; c.onclick = f; return c; }
function go(kind, v) { Q.act(QST, n, ox(x), kind, v, Date.now()); Q.save(QST); paint(); tally(); }
x.dlb = btn('Set Deadline', () => { var v = Date.parse(w.value); if (v) go('delay', v); else w.focus(); });
x.rd = btn('Mark Read', () => go(Q.badged(n, ox(x), QST, Date.now()) ? 'read' : 'unread'));
g = b.querySelector('button'); b.insertBefore(x.info, b.firstChild); b.insertBefore(w, g);
Array.prototype.forEach.call(b.querySelectorAll(':scope > .meta:not(.ny-due)'), (e) => b.appendChild(e));
}
function paint() {
var Q = window.IssueQ;
if (R || P || !QST || !Q) return;
var now = Date.now(), vis = ROWS.filter((x) => !x[0].hidden && !x.ans && OPEN[x[1]]), by = { N: [], L: [] };
if (!QS) {
QS = {}; var box = el('div', 'ny-queues'), a = document.querySelector('ul[data-group="open"]') || root.firstChild;
box.appendChild(qsec('N')); box.appendChild(qsec('L'));
if (a && a.parentNode) a.parentNode.insertBefore(box, a); else root.appendChild(box);
}
vis.forEach((x) => { x.q = Q.queue(x[1], ox(x), QST, now); by[x.q].push(x); if (!x.info) ctl(x); });
['N', 'L'].forEach((k) => {
by[k].sort((a, b) => Q.due(a[1], ox(a), QST) - Q.due(b[1], ox(b), QST)).forEach((x) => {
var src = x[0].parentNode; QS[k].ul.appendChild(x[0]);
if (src && !src.hasAttribute('data-queue') && !src.children.length) { src.removeAttribute('data-group'); src.hidden = true; }
});
QS[k].n.textContent = String(by[k].length); QS[k].none.hidden = by[k].length > 0;
});
vis.forEach((x) => {
var o = ox(x), bd = Q.badged(x[1], o, QST, now), hd = x[0].querySelector('.ic-head') || x[0], nb = x[0].querySelector('.ny-nb');
x.info.textContent = dueText(Q.due(x[1], o, QST)) + (QST.d[x[1]] !== undefined ? ' (set here)' : '');
x.rd.textContent = bd ? 'Mark Read' : 'Mark Unread'; x.rd.setAttribute('aria-pressed', bd ? 'false' : 'true');
if (bd && !nb) { hd.appendChild(document.createTextNode(' ')); hd.appendChild(el('span', 'nb ny-nb', 'New')); }
if (!bd && nb) nb.remove();
});
}
function ready() {
if (R || P || !window.IssueQ) return;
window.IssueQ.load(repo).then((s0) => {
QST = s0;
function round() {
var qs = {}; ROWS.forEach((x) => { if (!x[0].hidden && OPEN[x[1]]) qs[x[1]] = ox(x); });
window.IssueQ.sync(QST, qs, Date.now(), false); paint(); tally();
}
round(); setInterval(round, 6e4);
});
}
function tally() {
var n = rest, a = 0, lt = 0, red = 0;
var now = Date.now(), Q = window.IssueQ;
ROWS.forEach((x) => { if (!x[0].hidden) { if (x.ans) a++; else if (!QST || Q.badged(x[1], ox(x), QST, now)) { n++; if (QST && Q.queue(x[1], ox(x), QST, now) === 'L') lt++; if (Q.tier(x[1], ox(x), QST, now) === 'r') red++; } } });
if (ansN) ansN.textContent = String(a);
if (!R && !P && window.IssueCount) window.IssueCount.put(n, a, lt, red);
}
function fold() {
Array.prototype.forEach.call(document.querySelectorAll('ul[data-group]'), (ul) => {
if (Array.prototype.every.call(ul.children, (li) => li.hidden)) for (var e = ul; e && (e === ul || e.tagName !== 'UL'); e = e.previousElementSibling) { e.hidden = true; if (e.tagName === 'H2') break; }
});
}
if (R) { var css = mk(document.head, 'link'); css.rel = 'stylesheet'; css.href = root.getAttribute('data-css'); }
var live = mk(root, 'p', 'meta ny-done ny-live'); live.setAttribute('role', 'status');
function closedNote(k) { if (k) mk(root, 'p', 'meta', k + ' request' + (k === 1 ? '' : 's') + ' answered and closed since this page was built ' + (k === 1 ? 'is' : 'are') + ' hidden.'); }
var al = allow().then((a) => { names = a.map((x) => String(x).toLowerCase()); });
Promise.all([al, getJ(RI + '?state=open&per_page=100')]).then((res) => {
var open = {}, rows = [], shown = {}, hidden = 0;
res[1].filter((i) => !i.pull_request && !off(i)).forEach((i) => { open[i.number] = i; });
Array.prototype.forEach.call(document.querySelectorAll('li[data-nums]'), (li) => {
var ns = li.getAttribute('data-nums').split(' ').map(Number).filter((n) => open[n]);
li.getAttribute('data-nums').split(' ').forEach((n) => { shown[n] = 1; });
if (!ns.length) { li.hidden = true; hidden++; return; }
rows.push([li, ns[0], ns]);
});
var fresh = Object.keys(open).map((k) => open[k]).filter((i) => R && show.indexOf(i.number) >= 0 || !shown[i.number] && named.indexOf(i.number) < 0 && labels(i).indexOf('unrelated') < 0 && labels(i).some((l) => KEEP.indexOf(l) >= 0));
if (fresh.length) {
if (!R) mk(root, 'h2', null, 'Opened since this page was built');
var ul = mk(root, 'ul', 'list needs');
fresh.forEach((i) => {
var li = mk(ul, 'li', 'ny ny-new'), k = KEEP.filter((l) => labels(i).indexOf(l) >= 0)[0];
if (k) { mk(li, 'span', 'tag ' + k, k.charAt(0).toUpperCase() + k.slice(1)); li.appendChild(document.createTextNode(' ')); }
mk(li, 'span', 'ref', '#' + i.number); mk(li, 'span', 'ny-q', i.title);
rows.push([li, i.number, [i.number]]);
});
}
closedNote(hidden); fold();
if (R) {
var n = rows.length + rest; document.getElementById('needs-count').textContent = n + ' request' + (n === 1 ? ' is' : 's are') + ' open.';
if (rest) { var more = mk(mk(root, 'p', 'meta'), 'a', null, rest + ' more on Issues'); more.href = root.getAttribute('data-requests'); }
}
ROWS = rows; OPEN = open;
var wait = rows.length, done = () => { if (!--wait) { tally(); ready(); } };
if (!wait) { tally(); ready(); }
rows.forEach((x) => {
var i = open[x[1]], b = x[0].querySelector('.ny-box') || x[0].appendChild(el('div', 'ny-box'));
b.textContent = 'Reading the question...';
thread(i).then((cs) => {
var a = pickAsk(i, cs, inv, repo); if ((P || labels(i).indexOf('proposal') >= 0) && !(a.opts || []).length) a.opts = PO;
box(x[0], x[1], i, a, null, cs, () => place(x, true)); if (!R) closer(x[0], x[2]);
place(x, answered(i, cs[cs.length - 1] || null, inv), true); done();
}, (e) => { b.textContent = 'Could not read #' + x[1] + ': ' + e.message + '.'; done(); });
});
}, (e) => { mk(root, 'p', 'meta ny-warn', 'Could not read the open requests: ' + e.message + '.' + (R ? '' : ' The list below is as built.')); });
if (shut) al.then(() => getJ(RI + '?state=closed&per_page=100&sort=updated')).then((l) => {
l = l.filter((i) => !i.pull_request && !off(i));
var d = mk(shut, 'details', 'ny-closed'), h = mk(mk(d, 'summary'), 'h2', null, 'Closed issues ');
cnum = mk(h, 'span', 'num ny-count', '0');
mk(d, 'p', 'meta', 'Open one to read it and its replies. Send a follow-up from it to reopen it.' + (l.length > 99 ? ' Older ones are on GitHub.' : ''));
cl = mk(d, 'ul', 'list needs'); l.forEach((i) => cRow(i));
}, (e) => { mk(shut, 'p', 'meta ny-warn', 'Could not read the closed issues: ' + e.message + '.'); });
})();
