// Source with comments: tools/site/assets/plan.js in the company repository.
(() => {
'use strict';
var S = window.CompanySite; if (!S) return;
var [TAG, BS, BE, HEAD, MINO, ...P] = ["<!-- plan-mode v1 -->","<!-- plan-questions v1 -->","<!-- /plan-questions -->","**Plan answers** to the questions of ",2,"^### Q([1-5])\\. (.{1,200})$","^Why: (.{1,240})$","^- \\*\\*([A-F])( \\(recommended\\))?:\\*\\* (.{1,120})$","\\*\\*|\\]\\(|https?://|Note:","^- Q([1-5]): (?:([A-F]) — .{1,120}|Own answer: (.{1,1000})|Skipped)$","^  Note: (.{1,1000})$","^- \\*\\*([^*]{1,240})\\*\\* (.{1,1000}) <!-- Q([1-5]) (own|skip|[A-F]) -->$"], [QR, WR, OR, BAD, LR, NR, SR] = P.map((p) => new RegExp(p, 'u'));
var el = S.el, LS = localStorage, AB = 'ABCDEF';
function mk(p, tag, cls, t, a) { var e = p.appendChild(el(tag, cls, t)), k; for (k in a) e.setAttribute(k, a[k]); return e; }
function lines(t) { return (t || '').replace(/\r/g, '').split('\n').map((l) => l.replace(/[ \t]+$/, '')); }
function parse(body) {
var ls = lines(body), s = ls.indexOf(BS), e = ls.indexOf(BE), qs = [], q = null, m, k, l;
if (s < 0 || e < s || ls.filter((x) => x.indexOf('plan-questions') >= 0).length > 2) return null;
for (k = s + 1; k < e; k++) {
l = ls[k];
if (!l) continue;
if ((m = QR.exec(l))) { if (+m[1] !== qs.length + 1) return null; qs.push(q = { t: m[2], o: [] }); }
else if ((m = WR.exec(l))) { if (!q || q.why || q.o.length) return null; q.why = m[1]; }
else if ((m = OR.exec(l))) { if (!q || m[1] !== AB[q.o.length] || BAD.test(m[3]) || (m[2] && q.o.some((o) => o[2]))) return null; q.o.push([m[1], m[3], !!m[2]]); }
else return null;
}
if (!qs.length || qs.some((x) => x.o.length && x.o.length < MINO)) return null;
return { pre: ls.slice(0, s).join('\n'), post: ls.slice(e + 1).join('\n'), qs: qs };
}
function readA(body) {
var out = {}, last, m;
lines(body).forEach((l) => {
if ((m = LR.exec(l))) { last = out[m[1]] = { p: m[2], t: m[3] }; return; }
if ((m = SR.exec(l))) { last = out[m[3]] = m[4] == 'own' ? { t: m[2] } : m[4] == 'skip' ? {} : { p: m[4] }; return; }
if ((m = NR.exec(l)) && last && last.p) last.t = m[1];
last = null;
});
return out;
}
function mark(id) { return '<!-- plan-answer v1 to=' + id + ' -->'; }
function answerOf(C, x) {
var a;
C.items().forEach((y) => { if (C.isInv(y.l) && lines(y.body).indexOf(mark(x.id)) >= 0) a = y; });
return a;
}
function one(s) { return (s || '').replace(/<!--|-->/g, '').replace(/\s+/g, ' ').trim().slice(0, 1000); }
function said(t) {
t = t.replace(/[*<>]/g, '').trim();
if (t.length > 80) t = t.slice(0, 80).replace(/\s+\S*$/, '') + '\u2026';
return /[?:.!\u2026]$/.test(t) ? t : t + ':';
}
function plan(m, b, x, ans) {
var B = parse(x.body), C = S.planCtx;
if (!B || !C) return;
var key = 'company.plan.' + x.id, n = B.qs.length, st = {}, busy, cnt, send, out;
if (!ans && !(ans = answerOf(C, x))) m.className += ' cv-ask';
try { st = ans ? readA(ans.body) : JSON.parse(LS.getItem(key)) || st; } catch (e) {}
b.textContent = ''; C.md(B.pre, mk(b, 'div'));
if (ans) {
var ul = mk(b, 'ul', 'pq-said');
B.qs.forEach((q, i) => {
var a = st[i + 1] || {}, p = a.p && q.o.filter((z) => z[0] === a.p)[0], li = mk(ul, 'li');
mk(li, 'strong', null, said(q.t)); mk(li, 'span', null, ' ' + (p ? p[1] : a.t || 'Skipped'));
if (p && a.t) mk(li, 'small', null, 'Note: ' + a.t);
});
C.md(B.post, mk(b, 'div'));
mk(b, 'p', 'meta ny-done', 'You answered ' + C.clock(ans.at) + '. The company reads your answers next.');
return b;
}
var copy = m.lastChild, box = mk(m, 'div', 'pq ny-box', null, { role: 'group', 'aria-label': 'The company asks ' + n + ' question' + (n > 1 ? 's' : '') });
var added = [m.insertBefore(box, copy)], after = el('div', 'cv-body');
C.md(B.post, after);
if (after.children.length) added[1] = m.insertBefore(after, copy);
function save() { LS.setItem(key, JSON.stringify(st)); }
function count() {
var c = B.qs.filter((q, i) => st[i + 1].p || one(st[i + 1].t)).length;
cnt.textContent = c + ' of ' + n + ' answered'; send.disabled = busy || !c; return c;
}
B.qs.forEach((q, i) => {
var k = i + 1, a = st[k] = st[k] || {}, id = 'pq-' + x.id + '-' + k, L = { 'aria-labelledby': id }, sec = mk(box, 'section', 'pq-q', null, L), g, ta;
mk(sec, 'p', 'pq-n', 'Question ' + k + ' of ' + n);
mk(sec, 'h3', 'pq-t', q.t, { id: id });
if (q.why) mk(sec, 'p', 'pq-why', q.why);
if (q.o.length) {
g = mk(sec, 'div', 'ny-opts', null, { role: 'group', 'aria-labelledby': id });
q.o.forEach((o) => {
var t = mk(g, 'button', 'cv-tool', o[0] + ': ' + o[1], { type: 'button' });
t.L = o[0];
if (o[2]) mk(t, 'small', 'pq-rec', 'Recommended');
t.setAttribute('aria-pressed', a.p === o[0]);
t.onclick = () => {
a.p = a.p === o[0] ? '' : o[0]; save(); count();
[].forEach.call(g.children, (c) => { c.setAttribute('aria-pressed', c.L === a.p); });
};
});
}
ta = mk(mk(sec, 'div', 'ny-form'), 'textarea', null, null, { 'aria-label': 'Your answer to question ' + k });
ta.rows = 2; ta.placeholder = q.o.length ? 'Add a note, or write your own answer' : 'Your answer'; ta.value = a.t || '';
ta.oninput = () => { a.t = ta.value; save(); count(); };
});
var bar = mk(box, 'div', 'ny-bar');
cnt = mk(bar, 'span', 'meta'); send = mk(bar, 'button', 'cv-tool ny-send', 'Send answers', { type: 'button' });
out = mk(box, 'p', 'meta', null, { role: 'status' });
count();
function text() {
var o = [HEAD + C.clock(x.at)], nm = C.name();
B.qs.forEach((q, i) => {
var a = st[i + 1], t = one(a.t), p = a.p && q.o.filter((z) => z[0] === a.p)[0];
o.push('- **' + said(q.t) + '** ' + (p ? p[1] : t || 'Skipped') + ' <!-- Q' + (i + 1) + ' ' + (p ? p[0] : t ? 'own' : 'skip') + ' -->');
if (p && t) o.push('  Note: ' + t);
});
return o.join('\n') + '\n\n' + mark(x.id) + '\n' + TAG + (nm ? '\n<!-- as: ' + nm + ' -->' : '');
}
send.onclick = () => {
if (busy || !count()) return;
var t = text();
busy = true; count(); out.className = 'meta'; out.textContent = 'Sending...';
C.send(t).then((r) => {
LS.removeItem(key);
added.forEach((e) => e.remove());
var nb = plan(m, b, x, { body: t, at: r.created_at });
out.textContent = 'Sent. A receipt follows within a tick.'; nb.appendChild(out);
}, (e) => {
busy = false; count(); out.className = 'meta ny-warn'; out.textContent = 'Not sent: ' + e.message + '. Your choices are kept.';
});
};
return box;
}
S.plan = plan;
(S.planQ || []).splice(0).forEach((a) => { plan(a[0], a[1], a[2]); });
})();
