// Source with comments: tools/site/assets/swipe.js in the company repository.
(function () {
var x, y, t, on = false;
var NO = 'input,textarea,select,button,[contenteditable],pre,code,table,.subtabs,.cv-dock,.cv-tabs,.filters';
function order() {
var top = [].slice.call(document.querySelectorAll('nav.tabs a')), sub = document.querySelectorAll('nav.subtabs a'), i;
if (sub.length) {
for (i = 0; i < top.length; i++) if (top[i].getAttribute('aria-current')) break;
if (i < top.length) top.splice.apply(top, [i, 1].concat([].slice.call(sub)));
}
return top;
}
function scrolls(el) {
for (; el && el !== document.body; el = el.parentElement) {
var o = getComputedStyle(el).overflowX;
if ((o === 'auto' || o === 'scroll') && el.scrollWidth > el.clientWidth + 1) return true;
}
return false;
}
function picked() {
var s = window.getSelection && getSelection();
return !!(s && String(s).length);
}
document.addEventListener('touchstart', function (e) {
var p = e.touches[0], el = e.target, w = document.documentElement.clientWidth;
on = e.touches.length === 1 && !(window.visualViewport && visualViewport.scale > 1.01) && p.clientX > 24 && p.clientX < w - 24
&& !(el.closest && el.closest(NO)) && !scrolls(el) && !picked();
x = p.clientX; y = p.clientY; t = Date.now();
}, {passive: true});
document.addEventListener('touchmove', function (e) { if (e.touches.length > 1) on = false; }, {passive: true});
document.addEventListener('touchcancel', function () { on = false; }, {passive: true});
document.addEventListener('touchend', function (e) {
if (!on || e.touches.length) return;
on = false;
var p = e.changedTouches[0], dx = p.clientX - x, dy = p.clientY - y;
if (Math.abs(dx) <= 60 || Math.abs(dx) <= 2 * Math.abs(dy) || Date.now() - t >= 600 || picked()) return;
var a = order(), i;
for (i = 0; i < a.length; i++) if (a[i].getAttribute('aria-current')) break;
var go = a[i + (dx < 0 ? 1 : -1)];
if (i < a.length && go) location.href = go.href;
}, {passive: true});
})();
