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
var TONE = { '+': ['add', 'background:rgba(46,160,67,.18)'], '-': ['del', 'background:rgba(248,81,73,.18)'],
'@': ['hunk', 'background:rgba(56,139,253,.15)'], f: ['file', 'font-weight:600'], '.': ['more', 'font-style:italic'] };
function renderDiff(text) {
var pre = document.createElement('pre'), body = false;
pre.className = 'td-diff';
String(text || '').split('\n').forEach((ln) => {
var c = ln.charAt(0);
body = body || c === '@';
var t = TONE[!body && /^(---|\+\+\+) /.test(ln) ? 'f' : ln.slice(0, 4) === '... ' ? '.' : c] || ['ctx', ''], s = document.createElement('span');
s.className = 'td td-' + t[0];
s.setAttribute('style', 'display:block;' + t[1]);
s.textContent = ln || ' ';
pre.appendChild(s);
});
return pre;
}
function each(scope, sel, fn) { Array.prototype.forEach.call(scope.querySelectorAll(sel), fn); }
function paint(scope) { each(scope || document, '.ny-diff pre:not(.td-diff)', (p) => { p.parentNode.replaceChild(renderDiff(p.textContent), p); }); }
var T = window.CompanyTamper = { next: next, renderDiff: renderDiff, paint: paint, repo: '' };
var S = window.CompanySite, root = document.getElementById('tamper-root'), DONE = 'company.tamper.done';
if (root) T.repo = root.getAttribute('data-repo') || '';
function b64(t) { var b = new TextEncoder().encode(t), s = ''; for (var i = 0; i < b.length; i++) s += String.fromCharCode(b[i]); return btoa(s); }
function unb64(s) { var a = atob(s.replace(/\n/g, '')), b = new Uint8Array(a.length); for (var i = 0; i < a.length; i++) b[i] = a.charCodeAt(i); return new TextDecoder().decode(b); }
function path(p) { return '/repos/' + T.repo + '/contents/' + p.split('/').map(encodeURIComponent).join('/'); }
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
function entry(id) {
return read('ops/tamper/' + id + '.json').then((e) => {
if (e.text === null) throw new Error('the entry is not on GitHub yet (the Mac mini has not pushed it); try again after its next push');
return JSON.parse(e.text);
});
}
T.exact = (id) => entry(id).then((e) => { var m = {}; e.files.forEach((f) => { if (f.diff) m[f.path] = f.diff; }); return m; });
T.approve = (id) => entry(id).then((e) => {
var fs = e.files.filter((f) => f.appliable), out = [], skip = [];
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
T.disapprove = (id) => decide(id, 'disapprove').then(() => 'Kept out. Nothing changed.');
T.moveOut = (id, comment) => decide(id, 'move-out', { comment: String(comment || '') })
.then(() => 'Recorded. The company moves the setting to its own file under ops/settings/ and its tools read that first; your file stays as it is.');
T.mount = (box) => {
var id = box.getAttribute('data-tamper'), li = box.closest('li'), st = S.el('p', 'meta', '');
if (done().indexOf(id) >= 0) { if (li) li.hidden = true; return; }
st.setAttribute('role', 'status');
if (li) T.exact(id).then((m) => each(li, '.ny-diff', (d) => {
var sm = d.querySelector('summary'), p = d.querySelector('pre'), k = Object.keys(m).filter((x) => sm && sm.textContent.indexOf(x + ' (') === 0)[0];
if (k && p) { var n = renderDiff(m[k]); n.title = 'The exact change, read from GitHub with your token'; p.parentNode.replaceChild(n, p); }
}), () => {});
[['Approve', 'Approved', box.getAttribute('data-apply') !== '0', () => window.confirm('Approve this change? It is written to GitHub from your account.') && [id]],
['Disapprove', 'Disapproved', true, () => window.confirm('Disapprove this change? Your answer is written to GitHub from your account.') && [id]],
['Move this setting out of the Investor-owned file', 'Moved out', box.getAttribute('data-move') === '1', () => {
var c = window.prompt('Move it out: the company keeps its own copy under ops/settings/ and your file stays as it is. Anything the company should know (optional)?', '');
return c !== null && [id, c];
}]].forEach((a) => {
if (!a[2]) return;
var b = S.el('button', 'cv-tool', a[0]), fn = { Approve: T.approve, Disapprove: T.disapprove }[a[0]] || T.moveOut;
b.type = 'button';
b.onclick = () => {
var args = a[3]();
if (!args) return;
each(box, 'button', (x) => { x.disabled = true; });
st.textContent = 'Working...';
fn.apply(null, args).then((m) => { st.textContent = a[1] + ': ' + m; }, (err) => {
st.textContent = 'Not done: ' + err.message + '.';
each(box, 'button', (x) => { x.disabled = false; });
});
};
box.appendChild(b);
});
box.appendChild(st);
};
if (!root) return;
paint(document);
if (!S || !S.getToken()) return;
each(document, '[data-tamper]', T.mount);
})();
