// Source with comments: tools/site/assets/setup.js in the company repository.
(() => {
'use strict';
var S = window.CompanySite; if (!S) return;
var el = S.el, byId = S.byId, gh = S.gh;
var root = byId('chat-root') || byId('token-root'); if (!root) return;
var repo = root.getAttribute('data-repo') || '', owner = repo.split('/')[0], rname = repo.split('/')[1], home = root.getAttribute('data-home') || './';
function txt(t) { return document.createTextNode(t); }
function mk(p, tag, cls, text) { return p.appendChild(el(tag, cls, text)); }
var NEW = 'https://github.com/settings/personal-access-tokens/new?name=company%20site%20chat&description=The%20Company%20site&target_name=' +
encodeURIComponent(owner) + '&expires_in=90&issues=write&contents=read&actions_variables=read';
var KEYS = 'https://github.com/settings/personal-access-tokens', APPROVE = 'https://github.com/organizations/' + owner + '/settings/personal-access-token-requests';
var STEP = 'company.step', at = /^#name/.test(location.hash) ? 6 : +(sessionStorage.getItem(STEP) || 1), login = '';
var wiz = el('div', 'cv-wiz'), first = byId('first-run'), tr = byId('token-root');
var host = first || tr; host.parentNode.insertBefore(wiz, host);
if (first) first.hidden = true; if (tr) tr.hidden = true;
function link(p, text, href, cls) { var a = mk(p, 'a', cls || 'btn primary', text); a.href = href; a.target = '_blank'; a.rel = 'noopener'; return a; }
function btn(p, text, fn, cls) { var b = mk(p, 'button', cls || 'btn', text); b.type = 'button'; b.onclick = fn; return b; }
function para(p, parts) {
var e = mk(p, 'p');
parts.forEach((x, k) => { if (k % 2) mk(e, 'b', null, x); else e.appendChild(txt(x)); });
return e;
}
function go(n) { at = n; sessionStorage.setItem(STEP, String(n)); draw(); scrollTo(0, 0); }
function draw() {
wiz.textContent = '';
var bar = mk(wiz, 'ol', 'cv-steps'), k; bar.setAttribute('aria-hidden', 'true');
for (k = 1; k <= 6; k++) mk(bar, 'li', k < at ? 'cv-done' : k === at ? 'cv-here' : '');
var s = mk(wiz, 'section', 'cv-step');
mk(s, 'p', 'cv-of', 'Step ' + at + ' of 6');
var h = mk(s, 'h2'), act = el('div', 'cv-do');
STEPS[at - 1](s, h, act);
s.appendChild(act);
btn(s, at === 1 ? '← Not now' : '← Back', () => { if (at > 1) return go(at - 1); sessionStorage.removeItem(STEP); location.replace(location.pathname); }, 'cv-back');
}
var STEPS = [
(s, h, act) => {
h.textContent = 'Sign in to GitHub as yourself';
para(s, ['Sign this browser in to ', 'your own', ' GitHub account (the one on the Investors’ list, not the company’s). The key you make stays on this device.']);
btn(act, 'Signed in, next', () => go(2), 'btn primary');
},
(s, h, act) => {
h.textContent = 'Make the key on GitHub';
mk(s, 'p', null, 'The button opens GitHub with these filled in (set any blank one by hand):');
var li = mk(mk(s, 'ul', 'cv-filled'), 'li'); mk(li, 'span', 'cv-ok', '✓'); li.appendChild(txt('Name, owner ' + owner + ', 90 days; Issues: read and write; Contents and Variables: read'));
para(s, ['', 'Set by hand:', ' under Repository access pick the middle option, then ' + rname + ':']);
var sc = mk(s, 'div', 'cv-schem'); sc.setAttribute('aria-label', 'GitHub’s options');
mk(sc, 'p', 'cv-cap', 'Repository access');
['Public repositories', 'Only select repositories', 'All repositories'].forEach((t, k) => {
var r = mk(sc, 'div', 'cv-radio' + (k === 1 ? ' cv-pick' : '')); mk(r, 'i'); r.appendChild(txt(t));
if (k === 1) { mk(r, 'span', 'cv-arrow', '← this one'); mk(sc, 'div', 'cv-pickrepo', repo); }
});
para(s, ['Then press ', 'Generate token', ' at the bottom.']);
link(act, 'Open GitHub (new tab)', NEW);
btn(act, 'Done, next', () => go(3));
},
(s, h, act) => {
h.textContent = 'Copy the key';
para(s, ['GitHub shows it once (it starts ', 'github_pat_', '). If it says pending, an org owner approves it first.']);
link(act, 'Pending approvals (org owner)', APPROVE, 'btn');
btn(act, 'Copied, next', () => go(4), 'btn primary');
},
(s, h, act) => {
h.textContent = 'Paste it here';
var f = mk(s, 'input', 'field'); f.type = 'password'; f.autocomplete = 'off'; f.placeholder = 'github_pat_...'; f.setAttribute('aria-label', 'GitHub key');
var lab = mk(s, 'label', 'check'), keep = el('input'); keep.type = 'checkbox'; keep.checked = !!navigator.standalone; lab.appendChild(keep);
lab.appendChild(txt(' Keep me signed in here'));
mk(s, 'p', 'muted', 'Sent only to api.github.com.');
btn(act, 'Check', () => {
var t = f.value.trim(); if (!t) return f.focus();
S.setToken(t, keep.checked); f.value = ''; go(5);
}, 'btn primary');
},
(s, h, act) => {
h.textContent = 'Checking your key';
var ul = mk(s, 'ul', 'cv-checks'), rows = [];
['GitHub accepts the key.', 'On the Investors’ list.', 'Sees the conversations.', 'Reads the live status.'].forEach((t) => {
var li = mk(ul, 'li', 'cv-todo'); mk(li, 'span', 'cv-mk', '·'); rows.push([li, mk(li, 'span', null, t)]);
});
function mark(k, ok, text, fix) {
var r = rows[k]; r[0].className = ok ? 'cv-pass' : 'cv-fail'; r[0].firstChild.textContent = ok ? '✓' : '!';
if (text) r[1].textContent = text; if (fix) mk(r[0], 'span', 'cv-fix', fix);
}
var again = btn(act, 'Check again', draw), next = btn(act, 'Next', () => go(6), 'btn primary');
next.hidden = true;
gh('/user').then((r) => {
if (!r.ok) throw [0, 'GitHub does not accept this key. Paste it again (step 4) or make a new one (step 2).'];
return r.json();
}).then((u) => {
login = String(u.login || ''); mark(0, true);
return gh('/repos/' + repo).then((r) => {
if (r.ok) return;
return r.json().catch(() => ({})).then((j) => {
throw [2, /pending/i.test(j.message) ? 'Waiting for an org owner to approve the key (step 3).'
: 'Open your key on GitHub, set Repository access to Only select repositories → ' + rname + ', and press Update. You do not need a new key.'];
});
});
}).then(() => {
return gh('/repos/' + repo + '/contents/investors/allowlist.md').then((r) => { if (!r.ok) throw [2, S.said(r) + '.']; return r.json(); });
}).then((f) => {
mark(2, true);
var names = atob(String(f.content || '').replace(/\n/g, '')).replace(/<!--[\s\S]*?-->/g, '').split('\n').map((l) => l.replace(/^\s*([*-]\s+)?@?/, '').trim().toLowerCase());
if (names.indexOf(login.toLowerCase()) < 0) throw [1, 'This key belongs to @' + login + ', which is not on the Investors’ list.'];
mark(1, true, '@' + login + ' is on the Investors’ list.');
return gh('/repos/' + repo + '/actions/variables/COMPANY_STATUS');
}).then((r) => {
if (r.ok) mark(3, true); else mark(3, false, null, 'Live status needs Variables: Read-only. Edit the key on GitHub; the chat works without it.');
next.hidden = false; again.hidden = !!r.ok;
}).catch((e) => {
if (!Array.isArray(e)) e = [0, 'Could not reach GitHub. Press Check again.'];
mark(e[0], false, null, e[1]);
link(act, 'My keys on GitHub', KEYS, 'btn');
});
},
(s, h, act) => {
h.textContent = 'You’re set';
mk(s, 'p', null, 'Display name on your messages (optional):');
var f = mk(s, 'input', 'field'); f.type = 'text'; f.maxLength = 40; f.setAttribute('aria-label', 'Display name (optional)');
f.value = localStorage.getItem(S.NAME) || login;
btn(act, 'Open the conversations', () => {
localStorage.setItem(S.NAME, f.value.replace(/[^A-Za-z0-9 _.-]/g, '').trim().slice(0, 40));
sessionStorage.removeItem(STEP);
location.href = home + '?k=' + Date.now() + '#t=home';
}, 'btn primary');
}
];
draw();
})();
