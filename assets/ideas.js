// Source with comments: tools/site/assets/ideas.js in the company repository.
/* ideas.js: letter, lane and text filters for /documents/ideas/, over the rows already in the page (no fetch).
Without it the page is the full list. */
(function () {
function D(i) { return document.getElementById(i); }
var L = D("il"), F = D("if");
if (!L || !F) return;
var rows = [].slice.call(L.querySelectorAll(".best-idea")), G = [].slice.call(L.querySelectorAll(".il-g")), t = "all", lane = "", q = "";
var btns = [].slice.call(F.querySelectorAll("[data-t]"));
var sel = D("if-lane"), box = D("if-q");
function draw() {
var n = 0;
rows.forEach(function (r) {
var ok = (t === "all" || r.dataset.tier === t) && (!lane || r.dataset.lane === lane) &&
(!q || r.textContent.toLowerCase().indexOf(q) > -1);
r.hidden = !ok;
if (ok) n++;
});
var f = t !== "all" || lane || q;
G.forEach(function (g) {
g.hidden = !g.querySelector(".best-idea:not([hidden])");
g.open = f ? !g.hidden : g.hasAttribute("data-open");
});
D("if-e").hidden = n > 0;
D("if-n").textContent = n + (n === 1 ? " idea" : " ideas");
}
function press(b) {
t = b.dataset.t;
btns.forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
}
btns.forEach(function (b) { b.addEventListener("click", function () { press(b); draw(); }); });
sel.addEventListener("change", function () { lane = sel.value; draw(); });
box.addEventListener("input", function () { q = box.value.trim().toLowerCase(); draw(); });
D("if-c").addEventListener("click", function () {
press(btns[0]); sel.value = lane = ""; box.value = q = ""; draw();
});
F.hidden = false;
})();
