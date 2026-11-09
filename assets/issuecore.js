// Source with comments: tools/site/assets/issuecore.js in the company repository.
(() => {
'use strict';
var S = window.CompanySite || {}, el = S.el, repo = '';
function mk(p, tag, cls, text) { return p.appendChild(el(tag, cls, text)); }
var B = '(?:\\*\\*|__)', BS = '(?:' + B + '[ \\t]*)?';
var LINE = new RegExp('^[ \\t]*(?:[-*+][ \\t]+)?' + BS + '\\(?([A-Fa-f])(?:[ \\t]+\\(([^)\\n]{1,30})\\))?' + B + '?[ \\t]*[.):\\u2014-]+[ \\t]*' + BS + '(\\S.*)$', 'gm');
var DEF = /(?:^|[\s(])([A-Fa-f])[ \t]*=[ \t]*([^.\n]+)/g;
var BOLD = /(?:\*\*|__)([A-Fa-f])(?:\*\*|__)([^*\n]*)/g;
var SAYS = /\b(?:reply|replies|answer|say)\b/i;
var PAIR = /\b(?:[Rr]eply|[Aa]nswer|[Ss]ay)\s+(?:with\s+)?["\u201c*]*([A-Z][a-z]{0,11})["\u201d*]*\s+or\s+["\u201c*]*([A-Z][a-z]{0,11})\b/;
var NOTE = /<!--[\s\S]*?(?:-->|$)/g;
function prep(s) { return String(s || '').slice(0, 20000).replace(NOTE, '').replace(/\r/g, '').replace(/```[\s\S]*?```/g, ''); }
function clean(s) { return String(s || '').slice(0, 1000).replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/\*\*|__|`/g, '').replace(/\s+/g, ' ').trim(); }
function short(s) {
s = clean(String(s).slice(0, 400));
if (s.charAt(0) === '(') { var e = s.indexOf(')'); if (e > 0) s = s.slice(1, e); }
s = s.replace(/^[\s:.,;)\u2014-]+/, '').replace(/[\s,;]+(?:(?:or|and)[\s,;]*)?$/i, '');
return s.length > 90 ? s.slice(0, 87).replace(/\s+\S*$/, '') + '...' : s;
}
function sentence(s) { var m = /^[\s\S]*?[.!?](?=\s|$)/.exec(s); return m ? m[0] : s; }
function options(text) {
var t = prep(text), out = [], seen = {}, m;
function add(k, label, reply) { var K = String(k).toUpperCase(), key = K.length === 1 ? K : String(k); if (seen[K]) return; seen[K] = 1; out.push({ key: key, label: short(label), reply: reply || key }); }
function done() { if (out.length >= 2 && seen.A) return out; out = []; seen = {}; return null; }
function letters(re, lab) { re.lastIndex = 0; while ((m = re.exec(t))) add(m[1], lab(m)); return done(); }
var r = letters(LINE, (x) => x[3] + (x[2] ? ' (' + x[2] + ')' : '')) ||
letters(DEF, (x) => x[2]) ||
letters(BOLD, (x) => sentence(x[2]));
if (r) return r;
t.split('\n').forEach((ln) => {
if (out.length || !SAYS.test(ln)) return;
var q = [], re = /\*\*([^*\n]{1,40}?)\*\*|["\u201c]([^"\u201d\n]{2,60})["\u201d]/g;
while ((m = re.exec(ln))) { var w = (m[1] || m[2] || '').trim(); if (w && !/[:.]$/.test(w) && w.split(/\s+/).length <= 6) q.push(w); }
if (q.length >= 2) q.forEach((w) => add(w, w, w));
});
if (out.length) return out;
m = PAIR.exec(t);
if (m && m[1] !== m[2]) { add(m[1], m[1], m[1]); add(m[2], m[2], m[2]); }
return out;
}
function isReceipt(b) { return /\(automatic receipt\)\s*$/.test(b || ''); }
function who(c) { var u = c && (c.user || c.author); return String((u && u.login) || '').toLowerCase(); }
function pickAsk(issue, cs, inv, repo) {
var co = [], last = -1;
cs.forEach((c, i) => { if (inv(who(c))) last = i; else if (!isReceipt(c.body)) co.push({ c: c, i: i }); });
var after = co.filter((x) => x.i > last), pool = after.length ? after : co, hit = null;
for (var k = pool.length - 1; k >= 0 && !hit; k--) if (options(pool[k].c.body).length) hit = pool[k];
if (!hit && after.length) hit = after[after.length - 1];
var src = hit ? hit.c : issue, opts = options(src && src.body);
return { src: src, body: (src && src.body) || '', imgs: images(src && src.body, repo), at: (src && src.created_at) || '', opts: opts, answered: !!hit && last > hit.i, lastInv: last >= 0 ? cs[last] : null };
}
var START = /^[ \t]*(?:#{1,4}[ \t]+(?:\*\*|__)?(?:Option[ \t]+)?\(?([A-Fa-f])\)?(?:\*\*|__)?[ \t]*(?:$|[.:,\u2014-])|(?:[-*+][ \t]+)?(?:(?:\*\*|__)[ \t]*)?\(?([A-Fa-f])(?:[ \t]+\([^)\n]{1,30}\))?(?:\*\*|__)?[ \t]*[.):,\u2014-])/;
var IMG = /!\[([^\]]{0,400})\]\(\s*<?([^)\s>]{1,400})>?(?:\s[^)]{0,400})?\)|<img\b([^>]{0,800})>/gi;
function where(u, repo) {
u = String(u || '').replace(/[?#].*$/, '');
var m = /^[a-z]+:\/\/(?:(?:www\.)?github\.com\/([^/]+\/[^/]+)\/(?:blob|raw)|raw\.githubusercontent\.com\/([^/]+\/[^/]+))\/([^/]+)\/(.+)$/i.exec(u), r = { ref: '', path: u };
if (m) { if ((m[1] || m[2]).toLowerCase() !== String(repo).toLowerCase()) return null; r = { ref: m[3], path: m[4] }; } else if (/^[a-z][\w+.-]*:|^\/\//i.test(u)) return null;
try { r.path = decodeURIComponent(r.path).replace(/^\.?\//, ''); } catch (e) { return null; }
return /(^|\/)\.\.(\/|$)/.test(r.path) || !/\.(png|jpe?g|gif|webp|svg)$/i.test(r.path) ? null : r;
}
function images(text, repo) {
var out = [], key = '';
prep(text).split('\n').forEach((ln) => {
var s = START.exec(ln), m; if (s) key = (s[1] || s[2]).toUpperCase();
IMG.lastIndex = 0;
while ((m = IMG.exec(ln))) {
var at = m[3] || '', src = m[2] || (/\bsrc=["']([^"']+)/i.exec(at) || [])[1], w = where(src, repo);
if (w) out.push({ key: key, alt: clean(m[2] ? m[1] : (/\balt=["']([^"']*)/i.exec(at) || [])[1]), path: w.path, ref: w.ref });
}
});
return out;
}
function answered(i, last, inv) { return last ? isReceipt(last.body) || inv(who(last)) : inv(who(i)); }
function ago(iso, now) {
var s = Math.max(0, Math.floor(((now || Date.now()) - Date.parse(iso)) / 1000)), n, u;
if (!(s >= 0)) return '';
if (s < 60) return 'asked just now';
if (s < 3600) { n = Math.floor(s / 60); u = 'minute'; } else if (s < 172800) { n = Math.floor(s / 3600); u = 'hour'; } else { n = Math.floor(s / 86400); u = 'day'; }
return 'asked ' + n + ' ' + u + (n === 1 ? '' : 's') + ' ago';
}
if (typeof document !== 'undefined' && document.querySelectorAll) Array.prototype.forEach.call(document.querySelectorAll('time.ic-at[datetime]'),(t) => { var a = ago(t.getAttribute('datetime')); if (a) t.textContent = a; });
function plain(b) { return String(b || '').replace(NOTE, '').replace(/<img[^>]{0,800}>/gi, '[image]').replace(/!\[([^\]]{0,400})\]\([^)]{0,800}\)/g, '[image: $1]').replace(/\r/g, '').trim(); }
function when(iso) { return S.clock(iso, { weekday: 'short' }); }
function day(iso) { return S.clock(iso, { month: 'short', day: 'numeric' }); }
function getJ(p) { return S.gh(p).then((r) => { if (!r.ok) throw new Error(S.said(r)); return r.json(); }); }
function send(method, p, body) {
var h = S.hdrs(); h['Content-Type'] = 'application/json';
return fetch(S.API + p, { method: method, headers: h, body: JSON.stringify(body) }).then(S.checkAuth);
}
function allow() {
try { var a = JSON.parse(S.tokenStore().getItem(S.ALLOW) || 'null'); if (a && Array.isArray(a.names)) return Promise.resolve(a.names); } catch (e) { /* read it */ }
return getJ('/repos/' + repo + '/contents/investors/allowlist.md').then((f) => S.parseAllow(atob(f.content.replace(/\n/g, ''))), () => []);
}
function thread(i) {
var p = RI + '/' + i.number + '/comments?per_page=100';
if (i.comments > 100) p += '&page=' + Math.ceil(i.comments / 100);
return getJ(p);
}
function pic(p, im) {
var a = mk(p, 'a', 'ny-pic', 'Loading ' + im.path + '...'), h = S.hdrs(), x = im.path.split('.').pop().toLowerCase();
h.Accept = 'application/vnd.github.raw'; if (im.alt) mk(p, 'span', 'meta', im.alt);
fetch(S.API + '/repos/' + repo + '/contents/' + im.path.split('/').map(encodeURIComponent).join('/') + (im.ref ? '?ref=' + encodeURIComponent(im.ref) : ''), { headers: h })
.then(S.checkAuth).then((r) => { if (!r.ok) throw new Error(r.status === 404 ? 'not on GitHub yet' : S.said(r)); return r.blob(); })
.then((bl) => {
var u = URL.createObjectURL(new Blob([bl], { type: 'image/' + ({ jpg: 'jpeg', svg: 'svg+xml' }[x] || x) })), img = el('img');
img.src = u; img.alt = im.alt || im.path; a.textContent = ''; a.appendChild(img);
if (x !== 'svg') { a.href = u; a.target = '_blank'; a.title = 'Open full size'; }
}, (e) => { a.className = 'meta ny-warn'; a.textContent = (im.alt || im.path) + ': ' + e.message + '.'; });
}
var FEN = /^ {0,3}(`{3,}|~{3,})/, HEAD = /^ {0,3}(#{1,6})(?:[ \t]|$)/, RULE = /^ {0,3}([-*_])[ \t]*(?:\1[ \t]*){2,}$/, QUO = /^ {0,3}>[ \t]?/,
ITEM = /^( {0,12})([-*+]|\d{1,9}[.)])(?:[ \t]+|$)/, TASK = /^\[([ xX])\][ \t]+/, ALIGN = /^:?-{1,}:?$/, ENT = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", apos: "'", nbsp: ' ' };
var INL = new RegExp(['\\\\([\\\\`*_{}\\[\\]()#+\\-.!|~<>])', '`([^`\\n]{1,2000})`',
'(!?)\\[([^\\[\\]\\n]{0,500})\\]\\(<?([^()\\s<>]{1,800})>?(?:[ \\t]{1,9}"[^"\\n]{0,200}")?\\)',
'\\*\\*([^*\\n]{1,500})\\*\\*', '__([^_\\n]{1,500})__(?!\\w)', '~~([^~\\n]{1,500})~~', '\\*([^*\\s][^*\\n]{0,500})\\*', '_([^_\\s][^_\\n]{0,500})_(?!\\w)',
'(<br[ \\t]*\\/?>)', '<img\\b([^<>\\n]{0,800})>', '(<\\/?(?:details|summary|sub|sup|b|i|em|strong|kbd|p|div|span|u|ins|del|small|center|picture|source)\\b[^<>\\n]{0,200}>)',
'(https?:\\/\\/[^\\s<>"\'\\[\\]]{1,800})', '#(\\d{1,6})\\b', '&(amp|lt|gt|quot|#39|apos|nbsp);'].join('|'), 'g');
function lead(x) { return x.search(/\S|$/); }
function href(a, u) { a.href = u; a.target = '_blank'; a.rel = 'noopener'; return a; }
function inl(p, s, pics, d) {
var at = 0, m, T = (t) => { if (t) p.appendChild(document.createTextNode(t)); };
function nest(box, t) { var k = INL.lastIndex; if (d < 3) inl(box, t, pics, d + 1); else box.textContent = t; INL.lastIndex = k; return box; }
INL.lastIndex = 0;
while ((m = INL.exec(s))) {
var i = m.index, pre = s.charAt(i - 1), w;
T(s.slice(at, i)); at = INL.lastIndex;
if ((m[7] != null || m[10] != null || m[15] != null) && /[\w&\/]/.test(pre)) { T(m[0].charAt(0)); INL.lastIndex = at = i + 1; continue; }
if (m[1] != null) T(m[1]);
else if (m[2] != null) mk(p, 'code', null, m[2]);
else if (m[4] != null) {
if (m[3]) {
w = where(m[5], repo);
if (w && pics) pic(p, { alt: clean(m[4]), path: w.path, ref: w.ref });
else if (/^https?:\/\//i.test(m[5])) href(mk(p, 'a', null, 'Image' + (m[4] ? ': ' + clean(m[4]) : '')), m[5]);
else T(m[0]);
} else if (/^https?:\/\//i.test(m[5]) || /^#[\w-]{1,80}$/.test(m[5])) nest(href(mk(p, 'a'), m[5]), m[4]);
else nest(p, m[4]);
} else if (m[6] || m[7]) nest(mk(p, 'strong'), m[6] || m[7]);
else if (m[8]) nest(mk(p, 'del'), m[8]);
else if (m[9] || m[10]) nest(mk(p, 'em'), m[9] || m[10]);
else if (m[11]) mk(p, 'br');
else if (m[12] != null) {
var src = (/\bsrc=["']?([^"'\s>]{1,800})/i.exec(m[12]) || [])[1], alt = (/\balt=["']([^"']{0,400})/i.exec(m[12]) || [])[1] || '';
w = src && where(src, repo);
if (w && pics) pic(p, { alt: alt, path: w.path, ref: w.ref }); else if (/^https?:\/\//i.test(src || '')) href(mk(p, 'a', null, 'Image' + (alt ? ': ' + alt : '')), src); else T(m[0]);
} else if (m[13]) { /* a formatting tag: dropped, its text kept */ }
else if (m[14]) { var u = m[14].replace(/[.,;:!?)]+$/, ''); href(mk(p, 'a', null, u), u); INL.lastIndex = at = i + u.length; }
else if (m[15]) href(mk(p, 'a', null, '#' + m[15]), 'https://github.com/' + repo + '/issues/' + m[15]);
else T(ENT[m[16]]);
}
T(s.slice(at));
}
function cells(l) { var t = l.trim().replace(/^\|/, '').replace(/\\\|/g, '\u0001'), e = t.length; if (t.charAt(e - 1) === '|') t = t.slice(0, e - 1); return t.split('|').map((c) => c.replace(/\u0001/g, '|').trim()); }
function md(box, text, pics, d) {
d = d || 0;
var L = String(text || '').replace(NOTE, '').replace(/\r/g, '').split('\n'), i = 0, para = null, m;
function starts(x) { return FEN.test(x) || HEAD.test(x) || QUO.test(x) || RULE.test(x) || ITEM.test(x); }
while (i < L.length) {
var ln = L[i];
if (!ln.trim()) { para = null; i++; continue; }
if ((m = FEN.exec(ln))) {
var f = m[1], body = [], close = f.charAt(0) === '`' ? /^ {0,3}(`{3,})[ \t]*$/ : /^ {0,3}(~{3,})[ \t]*$/, c;
for (i++; i < L.length && !((c = close.exec(L[i])) && c[1].length >= f.length); i++) body.push(L[i]);
i++; mk(mk(box, 'pre'), 'code', null, body.join('\n')); para = null; continue;
}
if ((m = HEAD.exec(ln))) {
var t = ln.slice(m[0].length).trim(), e = t.length;
while (e && t.charAt(e - 1) === '#') e--;
if (!e || /\s/.test(t.charAt(e - 1))) t = t.slice(0, e).trim();
inl(mk(box, 'h' + Math.min(6, m[1].length + 2)), t, pics, 0); para = null; i++; continue;
}
if (RULE.test(ln)) { mk(box, 'hr'); para = null; i++; continue; }
if (d < 6 && QUO.test(ln)) {
var q = [];
while (i < L.length && QUO.test(L[i])) q.push(L[i++].replace(QUO, ''));
md(mk(box, 'blockquote'), q.join('\n'), pics, d + 1); para = null; continue;
}
if (ln.indexOf('|') >= 0 && i + 1 < L.length && L[i + 1].indexOf('-') >= 0) {
var hd = cells(ln), al = cells(L[i + 1]);
if (al.length === hd.length && al.every((x) => ALIGN.test(x))) {
var tb = mk(mk(mk(box, 'div', 'tbl'), 'table'), 'tbody'), row = (r, tag) => { var tr = mk(tb, 'tr'); hd.forEach((_, k) => { var x = mk(tr, tag), a = al[k]; inl(x, r[k] || '', pics, 0); x.style.textAlign = /^:.*:$/.test(a) ? 'center' : /:$/.test(a) ? 'right' : ''; }); };
row(hd, 'th');
for (i += 2; i < L.length && L[i].trim() && L[i].indexOf('|') >= 0; i++) row(cells(L[i]), 'td');
para = null; continue;
}
}
if (d < 6 && (m = ITEM.exec(ln))) {
var ord = /\d/.test(m[2]), base = m[1].length, list = mk(box, ord ? 'ol' : 'ul');
if (ord && parseInt(m[2], 10) !== 1) list.start = parseInt(m[2], 10);
while (i < L.length && (m = ITEM.exec(L[i])) && m[1].length <= base + 1 && /\d/.test(m[2]) === ord && !RULE.test(L[i])) {
var it = [L[i].slice(m[0].length)], wd = m[0].length;
for (i++; i < L.length; i++) {
var x = L[i];
if (!x.trim()) { var j = i; while (j < L.length && !L[j].trim()) j++; if (j < L.length && lead(L[j]) > base + 1) { it.push(''); continue; } break; }
if (lead(x) > base + 1) it.push(x.slice(Math.min(lead(x), wd)));
else if (starts(x)) break;
else it.push(x.trim());
}
var li = mk(list, 'li'), tk = TASK.exec(it[0]);
if (tk) it[0] = it[0].slice(tk[0].length);
md(li, it.join('\n'), pics, d + 1);
if (tk) {
var cb = el('input'), at = li.firstChild && li.firstChild.tagName === 'P' ? li.firstChild : li;
cb.type = 'checkbox'; cb.disabled = true; cb.checked = tk[1] !== ' '; cb.setAttribute('aria-label', cb.checked ? 'Done' : 'Not done');
at.insertBefore(cb, at.firstChild); li.className = 'ny-task';
}
}
para = null; continue;
}
if (para) mk(para, 'br'); else para = mk(box, 'p');
inl(para, ln.trim(), pics, 0); i++;
}
return box;
}
function ymd(t) { var p = {}; new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date(t)).forEach((x) => { p[x.type] = x.value; }); return p.year + '-' + p.month + '-' + p.day; }
function plus(d, k) { return new Date(Date.parse(d + 'T12:00Z') + k * 864e5).toISOString().slice(0, 10); }
function groups(now) {
var d = ymd(now), sun = plus(d, (7 - new Date(d + 'T12:00Z').getUTCDay()) % 7), x = plus(d, 2);
return [['T', 'Tomorrow', plus(d, 1), plus(d, 1)], ['W', 'This week', x, sun], ['X', 'Next week', plus(sun, 1) > x ? plus(sun, 1) : x, plus(sun, 7)],
['F', 'Later', plus(sun, 8), '']].filter((g) => !g[3] || g[2] <= g[3]);
}
function grp(v, G) { var d = ymd(v); return G.filter((g) => !g[3] || d <= g[3])[0]; }
function at(g, t) { return window.IssueQ.et(g[2], t || '23:59'); }
var RI = '';
var core = { options: options, pickAsk: pickAsk, images: images, answered: answered, ago: ago, clean: clean, plain: plain, when: when, day: day,
md: md, pic: pic, where: where, who: who, isReceipt: isReceipt, NOTE: NOTE, getJ: getJ, send: send, allow: allow, thread: thread, groups: groups, grp: grp, at: at, ymd: ymd, plus: plus,
use: (r) => { repo = r; RI = '/repos/' + r + '/issues'; return RI; } };
window.CompanyNeeds = S.core = core;
})();
