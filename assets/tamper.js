// Source with comments: tools/site/assets/tamper.js in the company repository.
(() => {
'use strict';
function next(f, cur, sha) {
if (f.action === 'add') return cur === null ? f.after : (cur === f.after ? false : null);
if (cur === null) return null;
if (f.action === 'delete') return sha === f.base_sha ? '' : null;
if (sha === f.base_sha) return f.after;
if (f.old === '' && f.post === '') return cur + (cur && !/\n$/.test(cur) ? '\n' : '') + f['new'];
var k = f.pre + f.old + f.post, i = cur.indexOf(k);
if (!k || i < 0 || cur.indexOf(k, i + 1) >= 0) return null;
return cur.slice(0, i) + f.pre + f['new'] + f.post + cur.slice(i + k.length);
}
window.CompanyTamper = { next: next };
var S = window.CompanySite, root = document.getElementById('tamper-root');
if (!S || !root || !S.getToken()) return;
var repo = root.getAttribute('data-repo'), C = '/repos/' + repo + '/contents/', DONE = 'company.tamper.done';
function b64(t) { var b = new TextEncoder().encode(t), s = ''; for (var i = 0; i < b.length; i++) s += String.fromCharCode(b[i]); return btoa(s); }
function unb64(s) { var a = atob(s.replace(/\n/g, '')), b = new Uint8Array(a.length); for (var i = 0; i < a.length; i++) b[i] = a.charCodeAt(i); return new TextDecoder().decode(b); }
function path(p) { return C + p.split('/').map(encodeURIComponent).join('/'); }
function read(p) {
return S.gh(path(p)).then((r) => {
if (r.status === 404) return { text: null, sha: null };
if (!r.ok) throw new Error(S.said(r) + ' reading ' + p);
return r.json().then((j) => ({ text: unb64(j.content || ''), sha: j.sha }));
});
}
function write(p, msg, text, sha, del) {
var body = { message: msg, sha: sha || undefined };
if (!del) body.content = b64(text);
return fetch(S.API + path(p), { method: del ? 'DELETE' : 'PUT', headers: S.hdrs(), body: JSON.stringify(body) }).then(S.checkAuth).then((r) => {
if (r.status === 403 || r.status === 404) throw new Error('your token cannot write files. Give it Contents: Read and write on GitHub (Settings, Developer settings, your token), then try again');
if (!r.ok) throw new Error(S.said(r) + ' writing ' + p);
return r.json();
});
}
function done() { try { return JSON.parse(localStorage.getItem(DONE) || '[]'); } catch (e) { return []; } }
function decide(id, how, extra) {
var rec = Object.assign({ id: id, decision: how, at: new Date().toISOString() }, extra || {});
return write('ops/tamper/decided/' + id + '.json', 'Investor: ' + how + ' the change a session tried (' + id + ')', JSON.stringify(rec, null, 1) + '\n')
.then(() => { var d = done(); d.push(id); localStorage.setItem(DONE, JSON.stringify(d.slice(-50))); });
}
function approve(id) {
return read('ops/tamper/' + id + '.json').then((e) => {
if (e.text === null) throw new Error('the entry is not on GitHub yet (the Mac mini has not pushed it); try again after its next push');
var fs = JSON.parse(e.text).files.filter((f) => f.appliable), out = [], skip = [];
return fs.reduce((p, f) => p.then(() => read(f.path).then((c) => {
var t = next(f, c.text, c.sha);
if (t === false) return;
if (t === null) { skip.push(f.path); return; }
return write(f.path, 'Investor approves the change a session tried (' + id + '): ' + f.path, t, c.sha, f.action === 'delete')
.then((r) => { out.push(f.path); return r; });
})), Promise.resolve()).then(() => {
if (skip.length && !out.length) throw new Error(skip.join(', ') + ' changed on GitHub where the session changed it; edit it by hand');
return decide(id, 'approve', { applied: out, skipped: skip }).then(() => out.length + ' file' + (out.length === 1 ? '' : 's') + ' changed from your account' +
(skip.length ? '; not applied (changed on GitHub since): ' + skip.join(', ') : '') + '. The Mac mini takes it in at its next tick.');
});
});
}
var mine = done();
Array.prototype.forEach.call(document.querySelectorAll('[data-tamper]'), (box) => {
var id = box.getAttribute('data-tamper'), li = box.closest('li'), st = S.el('p', 'meta', '');
if (mine.indexOf(id) >= 0) { if (li) li.hidden = true; return; }
st.setAttribute('role', 'status');
[['Approve', approve], ['Disapprove', (x) => decide(x, 'disapprove').then(() => 'Kept out. Nothing changed.')]].forEach((a) => {
if (a[0] === 'Approve' && box.getAttribute('data-apply') === '0') return;
var b = S.el('button', 'cv-tool', a[0]); b.type = 'button';
b.onclick = () => {
if (!window.confirm(a[0] + ' this change? It is written to GitHub from your account.')) return;
Array.prototype.forEach.call(box.querySelectorAll('button'), (x) => { x.disabled = true; });
st.textContent = 'Working...';
a[1](id).then((m) => { st.textContent = a[0] + 'd: ' + m; }, (err) => {
st.textContent = 'Not done: ' + err.message + '.';
Array.prototype.forEach.call(box.querySelectorAll('button'), (x) => { x.disabled = false; });
});
};
box.appendChild(b);
});
box.appendChild(st);
});
})();
