// Source with comments: tools/site/assets/queue.js in the company repository.
(() => {
'use strict';
var S = window.CompanySite; if (!S || !S.getToken()) return;
var el = S.el, later = S.later, W = window, D = document, root = S.byId('chat-root'), repo = root && root.getAttribute('data-repo');
if (!repo) return;
var nj = root.getAttribute('data-now'); if (nj) (D.head || root).appendChild(Object.assign(el('script'), { src: nj }));
var iss = [], com = [], st = S.status && S.status(), loc = null, ln = [], so = 0, fT = 0, xT = 0, pend = [], why = '', qn = null, mode = '', box = null, fid = null, dead = 0, sig = '', mid = null, said = '';
function mk(p, t, c, x) { return p.appendChild(el(t, c, x)); }
function at(e, k, v) { e.setAttribute(k, v); return e; }
function bt(p, x, f, c) { var b = mk(p, 'button', 'btn' + (c ? ' ' + c : ''), x); b.type = 'button'; b.onclick = e => { if (e && e.stopPropagation) e.stopPropagation(); f(e); }; return b; }
function cap(s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }
function clock(t) { return t ? new Date(t).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : ''; }
function on(t, e, f) { if (t && t.addEventListener) t.addEventListener(e, f); }
function tx(p, t) { p.appendChild(D.createTextNode(t)); }
var f0 = S.feed;
S.feed = function (a, b) { iss = a || []; com = b || []; draw(); return f0.apply(this, arguments); };
if (S.onStatus) S.onStatus.push(s => { st = s; check(); draw(); });
if (S.onReject) S.onReject.push(() => { dead = 1; if (box) box.hidden = true; });
function rows() { return ((st && st.inbox) || []).filter(r => r && /^[ci][0-9]{1,20}$/.test(r.id)).sort((a, b) => a.position - b.position); }
function map() { var m = {}; rows().forEach(r => { m[r.id] = r; }); return m; }
function ord() { var i = rows().map(r => r.id); return loc ? loc.filter(x => i.indexOf(x) >= 0).concat(i.filter(x => loc.indexOf(x) < 0)) : i; }
function units(ids) { var m = map(), u = [], k = ''; ids.forEach(i => { var t = (m[i] && m[i].tie) || i; if (t === k && u.length) u[u.length - 1].push(i); else { u.push([i]); k = t; } }); return u; }
function flat(u) { return [].concat.apply([], u); }
function ui(id) { return units(ord()).findIndex(u => u.indexOf(id) >= 0); }
function bad(ids) { var m = map(); for (var j = 0; j < ids.length; j++) { var a = (m[ids[j]] && m[ids[j]].aft) || []; for (var k = 0; k < a.length; k++) if (ids.indexOf(a[k]) > j) return [ids[j], a[k]]; } return null; }
function info(id) {
var n = +id.slice(1), i = id[0] === 'i', x = (i ? iss : com).find(y => (i ? y.number : y.id) === n), b, r;
if (!x) return { t: (r = map()[id]) && typeof r.title == 'string' && r.title.trim() ? r.title.slice(0, 80) : 'Message ' + id };
b = i ? x.title : String(x.body || '').replace(/<!--[\s\S]*?-->/g, '').replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[#*_>~\x60]+/g, '').replace(/\s+/g, ' ').trim();
return { t: b.length > 80 ? b.slice(0, 77) + '...' : b, who: x.user && x.user.login, at: x.created_at };
}
function nm(id) { return info(id).t; }
function isq(i) { return i.state === 'open' && (i.labels || []).some(l => String(l.name || l).toLowerCase() === 'queue'); }
function qi() { return iss.find(isq) || qn; }
fetch(S.API + '/repos/' + repo + '/issues?labels=queue&state=open', { headers: S.hdrs() }).then(S.checkAuth)
.then(r => r.ok ? r.json() : []).then(a => { qn = (a || []).find(isq) || null; draw(); }).catch(() => {});
function say(t) { said = t; draw(); }
function chg(l) { if (/failed|refused/.test(mode)) pend = []; if (l) ln.push(l); else so = 1; mode = 'pending'; mid = null; S.stop(fT); fT = later(flush, 3000); draw(); }
function flush() {
fT = 0;
var q = qi(), o = ord(), w = so && loc && String(o) !== String(rows().map(r => r.id)) ? o : null, body = (w ? ['/order ' + w.join(' ')] : []).concat(ln), h = S.hdrs(), b = { w: w, ln: ln };
if (!body.length) { so = 0; if (!pend.length) loc = null; mode = pend.length ? 'saving' : ''; return draw(); }
if (!q) { mode = 'none'; return draw(); }
ln = []; so = 0; mode = 'saving'; why = ''; draw();
h['Content-Type'] = 'application/json';
fetch(S.API + '/repos/' + repo + '/issues/' + q.number + '/comments', { method: 'POST', headers: h, body: JSON.stringify({ body: body.join('\n') }) })
.then(S.checkAuth).then(r => { if (!r.ok) throw 0; return r.json(); })
.then(j => { b.c = 'c' + j.id; pend.push(b); S.stop(xT); xT = later(fail, 12e4); check(); }, () => { pend.push(b); fail(); });
}
function check() {
if (mode !== 'saving') return;
var qr = (st && st.qr) || [];
pend = pend.filter(p => { var x = qr.find(y => y[0] === p.c); if (x && x[1] !== 'ok') why = x[1]; return !x; });
if (pend.length) return;
S.stop(xT); xT = 0; loc = null; mode = why ? 'refused' : 'saved';
say(why ? 'Not saved: refused (' + why.replace(/_/g, ' ') + ').' : 'Saved.'); draw();
}
function fail() { xT = 0; if (mode !== 'saving') return; mode = 'failed'; loc = null; say('Not saved. The list shows the company’s order again.'); draw(); }
function retry() { var w = null; pend.forEach(p => { w = p.w || w; p.ln.forEach(l => { if (ln.indexOf(l) < 0) ln.push(l); }); }); pend = []; loc = w; so = w ? 1 : 0; flush(); }
function moveTo(id, to) {
var us = units(ord()), k = ui(id), u, ids, v, m = map(), w;
if (k < 0 || to < 0 || to >= us.length || to === k) return;
u = us.splice(k, 1)[0]; us.splice(to, 0, u); ids = flat(us); v = bad(ids);
if (v && u.indexOf(v[0]) >= 0) { say('Can’t move above ' + nm(v[1]) + ': it waits for it.'); return draw(); }
if (v) {
w = us.filter(x => x !== u && x.some(i => ((m[i] && m[i].aft) || []).some(a => u.indexOf(a) >= 0)));
if (W.confirm && !W.confirm('Move ' + w.length + ' waiting row(s) with it?')) { say('Not moved: a row waits for it.'); return draw(); }
us = us.filter(x => w.indexOf(x) < 0); us.splice.apply(us, [us.indexOf(u) + 1, 0].concat(w)); ids = flat(us);
if (bad(ids)) { say('Not moved: a row would sit above its wait.'); return draw(); }
}
loc = ids; fid = id; say('Moved to ' + (us.indexOf(u) + 1) + ' of ' + us.length + '.'); chg();
}
var SW = { received: ['Received', 'other'], waiting: ['Waiting', 'wait'], in_progress: ['In progress', 'run'], replied: ['Replied', 'done'] };
function chip(p, x, c) { return mk(p, 'span', 'chip ' + (c || 'other'), x); }
function kid(p, c) { var k = (p && p.children) || []; for (var i = 0; i < k.length; i++) if ((' ' + k[i].className + ' ').indexOf(' ' + c + ' ') >= 0) return k[i]; return null; }
function draw() {
if (dead) return;
if (!box) { var col = kid(S.byId('main'), 'cv-col'); if (!col) return; box = el('details', 'cv-queue'); col.insertBefore(box, kid(col, 'cv-dock')); on(W, 'hashchange', draw); }
var rs = rows(), m = map(), ids = ord(), q = qi(), h = (W.location && W.location.hash) || '', z = JSON.stringify([rs, ids, mode, said, h, iss.length, com.length]), t, M, ul, n = 0, p = null;
if (z === sig) return; sig = z;
box.hidden = !rs.length || !/^(#t=home)?$/.test(h); box.textContent = '';
if (box.hidden) return;
mk(box, 'summary', 'q-sum', 'Reorder your messages (' + rs.length + ')');
mk(box, 'p', 'meta', 'Drag a grip to reorder (long-press on a phone; Alt+Up/Down on desktop).');
t = mk(box, 'p', 'meta'); M = { pending: ['Not saved yet', 'q'], saving: ['Saving', 'q'], saved: ['Saved', 'done'] }[mode] || mode && ['Not saved', 'wait'];
if (M) { chip(t, M[0], M[1]); tx(t, ' '); }
if (mode === 'failed') bt(t, 'Retry', retry);
tx(t, !q ? 'No open Queue issue yet: changes can’t be saved.' : mode === 'saved' || !mode ? 'The next session runs this order.' : '');
at(mk(box, 'p', 'muted q-say', said), 'role', 'status');
ul = at(mk(box, 'ul', 'q'), 'aria-label', 'Run order');
units(ids).forEach(u => { var hst = u.length > 1 ? mk(mk(ul, 'li', 'row tied'), 'ul', 'q') : ul; u.forEach(id => { row(hst, m[id], ++n, p, u); p = id; }); });
}
function row(ul, r, n, p, u) {
var x = info(r.id), aft = r.aft || [], li = mk(ul, 'li', 'row' + (p && aft.indexOf(p) >= 0 ? ' waits' : '')), g = at(mk(li, 'span', 'grip'), 'aria-hidden', 'true'), w, s = SW[r.state] || [cap(r.state), 'other'], k = r.tasks || {}, tot = (k.open || 0) + (k.done || 0), set = r.set || {}, sw;
li.tabIndex = 0; at(li, 'data-id', r.id);
if (u[0] === r.id) grip(g, r.id); else g.style.visibility = 'hidden';
mk(li, 'b', null, n + '  ' + x.t);
at(bt(li, '⋯', () => { menu(li, r); }), 'aria-label', 'Row menu');
w = mk(li, 'div', 'who');
if (x.who) chip(w, x.who, 'sender c0');
if (x.at) mk(w, 'span', null, clock(x.at));
chip(w, s[0] + (r.state === 'waiting' && r.eta ? ': reply expected by ' + clock(r.eta) : ''), s[1]);
if (tot) mk(w, 'span', null, tot + ' task' + (tot > 1 ? 's' : '') + ', ' + (k.done || 0) + ' done');
if (r.wait && r.wait.length) {
chip(w, 'Waiting on ' + r.wait.length, 'wait'); li.style.opacity = '.7';
aft.filter(a => r.wait.indexOf(a) >= 0).forEach(a => { var y = (map()[a] || {}).tasks || {}; chip(w, 'After: ' + nm(a) + ' (' + (y.done || 0) + ' of ' + ((y.open || 0) + (y.done || 0)) + ' done)', 'wait'); });
} else if (aft.length) chip(w, 'Ready', 'run');
if (r.nb) chip(w, 'Not before ' + r.nb.replace('T', ' ') + ' ET', 'wait');
if (r.tie) chip(w, 'Tied');
sw = ['model', 'effort', 'split'].filter(y => set[y]).map(y => cap(set[y] === 'one' ? 'one worker' : set[y]));
if (sw.length) chip(w, sw.join(' · '), 'q');
li.onkeydown = e => { if (e.target === li && e.altKey && /^Arrow(Up|Down)$/.test(e.key)) { if (e.preventDefault) e.preventDefault(); moveTo(u[0], ui(r.id) + (e.key === 'ArrowUp' ? -1 : 1)); } };
if (mid === r.id) menu(li, r);
if (fid === r.id && li.focus) { fid = null; later(() => { li.focus(); }, 0); }
}
function grip(g, id) {
g.style.touchAction = 'none'; g.style.cursor = 'grab';
on(g, 'pointerdown', e => {
var ok = e.pointerType !== 'touch', to = -1, ov = -1, hT = ok ? 0 : later(() => { ok = true; if (navigator.vibrate) navigator.vibrate(10); }, 300), top = kid(box, 'q'), lis = [].slice.call(top.children);
if (g.setPointerCapture) g.setPointerCapture(e.pointerId);
function mv(v) {
if (!ok) return;
if (v.preventDefault) v.preventDefault();
if (v.clientY < 60) W.scrollBy(0, -12); else if (v.clientY > W.innerHeight - 60) W.scrollBy(0, 12);
to = ov = lis.length;
lis.forEach((l, k) => { var b = l.getBoundingClientRect(), y = v.clientY - b.top; if (y < b.height / 2 && to > k) to = k; if (y < b.height && ov > k) ov = k; });
lis.forEach((l, k) => { l.style.boxShadow = k === to ? 'inset 0 2px var(--accent)' : k === to - 1 && to === lis.length ? 'inset 0 -2px var(--accent)' : ''; });
}
function up(v) {
['pointermove', 'pointerup', 'pointercancel'].forEach((k, i) => { g.removeEventListener(k, i ? up : mv); });
if (hT) S.stop(hT);
var us = units(ord());
sig = '';
if (!ok || to < 0) return draw();
if (v.shiftKey) return (ov = us[ov] || us[ov - 1]) && ov.indexOf(id) < 0 ? aft(id, ov[0]) : draw();
var k = ui(id); moveTo(id, to > k ? to - 1 : to); draw();
}
on(g, 'pointermove', mv); on(g, 'pointerup', up); on(g, 'pointercancel', up);
});
}
function aft(b, a) {
var k = ui(b), j = ui(a);
if (k === j) return say('Can’t: they are tied.');
if (k < j) { moveTo(b, j); if (ui(b) <= j - 1) return; }
chg('/after ' + b + ' ' + a); say('Set: ' + nm(b) + ' runs after ' + nm(a) + (k < j ? ', moved below it.' : '.'));
}
function menu(li, r) {
var o = kid(li, 'q-menu'), d, others = ord().filter(i => i !== r.id), id = r.id;
if (o) { li.removeChild(o); mid = null; return; }
mid = id; d = mk(li, 'div', 'acts q-menu'); d.style.gridColumn = '1/-1';
bt(d, 'Move to top', () => { moveTo(id, 0); });
bt(d, 'Settings…', () => { sheet(r); });
function pick(l, f) { bt(d, l, () => { var p = mk(d, 'div', 'acts'), s = at(mk(p, 'select', 'field'), 'aria-label', l); others.forEach(i => { mk(s, 'option', null, nm(i)).value = i; }); bt(p, 'OK', () => { f(s.value); }, 'primary'); }); }
if (others.length) {
pick('Run after…', a => { aft(id, a); });
pick('Tie with…', a => { chg('/tie ' + id + ' ' + a); say('Tied: ' + nm(id) + ' and ' + nm(a) + '.'); });
}
bt(d, 'Not before…', () => {
var p = mk(d, 'div', 'acts'), t = at(mk(p, 'input', 'field'), 'aria-label', 'Not before (Eastern time)');
t.type = 'datetime-local'; mk(p, 'span', 'muted', 'Eastern time, at most 30 days ahead');
bt(p, 'OK', () => {
var v = String(t.value || '').slice(0, 16);
if (!/^20\d\d-\d\d-\d\dT\d\d:\d\d$/.test(v)) return say('Pick a time first.');
if (Date.parse(v + 'Z') + 18e6 > Date.now() + 2592e6) return say('At most 30 days ahead.');
chg('/notbefore ' + id + ' ' + v); say('Set: ' + nm(id) + ' not before ' + v.replace('T', ' ') + ' ET.');
}, 'primary');
});
if ((r.aft || []).length || r.nb || r.tie) bt(d, 'Clear conditions', () => { chg('/clear ' + id); say('Cleared the conditions on ' + nm(id) + '.'); });
}
var OPTS = { model: ['fable', 'opus', 'sonnet', 'haiku'], effort: ['low', 'medium', 'high', 'max'], split: ['one', 'team'] };
function sheet(r) {
var cur = Object.assign({}, r.set || {}), back = D.activeElement, id = r.id, s = at(at(at(el('div', 'sheet'), 'role', 'dialog'), 'aria-modal', 'true'), 'aria-label', 'Settings for: ' + nm(id)), a, f0;
mk(s, 'h3', null, nm(id)); mk(s, 'p', 'meta', 'Applies to every task from this message; hard limits win.');
Object.keys(OPTS).forEach(k => {
var f = mk(s, 'fieldset'), g;
mk(f, 'legend', null, cap(k)); g = at(mk(f, 'div', 'opts'), 'role', 'radiogroup');
['company'].concat(OPTS[k]).forEach(v => {
var l = at(mk(g, 'label', v === 'company' ? 'cd' : null, v === 'company' ? 'Company decides' : cap(v === 'one' ? 'one worker' : v)), 'role', 'radio');
var c = (cur[k] || 'company') === v; l.tabIndex = c ? 0 : -1; at(l, 'aria-checked', String(c)); if (c && !f0) f0 = l;
l.onclick = () => { cur[k] = v; [].slice.call(g.children).forEach(c => { at(c, 'aria-checked', String(c === l)); c.tabIndex = c === l ? 0 : -1; }); };
l.onkeydown = e => {
var o = [].slice.call(g.children), j = o.indexOf(l), d = /^Arrow(Down|Right)$/.test(e.key) ? 1 : /^Arrow(Up|Left)$/.test(e.key) ? -1 : 0, n;
if (d || e.key === ' ' || e.key === 'Enter') { if (e.preventDefault) e.preventDefault(); n = d ? o[(j + d + o.length) % o.length] : l; n.onclick(); if (n.focus) n.focus(); }
};
});
});
mk(s, 'p', 'meta', 'Typical cost: not measured yet.');
a = mk(s, 'div', 'acts');
function close() { if (s.parentNode) s.parentNode.removeChild(s); if (back && back.focus) back.focus(); }
bt(a, 'Cancel', close);
bt(a, 'Save', () => {
var kv = Object.keys(OPTS).map(k => k + '=' + (cur[k] || 'company'));
chg('/set ' + id + ' ' + kv.join(' '));
say('Settings for ' + nm(id) + ': ' + kv.join(', ') + '.'); close();
}, 'primary');
s.onkeydown = e => { if (e.key === 'Escape') close(); };
(S.byId('main') || box).appendChild(s);
if (f0 && f0.focus) f0.focus();
}
S.queue = { moveTo: moveTo, flush: flush, fail: fail, sheet: id => sheet(map()[id]), menu: menu, ord: ord };
draw();
})();
