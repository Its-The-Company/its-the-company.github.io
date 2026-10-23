// Source with comments: tools/site/assets/pitches.js in the company repository.
/* pitches.js: filter, search and sort for /pitches.html. Without it the page is a plain list. */
(function () {
var L = document.getElementById("pc-list"), F = document.getElementById("pf");
if (!L || !F) return;
var cards = [].slice.call(L.children), f = "all", q = "", s = "order";
var rank = { recommended: 0, open: 1, parked: 2, "runner-up": 3 };
var key = {
order: function (c) { return +c.dataset.order; },
status: function (c) { return rank[c.dataset.status] * 1000 + +c.dataset.order; },
grade: function (c) { return +c.dataset.grade * 1000 + +c.dataset.order; },
price: function (c) { return +c.dataset.price * 1000 + +c.dataset.order; },
sales: function (c) { return +c.dataset.sales * 1000 + +c.dataset.order; },
name: function (c) { return c.dataset.name; }
};
function draw() {
var n = 0;
cards.sort(function (a, b) { var x = key[s](a), y = key[s](b); return x < y ? -1 : x > y ? 1 : 0; });
cards.forEach(function (c) {
var ok = (f === "all" || c.dataset.status === f) && (!q || c.textContent.toLowerCase().indexOf(q) > -1);
c.hidden = !ok;
if (ok) n++;
L.appendChild(c);
});
document.getElementById("pf-e").hidden = n > 0;
document.getElementById("pf-n").textContent = n + (n === 1 ? " pitch" : " pitches");
}
F.hidden = false;
[].forEach.call(F.querySelectorAll("button"), function (b) {
b.onclick = function () {
f = b.dataset.f;
[].forEach.call(F.querySelectorAll("button"), function (x) { x.setAttribute("aria-pressed", x === b); });
draw();
};
});
document.getElementById("pf-sort").onchange = function () { s = this.value; draw(); };
document.getElementById("pf-q").oninput = function () { q = this.value.trim().toLowerCase(); draw(); };
function clear() {
f = "all"; q = ""; document.getElementById("pf-q").value = "";
[].forEach.call(F.querySelectorAll("button"), function (x) { x.setAttribute("aria-pressed", x.dataset.f === "all"); });
draw();
}
document.getElementById("pf-c").onclick = clear;
function go() {
var h = location.hash.slice(1), t = h && document.getElementById(h);
if (!t) return;
if (t.hidden) clear();
t.scrollIntoView();
}
window.onhashchange = go;
go();
})();
