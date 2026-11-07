// Source with comments: tools/site/assets/scoreboard.js in the company repository.
(function () {
var K = 'company.scoreboard', D = document, W = window;
function on() { try { return W.sessionStorage.getItem(K) === '1'; } catch (e) { return false; } }
function show() { var a = D.querySelectorAll('[data-scoreboard]'); for (var i = 0; i < a.length; i++) a[i].hidden = false; }
if (on()) show();
D.addEventListener('input', function (e) {
var t = e.target;
if (!t || t.tagName !== 'TEXTAREA' || !t.closest || !t.closest('.cv-dock') || !/scoreboard/i.test(t.value)) return;
try { W.sessionStorage.setItem(K, '1'); } catch (x) { }
t.value = t.value.replace(/scoreboard/ig, '').replace(/^\s+$/, '');
t.dispatchEvent(new Event('input', { bubbles: true }));
show();
});
})();
