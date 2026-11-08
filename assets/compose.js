// Source with comments: tools/site/assets/compose.js in the company repository.
(() => {
'use strict';
var S = window.CompanySite; if (!S) return;
var el = S.el, on = S.on, later = S.later, LS = localStorage, W = window;
function put(p, c) { return p.appendChild(c); }
function mk(p, tag, cls, text) { return p.appendChild(el(tag, cls, text)); }
function attr(e, k, v) { e.setAttribute(k, v); return e; }
function dragVerdict(dy, ms) { var d = dy > 0 ? dy : 0; return { y: d, hide: d >= 60 || (d >= 24 && ms > 0 && d / ms >= 0.6) }; }
S.compose = (dock, o) => {
var c = { open: !!o.open }, fake = el('button', 'cv-fake'), barSend = el('button', 'cv-send', '↑'), to = el('div', 'cv-to');
var ta = c.ta = el('textarea'), tools = el('div', 'cv-tools'), out = el('p', 'cv-state', '');
(o.tools || []).forEach((b) => put(tools, b));
var hide = mk(tools, 'button', 'cv-tool cv-hide', 'Hide ⌄'), send = mk(tools, 'button', 'cv-send', '↑');
[fake, barSend, hide, send].forEach((b) => { b.type = 'button'; });
attr(barSend, 'aria-label', 'Send'); attr(send, 'aria-label', 'Send'); attr(hide, 'aria-label', 'Hide the composer');
ta.rows = 3; attr(ta, 'aria-label', 'Message'); ta.placeholder = o.ph || '';
attr(out, 'role', 'status');
function dc(x) { dock.className = 'cv-dock' + (o.cls ? o.cls() : '') + (x || ''); }
c.save = () => { if (o.keep && !o.keep()) return; if (ta.value.trim()) LS.setItem(o.key(), ta.value); else LS.removeItem(o.key()); };
c.can = () => !!ta.value.trim() && !S.rejected() && !c.busy;
c.dis = () => { barSend.disabled = send.disabled = !c.can(); };
c.set = (v) => { c.busy = v; c.dis(); };
var grip = el('div', 'cv-grip'), g0 = null, g0t = 0;
attr(grip, 'aria-hidden', 'true'); mk(grip, 'span', 'cv-grip-bar');
function pt(e, k) { var t = (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0]); return t ? t[k] : 0; }
function gy(e) { return pt(e, 'clientY'); }
function gripTo(y) { dock.style.transform = y ? 'translateY(' + y + 'px)' : ''; }
var gx = 0, gOn = false, gSc = null;
function scr(t) { while (t && t !== dock) { if (t.scrollHeight > t.clientHeight + 1 && /auto|scroll/.test((W.getComputedStyle(t) || {}).overflowY || '')) return t; t = t.parentNode; } return null; }
function gripEnd(e, cancel) {
if (g0 === null) return;
var v = dragVerdict(gy(e) - g0, Date.now() - g0t), was = gOn; g0 = null; gOn = false; gSc = null; dc();
if (was && v.hide && !cancel) { gripTo(0); c.hide(); } else gripTo(0);
}
dock.addEventListener('touchstart', (e) => { if (!c.open || (e.touches && e.touches.length > 1)) { g0 = null; return; } g0 = gy(e); gx = pt(e, 'clientX'); g0t = Date.now(); gOn = false; gSc = scr(e.target); if (gSc && gSc.scrollTop > 0) g0 = null; }, { passive: true });
dock.addEventListener('touchmove', (e) => {
if (g0 === null) return;
var dy = gy(e) - g0, dx = pt(e, 'clientX') - gx;
if (!gOn) {
if (dy < 8 || dy < Math.abs(dx)) { if (dy < -8 || (Math.abs(dx) > 8 && Math.abs(dx) > dy)) g0 = null; return; }
gOn = true; dc(' cv-dragging');
}
if (e.cancelable) e.preventDefault();
gripTo(dragVerdict(dy, 1).y);
}, { passive: false });
on(dock, 'touchend', (e) => { gripEnd(e, false); });
on(dock, 'touchcancel', (e) => { gripEnd(e, true); });
c.draw = () => {
dock.textContent = ''; dock.hidden = false;
if (o.on && !o.on()) { mk(dock, 'p', 'muted', 'Sending is off.'); return; }
ta.value = LS.getItem(o.key()) || ''; dc();
c.dis();
if (o.drawn) o.drawn(c.open);
if (!c.open) {
var b = mk(dock, 'div', 'cv-bar'); put(b, fake); put(b, barSend); put(dock, out);
fake.textContent = ta.value.trim() ? ta.value.trim().split('\n')[0] : o.bar();
return;
}
put(dock, grip);
to.textContent = ''; o.to(to);
[to, ta, tools].concat(o.after || [], [out]).forEach((x) => { put(dock, x); });
fit();
};
function fit() { if (ta.style && ta.scrollHeight) { ta.style.height = ''; ta.style.height = ta.scrollHeight + ((ta.offsetHeight - ta.clientHeight) || 0) + 'px'; } }
fake.onclick = () => { c.open = true; c.draw(); if (ta.focus) ta.focus(); };
barSend.onclick = () => { o.send(); };
c.hide = () => { c.save(); if (ta.blur) ta.blur(); c.open = false; c.draw(); };
hide.onclick = c.hide;
on(ta, 'input', () => {
c.save(); c.dis();
if (/failed/.test(out.className)) c.state('', '');
fit();
});
var clearTimer = 0;
c.state = (kind, text, ms) => {
S.stop(clearTimer); out.className = 'cv-state' + (kind ? ' cv-' + kind : ''); out.textContent = text;
if (ms) clearTimer = later(() => { out.className = 'cv-state'; out.textContent = ''; }, ms);
};
send.onclick = (ev) => { if (ev && ev.preventDefault) ev.preventDefault(); o.send(); };
return c;
};
})();
