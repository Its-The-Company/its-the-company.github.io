// Source with comments: tools/site/assets/needs.js in the company repository.
(() => {
'use strict';
var B = '(?:\\*\\*|__)?';
var LINE = new RegExp('^[ \\t]*(?:[-*+][ \\t]+)?' + B + '[ \\t]*\\(?([A-Fa-f])(?:[ \\t]+\\(([^)\\n]{1,30})\\))?' + B + '[ \\t]*[.):\\u2014-]+[ \\t]*' + B + '[ \\t]*(\\S.*)$', 'gm');
var DEF = /(?:^|[\s(])([A-Fa-f])[ \t]*=[ \t]*([^.\n]+)/g;
var BOLD = /(?:\*\*|__)([A-Fa-f])(?:\*\*|__)([^*\n]*)/g;
var SAYS = /\b(?:reply|replies|answer|say)\b/i;
var PAIR = /\b(?:[Rr]eply|[Aa]nswer|[Ss]ay)\s+(?:with\s+)?["\u201c*]*([A-Z][a-z]{0,11})["\u201d*]*\s+or\s+["\u201c*]*([A-Z][a-z]{0,11})\b/;
function clean(s) { return String(s || '').replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/\*\*|__|`/g, '').replace(/\s+/g, ' ').trim(); }
function short(s) {
s = clean(s);
if (s.charAt(0) === '(') { var e = s.indexOf(')'); if (e > 0) s = s.slice(1, e); }
s = s.replace(/^[\s:.,;)\u2014-]+/, '').replace(/[\s,;]+(?:or|and)?[\s,;]*$/i, '');
return s.length > 90 ? s.slice(0, 87).replace(/\s+\S*$/, '') + '...' : s;
}
function sentence(s) { var m = /^[\s\S]*?[.!?](?=\s|$)/.exec(s); return m ? m[0] : s; }
function options(text) {
var t = String(text || '').replace(/<!--[\s\S]*?-->/g, '').replace(/\r/g, '').replace(/```[\s\S]*?```/g, ''), out = [], seen = {}, m;
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
function pickAsk(issue, cs, inv) {
var co = [], last = -1;
cs.forEach((c, i) => { if (inv(who(c))) last = i; else if (!isReceipt(c.body)) co.push({ c: c, i: i }); });
var after = co.filter((x) => x.i > last), pool = after.length ? after : co, hit = null;
for (var k = pool.length - 1; k >= 0 && !hit; k--) if (options(pool[k].c.body).length) hit = pool[k];
if (!hit && after.length) hit = after[after.length - 1];
var src = hit ? hit.c : issue, opts = options(src && src.body);
return { body: (src && src.body) || '', at: (src && src.created_at) || '', opts: opts, answered: !!hit && last > hit.i, lastInv: last >= 0 ? cs[last] : null };
}
window.CompanyNeeds = { options: options, pickAsk: pickAsk };
var S = window.CompanySite, root = document.getElementById('needs-root');
if (!S || !root || !S.getToken()) return;
var anon = document.getElementById('needs-anon'); if (anon) anon.hidden = true;
var repo = root.getAttribute('data-repo'), RI = '/repos/' + repo + '/issues', LS = localStorage, el = S.el;
var named = (root.getAttribute('data-named') || '').split(/\s+/).filter(Boolean).map(Number);
var KEEP = ['emergency', 'urgent', 'report', 'pitch'], MAXF = 10 * 1048576, names = [];
function mk(p, tag, cls, text) { return p.appendChild(el(tag, cls, text)); }
function labels(i) { return (i.labels || []).map((x) => String(x.name || x).toLowerCase()); }
function inv(l) { return names.indexOf(l) >= 0; }
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
function plain(b) { return String(b || '').replace(/<!--[\s\S]*?-->/g, '').replace(/<img[^>]*>/gi, '[image]').replace(/!\[([^\]]*)\]\([^)]*\)/g, '[image: $1]').replace(/\r/g, '').trim(); }
function when(iso) { return iso ? new Date(iso).toLocaleString([], { weekday: 'short', hour: 'numeric', minute: '2-digit' }) : ''; }
function b64file(f) {
return new Promise((res, rej) => { var r = new FileReader(); r.onload = () => res(String(r.result).split(',')[1] || ''); r.onerror = () => rej(new Error('could not read ' + f.name)); r.readAsDataURL(f); });
}
function NoWrite() { this.message = 'no write'; }
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
function box(li, n, i, ask) {
var b = li.querySelector('.ny-box') || li.appendChild(el('div', 'ny-box')), files = [], dk = 'company.draft.' + n, pressed = null;
b.textContent = '';
if (ask.body) {
var a = mk(b, 'details', 'ny-ask'), s = mk(a, 'summary', null, 'The company asks' + (ask.at ? ' (' + when(ask.at) + ')' : ''));
s.title = 'The question this reply answers'; mk(a, 'pre', null, plain(ask.body));
if (!ask.opts.length) a.open = true;
}
if (ask.answered && ask.lastInv) mk(b, 'p', 'meta ny-done', 'You answered ' + when(ask.lastInv.created_at) + ': "' + plain(ask.lastInv.body).slice(0, 80) + '". The company closes the issue once it has read it.');
var ta = el('textarea'), opts = mk(b, 'div', 'ny-opts'), form = mk(b, 'div', 'ny-form');
ask.opts.forEach((o) => {
var btn = mk(opts, 'button', 'cv-tool', o.key === o.label || !o.label ? o.key : o.key + ': ' + o.label); btn.type = 'button';
btn.setAttribute('aria-pressed', 'false'); btn.title = 'Fill the reply with ' + o.reply;
btn.onclick = () => {
if (pressed) pressed.setAttribute('aria-pressed', 'false');
var v = ta.value, prev = pressed && pressed.getAttribute('data-r');
if (prev && v.indexOf(prev + '\n\n') === 0) v = v.slice(prev.length + 2); else if (prev && v === prev) v = '';
ta.value = v.trim() ? o.reply + '\n\n' + v : o.reply;
btn.setAttribute('data-r', o.reply); btn.setAttribute('aria-pressed', 'true'); pressed = btn; ta.focus(); save(); sync();
};
});
if (!ask.opts.length) opts.parentNode.removeChild(opts);
ta.placeholder = ask.opts.length ? 'Tap an option or write your answer to #' + n : 'Your answer to #' + n;
ta.setAttribute('aria-label', 'Your reply to #' + n); ta.value = LS.getItem(dk) || ''; form.appendChild(ta);
var list = mk(form, 'ul', 'ny-files'), bar = mk(form, 'div', 'ny-bar'), pick = el('input'), add = mk(bar, 'button', 'cv-tool', 'Add files');
pick.type = 'file'; pick.multiple = true; pick.hidden = true; bar.appendChild(pick); add.type = 'button';
add.onclick = () => pick.click();
var go = mk(bar, 'button', 'cv-tool ny-send', 'Send'), st = mk(form, 'p', 'meta', ''), extra = mk(form, 'div', 'ny-bar');
go.type = 'button'; st.setAttribute('role', 'status'); extra.hidden = true;
function save() { if (ta.value.trim()) LS.setItem(dk, ta.value); else LS.removeItem(dk); }
function sync() { go.disabled = !(ta.value.trim() || files.length) || S.rejected(); }
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
if (f.size > MAXF) { st.className = 'meta ny-warn'; st.textContent = f.name + ' is over 10 MB; attach it on GitHub instead.'; return; }
if (files.length < 5) files.push(f);
});
drawFiles();
}
pick.onchange = () => { take(pick.files); pick.value = ''; };
ta.addEventListener('paste', (ev) => { var fl = ev.clipboardData && ev.clipboardData.files; if (fl && fl.length) { take(fl); if (!ev.clipboardData.getData('text')) ev.preventDefault(); } });
ta.addEventListener('input', () => { save(); sync(); });
function post(withFiles) {
var text = ta.value.trim(), name = (LS.getItem(S.NAME) || '').replace(/[^A-Za-z0-9 _.-]/g, '').trim().slice(0, 40), links = [];
go.disabled = true; extra.hidden = true; extra.textContent = ''; st.className = 'meta'; st.textContent = withFiles && files.length ? 'Saving files...' : 'Sending...';
var up = (withFiles ? files : []).reduce((p, f) => p.then(() => upload(n, f).then((l) => { links.push(l); })), Promise.resolve());
return up.then(() => {
st.textContent = 'Sending...';
var body = [text, links.length ? 'Files:\n' + links.map((l) => '- ' + l).join('\n') : ''].filter(Boolean).join('\n\n') + (name ? '\n\n<!-- as: ' + name + ' -->' : '');
return send('POST', RI + '/' + n + '/comments', { body: body }).then((r) => {
if (!r.ok) throw new Error(S.said(r) + (r.status === 403 || r.status === 404 ? ' (does your token have Issues: Read and write?)' : ''));
return r.json();
});
}).then((c) => {
ta.value = ''; files = []; drawFiles(); save();
st.className = 'meta ny-done'; st.textContent = 'Sent ' + when(c.created_at) + (links.length ? ' with ' + links.length + ' file' + (links.length > 1 ? 's' : '') : '') + '. The company reads it within minutes and closes the issue once it is settled.';
if (pressed) pressed.setAttribute('aria-pressed', 'false');
}, (e) => {
sync();
st.className = 'meta ny-warn';
if (e instanceof NoWrite) {
st.textContent = 'Not sent. Your token cannot save files to the repository yet: it needs Contents: Read and write (what #61 asks for). Your text and files are kept here.';
extra.hidden = false;
if (text) { var t = mk(extra, 'button', 'cv-tool', 'Send the text without the files'); t.type = 'button'; t.onclick = () => post(false); }
var g = mk(extra, 'a', null, 'Attach them on GitHub instead'); g.href = 'https://github.com/' + repo + '/issues/' + n; g.target = '_blank'; g.rel = 'noopener';
} else st.textContent = 'Not sent: ' + e.message + '. Your text is kept; tap Send to retry.';
});
}
go.onclick = () => post(true);
sync();
}
function closedNote(k) { if (k) mk(root, 'p', 'meta', k + ' request' + (k === 1 ? '' : 's') + ' answered and closed since this page was built ' + (k === 1 ? 'is' : 'are') + ' hidden.'); }
Promise.all([allow(), getJ(RI + '?state=open&per_page=100')]).then((res) => {
names = res[0].map((x) => String(x).toLowerCase());
var open = {}, rows = [], shown = {}, hidden = 0;
res[1].filter((i) => !i.pull_request).forEach((i) => { open[i.number] = i; });
Array.prototype.forEach.call(document.querySelectorAll('li[data-nums]'), (li) => {
var ns = li.getAttribute('data-nums').split(' ').map(Number).filter((n) => open[n]);
li.getAttribute('data-nums').split(' ').forEach((n) => { shown[n] = 1; });
if (!ns.length) { li.hidden = true; hidden++; return; }
rows.push([li, ns[0]]);
});
var fresh = Object.keys(open).map((k) => open[k]).filter((i) => !shown[i.number] && named.indexOf(i.number) < 0 && labels(i).indexOf('unrelated') < 0 && labels(i).some((l) => KEEP.indexOf(l) >= 0));
if (fresh.length) {
mk(root, 'h2', null, 'Opened since this page was built');
var ul = mk(root, 'ul', 'list needs');
fresh.forEach((i) => {
var li = mk(ul, 'li', 'ny ny-new'), k = KEEP.filter((l) => labels(i).indexOf(l) >= 0)[0];
mk(li, 'span', 'tag ' + k, k.charAt(0).toUpperCase() + k.slice(1)); li.appendChild(document.createTextNode(' '));
mk(li, 'span', 'ref', '#' + i.number); mk(li, 'span', 'ny-q', i.title);
rows.push([li, i.number]);
});
}
closedNote(hidden);
Array.prototype.forEach.call(document.querySelectorAll('ul[data-group]'), (ul) => {
if (Array.prototype.every.call(ul.children, (li) => li.hidden)) for (var e = ul; e && (e === ul || e.tagName !== 'UL'); e = e.previousElementSibling) { e.hidden = true; if (e.tagName === 'H2') break; }
});
rows.forEach((x) => {
var i = open[x[1]], b = x[0].querySelector('.ny-box') || x[0].appendChild(el('div', 'ny-box'));
b.textContent = 'Reading the question...';
thread(i).then((cs) => box(x[0], x[1], i, pickAsk(i, cs, inv)), (e) => { b.textContent = 'Could not read #' + x[1] + ': ' + e.message + '.'; });
});
}, (e) => { mk(root, 'p', 'meta ny-warn', 'Could not read the open requests: ' + e.message + '. The list below is as built.'); });
})();
