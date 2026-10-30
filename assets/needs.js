// Source with comments: tools/site/assets/needs.js in the company repository.
(() => {
'use strict';
var B = '(?:\\*\\*|__)', BS = '(?:' + B + '[ \\t]*)?';
var LINE = new RegExp('^[ \\t]*(?:[-*+][ \\t]+)?' + BS + '\\(?([A-Fa-f])(?:[ \\t]+\\(([^)\\n]{1,30})\\))?' + B + '?[ \\t]*[.):\\u2014-]+[ \\t]*' + BS + '(\\S.*)$', 'gm');
var DEF = /(?:^|[\s(])([A-Fa-f])[ \t]*=[ \t]*([^.\n]+)/g;
var BOLD = /(?:\*\*|__)([A-Fa-f])(?:\*\*|__)([^*\n]*)/g;
var SAYS = /\b(?:reply|replies|answer|say)\b/i;
var PAIR = /\b(?:[Rr]eply|[Aa]nswer|[Ss]ay)\s+(?:with\s+)?["\u201c*]*([A-Z][a-z]{0,11})["\u201d*]*\s+or\s+["\u201c*]*([A-Z][a-z]{0,11})\b/;
var NOTE = /<!--[\s\S]*?(?:-->|$)/g;
function prep(s) { return String(s || '').slice(0, 20000).replace(NOTE, '').replace(/\r/g, '').replace(/```[\s\S]*?```/g, ''); }
function clean(s) { return String(s || '').replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/\*\*|__|`/g, '').replace(/\s+/g, ' ').trim(); }
function short(s) {
s = clean(String(s).slice(0, 400));
if (s.charAt(0) === '(') { var e = s.indexOf(')'); if (e > 0) s = s.slice(1, e); }
s = s.replace(/^[\s:.,;)\u2014-]+/, '').replace(/[\s,;]+(?:(?:or|and)[\s,;]*)?$/i, '');
return s.length > 90 ? s.slice(0, 87).replace(/\s+\S*$/, '') + '...' : s;
}
function sentence(s) { var m = /^[\s\S]*?[.!?](?=\s|$)/.exec(s); return m ? m[0] : s; }
function options(text) {
var t = prep(text), out = [], seen = {}, m;
function add(k, label, reply) { var K = String(k).toUpperCase(), key = K.length === 1 ? K : String(k); if (seen[K]) return; seen[K] = 1; out.push({ key: key, label: short(label), reply: reply || key }); }
function done() { if (out.length >= 2 && seen.A) return out; out = []; seen = {}; return null; }
function letters(re, lab) { re.lastIndex = 0; while ((m = re.exec(t))) add(m[1], lab(m)); return done(); }
var r = letters(LINE, (x) => x[3] + (x[2] ? ' (' + x[2] + ')' : '')) ||
letters(DEF, (x) => x[2]) ||
letters(BOLD, (x) => sentence(x[2]));
if (r) return r;
t.split('\n').forEach((ln) => {
if (out.length || !SAYS.test(ln)) return;
var q = [], re = /\*\*([^*\n]{1,40}?)\*\*|["\u201c]([^"\u201d\n]{2,60})["\u201d]/g;
while ((m = re.exec(ln))) { var w = (m[1] || m[2] || '').trim(); if (w && !/[:.]$/.test(w) && w.split(/\s+/).length <= 6) q.push(w); }
if (q.length >= 2) q.forEach((w) => add(w, w, w));
});
if (out.length) return out;
m = PAIR.exec(t);
if (m && m[1] !== m[2]) { add(m[1], m[1], m[1]); add(m[2], m[2], m[2]); }
return out;
}
function isReceipt(b) { return /\(automatic receipt\)\s*$/.test(b || ''); }
function who(c) { return String((c && c.user && c.user.login) || '').toLowerCase(); }
function pickAsk(issue, cs, inv, repo) {
var co = [], last = -1;
cs.forEach((c, i) => { if (inv(who(c))) last = i; else if (!isReceipt(c.body)) co.push({ c: c, i: i }); });
var after = co.filter((x) => x.i > last), pool = after.length ? after : co, hit = null;
for (var k = pool.length - 1; k >= 0 && !hit; k--) if (options(pool[k].c.body).length) hit = pool[k];
if (!hit && after.length) hit = after[after.length - 1];
var src = hit ? hit.c : issue, opts = options(src && src.body);
return { body: (src && src.body) || '', imgs: images(src && src.body, repo), at: (src && src.created_at) || '', opts: opts, answered: !!hit && last > hit.i, lastInv: last >= 0 ? cs[last] : null };
}
var START = /^[ \t]*(?:#{1,4}[ \t]+(?:\*\*|__)?(?:Option[ \t]+)?\(?([A-Fa-f])\)?(?:\*\*|__)?[ \t]*(?:$|[.:,\u2014-])|(?:[-*+][ \t]+)?(?:(?:\*\*|__)[ \t]*)?\(?([A-Fa-f])(?:[ \t]+\([^)\n]{1,30}\))?(?:\*\*|__)?[ \t]*[.):,\u2014-])/;
var IMG = /!\[([^\]]{0,400})\]\(\s*<?([^)\s>]{1,400})>?(?:\s[^)]{0,400})?\)|<img\b([^>]{0,800})>/gi;
function where(u, repo) {
u = String(u || '').replace(/[?#].*$/, '');
var m = /^[a-z]+:\/\/(?:(?:www\.)?github\.com\/([^/]+\/[^/]+)\/(?:blob|raw)|raw\.githubusercontent\.com\/([^/]+\/[^/]+))\/([^/]+)\/(.+)$/i.exec(u), r = { ref: '', path: u };
if (m) { if ((m[1] || m[2]).toLowerCase() !== String(repo).toLowerCase()) return null; r = { ref: m[3], path: m[4] }; } else if (/^[a-z][\w+.-]*:|^\/\//i.test(u)) return null;
try { r.path = decodeURIComponent(r.path).replace(/^\.?\//, ''); } catch (e) { return null; }
return /(^|\/)\.\.(\/|$)/.test(r.path) || !/\.(png|jpe?g|gif|webp|svg)$/i.test(r.path) ? null : r;
}
function images(text, repo) {
var out = [], key = '';
prep(text).split('\n').forEach((ln) => {
var s = START.exec(ln), m; if (s) key = (s[1] || s[2]).toUpperCase();
IMG.lastIndex = 0;
while ((m = IMG.exec(ln))) {
var at = m[3] || '', src = m[2] || (/\bsrc=["']([^"']+)/i.exec(at) || [])[1], w = where(src, repo);
if (w) out.push({ key: key, alt: clean(m[2] ? m[1] : (/\balt=["']([^"']*)/i.exec(at) || [])[1]), path: w.path, ref: w.ref });
}
});
return out;
}
window.CompanyNeeds = { options: options, pickAsk: pickAsk, images: images };
var S = window.CompanySite, root = document.getElementById('needs-root');
if (!S || !root || !S.getToken()) return;
var anon = document.getElementById('needs-anon'); if (anon) anon.hidden = true;
var chatTab = document.querySelector('nav.hometabs [data-chat-tab]'); if (chatTab) chatTab.hidden = false;
var repo = root.getAttribute('data-repo'), RI = '/repos/' + repo + '/issues', LS = localStorage, el = S.el;
function nums(a) { return (root.getAttribute(a) || '').split(/\s+/).filter(Boolean).map(Number); }
var named = nums('data-named'), skip = nums('data-skip'), props = nums('data-props'), shut = document.getElementById('needs-closed'), cl = null, cn = 0, cnum = null;
var P = root.getAttribute('data-mode') === 'proposals', R = root.getAttribute('data-mode') === 'report', show = nums('data-show'), rest = nums('data-rest')[0] || 0;
var KEEP = P ? ['proposal'] : ['emergency', 'urgent', 'report', 'pitch'], MAXF = 10 * 1048576, names = [];
var PO = ['Approve', 'Hold', 'No'].map((k) => ({ key: k, label: k, reply: k.toLowerCase() }));
function mk(p, tag, cls, text) { return p.appendChild(el(tag, cls, text)); }
function labels(i) { return (i.labels || []).map((x) => String(x.name || x).toLowerCase()); }
function inv(l) { return names.indexOf(l) >= 0; }
function off(i) { var q = labels(i).indexOf('proposal') >= 0; return skip.indexOf(i.number) >= 0 || labels(i).indexOf('main') >= 0 || labels(i).indexOf('site-state') >= 0 || (P ? !q : q && props.indexOf(i.number) < 0); }
function getJ(p) { return S.gh(p).then((r) => { if (!r.ok) throw new Error(S.said(r)); return r.json(); }); }
function send(method, p, body) {
var h = S.hdrs(); h['Content-Type'] = 'application/json';
return fetch(S.API + p, { method: method, headers: h, body: JSON.stringify(body) }).then(S.checkAuth);
}
function allow() {
try { var a = JSON.parse(S.tokenStore().getItem(S.ALLOW) || 'null'); if (a && Array.isArray(a.names)) return Promise.resolve(a.names); } catch (e) { /* read it */ }
return getJ('/repos/' + repo + '/contents/investors/allowlist.md').then((f) => S.parseAllow(atob(f.content.replace(/\n/g, ''))), () => []);
}
function thread(i) {
var p = RI + '/' + i.number + '/comments?per_page=100';
if (i.comments > 100) p += '&page=' + Math.ceil(i.comments / 100);
return getJ(p);
}
function plain(b) { return String(b || '').replace(NOTE, '').replace(/<img[^>]{0,800}>/gi, '[image]').replace(/!\[([^\]]{0,400})\]\([^)]{0,800}\)/g, '[image: $1]').replace(/\r/g, '').trim(); }
function when(iso) { return iso ? new Date(iso).toLocaleString([], { weekday: 'short', hour: 'numeric', minute: '2-digit' }) : ''; }
function day(iso) { return iso ? new Date(iso).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : ''; }
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
function pic(p, im) {
var a = mk(p, 'a', 'ny-pic', 'Loading ' + im.path + '...'), h = S.hdrs(), x = im.path.split('.').pop().toLowerCase();
h.Accept = 'application/vnd.github.raw'; if (im.alt) mk(p, 'span', 'meta', im.alt);
fetch(S.API + '/repos/' + repo + '/contents/' + im.path.split('/').map(encodeURIComponent).join('/') + (im.ref ? '?ref=' + encodeURIComponent(im.ref) : ''), { headers: h })
.then(S.checkAuth).then((r) => { if (!r.ok) throw new Error(r.status === 404 ? 'not on GitHub yet' : S.said(r)); return r.blob(); })
.then((bl) => {
var u = URL.createObjectURL(new Blob([bl], { type: 'image/' + ({ jpg: 'jpeg', svg: 'svg+xml' }[x] || x) })), img = el('img');
img.src = u; img.alt = im.alt || im.path; a.textContent = ''; a.appendChild(img);
if (x !== 'svg') { a.href = u; a.target = '_blank'; a.title = 'Open full size'; }
}, (e) => { a.className = 'meta ny-warn'; a.textContent = (im.alt || im.path) + ': ' + e.message + '.'; });
}
function box(li, n, i, ask, re) {
var b = li.querySelector('.ny-box') || li.appendChild(el('div', 'ny-box')), files = [], dk = 'company.draft.' + n, head = '', btns = [], fly = 0, doubt = null;
b.textContent = '';
if (ask.body) {
var a = mk(b, 'details', 'ny-ask'), s = mk(a, 'summary', null, 'The company asks' + (ask.at ? ' (' + when(ask.at) + ')' : ''));
s.title = 'The question this reply answers'; mk(a, 'pre', null, plain(ask.body));
if (!ask.opts.length) a.open = true;
}
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
ta.placeholder = re ? 'A follow-up on #' + n + ' (sending reopens it)' : ask.opts.length ? 'Tap an option or write your answer to #' + n : 'Your answer to #' + n;
ta.setAttribute('aria-label', 'Your reply to #' + n); ta.value = LS.getItem(dk) || ''; form.appendChild(ta);
if (ask.answered && plain(ask.lastInv.body) === ta.value.trim()) { ta.value = ''; save(); }
mark();
var list = mk(form, 'ul', 'ny-files'), bar = mk(form, 'div', 'ny-bar'), pick = el('input'), add = mk(bar, 'button', 'cv-tool', 'Add files');
pick.type = 'file'; pick.multiple = true; pick.hidden = true; bar.appendChild(pick); add.type = 'button';
add.onclick = () => pick.click();
var go = mk(bar, 'button', 'cv-tool ny-send', re ? 'Send and reopen' : 'Send'), st = mk(form, 'p', 'meta', ''), extra = mk(form, 'div', 'ny-bar');
go.type = 'button'; st.setAttribute('role', 'status'); extra.hidden = true;
function save() { if (ta.value.trim()) LS.setItem(dk, ta.value); else LS.removeItem(dk); }
function sync() { go.disabled = fly || !(doubt || ta.value.trim() || files.length) || S.rejected(); }
function mark() {
var top = ta.value.trim().split('\n')[0].trim(), on = /^[A-Fa-f]$/.test(top);
btns.forEach((x) => { var y = x.getAttribute('data-r') === top; x.setAttribute('aria-pressed', y); on = on || y; });
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
li.hidden = true; fold(); live.textContent = 'Closed ' + t + '. It is under Closed issues below.';
}, (e) => { c.disabled = false; st.className = 'meta ny-warn'; st.textContent = 'Not closed: ' + e.message + '.'; });
};
}
function tell(p, x) {
var l = who(x), a = /<!-- ?as: ?([^>]{1,40}?) ?-->/.exec(x.body || ''), m = mk(p, 'div', 'ny-msg' + (inv(l) ? ' ny-inv' : ''));
mk(m, 'p', 'meta', (inv(l) ? (a ? a[1] : l) : 'Company') + ' \u00b7 ' + day(x.created_at));
mk(m, 'pre', null, plain(x.body).replace(/[\w.+-]{1,64}@[\w-]+(?:\.[\w-]+)+/g, '[email]') || '(no text)');
}
function cRow(i, top) {
var li = el('li', 'ny ny-cl'), d = mk(li, 'details', 'ny-th'), s = mk(d, 'summary'), k = KEEP.concat('chat').filter((x) => labels(i).indexOf(x) >= 0)[0];
if (k) { mk(s, 'span', 'tag ' + k, k.charAt(0).toUpperCase() + k.slice(1)); s.appendChild(document.createTextNode(' ')); }
mk(s, 'span', 'ref', '#' + i.number); var on = mk(s, 'span', 'meta', ' closed ' + day(i.closed_at)); mk(s, 'span', 'ny-t', i.title);
var t = mk(d, 'div', 'ny-msgs');
d.addEventListener('toggle', () => {
if (!d.open || d.got) return; d.got = 1; t.textContent = 'Reading #' + i.number + '...';
thread(i).then((cs) => {
t.textContent = ''; tell(t, i);
if (i.comments > 100) mk(t, 'p', 'meta', 'Earlier replies are on GitHub; the latest 100 follow.');
cs.forEach((c) => tell(t, c));
box(d, i.number, i, { opts: [] }, (c) => { tell(t, c); on.textContent = ' reopened ' + day(c.created_at); });
}, (e) => { d.got = 0; t.textContent = 'Could not read #' + i.number + ': ' + e.message + '.'; });
});
if (top) cl.insertBefore(li, cl.firstChild); else cl.appendChild(li);
cnum.textContent = String(++cn);
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
rows.forEach((x) => {
var i = open[x[1]], b = x[0].querySelector('.ny-box') || x[0].appendChild(el('div', 'ny-box'));
b.textContent = 'Reading the question...';
thread(i).then((cs) => { var a = pickAsk(i, cs, inv, repo); if ((P || labels(i).indexOf('proposal') >= 0) && !(a.opts || []).length) a.opts = PO; box(x[0], x[1], i, a); if (!R) closer(x[0], x[2]); }, (e) => { b.textContent = 'Could not read #' + x[1] + ': ' + e.message + '.'; });
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
