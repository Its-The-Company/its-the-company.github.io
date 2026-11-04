// Source with comments: tools/site/assets/personal.js in the company repository.
(() => {
'use strict';
var S = window.CompanySite, D = document, fixed = D.getElementById('personal');
if (!S || !fixed || !S.getToken()) return;
var repo = fixed.getAttribute('data-repo'), BILL = 'investors/billing.json', MAX = 40;
var boxes = [], warn = '', opened = false;
var WHAT = 'Each bar: this project, then other use.';
function clean(n) { return typeof n === 'string' ? Array.from(n.replace(/\s+/g, ' ').replace(/\p{C}/gu, '').trim()).slice(0, MAX).join('').trim() : ''; }
var accts = fixed.getAttribute('data-state').split(' ').map((x) => {
var p = x.split(':');
return { id: p[0], on: p[1] === '1' ? true : p[1] === '0' ? false : null, lock: p[2] === '1', pick: p[2] === '1', chose: 0, name: clean(fixed.getAttribute('data-name-' + p[0])), draft: null, edit: 0, arm: 0, armWhat: '', armWas: null, armT: 0, busy: 0, note: '' };
});
function key(a) { return 'personal_lane_' + a.id; }
function lockKey(a) { return key(a) + '_lock_in'; }
function nameKey(a) { return key(a) + '_name'; }
function mode(lock) { return lock ? 'Lock In' : 'Spread'; }
function mk(p, t, c, x) { var e = p.appendChild(D.createElement(t)); if (c) e.className = c; if (x) e.textContent = x; return e; }
function b64(t) { var b = new TextEncoder().encode(t), s = ''; for (var i = 0; i < b.length; i++) s += String.fromCharCode(b[i]); return btoa(s); }
function unb64(s) { var a = atob(s.replace(/\n/g, '')), b = new Uint8Array(a.length); for (var i = 0; i < a.length; i++) b[i] = a.charCodeAt(i); return new TextDecoder().decode(b); }
function path(p) { return '/repos/' + repo + '/contents/' + p; }
function read(p) {
return S.gh(path(p) + '?ref=main').then((r) => {
if (!r.ok) throw new Error(S.said(r));
return r.json();
}).then((j) => {
var o;
try { o = JSON.parse(unb64(j.content || '')); } catch (e) { o = null; }
if (!o || typeof o !== 'object' || Array.isArray(o)) throw new Error('that file on GitHub is not valid JSON');
return { data: o, sha: j.sha };
});
}
function take(o) {
accts.forEach((a) => {
a.on = o[key(a)] === true; a.lock = o[lockKey(a)] === true; a.name = clean(o[nameKey(a)]);
if (a.on) a.chose = 0;
if (!a.chose) a.pick = a.lock;
});
}
function load() {
return read(BILL).then((f) => { take(f.data); warn = ''; }, (e) => { warn = 'Could not read GitHub: ' + e.message + '. This shows the last build.'; }).then(draw);
}
function commit(edit, what, done, again) {
return read(BILL).then((f) => {
var o = f.data, same = edit(o);
if (same) { take(o); return same; }
var h = S.hdrs(); h['Content-Type'] = 'application/json';
return fetch(S.API + path(BILL), { method: 'PUT', headers: h, body: JSON.stringify({
message: 'Investor: personal account ' + what,
content: b64(JSON.stringify(o, null, 2) + '\n'), sha: f.sha, branch: 'main' }) }).then(S.checkAuth, () => {
var e = new Error('no answer'); e.lost = 1; throw e;
}).then((r) => {
var moved = r.status === 409 || r.status === 422;
if (moved && !again) return commit(edit, what, done, 1);
if (moved) throw new Error('the file changed on GitHub twice while saving, so nothing was written; try again');
if (!r.ok) throw new Error(S.said(r) + (r.status === 403 || r.status === 404 ? ' (does the token have Contents: read and write?)' : ''));
take(o);
return done;
});
});
}
function power(a, on, lock) {
return commit((o) => {
if (on && o[key(a)] === true) return 'Already on, ' + mode(o[lockKey(a)] === true) + '; nothing sent.';
if (!on && o[key(a)] !== true) return 'Already off; nothing sent.';
o[key(a)] = on;
if (on) o[lockKey(a)] = lock;
}, a.id + (on ? ' on, ' + mode(lock) : ' off'), on ? 'Saved on GitHub. The company takes it at its next pull: usually within 15 minutes, longer while a session runs.'
: 'Saved on GitHub. A running session stops within about 10 minutes.');
}
function setMode(a, lock) {
return commit((o) => {
if ((o[lockKey(a)] === true) === lock) return 'Already ' + mode(lock) + '; nothing sent.';
o[lockKey(a)] = lock;
}, a.id + ' ' + mode(lock), 'Saved on GitHub. A running session keeps its mode; the next session takes the new one.');
}
function setName(a, n) {
return commit((o) => {
if (clean(o[nameKey(a)]) === n) return 'That name is already saved; nothing sent.';
if (n) o[nameKey(a)] = n; else delete o[nameKey(a)];
}, a.id + ' name', 'Saved on GitHub. Readers without a token see it after the next site build.');
}
function lift(a) {
if (!/^[a-z]$/.test(a.id)) return Promise.resolve('That account has no letter LANE CLEAR can name; nothing sent.');
var title = 'Personal account ' + a.id + ' stopped itself';
return S.gh('/repos/' + repo + '/issues?state=open&labels=emergency&per_page=100').then((r) => {
if (!r.ok) throw new Error(S.said(r));
return r.json();
}).then((list) => {
var hit = (Array.isArray(list) ? list : []).filter((i) => i && !i.pull_request && i.state === 'open' && i.title === title
&& (i.labels || []).some((l) => String((l && l.name) || l).toLowerCase() === 'emergency')).sort((x, y) => y.number - x.number)[0];
if (!hit) return 'Nothing sent: account ' + a.id + ' has no open stop issue, so no trip is holding it.';
var h = S.hdrs(); h['Content-Type'] = 'application/json';
return fetch(S.API + '/repos/' + repo + '/issues/' + hit.number + '/comments', { method: 'POST', headers: h,
body: JSON.stringify({ body: 'LANE CLEAR ' + a.id }) }).then(S.checkAuth, () => null).then((r) => {
if (!r) return 'No answer from GitHub. The comment may have landed: look on #' + hit.number + ' before you tap again.';
if (!r.ok) throw new Error(S.said(r) + (r.status === 403 || r.status === 404 ? ' (does the token have Issues: read and write?)' : ''));
return 'Sent LANE CLEAR ' + a.id + ' on #' + hit.number + ' at ' + new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
+ '. The inbox lifts the stop within minutes and replies on #' + hit.number + ' with what it did.';
});
});
}
function run(a, go) {
a.busy = 1; a.note = 'Sending...'; draw();
go().then((m) => { a.note = m; }, (e) => {
a.note = e && e.lost ? 'No answer from GitHub. The line above shows what it holds now.' : 'Not sent: ' + (e && e.message ? e.message : 'network error') + '.';
return load();
}).then(() => { a.busy = 0; draw(); });
}
function tap(a, what) {
if (a.busy || S.rejected()) return;
var t = Date.now(), was = what === 'mode' ? a.lock : what === 'power' ? a.on : 0;
if (!a.arm || a.armWhat !== what) {
clearTimeout(a.armT); a.arm = t; a.armWhat = what; a.armWas = was; a.note = ''; draw();
a.armT = setTimeout(() => { a.arm = 0; draw(); }, 5000);
return;
}
if (t - a.arm < 400) return;
a.arm = 0; clearTimeout(a.armT);
if (was !== a.armWas) { draw(); return; }
run(a, () => (what === 'mode' ? setMode(a, !a.lock) : what === 'lift' ? lift(a) : power(a, a.on === false, a.pick)));
}
function saveName(a) {
if (a.busy || S.rejected()) return;
a.arm = 0; clearTimeout(a.armT);
var n = clean(a.draft === null ? a.name : a.draft);
run(a, () => setName(a, n).then((m) => { a.draft = null; a.edit = 0; return m; }));
}
function held(e) { if (e.repeat && e.key === 'Enter') e.preventDefault(); }  // L3: a held key is one tap
function et(t) { return new Date(t).toLocaleString('en-US', { timeZone: 'America/New_York', weekday: 'short', hour: 'numeric', minute: '2-digit' }) + ' ET'; }
function meter(b, label, w, none) {
b.bar.hidden = !w; b.bar.style.display = w ? 'flex' : 'none';
if (!w) { b.head.textContent = none; return; }
var p = Math.min(w.project_pct, w.pct), o = w.pct - p;
b.head.textContent = label + ' ' + Math.round(w.pct) + '%' + (w.resets_at ? ', resets ' + et(w.resets_at) : '') + ': about ' + Math.round(p) + '% this project, about ' + Math.round(o) + '% other use' + split(p, w.pct);
b.mine.style.width = p.toFixed(1) + '%'; b.rest.style.width = o.toFixed(1) + '%';
}
function split(p, all) {
if (!(all > 0)) return '';
var s = Math.round(100 * p / all);
return ' (' + s + '% / ' + (100 - s) + '% of its use)';
}
function total() {
var ms = ((S.status() || {}).personal || {}).meters, p = 0, all = 0, n = 0;
accts.forEach((a) => { var r = ms && ms[a.id]; if (r && r.week) { p += Math.min(r.week.project_pct, r.week.pct); all += r.week.pct; n++; } });
return n ? 'All accounts, this week: ' + (all > 0 ? Math.round(100 * p / all) + '% this project, ' + (100 - Math.round(100 * p / all)) + '% other use' : 'nothing used yet') + (n < accts.length ? ' (' + n + ' of ' + accts.length + ' read)' : '') + '.' : '';
}
function meters(w) {
var ms = ((S.status() || {}).personal || {}).meters, r = ms && ms[w.a.id];
var none = !ms ? 'Waiting for the live status.' : 'no reading yet';
meter(w.m5, '5-hour', r && r.five, none);
w.mw.box.hidden = !r; w.mw.box.style.display = r ? 'block' : 'none';
if (r) meter(w.mw, 'Week', r.week, none);
w.read.textContent = r ? 'Read ' + S.ago(r.at) + ' ago.' : '';
}
function draw() {
var no = S.rejected();
boxes = boxes.filter((x) => (x.box.isConnected ? (x.in = 1) : !x.in));
boxes.forEach((x) => {
x.warn.textContent = warn;
x.total.textContent = total();
x.count.textContent = accts.some((a) => a.on === null) ? ' Not known' : ' ' + accts.filter((a) => a.on).length + ' of ' + accts.length + ' on';
x.rows.forEach((w) => {
meters(w);
var a = w.a, off = a.on === false, name = a.name || 'Account ' + a.id;
var armP = a.arm && a.armWhat === 'power', armM = a.arm && a.armWhat === 'mode', armL = a.arm && a.armWhat === 'lift', next = mode(!a.lock), wait = a.busy ? 'true' : 'false';
w.name.textContent = name;
w.state.textContent = a.on === null ? ' Not known' : a.on ? ' On, ' + mode(a.lock) : ' Off';
w.btn.textContent = (armP ? 'Tap again to turn ' : 'Turn ') + (off ? 'on' : 'off');
w.mode.textContent = (armM ? 'Tap again to switch to ' : 'Switch to ') + next;
w.lift.textContent = armL ? 'Tap again to lift stop' : 'Lift stop';
[w.btn, w.mode, w.lift, w.save, w.edit].forEach((b) => { b.setAttribute('aria-disabled', wait); });
w.btn.setAttribute('aria-label', w.btn.textContent + ': ' + name);
w.mode.setAttribute('aria-label', w.mode.textContent + ': ' + name);
w.lift.setAttribute('aria-label', w.lift.textContent + ': ' + name);
w.save.setAttribute('aria-label', 'Save name for ' + name);
w.edit.setAttribute('aria-label', 'Edit name: ' + name);
w.edit.setAttribute('aria-expanded', a.edit ? 'true' : 'false');
w.btn.hidden = no;
w.sel.hidden = no || !off;
w.mode.hidden = no || a.on !== true;
w.lift.hidden = no;
w.edit.hidden = no;
var named = !no && a.edit;
w.names.hidden = !named;
w.names.style.display = named ? 'flex' : 'none';
w.sel.value = a.pick ? 'lock' : 'spread';
w.sel.setAttribute('aria-label', 'Mode for ' + name);
w.input.setAttribute('aria-label', 'Name for ' + name);
var v = a.draft === null ? a.name : a.draft;
if (w.input.value !== v) w.input.value = v;
w.note.textContent = a.note || (armP ? 'Tap again within 5 seconds to turn ' + (off ? 'on, ' + mode(a.pick) : 'off') + '.'
: armM ? 'Tap again within 5 seconds to switch to ' + next + '.'
: armL ? 'Tap again within 5 seconds to post LANE CLEAR ' + a.id + ' on its open “Personal account ' + a.id + ' stopped itself” issue.' : '');
});
});
}
function bar(row) {
var box = mk(row, 'span'), b = { box: box, head: mk(box, 'span', 'cv-sub'), bar: mk(box, 'span', 'cv-meter') };
box.style.display = b.head.style.display = 'block';
b.mine = mk(b.bar, 'i'); b.rest = mk(b.bar, 'i'); b.rest.style.background = 'var(--muted)';
return b;
}
function mount(g) {
var box = D.createElement('details'); box.className = 'cv-tile cv-personal'; box.style.gridColumn = '1/-1'; box.style.display = 'block'; box.open = opened;
box.ontoggle = () => { opened = box.open; };
g.appendChild(box);
var sum = mk(box, 'summary');
mk(sum, 'small', null, 'Personal Accounts');
mk(box, 'span', 'cv-sub', WHAT).style.display = 'block';
var x = { box: box, count: mk(sum, 'span', 'cv-sub'), total: mk(box, 'span', 'cv-sub'), warn: mk(box, 'span', 'cv-sub'), rows: accts.map((a) => {
var row = mk(box, 'p'), w = { a: a, name: mk(row, 'strong'), state: mk(row, 'span') };
w.name.style.overflowWrap = 'anywhere';
mk(row, 'span', null, ' ');
w.edit = mk(row, 'button', 'btn cv-pedit', 'Edit'); w.edit.type = 'button'; w.edit.style.padding = '0 8px'; w.edit.style.fontSize = 'var(--fs-0)';
w.edit.onclick = () => { if (a.busy || S.rejected()) return; a.edit = a.edit ? 0 : 1; a.draft = null; draw(); if (a.edit) w.input.focus(); };
w.m5 = bar(row); w.mw = bar(row);
w.read = mk(row, 'span', 'cv-sub'); w.read.style.display = 'block';
w.sel = mk(row, 'select', 'field'); w.sel.style.width = 'auto';
[['spread', 'Spread'], ['lock', 'Lock In']].forEach((o) => { mk(w.sel, 'option', null, o[1]).value = o[0]; });
w.sel.onchange = () => { a.pick = w.sel.value === 'lock'; a.chose = 1; a.arm = 0; clearTimeout(a.armT); draw(); };
mk(row, 'span', null, ' ');
w.btn = mk(row, 'button', 'btn cv-ppower'); w.btn.type = 'button'; w.btn.onclick = () => tap(a, 'power'); w.btn.onkeydown = held;
mk(row, 'span', null, ' ');
w.mode = mk(row, 'button', 'btn cv-pmode'); w.mode.type = 'button'; w.mode.onclick = () => tap(a, 'mode'); w.mode.onkeydown = held;
mk(row, 'span', null, ' ');
w.lift = mk(row, 'button', 'btn cv-plift'); w.lift.type = 'button'; w.lift.onclick = () => tap(a, 'lift'); w.lift.onkeydown = held;
w.names = mk(row, 'span'); w.names.style.gap = '8px'; w.names.style.marginTop = '8px'; w.names.style.flexWrap = 'wrap';
w.input = mk(w.names, 'input', 'field'); w.input.type = 'text'; w.input.maxLength = MAX; w.input.placeholder = 'Name for this account'; w.input.autocomplete = 'off';
w.input.style.flex = '1 1 180px'; w.input.style.width = 'auto'; w.input.style.minWidth = '0';
w.input.oninput = () => { a.draft = w.input.value; };
w.input.onkeydown = (e) => { if (e.key === 'Enter') { e.preventDefault(); if (!e.repeat) saveName(a); } };
w.save = mk(w.names, 'button', 'btn cv-pname', 'Save name'); w.save.type = 'button'; w.save.onclick = () => saveName(a);
w.note = mk(row, 'small', 'meta cv-locknote'); w.note.setAttribute('role', 'status'); w.note.style.display = 'block';
return w;
}) };
boxes.push(x); draw();
}
S.endTile = mount;
[].slice.call(D.querySelectorAll('.cv-glance')).forEach((g) => { if (!g.querySelector('.cv-personal')) mount(g); });
if (S.onReject) S.onReject.push(draw);
if (S.onStatus) S.onStatus.push(draw);
D.addEventListener('visibilitychange', () => { if (!D.hidden && !S.rejected() && !accts.some((a) => a.busy)) load(); });
load();
})();
