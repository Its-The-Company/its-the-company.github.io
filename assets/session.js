// Source with comments: tools/site/assets/session.js in the company repository.
(function () {
var S = window.CompanySite || {}, D = document, H = D.getElementById('lk-reply'), P = D.getElementById('ts-page');
function clock(ms) {  // 12-hour, AM/PM, Eastern (T-3742)
return new Date(ms).toLocaleString('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit', hour12: true });
}
if (H) {
var rep = H.querySelector('.lk-rep');
var reply = function (st) {
var r = (st && st.reply) || {}, sec = typeof r.seconds === 'number' && isFinite(r.seconds) ? r.seconds : null, sent = Date.parse(r.sent);
rep.hidden = sec === null; rep.textContent = sec === null ? '' : 'Last Investor reply: ' + (sec / 60).toFixed(1) + ' min';
rep.className = 'lk-rep' + (sec > 300 ? ' late' : ''); rep.title = sent ? 'Message sent ' + clock(sent) : '';
};
if (rep && S.onStatus) { S.onStatus.push(reply); if (S.status && S.status()) reply(S.status()); }
}
if (!P) return;
function store(name) { try { return window[name]; } catch (e) { return null; } }
function load(st, key) { try { return JSON.parse(st.getItem(key)) || {}; } catch (e) { return {}; } }
function save(st, key, v) { try { st.setItem(key, JSON.stringify(v)); } catch (e) {} }
var KEEP = { w: [store('localStorage'), 'ts-workers'], t: [store('sessionStorage'), 'ts-tasks'] };
var mem = { w: load(KEEP.w[0], KEEP.w[1]), t: load(KEEP.t[0], KEEP.t[1]) }, seen = {};
function kind(d) { return d.classList.contains('ts-w') ? 'w' : 't'; }
[].forEach.call(P.querySelectorAll('details[id]'), function (d) {
var m = mem[kind(d)];
if (kind(d) === 't') seen[d.id] = 1;
if (Object.prototype.hasOwnProperty.call(m, d.id)) d.open = !!m[d.id];
});
Object.keys(mem.t).forEach(function (k) { if (!seen[k]) delete mem.t[k]; });  // a task that left the page is forgotten
var at = Date.parse(P.getAttribute('data-at')), age = D.getElementById('ts-age');
function ago() {
if (!age || !at) return;
var m = Math.floor((Date.now() - at) / 6e4);
age.textContent = m < 0 ? '' : ' (' + (m < 1 ? 'under a minute' : m < 60 ? m + ' min' : Math.floor(m / 60) + ' h ' + m % 60 + ' min') + ' ago)';
}
P.addEventListener('click', function (e) {
var s = e.target.closest ? e.target.closest('summary') : null, d = s && s.parentNode;
if (!d || !d.id || d.tagName !== 'DETAILS') return;
setTimeout(function () { var k = kind(d); mem[k][d.id] = d.open ? 1 : 0; save(KEEP[k][0], KEEP[k][1], mem[k]); ago(); }, 0);
});
function show() {  // #T-1234: open the task and the worker it is under
var id = '', el;
try { id = decodeURIComponent(location.hash.slice(1)); } catch (e) {}
el = id && D.getElementById(id);
if (!el || !P.contains(el)) return;
for (var n = el; n && n !== P; n = n.parentNode) if (n.tagName === 'DETAILS') n.open = true;
el.scrollIntoView();
}
show(); window.addEventListener('hashchange', show);
ago(); window.addEventListener('pageshow', ago);
D.addEventListener('visibilitychange', function () { if (!D.hidden) ago(); });
if (S.onStatus) S.onStatus.push(ago);
})();
