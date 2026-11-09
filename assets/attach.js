// Source with comments: tools/site/assets/attach.js in the company repository.
(() => {
'use strict';
var S = window.CompanySite; if (!S) return;
var el = S.el, MAX = 10485760, MOST = 5;
var KEY = /gh[pousr]_[A-Za-z0-9]{30,}|github_pat_\w{30,}|sk-[A-Za-z0-9_-]{20,}|AKIA[0-9A-Z]{16}|xox[abpr]-[A-Za-z0-9-]{10,}|-----BEGIN [A-Z ]*PRIVATE KEY-----/;
function kind(b) {
function at(s) { for (var i = 0; i < s.length; i++) if (b[i] !== s[i]) return false; return true; }
if (at([137, 80, 78, 71])) return 'image/png';
if (at([255, 216, 255])) return 'image/jpeg';
if (at([71, 73, 70, 56])) return 'image/gif';
if (at([37, 80, 68, 70])) return 'application/pdf';
for (var i = 0; i < b.length; i++) if (!b[i]) return null;
return 'text';
}
function safe(n) { return String(n || '').replace(/[^A-Za-z0-9._-]+/g, '-').replace(/^[.-]+/, '').slice(-80) || 'file'; }
function path(n, d, k, name) { return 'research/inbound/' + n + '/' + d.toISOString().replace(/[-:]/g, '').slice(0, 15) + (k ? '-' + k : '') + '-' + safe(name); }
function lines(us) { return us.length ? '\n\n' + us.map((u) => 'File: ' + u).join('\n') : ''; }
S.attachKind = { kind: kind, safe: safe, path: path, lines: lines, key: KEY };
S.attach = (dock, o) => {
var files = [], btn = el('button', 'cv-tool cv-att', 'Attach'), pick = el('input'), list = el('ul', 'cv-files');
btn.type = 'button'; btn.setAttribute('aria-label', 'Attach a file'); btn.title = 'An image (PNG, JPEG, GIF), a PDF or plain text; 10 MB each, 5 at most';
pick.type = 'file'; pick.multiple = true; pick.hidden = true;
pick.accept = 'image/png,image/jpeg,image/gif,application/pdf,text/*,.md,.json,.jsonl,.csv,.log,.txt';
btn.onclick = () => pick.click();
pick.onchange = () => { take(pick.files); pick.value = ''; };
function draw() {
list.textContent = '';
files.forEach((f) => {
var li = list.appendChild(el('li'));
if (f.pic) { var im = li.appendChild(el('img')); im.src = f.pic; im.alt = ''; }
li.appendChild(el('span', null, f.name + ' (' + Math.ceil(f.blob.size / 1024) + ' KB)'));
var x = li.appendChild(el('button', 'cv-tool', 'Remove')); x.type = 'button'; x.setAttribute('aria-label', 'Remove ' + f.name);
x.onclick = () => { drop(f); draw(); o.dis(); };
});
if (files.length) list.appendChild(el('li', 'cv-note', 'Saved to research/inbound/ in the company repository when you tap Send. No keys or personal data.'));
}
function drop(f) { files = files.filter((g) => g !== f); if (f.pic) URL.revokeObjectURL(f.pic); }
function no(t) { o.say('failed', t, 8000); }
function clean(f) {
return createImageBitmap(f).then((b) => {
var s = Math.min(1, Math.sqrt(16e6 / (b.width * b.height))), c = el('canvas');
c.width = Math.round(b.width * s); c.height = Math.round(b.height * s); c.getContext('2d').drawImage(b, 0, 0, c.width, c.height);
return new Promise((y, n) => c.toBlob((x) => x ? y(x) : n(new Error('could not redraw ' + f.name)), 'image/jpeg', 0.92));
});
}
function one(f) {
if (f.size > MAX) return no(f.name + ' is over 10 MB; not added.');
if (!f.size) return no(f.name + ' is empty; not added.');
return f.arrayBuffer().then((buf) => {
var k = kind(new Uint8Array(buf, 0, Math.min(8192, buf.byteLength)));
if (k === 'text') {
var t; try { t = new TextDecoder('utf-8', { fatal: true }).decode(buf); } catch (e) { k = null; }
if (k && KEY.test(t)) throw new Error(f.name + ' looks like it holds a key or token; not added. Remove it first.');
}
if (!k) throw new Error(f.name + ' is not an image (PNG, JPEG, GIF), a PDF or plain text; not added.');
return (k === 'image/jpeg' ? clean(f) : Promise.resolve(f)).then((blob) => {
if (files.length >= MOST) throw new Error('5 files a message at most; ' + f.name + ' not added.');
files.push({ name: safe(f.name), blob: blob, pic: /^image/.test(k) ? URL.createObjectURL(blob) : '' });
draw(); o.dis();
});
}).catch((e) => no(e.message));
}
function take(fl) {
if (!o.ok() || !fl || !fl.length) return;
o.open();
Array.prototype.reduce.call(fl, (q, f) => q.then(() => one(f)), Promise.resolve());  // in the order picked
}
function has(e) { var t = e.dataTransfer && e.dataTransfer.types; return !!t && Array.prototype.indexOf.call(t, 'Files') >= 0; }
S.on(document, 'dragover', (e) => { if (has(e) && o.ok()) { e.preventDefault(); dock.classList.add('cv-drop'); } });
S.on(document, 'dragleave', (e) => { if (!e.relatedTarget) dock.classList.remove('cv-drop'); });
S.on(document, 'drop', (e) => { dock.classList.remove('cv-drop'); if (has(e) && o.ok()) { e.preventDefault(); take(e.dataTransfer.files); } });
S.on(dock, 'paste', (e) => {
var d = e.clipboardData, fl = d && d.files;
if (fl && fl.length) { take(fl); if (!d.getData('text')) e.preventDefault(); }
});
function b64(blob) {
return new Promise((y, n) => { var r = new FileReader(); r.onload = () => y(String(r.result).split(',')[1] || ''); r.onerror = () => n(new Error('could not read a file')); r.readAsDataURL(blob); });
}
var sent = [];
function up(repo, n) {
var d = new Date(), q = Promise.resolve();
sent = files.slice();
sent.forEach((f, k) => {
q = q.then(() => f.url || b64(f.blob).then((c) => {
var p = path(n, d, sent.length > 1 ? k + 1 : 0, f.name), h = S.hdrs(); h['Content-Type'] = 'application/json';
return fetch(S.API + '/repos/' + repo + '/contents/' + p, { method: 'PUT', headers: h, body: JSON.stringify({ message: 'Investor file for #' + n + ': ' + f.name, content: c }) })
.then(S.checkAuth).then((r) => {
if (r.status === 403 || r.status === 404) throw new Error('your token cannot save files to the repository: it needs Contents: Read and write. Remove the files to send the text alone');
if (!r.ok) throw new Error(S.said(r) + ' saving ' + f.name);
return r.json().then((j) => { f.url = j.content && j.content.html_url; if (!f.url) throw new Error('no link for ' + f.name); });
});
}));
});
return q.then(() => lines(sent.map((f) => f.url)));
}
return { tools: [btn, pick], after: [list], n: () => files.length, up: up, done: () => { sent.forEach(drop); sent = []; draw(); o.dis(); } };
};
})();
