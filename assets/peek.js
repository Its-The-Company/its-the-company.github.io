// Source with comments: tools/site/assets/peek.js in the company repository.
(() => {
'use strict';
var S = window.CompanySite; if (!S) return;
var el = S.el, D = document, open = null, obj = null, CAP = 2e5;
var IMG = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp', svg: 'image/svg+xml' };
var TEXT = /^(md|markdown|txt|json|jsonl|ya?ml|toml|csv|tsv|log|py|sh|swift|js|ts|css|html?|xml|plist|strings|[chm]|mm|ini|cfg|diff|patch|)$/;
function mk(p, tag, cls, t) { return p.appendChild(el(tag, cls, t)); }
function dec(s) { try { return decodeURIComponent(s); } catch (e) { return s; } }
function close() {
if (open && open.parentNode) open.parentNode.removeChild(open);
if (obj) URL.revokeObjectURL(obj);
open = obj = null;
}
function size(n) { return n < 1024 ? n + ' B' : n < 1048576 ? Math.round(n / 1024) + ' KB' : (n / 1048576).toFixed(1) + ' MB'; }
function peek(f) {
close();
var name = dec(f.path.split('/').pop()), ext = name.indexOf('.') < 0 ? '' : name.split('.').pop().toLowerCase();
var s = open = el('div', 'sheet peek'), back = D.activeElement, top = mk(s, 'div', 'acts');
s.setAttribute('role', 'dialog'); s.setAttribute('aria-modal', 'true'); s.setAttribute('aria-label', name);
mk(top, 'b', 'peek-name', dec(f.path)).title = dec(f.ref);
var gh = mk(top, 'a', 'btn', 'Open on GitHub'); gh.href = f.url; gh.rel = 'noopener'; gh.target = '_blank';
var x = mk(top, 'button', 'btn', 'Close'); x.type = 'button';
var box = mk(s, 'div', 'peek-in'), wait = mk(box, 'p', 'muted', 'Loading...');
function shut() { close(); if (back && back.focus) back.focus(); }
x.onclick = shut; s.onkeydown = (e) => { if (e.key === 'Escape') shut(); };
D.body.appendChild(s); x.focus();
function mine() { return open === s; }
var h = S.hdrs(); if (!f.dir) h.Accept = 'application/vnd.github.raw';
fetch(S.API + '/repos/' + f.repo + '/contents/' + f.path + '?ref=' + f.ref, { headers: h, cache: 'no-store' }).then(S.checkAuth).then((r) => {
if (!r.ok) throw new Error(S.said(r) + (r.status === 404 ? ' (no such file at this version, or the token cannot read it)' : ''));
return f.dir ? r.json() : r.blob();
}).then((b) => {
if (!mine()) return;
wait.remove();
if (f.dir) {
if (!Array.isArray(b)) return peek(Object.assign({}, f, { dir: false }));
var ul = mk(box, 'ul');
b.forEach((e) => {
var a = mk(mk(ul, 'li'), 'a', null, e.name + (e.type === 'dir' ? '/' : '')); a.href = e.html_url;
a.onclick = (ev) => { ev.preventDefault(); peek({ repo: f.repo, ref: f.ref, path: e.path.split('/').map(encodeURIComponent).join('/'), dir: e.type === 'dir', url: e.html_url }); };
});
return;
}
if (IMG[ext]) { var i = mk(box, 'img'); i.alt = name; i.src = obj = URL.createObjectURL(new Blob([b], { type: IMG[ext] })); return; }
if (TEXT.test(ext) && b.size <= 4 * CAP) {
return b.text().then((t) => {
if (!mine()) return;
mk(box, 'pre', null, t.slice(0, CAP));
if (t.length > CAP) mk(box, 'p', 'meta', 'The first ' + CAP.toLocaleString() + ' characters; the rest is on GitHub.');
});
}
var d = mk(box, 'a', 'btn primary', 'Download ' + name + ' (' + size(b.size) + ')');
d.href = obj = URL.createObjectURL(b); d.download = name;
}).catch((e) => { if (mine()) wait.textContent = 'Could not open the file: ' + e.message + '.'; });
}
S.peek = peek;
if (S.peekQ) { var q = S.peekQ; S.peekQ = null; peek(q); }
})();
