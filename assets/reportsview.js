// Source with comments: tools/site/assets/reportsview.js in the company repository.
/* reportsview.js: remembers the Folders / Newest choice on Documents (T-4109). Both lists are whole without it.
Click a switch link and the choice is saved; /documents/ opens on Newest when that was the last choice. */
(function () {
var K = "company.reportsView", n = document.querySelector('.rv-sw a[data-view="newest"]');
function get() { try { return localStorage.getItem(K); } catch (e) { return ""; } }
[].forEach.call(document.querySelectorAll(".rv-sw a[data-view]"), function (a) {
a.addEventListener("click", function () { try { localStorage.setItem(K, a.getAttribute("data-view")); } catch (e) {} });
});
if (n && !n.hasAttribute("aria-current") && !location.hash && get() === "newest") location.replace(n.href);
})();
