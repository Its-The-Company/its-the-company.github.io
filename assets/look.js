// Home (T-2667 for T-2480 and T-2469). Source: tools/site/home_look.py. Bubbles: one panel open at a time; the hash names it.
(function(){var b=document.querySelectorAll('.lk-b');function show(h){b.forEach(function(a){var on=a.hash===h;a.classList.toggle('open',on);
a.setAttribute('aria-expanded',on);var p=document.querySelector(a.hash);if(p)p.classList.toggle('open',on)})}
b.forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();var h=a.classList.contains('open')?'':a.hash;
history.replaceState(null,'',h||location.pathname);show(h)})});if(location.hash)show(location.hash)})();
// T-4316 (friesevan #41 c6862492756): a box (.lk-box) takes the wheel or trackpad only once the pointer has moved inside
// it. A scroll begun over the page keeps moving the page when a box slides under a still pointer (its wheel is handed to
// the page here); a finger, the keyboard and VoiceOver send no wheel and work as before. Pinch zoom (ctrl) passes. The
// wheel listener sits on the boxes only, so the rest of the page still scrolls without waiting on script.
(function(){var x,y,on=null;document.addEventListener('mousemove',function(e){if(e.clientX===x&&e.clientY===y)return;
x=e.clientX;y=e.clientY;on=e.target.closest?e.target.closest('.lk-box'):null},{passive:true});
document.querySelectorAll('.lk-box').forEach(function(b){b.addEventListener('wheel',function(e){
if(on===b||e.ctrlKey||e.defaultPrevented)return;e.preventDefault();var k=e.deltaMode===1?40:e.deltaMode===2?innerHeight*.9:1;
scrollBy({left:e.deltaX*k,top:e.deltaY*k,behavior:'instant'})},{passive:false})})})();
// T-4620 (friesevan #41 c6927279384): a feature in Merged, In flight or Queued is one card with its steps' cards nested
// under it (home_look.feat_wrap builds it; data-ft on #lk-all names each feature's steps and its line). The lists' own
// code draws flat rows: each calls undo(list) before it reads or sorts them and group(list) after it draws them, so a
// feature card sits where its first card falls in the list's order. A card opened by a tap stays open across redraws;
// a search opens the cards that hold a match; a card none of whose steps shows under the filters hides.
// T-4530 (friesevan #41 c6898956579 Q2 A): Group by feature, a switch beside the search. Off: every list is flat, each
// piece in its own start order place with its "part of" tag; on (the default, T-4620's look): pieces under their umbrella.
// T-4747 (friesevan #41 c6938733962): FS, each step a feature session builds ({step: feature}, data-ft's "b"): while
// its feature is in flight it is listed under the feature in In flight (fsl) and hidden from Queued (fly).
window.LKFT=(function(){var D=null,W={},FS={},OP={},GF=true;try{GF=localStorage.getItem('lk-gf')!=='0'}catch(e){}
function data(){if(D)return D;D={};var a=document.getElementById('lk-all');try{D=JSON.parse(a&&a.getAttribute('data-ft')||'{}')}catch(e){}
Object.keys(D).forEach(function(f){if(!W[f])W[f]=f;(D[f].s||[]).forEach(function(s){if(!W[s])W[s]=f});(D[f].b||[]).forEach(function(b){FS[b[0]]=f})});return D}
function live(i){var L=(window.CompanySite||{}).lk||{};return !!(L.has&&L.has(i))}
function mk(p,t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;p.appendChild(e);return e}
function body(d){return d.querySelector(':scope>.lk-ftb')}
// home_look.feature_words, from the live lists: merged (the records, or Merged now), building (in flight, or a step of
// this feature's session while the feature is in flight), queued, waiting: "12 of 48 merged, 4 building, 20 queued"
function words(f){var x=D[f],s=x.s||[],L=(window.CompanySite||{}).lk||{},n={m:0,f:0,q:0,w:0,x:0},k,on=live(f);if(!s.length)return 'No steps on the board yet';
function has(a,i){return (a||[]).indexOf(i)>=0}
s.forEach(function(i){n[has(x.m,i)||(L.hm&&L.hm(i))?'m':live(i)||(on&&FS[i]===f)?'f':has(x.q,i)?'q':has(x.o,i)?'w':'x']++});
k=[n.m+' of '+s.length+' merged'];[['f','building'],['q','queued'],['w','waiting or blocked'],['x','closed or held from view']]
.forEach(function(w){if(n[w[0]])k.push(n[w[0]]+' '+w[1])});return k.join(', ')}
// home_look.session_html: the steps feature f's session builds, under its own card in In flight
function fsl(f){var b=D[f].b||[],e=document.createElement('div'),u;e.className='lk-sbl';e.setAttribute('data-fs',f);
mk(e,'p','lk-sbh','Building in this session: '+b.length+' step'+(b.length===1?'':'s'));u=mk(e,'ul');
b.forEach(function(x){var l=mk(u,'li');l.setAttribute('data-st',x[0]);mk(l,'span','lk-sbn',x[1]);mk(l,'span','lk-sbi',x[0])});return e}
function card(f){var d=document.createElement('details'),s=mk(d,'summary'),t;d.className='lk-ft';d.setAttribute('data-ft',f);
t=mk(s,'span','t');mk(t,'span','lk-ftk','Feature');mk(t,'b','',D[f].t);mk(t,'span','lk-ftm',words(f));mk(s,'span','idb',f);mk(d,'div','lk-ftb');
s.addEventListener('click',function(){OP[f]=!d.open});return d}
function undo(c){if(!c)return;[].forEach.call(c.querySelectorAll('.lk-sbl'),function(e){e.parentNode.removeChild(e)});[].slice.call(c.children).forEach(function(d){if(!d.classList.contains('lk-ft'))return;
[].slice.call(body(d).children).forEach(function(x){c.insertBefore(x,d)});c.removeChild(d)})}
function sess(c){if(c.id!=='lk-run')return;Object.keys(D).forEach(function(f){var r;if(!(D[f].b||[]).length)return;
r=[].filter.call(c.querySelectorAll('.lk-card[data-id]'),function(x){return x.getAttribute('data-id')===f})[0];if(r)r.parentNode.insertBefore(fsl(f),r.nextSibling)})}
function group(c){if(!c)return;undo(c);data();if(!GF){document.documentElement.classList.add('lk-flat');sess(c);return}document.documentElement.classList.remove('lk-flat');var g={},S=window.CompanySite,q=!!(S&&S.lk&&S.lk.q&&S.lk.q());
// T-4732: a card sits by its first row on show; a row a filter hides (another category's step) never places it
var kids=[].slice.call(c.children),at={};function fof(x){var f=W[(x.getAttribute('data-id')||'').replace(/\.\d+$/,'')];return f&&D[f]?f:null}
kids.forEach(function(x){var f=fof(x);if(f&&(!at[f]||(at[f].hidden&&!x.hidden)))at[f]=x});Object.keys(at).forEach(function(f){g[f]=card(f);c.insertBefore(g[f],at[f])});
kids.forEach(function(x){var f=fof(x),b;if(!f)return;b=body(g[f]);if(x.getAttribute('data-id').replace(/\.\d+$/,'')===f)b.insertBefore(x,b.firstChild);else b.appendChild(x)});
// T-4530: a card sits by its first row (a star lifts it), and inside it the steps keep the list's own order, star or not
Object.keys(g).forEach(function(f){var b=body(g[f]),k=[].slice.call(b.children).filter(function(x){return x.getAttribute('data-id')!==f});
if(k.every(function(x){return x._o!=null}))k.sort(function(x,y){return x._o-y._o}).forEach(function(x){b.appendChild(x)})});
Object.keys(g).forEach(function(f){var d=g[f],n=body(d).querySelectorAll(':scope>[data-id]:not([hidden])').length;d.hidden=!n;d.open=!!OP[f]||(q&&n>0)});
sess(c);[].forEach.call(document.querySelectorAll('details.lk-ft'),function(d){var m=d.querySelector('.lk-ftm'),f=d.getAttribute('data-ft');if(m&&D[f])m.textContent=words(f)})}
return{group:group,undo:undo,fs:function(i){data();return FS[i]||null},on:function(v){if(v!=null){GF=!!v;try{localStorage.setItem('lk-gf',GF?'1':'0')}catch(e){}}return GF}}})();
// T-3187 (friesevan #41 c6701678631): (1) a star on each Running and Queued card; the stars are shared by both Investors, in
// investors/favorites.json on GitHub ({"tasks": [...]}), written with the Investor's own token, one commit a tap, read fresh
// first and once more if GitHub moved it (as personal.js writes billing.json); no token: the build's stars show, no buttons.
// Starred cards sort first; tools/fav_notice.py posts on #41 when a starred task merges. (2) One search box filters Running and
// Queued (every word must match the name, ID or worker). (3) A tap on a task's name, in any panel, opens it to the full name.
// Registered before Running's listener, so S.lk is there when Running draws. Text goes in as textContent.
document.addEventListener('DOMContentLoaded',function(){var S=window.CompanySite,H=document.querySelector('.lk-home');if(!S||!H)return;
var F={},fn=[],O={},Q='',P='investors/favorites.json',repo=H.getAttribute('data-repo')||'',chain=Promise.resolve(),
CARD='.lk-run,.lk-q,.lk-qr,.lk-blk',inp=document.getElementById('lk-find'),fb=document.getElementById('lk-findbox'),
fn2=document.getElementById('lk-find-n'),fv=document.getElementById('lk-fav-n'),tok=!!(S.getToken&&S.getToken()&&/^[\w.-]+\/[\w.-]+$/.test(repo));
try{JSON.parse(H.getAttribute('data-fav')||'[]').forEach(function(i){F[i]=1})}catch(e){}
// T-3735: an issue number in Blocked or waiting that Issues does not list becomes a GitHub link for a token holder only
// (the build carries no URL into the private repository)
if(tok)[].forEach.call(H.querySelectorAll('span.lk-iss[data-iss]'),function(x){var n=x.getAttribute('data-iss'),a;if(!/^\d{1,6}$/.test(n))return;
a=document.createElement('a');a.className='lk-iss';a.href='https://github.com/'+repo+'/issues/'+n;a.target='_blank';a.rel='noopener';a.textContent='#'+n;x.parentNode.replaceChild(a,x)});
// T-4007 (JeremyFries and friesevan, #41, 2026-11-10): In flight and Queued are one list under Flow, with one search, one
// sort (lk-sort) and one category filter (lk-cat) for both parts. SO: 'def' the order Home had (in flight last step
// first, Queued in the order they start), 'first' by stage as the columns run, left to right (Queued goes on top),
// 'long' longest in its stage, 'cat' by category, 'who' by worker. Starred tasks stay first in every order. CF: a
// category's first word ('App'), '' for all. T-4287: every queued task past the page's 30 is drawn from the index too,
// always, so the box holds them all; the search, category and worker filters hide rows rather than draw them.
// T-4094 (friesevan #41 c6804999684): the sorts are Stage, Time on Stage, Category, Worker, Time Created, Time Started
// and Retries (home_look.SORTS), each ascending (SD 1) or descending (-1), its first direction DF's; S2 and D2 an optional
// second sort for ties. by() compares two records {stage, time, cat, who, created, started, retries}, In flight's and
// Queued's alike; a value not recorded sorts last whichever the direction. Time Created is the task's number: the board
// gives numbers out in the order tasks are added. Then the order the list had (look.js's default, Queued's start order).
// T-3950 (friesevan #41 c6755760889): Time Requested, when an Investor asked for the task (data-inv, home_look inv; a task
// no Investor asked for has none recorded and sorts last); CF a category ('App') or a category and its sub-category
// ('App · Design'); IV, Requested by: 'inv' the tasks an Investor asked for, 'not' the rest, '' all.
var SO='def',SD=1,S2='',D2=1,DF={stage:1,time:-1,cat:1,who:1,created:1,requested:1,started:1,retries:-1},CF='',IV='',so=document.getElementById('lk-sort'),cf=document.getElementById('lk-cat'),
so2=document.getElementById('lk-sort2'),dr=document.getElementById('lk-dir'),dr2=document.getElementById('lk-dir2'),sb2=document.getElementById('lk-so2'),iv=document.getElementById('lk-inv'),INV={};
try{INV=JSON.parse(H.getAttribute('data-inv')||'{}')||{}}catch(e){}
function rq(i){var v=INV[i];return v?Date.parse(v)||null:null}
function chips(){[].forEach.call(H.querySelectorAll('#lk-chips button'),function(b){var v=b.getAttribute('data-v');b.setAttribute('aria-pressed',v?CF.split(' \u00b7 ')[0]===v:!CF)});
[].forEach.call(H.querySelectorAll('.lk-subs'),function(g){g.hidden=!CF||g.getAttribute('data-cat')!==CF.split(' \u00b7 ')[0];[].forEach.call(g.querySelectorAll('button'),function(b){b.setAttribute('aria-pressed',b.getAttribute('data-v')===CF)})})}
function setCF(v){CF=v;if(cf)cf.value=v;chips();fire()}
function catok(c,i){c=String(c||'');return (!CF||c===CF||(CF.indexOf(' · ')<0&&c.split(' · ')[0]===CF))&&(!IV||(IV==='inv')===!!INV[i])}
function fw(){return [CF?'in '+CF:'',IV?(IV==='inv'?'requested by an Investor':'not requested by an Investor'):''].filter(Boolean).join(', ')}
function txt(a,b){a=String(a||'').toLowerCase();b=String(b||'').toLowerCase();return a===b?0:!a?1:!b?-1:a<b?-1:1}
function tnum(i){var m=/^T-(\d+)/.exec(String(i||''));return m?+m[1]:null}
function cmpk(k,d,a,b){var x=a[k],y=b[k],nx=x==null||x===''||x!==x,ny=y==null||y===''||y!==y;if(nx||ny)return nx&&ny?0:nx?1:-1;return (typeof x==='string'?txt(x,y):x-y)*d}
function by(a,b){return (SO==='def'?0:cmpk(SO,SD,a,b))||(S2&&S2!==SO?cmpk(S2,D2,a,b):0)}
function qrec(c){return {stage:null,time:null,cat:qc(c)||null,who:c.getAttribute('data-w')||null,created:tnum(c.getAttribute('data-id')),requested:rq(c.getAttribute('data-id')),started:Date.parse(c.getAttribute('data-ps')||'')||null,retries:+(c.getAttribute('data-r')||0)}}
function dword(b,d){if(!b)return;b.textContent=d>0?'Ascending':'Descending';b.setAttribute('aria-label',(d>0?'Ascending':'Descending')+'; tap for '+(d>0?'descending':'ascending'))}
function sorts(){if(dr){dr.hidden=SO==='def';dword(dr,SD)}if(sb2)sb2.hidden=SO==='def';if(so2){[].forEach.call(so2.options,function(o){o.disabled=!!o.value&&o.value===SO});if(S2===SO){S2='';so2.value=''}}
if(dr2){dr2.hidden=!S2||SO==='def';dword(dr2,D2)}}
function qc(c){var e=c.querySelector('.lk-cat');return e?e.textContent:''}
// T-4007: a task with a card in In flight is not listed again in Queued. The build leaves its row out and keeps its
// number in data-all with a sixth field, 1 (Move up counts places by those numbers); a task a later status puts in
// flight has its row hidden here, and one that has left In flight since the build is a Queued row again (listed with
// the page's own rows when its number is among theirs, data-last; past them it is in the index like any other).
function fly(i){var f=window.LKFT&&LKFT.fs(lid(i));return !!(S.lk&&S.lk.has&&(S.lk.has(lid(i))||(f&&S.lk.has(f))))}  // T-4747: or its feature's session is
// a Queued row now: not in flight (until In flight has drawn, the build's mark says)
function inq(i,f){return S.lk&&S.lk.has?!fly(i):!f}
function okId(i){return typeof i==='string'&&/^T-\d+$/.test(i)}
function b64(t){var b=new TextEncoder().encode(t),s='';for(var i=0;i<b.length;i++)s+=String.fromCharCode(b[i]);return btoa(s)}
function unb64(s){var a=atob(String(s).replace(/\n/g,'')),b=new Uint8Array(a.length);for(var i=0;i<a.length;i++)b[i]=a.charCodeAt(i);return new TextDecoder().decode(b)}
function path(){return '/repos/'+repo+'/contents/'+P}
function say(t){if(fv){fv.textContent=t;fv.hidden=!t}}
// T-3430: a word that is a task number ('301', 'T-301', 't-0301', '00301') finds the task whose ID has that number
// exactly (so 31 is not T-0311), or a name that holds the word as it is; any other word is looked for as typed.
function numbers(t){var o={},r=/\bt-0*(\d+)/g,m;while((m=r.exec(t)))o[m[1]]=1;return o}
function match(t){if(!Q)return true;t=String(t||'').toLowerCase();var ns=numbers(t),rest=t.replace(/\bt-\d+(\.\d+)?/g,' ');return Q.split(/\s+/).every(function(w){var m=/^(?:t-?)?0*(\d+)$/.exec(w);return m?(!!ns[m[1]]||rest.indexOf(w)>=0):t.indexOf(w)>=0})}
// friesevan #41 c6797513466 (11-11): no emoji or symbol glyphs; the star is drawn: filled on, outlined off
function SV(on){return '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 2.5l2.8 6.3 6.9.6-5.2 4.6 1.6 6.8L12 17.2l-6.1 3.6 1.6-6.8-5.2-4.6 6.9-.6z" '+(on?'fill="currentColor"':'fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"')+'/></svg>'}
function star(p,id){var on=!!F[id],b;if(!okId(id))return;
if(tok){b=document.createElement('button');b.type='button';b.className='lk-star';b.setAttribute('aria-pressed',on);
b.setAttribute('aria-label','Star '+id);b.title=on?'Starred: sorts first; a notice in Chat when it merges':'Star: sorts first; a notice in Chat when it merges';
b.innerHTML=SV(on);b.onclick=function(e){e.stopPropagation();tap(id)}}
else if(on){b=document.createElement('span');b.className='lk-star on';b.setAttribute('role','img');b.setAttribute('aria-label','Starred');b.innerHTML=SV(1)}
if(b)p.appendChild(b)}
function aria(c){var n=c&&c.querySelector('.lk-tn');if(n){n.setAttribute('role','button');n.tabIndex=0;n.setAttribute('aria-expanded',c.classList.contains('lk-open'))}}
function key(c){return c.getAttribute('data-id')||((c.querySelector('.lk-tn')||{}).textContent||'')}
function toggle(c){var k=key(c),on=!c.classList.contains('lk-open');c.classList.toggle('lk-open',on);if(on){O[k]=1;tree(c)}else delete O[k];aria(c)}
// T-3316 (friesevan #41 c6709231564; redone as T-3434): each task's parents and children. data-lin is lineage.page_data:
// n {id: [name, state]}, u {child: [parents]}, a {second lead ID: first}; G.d is the same edges the other way. walk() is
// lineage.rows: each task once in full, a later meeting one row marked again, so a cycle ends. A relative with a card here
// is a link to it (go); one with none is its name and a word, never a dead link. The tree is drawn when a card first
// opens. Text goes in as textContent.
// T-4100, redone as T-4310 (friesevan #41 c6799650908, c6799769890): the typed Links field, both ways, each kind under its
// own heading. p {umbrella: [open pieces]} gives G.P and, turned round, G.p (part of); k {id: [needs]} gives G.k and G.K
// (needed by); m {umbrella: {state: closed pieces}} is a count, never rows; x {child: [parents]} is the prose pairs the
// field names too, shown once, under the field's heading, and walked only by the move rule (anc). LW is lineage.WAYS. An
// ID with no entry in n is a queued card whose name is on this page.
var G={n:{},u:{},a:{},d:{},x:{},P:{},p:{},k:{},K:{},m:{}},LS={q:'Queued',w:'Waiting',b:'Blocked',d:'Done',a:'Archived',c:'Cancelled',u:'Not on the board'},LMAX=40,
LW=[['part_of','Part of','p'],['pieces','Pieces','P'],['needs','Needs','k'],['needed_by','Needed by','K']];
try{var g0=JSON.parse(H.getAttribute('data-lin')||'{}');G.n=g0.n||{};G.u=g0.u||{};G.a=g0.a||{};G.x=g0.x||{};G.P=g0.p||{};G.k=g0.k||{};G.m=g0.m||{}}catch(e){}
[['u','d'],['P','p'],['k','K']].forEach(function(w){Object.keys(G[w[0]]).sort().forEach(function(c){G[w[0]][c].forEach(function(p){(G[w[1]][p]=G[w[1]][p]||[]).push(c)})})});
function lid(i){i=String(i||'').replace(/\.\d+$/,'');return G.a[i]||i}
function pl(n,w,e){return n?n+' '+w+(n===1?'':e):''}
function nm(w,l){l=l||[];return l.length?w+' '+(l.length===1?l[0]:l.length):''}
function mt(i){var m=G.m[i]||{};return['d','a','c','u'].filter(function(s){return m[s]}).map(function(s){return m[s]+' '+LS[s].toLowerCase()})}
function lws(i){var m,n;i=lid(i);m=G.m[i]||{};n=(G.P[i]||[]).length;Object.keys(m).forEach(function(s){n+=m[s]});
return[[nm('part of',G.p[i]),pl(n,'piece','s')],[nm('needs',G.k[i]),nm('needed by',G.K[i])]]
.map(function(k){return k.filter(Boolean).join(' · ')}).filter(Boolean)}
function badge(p,i){lws(i).forEach(function(w){mk(p,'span','lk-lin',w)})}
function walk(i,g){var s={},o=[],t=[],n;s[i]=1;function push(x,d){(g[x]||[]).slice().reverse().forEach(function(y){t.push([y,d])})}push(i,1);
while(t.length&&o.length<LMAX){n=t.pop();o.push([n[1],n[0],s[n[0]]?1:0]);if(!s[n[0]]){s[n[0]]=1;push(n[0],n[1]+1)}}
if(t.length)while(t.length){n=t.pop();if(!s[n[0]]){s[n[0]]=1;push(n[0],0)}}
o.left=Object.keys(s).length-1-o.filter(function(r){return !r[2]}).length;return o}
function qcard(i){var q=document.getElementById('lk-q');return q?[].filter.call(q.querySelectorAll('.lk-q'),function(c){return lid(c.getAttribute('data-id'))===i})[0]:null}
function carded(i){return !!((S.lk.has&&S.lk.has(i))||(S.lk.hm&&S.lk.hm(i))||qcard(i)||(A||[]).some(function(a){return a[0]===i}))}
function qname(i){var c=qcard(i),a=(A||[]).filter(function(x){return x[0]===i})[0];return c?(c.querySelector('.lk-tn')||{}).textContent:a?a[2]:''}
function lrow(ul,r,me){var t=r[1],li=mk(ul,'li'),go=!r[2]&&carded(t),n=G.n[t]||['','q'],e=mk(li,go?'a':'span');
li.setAttribute('data-tid',t);li.setAttribute('data-d',r[0]);if(r[2])li.setAttribute('data-again','1');li.style.paddingLeft=(Math.min(r[0],5)-1)*14+'px';
if(go){e.href='#lk-run';e.setAttribute('data-go',t)}mk(e,'span','idb',t);mk(e,'span','lk-tt',n[0]||qname(t)||'Name not recorded ('+t+')');
if(r[2])mk(e,'span','lk-ts',t===me?'This task':'Shown above');else if(!go)mk(e,'span','lk-ts',LS[n[1]]||LS.u)}
function tree(c){var i=lid(c.getAttribute('data-id')),o;if(!c.matches('.lk-run,.lk-q')||c.querySelector('.lk-tree')||!lws(i).length)return;o=mk(c,'div','lk-tree');
LW.forEach(function(s){var rs=walk(i,G[s[2]]),m=s[0]==='pieces'?mt(i).join(', '):'',ul;if(!rs.length&&!m)return;mk(o,'h4','',s[1]);ul=mk(o,'ul');ul.setAttribute('data-way',s[0]);
rs.forEach(function(r){lrow(ul,r,i)});if(rs.left>0)mk(ul,'li','lk-tm','+'+rs.left+' more on the board');if(m)mk(ul,'li','lk-tm lk-tc',m)})}
function go(i){var c,n,b;if((Q&&inp)||CF||IV){if(inp)inp.value='';Q='';if(cf)cf.value='';CF='';chips();if(iv)iv.value='';IV='';H.classList.remove('lk-searching');fire()}
c=S.lk.run&&S.lk.run(i);if(!c){if(S.lk.all)S.lk.all();queued();c=qcard(i)}
if(!c){c=document.getElementById('bk-'+i);b=document.getElementById('lk-bk-more');  // T-3735: a held task's row, unfolded first
if(c&&c.classList.contains('lk-fold')&&b&&c.parentNode.classList.contains('lk-qshort'))b.click();
if(c){c.classList.add('lk-hit');setTimeout(function(){c.classList.remove('lk-hit')},2000);c.scrollIntoView({block:'center'});return}}
if(!c)return;unfold(c);if(!c.classList.contains('lk-open'))toggle(c);c.classList.add('lk-hit');setTimeout(function(){c.classList.remove('lk-hit')},2000);
c.scrollIntoView({block:'center'});n=c.querySelector('.lk-tn');if(n)n.focus({preventScroll:true})}
var A=null,pic={},fc={};[].forEach.call(document.querySelectorAll('.lk-team a'),function(a){var m=/cast\/([^/.]+)\.html/.exec(a.getAttribute('href')||''),g=a.querySelector('img');if(m&&g)pic[m[1]]=g.getAttribute('src')});
try{fc=JSON.parse((document.getElementById('lk-run')||H).getAttribute('data-faces')||'{}')}catch(e){}
function mk(p,t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;p.appendChild(e);return e}
// a Queued row past the page's 30, from data-all ([id, number, name, worker, category]): drawn while it matches the search or is starred
function qrow(a){var c=document.createElement('div'),p=fc[String(a[3]||'').toLowerCase()],g,t;c.className='lk-card lk-q lk-x';c.setAttribute('data-id',a[0]);c.setAttribute('data-n',a[1]);
c.setAttribute('data-q',[a[2],a[0],a[3]].concat(a[10]?[a[10]]:[]).join(' '));if(a[9])c.classList.add('lk-qw');c.setAttribute('data-w',a[3]||'');if(a[6])c.setAttribute('data-ps',a[6]);if(a[7])c.setAttribute('data-r',a[7]);mk(c,'span','lk-n',String(a[1]));if(p&&pic[p]){g=mk(c,'img');g.src=pic[p];g.alt='';g.width=g.height=24}else mk(c,'span').style.width='24px';
t=mk(c,'span','t');mk(t,'b','lk-tn',a[2]);badge(t,a[0]);if(a[7])mk(c,'span','lk-rty','retry '+a[7]);
if(a[8]){g=mk(c,'span','lk-pt','part of '+a[8]);g.title='A piece of '+a[8]}if(a[9])mk(c,'span','lk-wait','waits: '+a[9]);if(a[4]){g=mk(c,'span','lk-cat',a[4]);g.title='Category: '+a[4]}mk(c,'span','idb',a[0]);aria(c);return c}
// T-4007: k counts the rows on show, for the no-match line; T-4287: every row shows, in the scroll box (no fold)
// T-4313: a card in a folded part (Merged, In flight, Queued) opens its part first, so a link to it lands on it
function unfold(c){var d=c&&c.closest&&c.closest('details.lk-fold'),f=c&&c.closest&&c.closest('details.lk-ft');if(d&&!d.open)d.open=true;if(f&&!f.open)f.open=true}
// T-4313: QV, the queued rows on show under the search and the filters (queued() counts them), for every total
var QV=0;
function queued(){var q=document.getElementById('lk-q'),rows,k=0;if(!q)return;LKFT.undo(q);if(!A){A=[];try{A=JSON.parse(q.getAttribute('data-all')||'[]')}catch(e){}}
[].slice.call(q.querySelectorAll('.lk-x')).forEach(function(c){q.removeChild(c)});
A.forEach(function(a){if(okId(a[0])&&inq(a[0],a[5]))q.appendChild(qrow(a))});  // T-4287: every row, the filters below hide
rows=[].slice.call(q.children);
// T-4530: each row's place in the sort without the star lift; a feature card keeps its steps in that order (LKFT.group)
rows.slice().sort(function(a,b){return by(qrec(a),qrec(b))||(+a.getAttribute('data-n')-+b.getAttribute('data-n'))}).forEach(function(c,i){c._o=i});
rows.sort(function(a,b){return (F[b.getAttribute('data-id')]?1:0)-(F[a.getAttribute('data-id')]?1:0)
||by(qrec(a),qrec(b))||(+a.getAttribute('data-n')-+b.getAttribute('data-n'))});
rows.forEach(function(c){var s=c.querySelector('.lk-star'),on=match(c.getAttribute('data-q'))&&catok(qc(c),c.getAttribute('data-id'))&&!fly(c.getAttribute('data-id'));q.appendChild(c);if(on)k++;if(s)s.parentNode.removeChild(s);tok&&up(c,c.getAttribute('data-id'));star(c,c.getAttribute('data-id'));
c.hidden=!on});
var no=document.getElementById('lk-q-none');if(!no&&(Q||CF||IV)){no=document.createElement('p');no.id='lk-q-none';no.className='meta';q.parentNode.insertBefore(no,q.nextSibling)}
QV=k;if(no){no.textContent=Q?'No queued task matches.':IV?'No queued task '+fw()+'.':'No queued task in this category.';no.hidden=!(Q||CF||IV)||k>0}
no=document.getElementById('lk-q-rest');if(no)no.hidden=true;LKFT.group(q)}
function count(){if(!fn2)return;if(!Q&&!CF&&!IV){fn2.textContent='';return}
var m=document.querySelectorAll('#lk-mg .lk-run').length,r=document.querySelectorAll('#lk-run .lk-run').length,q=document.querySelectorAll('#lk-q .lk-q:not([hidden])').length;
fn2.textContent=(m?m+' merged, ':'')+r+' in flight, '+q+' in Queued '+(Q?'match':fw())}
// T-4313: the queued rows first, so In flight's render (fn) reads their count under the same filters
function fire(){queued();fn.forEach(function(f){try{f()}catch(e){}});count()}
function read(){return S.gh(path()+'?ref=main').then(function(r){if(r.status===404)return{list:[],sha:null};if(!r.ok)throw new Error(S.said(r));
return r.json().then(function(j){var o=null;try{o=JSON.parse(unb64(j.content||''))}catch(e){}
if(!o||typeof o!=='object'||Array.isArray(o))throw new Error('investors/favorites.json on GitHub is not valid JSON');
return{list:(Array.isArray(o.tasks)?o.tasks:[]).filter(okId),sha:j.sha,o:o}})})}
function take(l){F={};l.forEach(function(i){F[i]=1});fire()}
// T-2401 (1) and T-3724 (friesevan #41 c6648649825, c6729595823, c6729606115): Move up on a queued card, token only. It posts
// `/move X before Y` with the Investor's own token, as queue.js posts, on the issue labelled queue, found open or closed (it is
// closed on purpose: open issues are only what waits on the Investors, #54 c6406649834). Y is the first card above X in the start
// order (the number, not the starred-first view's place) that is not one of X's own parents: moving a child up moves its open
// parents and grandparents just ahead of it (c6729606115, which replaced c6709231564's refusal), and the page names them.
// tools/inbox_route.py checks the allowlist and runs tools/queue_order.py apply through board_tick.py, which re-checks the
// lineage on the live board. The new order shows at the next build (the board's order is the queue).
var QI=null,KIN=['parent','grandparent','great-grandparent'];
function anc(i){var s={},t=[[lid(i),0]],x;while(t.length){x=t.shift();(G.u[x[0]]||[]).concat(G.x[x[0]]||[]).forEach(function(p){p=lid(p);if(!s[p]){s[p]=x[1]+1;t.push([p,x[1]+1])}})}return s}
function nums(){var m={},q=document.getElementById('lk-q');(A||[]).forEach(function(a){if(okId(a[0]))m[lid(a[0])]=a[1]});
[].forEach.call(q?q.querySelectorAll('.lk-q'):[],function(d){var i=d.getAttribute('data-id');if(okId(i))m[lid(i)]=+d.getAttribute('data-n')});return m}
function target(x,c){var s=anc(x),m=nums(),by={},n=+c.getAttribute('data-n'),y=null,go=[],may=[];Object.keys(m).forEach(function(i){by[m[i]]=i});
while(--n>0&&by[n]&&s[by[n]]);if(n>0&&by[n])y=by[n];
Object.keys(s).sort(function(a,b){return s[a]-s[b]||+a.slice(2)-+b.slice(2)}).forEach(function(a){var w=a+', its '+(KIN[s[a]-1]||'ancestor'),st=(G.n[a]||[])[1];
if(m[a]){if(y&&m[a]>n)go.push(w)}else if(st==='b'||st==='w')may.push(w+' ('+LS[st].toLowerCase()+')')});return{y:y,go:go,may:may}}
function kinl(l){return l.length<2?l.join(''):l.slice(0,-1).join(', ')+', and '+l[l.length-1]}
function up(c,id){var o=c.querySelector('.lk-up'),b;if(o)o.parentNode.removeChild(o);if(!okId(id)||!(+c.getAttribute('data-n')>1))return;
b=document.createElement('button');b.type='button';b.className='lk-up';b.textContent='↑';b.title='Move up one place in the start order: before number '+(+c.getAttribute('data-n')-1)+', its open parents with it';
b.setAttribute('aria-label','Move '+id+' up one place in the start order');b.onclick=function(e){e.stopPropagation();mv(id,c)};c.appendChild(b)}
function qiss(){if(QI)return Promise.resolve(QI);return fetch(S.API+'/repos/'+repo+'/issues?labels=queue&state=all',{headers:S.hdrs()}).then(S.checkAuth)
.then(function(r){return r.ok?r.json():[]}).then(function(a){var i=(a||[]).filter(function(x){return x&&!x.pull_request})[0];QI=i?i.number:null;return QI})}
function mv(x,c){var t=target(x,c),y=t.y,w;if(!okId(y)){say('Not moved: '+x+' already sits just behind its own parents at the top of the start order.');return}
w=(t.go.length?'; it also moves '+kinl(t.go):'')+(t.may.length?'; '+kinl(t.may)+(t.may.length>1?' move too if they sit':' moves too if it sits')+' lower on the board':'');
say('Sending: '+x+' before '+y+w+'...');
chain=chain.then(qiss).then(function(q){if(!q)throw new Error('no issue labelled queue');var h=S.hdrs();h['Content-Type']='application/json';
return fetch(S.API+'/repos/'+repo+'/issues/'+q+'/comments',{method:'POST',headers:h,body:JSON.stringify({body:'/move '+x+' before '+y})})}).then(S.checkAuth)
.then(function(r){if(!r.ok)throw new Error(S.said(r)+(r.status===403||r.status===404?' (does the token have Issues: read and write?)':''));
say('Sent: '+x+' moves ahead of '+y+w+'. The company applies it at its next inbox check; Home shows the new order after the next build.')})
.catch(function(e){say('Not sent: '+(e&&e.message?e.message:'network error')+'.')})}
function save(id,on,again){return read().then(function(f){var l=f.list.filter(function(i){return i!==id}),h,o;
if((f.list.indexOf(id)>=0)===on){take(f.list);return 'same'}
if(on)l.push(id);l.sort(function(a,b){return +a.slice(2)-+b.slice(2)});o=f.o||{};o.tasks=l;h=S.hdrs();h['Content-Type']='application/json';
var body={message:'Investor: '+(on?'star ':'unstar ')+id+' (Home)',content:b64(JSON.stringify(o,null,2)+'\n'),branch:'main'};if(f.sha)body.sha=f.sha;
return fetch(S.API+path(),{method:'PUT',headers:h,body:JSON.stringify(body)}).then(S.checkAuth,function(){var e=new Error('no answer; it may have saved');throw e}).then(function(r){
if((r.status===409||r.status===422)&&!again)return save(id,on,1);
if(r.status===409||r.status===422)throw new Error('the file changed on GitHub twice while saving, so nothing was written; try again');
if(!r.ok)throw new Error(S.said(r)+(r.status===403||r.status===404?' (does the token have Contents: read and write?)':''));take(l)})})}
function tap(id){var on=!F[id];if(on)F[id]=1;else delete F[id];fire();say('Saving the star on GitHub...');
chain=chain.then(function(){return save(id,on)}).then(function(w){say(w==='same'?(on?'Already starred; nothing sent.':'Already unstarred; nothing sent.'):on?'Starred '+id+' for both of you. Chat gets a notice when it merges.':'Star taken off '+id+'.')},
function(e){if(on)delete F[id];else F[id]=1;fire();say('Not saved: '+(e&&e.message?e.message:'network error')+'.')})}
S.lk={fav:function(id){return !!F[id]},on:function(f){fn.push(f)},match:match,q:function(){return Q},star:star,open:function(k){return !!O[k]},aria:aria,id:lid,
lin:function(c,i){badge(c,i);if(c.classList.contains('lk-open'))tree(c)},
// T-4007: the sort and the category In flight draws by, and how many tasks are queued (the page's rows and the rest of the index)
sort:function(){return SO},dir:function(){return SD},by:by,tnum:tnum,rq:rq,catok:catok,txt:txt,requeue:function(){queued();count()},
// T-4313: whether a search or a filter is on, the queued rows on show under them, the find line's counts
fon:function(){return !!(Q||CF||IV)},qv:function(){return QV},cnt:count,
qn:function(){var q=document.getElementById('lk-q');if(q&&!A)queued();return q?[].filter.call(q.querySelectorAll('.lk-q:not(.lk-x)'),function(c){return inq(c.getAttribute('data-id'),0)}).length
+(A||[]).filter(function(a){return inq(a[0],a[5])}).length:0}};
H.addEventListener('click',function(e){var t=e.target,c,l=t.closest&&t.closest('a[data-go]');if(l){e.preventDefault();go(l.getAttribute('data-go'));return}
if(!t.closest||t.closest('button,a,input,summary,select,label,.lk-tree'))return;c=t.closest(CARD);
if(c&&H.contains(c)&&c.querySelector('.lk-tn'))toggle(c)});
H.addEventListener('keydown',function(e){var t=e.target,c;if((e.key==='Enter'||e.key===' ')&&t.classList&&t.classList.contains('lk-tn')){c=t.closest(CARD);if(c){e.preventDefault();toggle(c)}}});
[].forEach.call(H.querySelectorAll('.lk-tn'),function(n){aria(n.closest(CARD))});
if(inp&&fb){fb.hidden=false;inp.addEventListener('input',function(){Q=inp.value.trim().toLowerCase();H.classList.toggle('lk-searching',!!Q);fire()})}
// T-4530: Group by feature; a tap redraws every list, grouped or flat in start order
(function(){var g=document.getElementById('lk-gf');if(!g)return;g.setAttribute('aria-pressed',LKFT.on()?'true':'false');
g.addEventListener('click',function(){LKFT.on(!LKFT.on());g.setAttribute('aria-pressed',LKFT.on()?'true':'false');fire()})})();
if(fb&&document.getElementById('lk-q-how'))document.getElementById('lk-q-how').hidden=false;
if(so)so.addEventListener('change',function(){SO=so.value;SD=DF[SO]||1;sorts();fire()});
if(dr)dr.addEventListener('click',function(){SD=-SD;sorts();fire()});
if(so2)so2.addEventListener('change',function(){S2=so2.value;D2=DF[S2]||1;sorts();fire()});
if(dr2)dr2.addEventListener('click',function(){D2=-D2;sorts();fire()});sorts();
if(cf)cf.addEventListener('change',function(){setCF(cf.value)});
[].forEach.call(H.querySelectorAll('.lk-chips button'),function(b){b.addEventListener('click',function(){setCF(b.getAttribute('data-v'))})});
if(iv)iv.addEventListener('change',function(){IV=iv.value;fire()});
queued();
if(tok)read().then(function(f){take(f.list)},function(){})});
// T-2400: Usage's tiles (personal accounts, API credits, the share) follow the live status, as the Overview glance did.
document.addEventListener('DOMContentLoaded',function(){var S=window.CompanySite,u=document.querySelector('#usage .lk-pt');
if(!S||!S.onStatus||!S.added||!u)return;function mk(p,t,c,x){var e=document.createElement(t);if(c)e.className=c;e.textContent=x;p.appendChild(e);return e}
S.onStatus.push(function(){var g=document.createElement('div');g.className='tiles lk-pt';S.added(g,function(g,h,l,big,sub){
var d=mk(g,'div','tile','');mk(d,'b','num',big);mk(d,'span','',sub?l+': '+sub:l)},'#usage');u.parentNode.replaceChild(g,u);u=g})});
// T-2667 (T-2480, friesevan #41 c6651474906): each account's 5-hour and week bars, each against its own reset and its own
// even-pace tick (JeremyFries #41 c6673789569: the accounts' weeks do not line up). The main account's from the status's meter;
// a personal account's from personal.meters, which only the token's status carries (T-0944). Text goes in as textContent.
// T-4454: a window whose reading is older than its own reset says "reset due, not read yet" in place of a reset already past.
document.addEventListener('DOMContentLoaded',function(){var S=window.CompanySite;if(!S||!S.onStatus)return;
function et(t){var d=new Date(t);return !t||isNaN(d)?'':d.toLocaleString('en-GB',{timeZone:'America/New_York',weekday:'short',hour:'2-digit',minute:'2-digit'}).replace(',','')}
function pace(r,h){var e=Date.parse(r);return isNaN(e)?null:Math.max(0,Math.min(100,100-(e-Date.now())/(h*36e3)))}
function set(row,k,w,h){var c=row.querySelector('[data-w="'+k+'"]');if(!c)return null;var i=c.querySelector('i'),s=c.querySelector('s'),v=c.querySelector('.lk-v'),n=c.querySelector('p');
var p=w&&typeof w.pct==='number'?w.pct:null,t=w?pace(w.resets_at,h):null,r=w&&w.resets_at?et(w.resets_at):'';
i.style.width=(p===null?0:Math.max(0,Math.min(100,p)))+'%';i.className=p!==null&&p>=100?'hot':'';v.textContent=p===null?'–':Math.round(p)+'%';
if(s){s.hidden=t===null;if(t!==null)s.style.left=t+'%'}
if(n){n.className=p!==null&&p>=100?'meta lk-hotw':'meta';n.textContent=p===null?'no reading yet':w.resets_at&&Date.parse(w.resets_at)<=Date.now()?'reset due, not read yet':!r?(p>=100?'at its limit · ':'')+'reset time not known':p>=100?'at its limit · lane paused to '+r:'resets '+r}return p}
function draw(st){var ms=(st.personal||{}).meters,m=st.meter||{},z=0;
[].forEach.call(document.querySelectorAll('.lk-acct[data-acct]'),function(row){var a=row.getAttribute('data-acct');
if(a==='main'){if(m.five_hour)set(row,'five',m.five_hour,5);if(m.weekly)set(row,'week',m.weekly,168);return}
if(!ms)return;var r=ms[a]||null,p=set(row,'five',r&&r.five,5);set(row,'week',r&&r.week,168);if(p!==null&&p>=100)z++});
var pz=document.getElementById('lk-pz');if(pz&&ms){pz.hidden=false;pz.querySelector('b').textContent=z}}
S.onStatus.push(draw);if(S.status&&S.status())draw(S.status())});
// T-2667 (T-2469, friesevan #41 c6650882035): In flight (T-3284, was Running) follows every status, from lanes.js's sources
// (the main account's tasks, then each personal row not done), and T-3284 item 3 adds every task the build saw in a queue,
// a test, Parked or a merge (data-life's init). Each task's stage comes from the build's machine records, else Review for a
// review task, else Coding. Each card's track is its history (steps(), hist_steps in home_look.py). Four cards (three at
// 390) before Show more; the choice is kept in localStorage.
// T-4007 (JeremyFries and friesevan, #41, 2026-11-10): In flight is the first part of the one list under Flow, Queued the
// second. Every chip filters now (the Merging and Simulators panels they jumped to are off Home), and Queued is a chip
// too: a stage chip shows that stage's cards alone, Queued the queued rows alone. The order is the sort the block above
// keeps (K3.sort()); a card in the merge line says where its change stands beside its stage (x.g, merge_words in
// home_look.py), and first, beside the stage, which retry it is on past a first try (x.y, flow.now()'s retry; T-3996).
document.addEventListener('DOMContentLoaded',function(){var S=window.CompanySite,box=document.getElementById('lk-run');if(!box)return;
var f={},L={};try{f=JSON.parse(box.getAttribute('data-faces')||'{}')}catch(e){}try{L=JSON.parse(box.getAttribute('data-life')||'{}')}catch(e){}
var RUN=['coding','review','testq','testing','mergeq','simq','mergetest','parked','merging','merged'],ST=RUN.slice().reverse(),Q={testq:1,mergeq:1,simq:1,parked:1},
LB={coding:'Coding',testq:'Test queue',testing:'Testing',review:'Review',mergeq:'Merge queue',mergetest:'Merge testing',parked:'Retry Queue',merging:'Merging',simq:'Simulator Queue',merged:'Merged'},
M3=['mergeq','mergetest','merging'],EX={coding:M3,review:M3,testq:['testing'].concat(M3),testing:M3,mergeq:M3.slice(1),parked:M3,mergetest:['merging'],merging:[],simq:M3.slice(1),merged:[]};
// T-4007 (JeremyFries, typed 2026-11-10: "the way that it lists the current step of the task ... (6 stages, shared by all
// tasks, with totals summed) ... should be included in the full task list"): a card's step is shown as This Session
// shows it: one row of stage columns shared by every card, (#lk-cols; no totals since c6797836020), and on each card
// a track of marks under those columns (session_page.py's _track; cells() is col_cells in home_look.py). COL folds the
// build's eight steps into the five of This Session's columns a listed task can be in (CK, its order; CL, its names);
// MK is the mark where the task waits or was sent back; SN the step inside Being built that is not plain coding; HW
// the same names for an open card's history in words.
// T-4094: Simulator Queue between Testing and the Simulator; Retry Queue (was Sent Back) only for a task in its lane's
// sent-back queue (home_look COLS, HL, retry_queue). T-4129: no Set aside stage.
var CK=['being_built','waiting_to_merge','mac_tests','sim_queue','iphone_tests','sent_back'],
COL={coding:'being_built',review:'being_built',testq:'being_built',testing:'mac_tests',mergeq:'waiting_to_merge',merging:'mac_tests',simq:'sim_queue',mergetest:'iphone_tests',parked:'sent_back',merged:'merged'},
// T-4595 (friesevan #41 c6924443937): the Merge Queue chip's title, so it and Now's split mean the same thing
MQT='Ready, waiting its turn to land. Home’s “in the merge queue” counts these and the one landing now (under Testing).',
CL={being_built:'Building',waiting_to_merge:'Merge Queue',mac_tests:'Testing',sim_queue:'Simulator Queue',iphone_tests:'Simulator',sent_back:'Retry Queue',merged:'Merged'},
MK={waiting_to_merge:'q',sim_queue:'q',sent_back:'f'},SN={review:'review',testq:'waiting for its own test run'},
HW={coding:'Building',review:'Review',testq:'Waiting for its own test run',testing:'Testing',mergeq:'Merge Queue',merging:'Testing',simq:'Simulator Queue',mergetest:'Simulator',parked:'Retry Queue',merged:'Merged'};
var pic={};[].forEach.call(document.querySelectorAll('.lk-team a'),function(a){var m=/cast\/([^/.]+)\.html/.exec(a.getAttribute('href')||''),g=a.querySelector('img');if(m&&g)pic[m[1]]=g.getAttribute('src')});
var fl='all',items=L.init||[],IN={};
items.forEach(function(x){if(x.id)IN[x.id]=x});
// T-4313 (friesevan #41 c6862221970): Merged, its own part above In flight: MG its cards (home_look merged_cards; mgs()
// from each status), ME how many finished this session past the rows the status names, mbox where they are drawn
var MG=L.mg||[],ME=+L.me||0,mbox=document.getElementById('lk-mg');MG.forEach(function(x){if(x.id&&!IN[x.id])IN[x.id]=x});
var CT={};Object.keys(L.cat||{}).forEach(function(k){String(L.cat[k]).split(' ').forEach(function(n){if(n)CT['T-'+n]=k})});  // T-3427: {label: "numbers"}
function mk(p,t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;p.appendChild(e);return e}
function cap(s){s=String(s||'');return s.charAt(0).toUpperCase()+s.slice(1)}
// T-2401 (#41 c6648649825): the model and the effort a lane gives the task, 'Opus high', as home_look.level
function lv(x){return x.m?[cap(x.m),x.e].filter(Boolean).join(' '):''}
// T-3318: src_words in home_look.py; '' for an unknown source, never a guess. T-4320 (JeremyFries #41 c6866054849): a
// personal account is "Evan's Account" (a) or "Jeremy's Account" (b): acn() is personal.py's account_words
var OWN={a:'Evan',b:'Jeremy'};
function acn(l,n){n=String(n||OWN[l]||'');return !n?'Account '+String(l).toUpperCase():/\baccount$/i.test(n)?n:n+"'s Account"}
function sw(s,n){s=String(s||'');var k=/^(plan|key)-([a-z])$/.exec(s);return s==='plan'?'Main plan':s==='api'?'Company API credits':k?(k[1]==='key'?'Key '+k[2].toUpperCase():acn(k[2],n)):''}
function nm(s){s=String(s||'').replace(/^\s*\[[^\]]*\]\s*/,'').replace(/^\s*T-\d+\s*[:,]?\s*/,'');s=cap(s);return s.length>160?s.slice(0,159).replace(/\s+\S*$/,'')+'…':s}
var K3=window.CompanySite&&window.CompanySite.lk;  // T-3187: stars, search and open cards (the block above)
function mins(n){return n>=1440?Math.floor(n/1440)+' d '+Math.floor(n%1440/60)+' h':n>=60?Math.floor(n/60)+' h '+(n%60)+' min':n+' min'}
function mark(p,s){mk(p,'span',Q[s]||s==='queued'?'lk-qm':'lk-dot')}
function steps(x){var p=(x.h||[]).map(function(h){return h.slice()}),c=Q[x.s]?'q':'a';
if(!p.length&&x.s!=='coding'&&x.s!=='review')p=[['coding',null,'d','']];if(x.s==='coding'&&p.length&&p[p.length-1][2]==='f')c='a lb';
p.push([x.s,x.min>=0?x.min:null,c,'']);var ex=EX[x.s].filter(function(e){return e!=='mergetest'||x.x}).map(function(e){return[e,null,'n','']});
// T-4019: sent back goes round again: a fix to Coding, a retry to the merge line (home_look.hist_steps)
if(x.s==='parked'){if(x.k==='retry'){if(ex.length)ex[0][2]='n r'}else ex.unshift(['coding',null,'n r',''])}return p.concat(ex)}
function hist(c,x){var st=steps(x),k=st.filter(function(h){return h[2].charAt(0)!=='n'}).length,old=Math.max(0,k-6),ol=mk(c,'ol','lk-hist');
ol.setAttribute('aria-label','Steps, now '+LB[x.s]);if(old)mk(ol,'li','e','+'+old+' earlier');
var wd=[],nx=[];st.forEach(function(h,j){var li=mk(ol,'li',(h[2]+(j<old?' old':'')).trim(),LB[h[0]]),w=[h[1]==null?'':h[1]<1?'<1 min':mins(h[1]),h[3]].filter(Boolean).join(' · ');if(w)mk(li,'small','',w);
li.title=LB[h[0]]+(w?' · '+w:'')+({f:' · failed',q:' · waiting now',n:' · expected'}[h[2]]||(h[2].indexOf('a')>=0?' · now':''));
if(h[2].charAt(0)==='n')nx.push((h[2]==='n r'?'back to ':'')+LB[h[0]]);else wd.push((h[2].indexOf('lb')>=0?'back to ':'')+LB[h[0]]+(w?' '+w:''))});
mk(c,'p','lk-hw meta',wd.join(' → ')+(nx.length?'; next: '+nx.join(', '):''))}
// the track: "now" where the task is, "was" where this try has been (a try sent back: the try that failed), "" elsewhere
function cells(x){var here=COL[x.s],h=x.h||[],f=[],cur,been={};h.forEach(function(s,i){if(s[2]==='f')f.push(i)});
if(here==='being_built'||x.s==='testing')cur=[];else if(here==='sent_back'&&f.length)cur=h.slice(f.length>1?f[f.length-2]+1:0,f[f.length-1]+1);else cur=f.length?h.slice(f[f.length-1]+1):h;
cur.forEach(function(s){if(COL[s[0]])been[COL[s[0]]]=1});if(here!=='being_built')been.being_built=1;
if(here==='merged')been.waiting_to_merge=been.mac_tests=1;if(x.s!=='testing'&&(['mac_tests','sim_queue','iphone_tests','sent_back'].indexOf(here)>=0||been.mac_tests||been.iphone_tests))been.waiting_to_merge=1;
if(here==='sim_queue')been.mac_tests=1;if(here==='iphone_tests'||been.iphone_tests)been.sim_queue=1;
// c6797836020: a step the task does not need is blank in its own column (home_look col_cells, needs_sim); T-4094: the
// Retry Queue is lit only for a task waiting in it now
// T-4293: the records' marks for the stages behind it (psm) over the inferred ones: brief faint, arrow skipped
var M=psm(x);return CK.map(function(k){var v=k===here?'now':been[k]&&k!=='sent_back'?'was':'',m=M[k];if(v===''&&k==='sent_back')return 'skip';
if(m&&v!=='now')v={d:'was',b:'brief',s:'arrow'}[m[0]]||'';return v})}
// T-4293 (friesevan #41 c6860226572): the build's marks (home_look add_passes, x.p) for the columns behind the card's
// stage now, and the Simulator's two for work the board files outside App anywhere on the track (home_look pass_marks)
var PSC=['waiting_to_merge','mac_tests','sim_queue','iphone_tests'],WHYS={"short": "{L}: passed through in {s}, less than the {g} s between two of Home's live readings, so the page may never have shown it.", "short_own": "{L}: passed through in {s}, less than the {g} s between two of Home's live readings, so the page may never have shown it. No test run of its own on the MacBook is on record before hand-in.", "lane": "{L}: passed through between two readings. Its land shows it was marked ready and took its turn, but no reading of the record caught it waiting.", "turn": "{L}: passed through between two readings. Its iPhone check ran, so it had its turn for a Simulator, but no reading of the record caught it waiting.", "main": "{L}: did not apply. Main-session work lands straight through the gate, which has no Merge Queue; a wait for the gate's turn shows here while it lasts and is not recorded.", "own": "{L}: skipped. It sent no test run of its own to the MacBook before hand-in, and no test run at its merge is on record.", "noxc": "{L}: did not apply. Its change touches no app code, so its merge ran no iPhone check.", "cat": "{L}: does not apply. The board files it under {c}, not App, and work outside the app gets no iPhone check.", "none": "{L}: not on record, and no record says why."},BRS=20;
function psm(x){var here=COL[x.s],o={},i=PSC.indexOf(here),p=x.p||{};
PSC.forEach(function(k,j){var m=p[k];if(m&&m[1]==='cat'){if(k!==here)o[k]=m}else if(m&&x.s!=='parked'&&(here==='merged'||(i>j&&x.s!=='testing')))o[k]=m});
if(sim(x)===false)['sim_queue','iphone_tests'].forEach(function(k){if(k!==here&&!o[k])o[k]=['s','cat']});return o}
// one plain line a stage passed quickly or skipped, neighbours with the same reason on one line (home_look why_lines)
function andw(a){return a.length>1?a.slice(0,-1).join(', ')+' and '+a[a.length-1]:a[0]}
function whys(x){var M=psm(x),o=[],l=null;CK.forEach(function(k){var m=M[k];if(!m||m[0]==='d'){l=null;return}
if(l&&l[0]===m[0]&&l[1]===m[1]&&l[2]===m[2]){o[o.length-1][0].push(CL[k]);return}o.push([[CL[k]],m]);l=m});
return o.map(function(a){var m=a[1],s=m[2];return String(WHYS[m[1]]||'').replace('{L}',andw(a[0])).replace('{s}',s==null?'':s<1?'under a second':s+' s').replace('{g}',BRS).replace('{c}',String(x.c||'').split(' \u00b7 ')[0]||'another category')})}
function sim(x){if(x.x)return true;var c=String(x.c||'');return c?c.indexOf('App')===0:null}
function track(c,x){var here=COL[x.s],t=mk(c,'span','ts-trk'),wd=[],nx=[];t.setAttribute('aria-hidden','true');
var cs=cells(x);cs.forEach(function(v,j){var i=mk(t,'i');if(v==='now')i.className=MK[here]||'a';else if(v==='was')i.className='d';else if(v==='brief')i.className='b';
else if(v==='arrow')i.className=cs[j+1]==='arrow'?'s':'s e';else if(v==='skip')i.className='o'});
steps(x).forEach(function(h,j){var w=[h[1]==null?'':h[1]<1?'<1 min':mins(h[1]),h[3]].filter(Boolean).join(' · ');
if(h[2].charAt(0)==='n')nx.push([CK.indexOf(COL[h[0]]),j,(h[2]==='n r'?'back to ':'')+HW[h[0]]]);else wd.push((h[2].indexOf('lb')>=0?'back to ':'')+HW[h[0]]+(w?' '+w:''))});
nx.sort(function(a,b){return a[0]-b[0]||a[1]-b[1]});
mk(c,'p','lk-hw meta',wd.join(' → ')+(nx.length?'; next: '+nx.map(function(n){return n[2]}).join(', '):''));
whys(x).forEach(function(w){mk(c,'p','lk-hw meta lk-why',w)});if(x.b)mk(c,'p','lk-hw meta',x.b)}
// T-4094 (c6804999684): beside the worker, the model and effort only in Building; any other stage says its own fact
// (home_look fact()); an open card past Building names its build's worker, model and effort (past_html)
function fact(x){return COL[x.s]==='being_built'?lv(x):x.s==='parked'?(x.f||''):(x.f||x.n||'')}
// T-3950 (friesevan #41 c6755760889: "Individual tasks can be viewed in the simulator queue or merging panel by clicking
// an associated link on the (expanded) task, instead"): the stage chips filter In flight and never scroll; an open card
// whose change waits for or runs on a Simulator, or stands in the merge line, links to the task's own line on This
// Session (data-sess), its stage columns and history, which session.js opens at #T-n. The link shows on an open card only.
var GO={simq:'Simulator Queue',mergetest:'Simulator Queue',mergeq:'merge line',merging:'merge line'};
function goto(c,x){var a,u=(document.getElementById('lk-all')||document.body).getAttribute('data-sess');if(!u||!x.id||!GO[x.s])return;
a=mk(mk(c,'p','lk-sq meta'),'a','','Open '+x.id+' in the '+GO[x.s]+' on This Session');a.href=u+'#'+encodeURIComponent(x.id)}
function past(c,x){if(COL[x.s]==='being_built')return;var w=(x.w||[]).filter(function(v){return v&&!/not recorded/.test(v)}).map(cap).join(', '),l=x.m&&!/not recorded/.test(x.m)?lv(x):'';
mk(c,'p','lk-hw meta lk-past','Building: '+(w?'built by '+w:'worker not recorded')+(l?', '+l:', model not recorded'))}
function card(x,p){var c=mk(p||box,'div','lk-card lk-run'),r=mk(c,'div','lk-r1'),fs=mk(r,'span','lk-faces'),t,m,rt,sc,col=COL[x.s];c.setAttribute('data-stage',x.s);c.setAttribute('data-col',col);
c.setAttribute('data-id',x.id||x.t);if(K3&&K3.open(x.id||x.t))c.classList.add('lk-open');
(x.w||[]).slice(0,2).forEach(function(w){var p=f[String(w).toLowerCase()],g;if(p&&pic[p]){g=mk(fs,'img');g.src=pic[p];g.alt='';g.width=g.height=40}});
t=mk(r,'span','t');mk(t,'b','lk-tn',x.t);m=mk(t,'span','',[(x.w||[]).filter(Boolean).map(cap).join(', '),fact(x)].filter(Boolean).join(' · '));
if(x.min>=0){if(m.textContent)m.appendChild(document.createTextNode(' · '));mk(m,'span','lk-nw',mins(x.min))}
if(x.a){m.appendChild(document.createTextNode(' '));sc=mk(m,'span','lk-tag'+(x.sr?' lk-src':''),x.a);if(x.sr)sc.title='Runs on: '+x.a}
if(x.c){sc=mk(m,'span','lk-cat',x.c);sc.title='Category: '+x.c}
rt=mk(r,'span','lk-rt');if(x.id)mk(rt,'span','idb',x.id);if(x.n&&col==='being_built'&&x.n!==HN)mk(rt,'span','lk-nt',x.n);if(K3){K3.star(r,x.id);K3.aria(c)}
track(c,x);past(c,x);goto(c,x);sc=mk(c,'span','lk-ch lk-stc');if(col==='waiting_to_merge')sc.title=MQT;mark(sc,x.s);sc.appendChild(document.createTextNode(CL[col]));
m=[x.y>=1?'retry '+x.y:'',SN[x.s],x.n===HN?HN:'',x.g].filter(Boolean).join(' · ');if(m)mk(c,'span','lk-mg',m);if(K3)K3.lin(c,x.id)}
// the worker a card sorts by: its first, a card with none recorded last
function who(x){var w=String((x.w||[])[0]||'');return /not recorded/.test(w)?'':w}
// 'def': starred, then moving work, then work waiting in a line, then held work (PC; T-4007, friesevan #41 c6772135629:
// held work second let the moving cards fold behind Show more), each the last step first, then the longest in its step;
// the work set aside, which Home listed in its Merging panel and not here, comes after the held marker (z). As
// flight_key in home_look.py. 'first' follows the columns, left to right.
var PC={testq:1,mergeq:1,simq:1,parked:2};
// T-4094: the record a sort reads (K3.by); Stage is the column, left to right, then the step in it
function rec(x){var k=CK.indexOf(COL[x.s]);return {stage:(k<0?CK.length:k)*100+RUN.indexOf(x.s),time:x.min>=0?x.min:null,cat:x.c||null,who:who(x)||null,
created:K3&&K3.tnum?K3.tnum(x.id):null,requested:K3&&K3.rq?K3.rq(x.id):null,started:Date.parse(x.ps||'')||null,retries:x.y||0}}
function order(a,b){var d=ST.indexOf(a.s)-ST.indexOf(b.s),fa=K3&&K3.fav(a.id)?1:0,fb=K3&&K3.fav(b.id)?1:0,sm=K3&&K3.sort?K3.sort():'def',z=(a.z||0)-(b.z||0);
return (fb-fa)||(K3&&K3.by?K3.by(rec(a),rec(b)):0)||(sm==='stage'?0:(sm==='def'?(PC[a.s]||0)-(PC[b.s]||0):0)||z||d)||((b.min||0)-(a.min||0))}
function hit(x){return !K3||K3.match([x.t,x.id,(x.w||[]).join(' '),LB[x.s],CL[COL[x.s]],x.n,x.a,x.g].map(function(s){return s||''}).join(' '))}
// T-4313 (friesevan #41 c6862221970: "filtering tasks should update the totals displayed everywhere, both next to the
// section header and on the Stage toggle buttons"): ok() is the search and the filters (category, Requested by); each
// chip counts its tasks under them (a stage chip's count does not narrow the others), each part's header counts what
// it shows, and All tasks counts what the chosen chip shows. With no search or filter the counts are as built: Merged's
// includes the tasks past the rows the status names (ME), Queued's header the board's ready count (data-n).
function ok(x){return hit(x)&&(!K3||!K3.catok||K3.catok(x.c,x.id))}
function put(id,n){var e=document.getElementById(id);if(e)e.textContent=n}
function render(){var flt=document.getElementById('lk-flt'),all={},cnt={},v,c,w,qn=K3&&K3.qn?K3.qn():0,on=!!(K3&&K3.fon&&K3.fon()),qv=on&&K3.qv?K3.qv():qn,
pm=document.getElementById('lk-pm'),pf=document.getElementById('lk-pf'),pq=document.getElementById('lk-pq'),vf=items.filter(ok),vm=MG.filter(ok),nmg=on?vm.length:MG.length+ME,od;
items.forEach(function(x){var k=COL[x.s];all[k]=(all[k]||0)+1});if(MG.length+ME)all.merged=MG.length+ME;
vf.forEach(function(x){var k=COL[x.s];cnt[k]=(cnt[k]||0)+1});cnt.merged=nmg;cnt.queued=qv;
if(fl!=='all'&&!(fl==='queued'?qn:all[fl]))fl='all';cnt.all=vf.length+qv+nmg;
// the chips filter, each with its count as before T-3996 (T-4007, friesevan #41 c6772135629); T-4313: Merged among
// them, and a chip opens the part it shows if it was folded
if(flt){flt.textContent='';[['all','All']].concat(qn?[['queued','Queued']]:[]).concat(CK.concat(['merged']).filter(function(k){return all[k]}).map(function(k){return[k,CL[k]]})).forEach(function(c){
var b=mk(flt,'button','lk-ch');b.type='button';if(c[0]==='waiting_to_merge')b.title=MQT;b.setAttribute('aria-pressed',fl===c[0]);b.onclick=function(){var d;fl=c[0];render();d=document.getElementById(fl==='queued'?'lk-qd':fl==='merged'?'lk-mgd':fl==='all'?'':'lk-fd');if(d)d.open=true};
if(c[0]!=='all')mk(b,'span',c[0]==='queued'||MK[c[0]]?'lk-qm':'lk-dot');b.appendChild(document.createTextNode(c[1]+' '));mk(b,'small','',String(cnt[c[0]]||0))})}
// one part alone under a chip; the columns left to right (the Stage sort, ascending) put Queued, which comes before the
// first of them, on top and Merged, the last stage, at the bottom
if(pm)pm.hidden=fl!=='all'&&fl!=='merged';if(pf)pf.hidden=fl==='queued'||fl==='merged';if(pq)pq.hidden=fl!=='all'&&fl!=='queued';
od=(K3&&K3.sort&&K3.sort()==='stage'&&K3.dir&&K3.dir()>0?[pq,pf,pm]:[pm,pf,pq]).filter(Boolean);
if(od.length>1&&od.every(function(e){return e.parentNode===od[0].parentNode})&&od.some(function(e,i){return i&&od[i-1].nextElementSibling!==e}))od.forEach(function(e){e.parentNode.appendChild(e)});
var sq=!!(K3&&K3.q());box.textContent='';v=vf.filter(function(x){return fl==='all'||COL[x.s]===fl}).sort(order);v.forEach(function(x){card(x)});LKFT.group(box);
if(!items.length)mk(box,'p','','Nothing in flight.');else if(!v.length&&(sq||on))mk(box,'p','meta','No task in flight matches.');
if(mbox){mbox.textContent='';w=vm.slice().sort(order);w.forEach(function(x){card(x,mbox)});LKFT.group(mbox);
if(!MG.length)mk(mbox,'p','','Nothing merged this session yet.');else if(!w.length)mk(mbox,'p','meta','No merged task matches.')}
c=document.getElementById('lk-mg-m');if(c){c.hidden=!ME;c.textContent='and '+ME+' merged earlier this session, not listed here'}
put('lk-run-n',v.length);put('lk-mg-n',nmg);c=document.getElementById('lk-q-n');if(c)c.textContent=on?qv:(c.getAttribute('data-n')||qv);
put('lk-all-n',cnt[fl]);if(K3&&K3.cnt)K3.cnt()}
// T-2833: the idle alarm (no work session for 15+ minutes while work is allowed) follows every status too.
function idle(st){var q=st.idle,sf=document.getElementById('lk-sf'),ie=document.getElementById('lk-idle');if(sf&&!ie){ie=document.createElement('p');ie.id='lk-idle';ie.className='meta lk-idle';sf.insertBefore(ie,sf.firstChild)}
if(ie){if(q&&q.why&&q.since){var mn=Math.max(0,Math.round((Date.now()-Date.parse(q.since))/6e4));ie.textContent='No work session for '+(mn>=60?Math.floor(mn/60)+' h '+(mn%60)+' m':mn+' min')+' while work is allowed: '+q.why+'.'+(q.healed&&q.healed.length?' Done: '+q.healed.join('; ')+'.':'');ie.hidden=false}else ie.hidden=true}}
// T-4313: Merged's cards from each status: the cards at the Merged stage (U), then the tasks the status says finished this
// session (tasks.fin, T-3190's list, newest first), each once, drawn as In flight's; a finished task's worker, model,
// history and category are the build's when it saw the task (IN), its time since the merge the live stages' (LS)
function mgs(st,u,LS,now){var d=(st.session||{}).active?(st.tasks||{}).fin:null,o=u.filter(function(x){return x.s==='merged'}),sn={};
o.forEach(function(x){sn[x.id||x.t]=1});ME=d?Math.max(0,(+d.n||0)-(d.rows||[]).length):0;
(d&&d.rows||[]).forEach(function(a){var id=String(a&&a[0]||''),b,v,m=-1;if(!id||sn[id])return;sn[id]=1;b=IN[id]||{};v=LS&&LS[id];
if(v&&v[0]==='merged'&&v[2])m=Math.max(0,Math.round((now-v[2])/6e4));else if(b.s==='merged'&&b.min>=0)m=b.min+Math.max(0,Math.round((now-(L.at||now))/6e4));
o.push({id:id,t:nm(a[1])||nm((L.nm||{})[id])||snm(st,id)||b.t||'Name not recorded',w:swk(st,id,b.w),m:b.m||'model not recorded',e:b.e||'',min:m,s:'merged',n:'',h:b.h||[],x:b.x,p:b.p,c:b.c||CT[id]||'',ps:b.ps||''})});
return o}
// T-4095 (friesevan #41 c6809316957): the status's stg, the live stages (live_stage.py, read every minute with the same rule
// as the build, home_look stage_map), wins over the build's L.st once it is newer than the build; a stage it reads that
// it no longer names has ended (LK). mg(): Merged holds for a row begun before the commit, of the commit's worker.
function lv0(st){var g=st&&st.stg;return g&&g.s&&Date.parse(g.at)>=(L.at||0)?g.s:null}
// T-4162 (friesevan #41 c6826068202): the status's stg.nm names each task it lists (live_stage.add_names, task_names);
// the build's L.nm names only the tasks the build saw, so T-3807, handed out after it, read "Name not recorded".
function snm(st,id){var g=st&&st.stg;return nm(g&&g.nm&&g.nm[id])}
// T-4225 (friesevan #41 c6840224155): and stg.wk names each one's worker (live_stage.add_workers): a card the build had
// not seen, T-4116 in its land at 7:38 PM 11-12, read "worker not recorded". w: the build's, kept when it names one.
function swk(st,id,w){var g=st&&st.stg,k=g&&g.wk&&g.wk[id];return w&&w[0]&&!/not recorded/.test(w[0])||!k?w||['worker not recorded']:[k]}
var LK={testq:1,testing:1,mergeq:1,simq:1,mergetest:1,merging:1,merged:1};
// T-4308: a lane task its session has committed stays Building while the session runs (home_look HELD_NOTE)
var HN='committed; it joins the merge line when its session ends';
function sg(LS,id,r){var s=LS&&LS[id]||null,b=(L.st||{})[id],a;if(!s&&b&&!(LS&&LK[b[0]]))s=b;if(s&&s[0]==='merged'){a=Date.parse(r.at||'');if(!(a<s[2])||(s[3]&&r.w&&String(s[3]).toLowerCase()!==String(r.w).toLowerCase()))s=null}return s}
function draw(st,isPub){var ml=S.lane.main(st,isPub),l=ml.concat(S.lane.rows(st)),seen={},u=[],now=Date.now(),o={},wk,ms=sw((st.tasks||{}).src),LS=lv0(st);
l.forEach(function(r){var t=String(r.t||r.task||''),id=r.task||(t.match(/\bT-\d+/)||[''])[0],k=id||nm(t),s=sg(LS,id,r),m,b=IN[id]||{},ln=/^([ab])\d*$/.exec(r.lane||''),mn=ml.indexOf(r)>=0,rs=mn?ms:sw(r.src||(ln?'plan-'+ln[1]:''),r.n);if(s&&s[0]==='parked'&&r.at&&Date.parse(r.at)>s[2])s=[r.k==='review'?'review':'coding','Fix after a failed merge'];if(!s&&r.d)s=[r.k==='review'?'review':'coding',HN];if(r.w&&!r.d)o[String(r.w).toLowerCase()]=1;if(!k||seen[k])return;seen[k]=1;
m=r.at?Math.round((now-Date.parse(r.at))/6e4):NaN;u.push({id:id,t:nm(r.t||r.task)||nm((L.nm||{})[id])||snm(st,id)||'Name not recorded',w:r.w?[r.w]:swk(st,id,b.w),m:r.m||b.m||'model not recorded',e:r.e&&r.m?r.e:r.m?'':b.e||'',min:m>=0?m:-1,s:s?s[0]:r.k==='review'?'review':'coding',n:s?s[1]:'',
a:rs||(mn?'Main':ln?acn(ln[1]):''),sr:rs?1:0,h:b.h,x:b.x,p:b.p,c:b.c||CT[id]||'',g:b.g||'',y:b.y||0,ps:b.ps||''})});
(L.init||[]).forEach(function(x){var v;if(x.s==='coding'||x.s==='review'||seen[x.id||x.t])return;if(LS&&x.id&&LK[x.s]){v=LS[x.id];if(!v||v[0]==='merged')return;x=Object.assign({},x,{s:v[0],n:v[1]})}if(x.id&&/^Name not recorded/i.test(x.t||'')&&snm(st,x.id))x=Object.assign({},x,{t:snm(st,x.id)});if(x.id)x=Object.assign({},x,{w:swk(st,x.id,x.w)});seen[x.id||x.t]=1;u.push(x)});  // T-3284 item 3
if(LS)Object.keys(LS).forEach(function(id){var v=LS[id],b=IN[id]||{};if(seen[id]||v[0]==='merged')return;seen[id]=1;  // T-4095: a stage the build had not seen
u.push({id:id,t:nm((L.nm||{})[id])||snm(st,id)||'Name not recorded',w:swk(st,id,b.w),m:b.m||'model not recorded',e:b.e||'',min:v[2]?Math.max(0,Math.round((now-v[2])/6e4)):-1,s:v[0],n:v[1],h:b.h,x:b.x,p:b.p,c:b.c||CT[id]||'',g:b.g||'',y:b.y||0,ps:b.ps||''})});
MG=mgs(st,u,LS,now);items=u.filter(function(x){return x.s!=='merged'});if(K3&&K3.requeue)K3.requeue();render();wk=document.getElementById('lk-working');if(wk)wk.textContent=Object.keys(o).length+' working';idle(st)}
// T-3316: a tree's link to an In flight card shows the whole list, then hands back the card
// T-4313: and to a Merged card, in its own box (go() opens its part)
if(K3){K3.has=function(i){return items.some(function(x){return K3.id(x.id)===i})};K3.hm=function(i){return MG.some(function(x){return K3.id(x.id)===i})};
K3.all=function(){if(fl!=='all'){fl='all';render()}};K3.run=function(i){var b=K3.has(i)?box:K3.hm(i)?mbox:null;if(!b)return null;fl='all';render();
return [].filter.call(b.querySelectorAll('.lk-run'),function(c){return K3.id(c.getAttribute('data-id'))===i})[0]||null}}
render();if(K3)K3.on(render);if(S&&S.onStatus&&S.lane){S.onStatus.push(draw);if(S.status&&S.status())draw(S.status(),true)}});
// T-2940: Blocked or waiting (T-3735) folds behind a button at the top of its list: rows past data-max carry lk-fold.
// T-4287: Queued no longer folds; it scrolls in its box.
// T-4232 (friesevan #41 c6841754758): Home's Mode block (mode_html), first on the page. Each account's mode follows the
// live status (lock_in.modes, through lockin.js's S.modes). A token holder picks an account (All accounts first) and a
// mode; a second tap within 5 seconds posts MODE <account> <mode> on the Chat issue through lockin.js's S.modeSet, the
// Lock In write path (T-3325's Lock In menu in Usage is gone). The Queued fold rides in the same handler, as before.
// T-4246 (friesevan #41 c6850703999): the block is the Mode bubble's controls now (#lk-modes, hidden); the bubble in the
// first line (#lk-mb) says each account's mode (bw(), home_look.mode_words' words) and opens or closes them; Escape
// closes them and puts the focus back on the bubble.
document.addEventListener('DOMContentLoaded',function(){var S=window.CompanySite,d=document.getElementById('lk-modeset'),ml=document.getElementById('lk-modelist'),
mb=document.getElementById('lk-mb'),mp=document.getElementById('lk-modes'),mt=document.getElementById('lk-mbt');
[['lk-bk','lk-bk-more']].forEach(function(k){var q=document.getElementById(k[0]),qb=document.getElementById(k[1]),qa=false,mx,n;if(!q||!qb)return;
mx=+q.getAttribute('data-max')||4;n=q.children.length;[].forEach.call(q.children,function(c,i){c.classList.toggle('lk-fold',i>=mx)});
function pq(){q.classList.toggle('lk-qshort',!qa);qb.hidden=n<=mx;qb.setAttribute('aria-expanded',qa);qb.textContent=qa?'Show fewer ▴':'Show '+(n-mx)+' more ▾'}
qb.onclick=function(){qa=!qa;pq()};pq()});
if(mb&&mp){mb.onclick=function(){var o=mp.hidden;mp.hidden=!o;mb.setAttribute('aria-expanded',o?'true':'false')};
mp.addEventListener('keydown',function(e){if(e.key==='Escape'){mp.hidden=true;mb.setAttribute('aria-expanded','false');mb.focus()}})}
if(!S)return;
var NM={spread:'Spread','double-spread':'Double Spread',midnight:'Lock In until midnight',daily:'Lock In until daily usage'},
SH={spread:'Spread','double-spread':'Double Spread',midnight:'Lock In',daily:'Lock In daily'};
function lis(){return ml?[].slice.call(ml.querySelectorAll('li[data-acct]')):[]}
function bw(){var v=lis().map(function(li){var e=li.querySelector('.lk-mn'),m=e?e.getAttribute('data-mode'):'';return [li.getAttribute('data-acct'),NM[m]?m:'']});
if(!v.some(function(x){return x[1]}))return 'not recorded';if(v.every(function(x){return x[1]===v[0][1]}))return NM[v[0][1]];
return v.map(function(x){return (x[0]==='main'?'Main':x[0].toUpperCase())+' '+(SH[x[1]]||'not recorded')}).join(' · ')}
function show(){var m=S.modes?S.modes():null;if(m)lis().forEach(function(li){var v=m[li.getAttribute('data-acct')],e=li.querySelector('.lk-mn');if(e&&NM[v]){e.textContent=NM[v];e.setAttribute('data-mode',v)}});
if(mt&&lis().length)mt.textContent=bw()}
if(S.onStatus)S.onStatus.push(show);show();
if(!d||!S.getToken||!S.getToken()||!S.modeSet)return;d.hidden=false;
var sel=document.getElementById('lk-macct'),note=document.getElementById('lk-mnote'),bs=[].slice.call(d.querySelectorAll('button[data-m]')),arm=null,armT=0,tm;
function now(a){var m={};lis().forEach(function(li){var e=li.querySelector('.lk-mn');m[li.getAttribute('data-acct')]=e?e.getAttribute('data-mode'):''});
var ks=a==='all'?Object.keys(m):[a],v=m[ks[0]];return ks.every(function(k){return m[k]===v})?v:''}
function mark(){var v=now(sel.value);bs.forEach(function(b){var on=b.getAttribute('data-m')===v;b.setAttribute('aria-pressed',on?'true':'false');b.classList.toggle('on',on)})}
sel.onchange=function(){arm=null;clearTimeout(tm);note.textContent='';mark()};
bs.forEach(function(b){b.onclick=function(){var t=Date.now(),m=b.getAttribute('data-m'),a=sel.value,k=a+' '+m,w=a==='all'?'every account':sel.options[sel.selectedIndex].text;
if(arm!==k){arm=k;armT=t;clearTimeout(tm);tm=setTimeout(function(){arm=null;note.textContent=''},5000);note.textContent='Tap again within 5 seconds for '+NM[m]+', '+w+'. '+b.title;return}
if(t-armT<400)return;arm=null;clearTimeout(tm);note.textContent=S.modeSet(a,m);mark()}});
if(S.onStatus)S.onStatus.push(mark);mark()});
// T-3986 (friesevan #41 c6758405270: Home's Simulators and merge queue near-live "if possible and not costly"; light only,
// #41 c6759690460): Bottlenecks' merge line and the Machine panel follow the status's ln (tools/site/live_stage.py
// lines(), read with the stages every 20 s; pushed when a count moves, else with the 5-minute heartbeat) once it is newer
// than the build; a part ln leaves out keeps the build's. The words are merge_line_html's and machine_panel._rows'.
// The Machine bubble's Mac Mini figure follows the status's disk, its MacBook figure ln's. No read of its own: it
// rides on the status app.js already polls. Text goes in as textContent.
document.addEventListener('DOMContentLoaded',function(){var S=window.CompanySite,bx=document.getElementById('lk-run'),B=0,NM={},LNM={};if(!S||!S.onStatus)return;
try{var lf=JSON.parse(bx&&bx.getAttribute('data-life')||'{}');B=lf.at||0;NM=lf.nm||{}}catch(e){}
function mk(p,t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;p.appendChild(e);return e}
function tx(p,x){p.appendChild(document.createTextNode(x))}
function nm(t){var q=document.getElementById('lk-q'),a=[];if(NM[t])return NM[t];if(LNM[t])return LNM[t];try{a=JSON.parse(q&&q.getAttribute('data-all')||'[]')}catch(e){}a=a.filter(function(x){return x[0]===t})[0];return a&&a[2]||'Name not recorded'}
function et(t){var d=new Date(t);return isNaN(d)?'':d.toLocaleTimeString('en-US',{timeZone:'America/New_York',hour:'numeric',minute:'2-digit'})+' ET'}
function span(n){return n>=1440?Math.floor(n/1440)+' d '+Math.floor(n%1440/60)+' h':n>=60?Math.floor(n/60)+' h '+(n%60)+' min':n+' min'}
function hrs(m){var v=m/60;return v<1?Math.round(v*60)+' min':v<100?v.toLocaleString('en-US',{minimumFractionDigits:1,maximumFractionDigits:1})+' h':Math.round(v).toLocaleString('en-US')+' h'}
function gb(x){return Number(x).toLocaleString('en-US',{maximumFractionDigits:1})}
function bar(c,l,v,top,t){var b,k;c.textContent='';mk(c,'span','lk-bl',l);b=mk(c,'div','lk-bar2');k=mk(mk(b,'span','lk-trk'),'i');k.style.width=(top?Math.max(0,Math.min(100,v/top*100)):0).toFixed(0)+'%';mk(b,'span','lk-v',t);mk(c,'p','meta','')}
function merge(q,at){var r=document.getElementById('lk-mlr'),nw=document.getElementById('lk-mnow'),lm=document.getElementById('lk-mlm'),b={},n,m,tn=0,tm=0;if(!r)return;
try{b=JSON.parse(r.getAttribute('data-ml')||'{}')}catch(e){}n=Object.assign({},b.n||{},q.n||{});m=Object.assign({},b.m||{},q.m||{});
Object.keys(n).forEach(function(k){tn=Math.max(tn,n[k]||0);if(m[k]!=null)tm=Math.max(tm,m[k])});
[].forEach.call(document.querySelectorAll('.lk-bnr[data-stage]'),function(w){var k=w.getAttribute('data-stage'),c=w.children;if(!(k in n)||c.length<3)return;
bar(c[1],'Changes',n[k],tn,String(n[k]));if(m[k]!=null)bar(c[2],'Median wait',m[k],tm,hrs(m[k]));else{c[2].textContent='';mk(c[2],'span','lk-bl','Median wait');mk(c[2],'span','lk-nm','none waiting')}});
r.textContent=r.textContent.replace(/ Read [^.]*?ET\./,' Read '+et(at)+'.');
if(nw&&q.cur){nw.textContent='';if(!q.cur.length)tx(nw,'Nothing is being checked to merge right now.');else{tx(nw,'Being checked now: ');q.cur.forEach(function(x,i){var w=[x[1],x[2],x[3]!=null?span(x[3]):''].filter(Boolean);if(i)tx(nw,'; ');
(x[0]||[]).forEach(function(t,j){if(j)tx(nw,', ');mk(nw,'span','idb',t);tx(nw,' '+nm(t))});if(w.length)tx(nw,' ('+w.join(', ')+')')});tx(nw,'.')}}
if(lm&&q.ld){lm.textContent='';if(!q.ld[0])tx(lm,'Nothing has merged through the line yet today.');else{mk(lm,'b',null,String(q.ld[0]));tx(lm,' '+(q.ld[0]===1?'change has':'changes have')+' merged through the line today'+(q.ld[1]?'; the newest at '+et(q.ld[1]):'')+'.')}}}
function put(d,t,hot){if(d){d.textContent=t;d.className=hot?'hot':''}}
function mach(mx,at){var any=0;['mini','macbook'].forEach(function(k){var x=mx[k],c=document.getElementById('lk-mx-'+k),r={},ag,h,lc,tl;if(!x||!c)return;ag=Math.max(0,Math.floor((Date.now()-Date.parse(x.at))/6e4));if(!(ag<40))return;any=1;
[].forEach.call(c.querySelectorAll('dt'),function(d){r[d.textContent]=d.nextElementSibling});c.classList.remove('stale');h=c.querySelector('h3 small');if(h)h.textContent=(k==='macbook'?'checked in ':'read ')+et(x.at)+', '+span(ag)+' ago';
lc=r['Last check-in'];if(lc){tl=lc.textContent.split(';').slice(1).join(';');put(lc,et(x.at)+', '+span(ag)+' ago'+(tl?';'+tl:''))}
if(x.dk)put(r['Internal disk'],gb(x.dk[0])+' GB free'+(x.dk[1]!=null?' of '+gb(x.dk[1])+' GB':''),x.dk[0]<10);
if(x.ss)put(r['SSD'],x.ss==='na'?'did not answer in time':x.ss==='nc'?'not connected':gb(x.ss[0])+' GB free'+(x.ss[1]!=null?' of '+gb(x.ss[1])+' GB':''),typeof x.ss==='string');
if(x.ld!=null)put(r['Load per core'],x.ld.toFixed(2)+' over 5 min'+(x.c!=null?', '+x.c+' cores':'')+' (1.00 = every core busy)',x.ld>1.5);
if(x.sb!=null)put(r['Simulators'],!x.sb?'none booted':x.sb+' booted'+(x.sn&&x.sn.length?': '+x.sn.join(', '):''))});
var pm=document.querySelector('#machine > p.meta'),lv=document.getElementById('lk-mxlv');if(any&&pm){if(!lv){lv=mk(pm,'span');lv.id='lk-mxlv'}lv.textContent=' Disk, load and Simulators follow the live status, read '+et(at)+'.'}}
function fig(lab,v){[].forEach.call(document.querySelectorAll('.lk-bub a[href="#machine"] .lk-f > span'),function(s){var b=s.querySelector('b');if(b&&s.lastChild&&s.lastChild.nodeValue===lab)b.textContent=v})}
function draw(st){var g=st&&st.ln,d=st&&st.disk;LNM=(st&&st.stg&&st.stg.nm)||LNM;if(st&&Date.parse(st.at)>=B&&d&&typeof d.free_gb==='number')fig('Mac Mini',d.free_gb+' GB');
if(!g||!(Date.parse(g.at)>=B))return;if(g.mq)merge(g.mq,g.at);if(g.mx){mach(g.mx,g.at);if(g.mx.macbook&&g.mx.macbook.dk)fig('MacBook',g.mx.macbook.dk[0]+' GB');var sm=g.mx.mini;if(sm&&sm.ss&&Date.now()-Date.parse(sm.at)<24e5)fig('SSD',sm.ss==='na'?'not answering':sm.ss==='nc'?'not connected':Math.round(sm.ss[0]).toLocaleString('en-US')+' GB')}}
S.onStatus.push(draw);if(S.status&&S.status())draw(S.status())});
// T-4813 (friesevan #41 c6966450021, 8:43 PM 11-17: "the merge queue length, and every other dynamic value on Home should
// update in near real-time, not built between sessions"): the Now line's count of tasks waiting to land (its parts, its
// gauge, its limit, open or held), the Usage bubble's two figures and Blocked or waiting's count follow the status's hc
// (live_status read_hc, every 5 s for the count, as `tools/merge_limit.py status` reads it) and meter, once newer than
// the build, each with its age; the ages count on between reads. A count hc leaves out keeps the build's.
document.addEventListener('DOMContentLoaded',function(){var S=window.CompanySite,bx=document.getElementById('lk-run'),B=0,L={};if(!S||!S.onStatus)return;
try{B=JSON.parse(bx&&bx.getAttribute('data-life')||'{}').at||0}catch(e){}
function mk(p,t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;p.appendChild(e);return e}
function et(t){var d=new Date(t);return isNaN(d)?'':d.toLocaleTimeString('en-US',{timeZone:'America/New_York',hour:'numeric',minute:'2-digit'})}
function ago(t){var s=Math.max(0,Math.round((Date.now()-Date.parse(t))/1e3));return isNaN(s)?'':s<60?s+' s ago':s<3600?Math.floor(s/60)+' min ago':Math.floor(s/3600)+' h '+Math.floor(s%3600/60)+' min ago'}
function nw(t){return t&&Date.parse(t)>=B}
function ag(id,t){var e=document.getElementById(id);if(e&&t){e.textContent=ago(t);e.title='read '+et(t)+' ET'}}
function fig(h,lab,v){[].forEach.call(document.querySelectorAll('.lk-bub a[href="#'+h+'"] .lk-f > span'),function(s){var b=s.querySelector('b');if(b&&s.lastChild&&s.lastChild.nodeValue===lab)b.textContent=v})}
function words(w){var r=w.n-w.in_line-w.parked,ln=document.getElementById('lk-now'),nr=ln&&ln.getAttribute('data-road')==='merge.sh';if([w.n,w.in_line,w.parked].some(function(x){return typeof x!=='number'}))return 'parts not recorded';
return w.in_line.toLocaleString('en-US')+(nr?' in line for tools/merge.sh, ':' in the merge queue, ')+w.parked.toLocaleString('en-US')+(nr?' sent back for a fix':' sent back to retry')+(r>0?', '+r+' in neither part':r<0?' (the parts come to '+(w.in_line+w.parked)+', '+(-r)+' over the count)':'')}
// T-5454: the per-queue figures follow the same status (its by: merge_limit's queues of the same row); a queue the row
// lacks reads "not known", and the count in both is app + other less the one count
function qk(ln,w){var by=w.by,a,o,e;if(!by||typeof by!=='object')return;[].forEach.call(ln.querySelectorAll('.lk-nk[data-k]'),function(s){var q=by[s.getAttribute('data-k')]||{},b=s.querySelector('b'),i=s.querySelector('.lk-gg i'),u=s.querySelector('.lk-gg u'),m=s.querySelector('small'),top;
if(!b)return;if(typeof q.n!=='number'){b.textContent='not known';b.className='lk-nr';if(i)i.parentNode.hidden=true;return}b.textContent=q.n;b.className='';
if(i&&u&&q.limit>0){i.parentNode.hidden=false;top=Math.max(q.n,q.limit)*1.15;i.style.width=(q.n/top*100).toFixed(0)+'%';u.style.left=(q.limit/top*100).toFixed(0)+'%';i.parentNode.className='lk-gg'+(q.n>=q.limit?' over':'')}if(m&&q.limit!=null)m.textContent='of '+q.limit});
a=(by.app||{}).n;o=(by.other||{}).n;e=ln.querySelector('.lk-nb');if(e&&typeof a==='number'&&typeof o==='number'){e.textContent=Math.max(0,a+o-w.n)+' in both';e.hidden=a+o-w.n<=0}}
function wait(w){var ln=document.getElementById('lk-now'),c,g,b,i,u,sm,top,when,old;if(!ln)return;c=ln.querySelector('.lk-nc');g=ln.querySelector('.lk-gate');
if(g){g.className='lk-gate '+(w.open?'ok':'held');g.textContent='';mk(g,'span','lk-wd',w.open?'New work open':'New work held');mk(g,'span','lk-ws',w.open?'Open':'Held').setAttribute('aria-hidden','true')}
if(c&&typeof w.n==='number'){b=c.querySelector('b');if(b)b.textContent=w.n;sm=c.querySelector('.lk-np');if(sm)sm.textContent=words(w);
i=c.querySelector('.lk-gg i');u=c.querySelector('.lk-gg u');if(i&&u&&w.limit>0){top=Math.max(w.n,w.limit)*1.15;i.style.width=(w.n/top*100).toFixed(0)+'%';u.style.left=(w.limit/top*100).toFixed(0)+'%';i.parentNode.className='lk-gg'+(w.n>=w.limit?' over':'')}
sm=c.querySelector(':scope > small');if(sm&&w.limit!=null)sm.textContent='limit '+w.limit;qk(ln,w)}
when=ln.querySelector('.lk-nwhen');if(when&&w.counted){old=Date.now()-Date.parse(w.counted)>18e5;when.className='lk-nwhen'+(old?' late':'');when.textContent='';mk(when,'span','lk-wd','counted ');
when.appendChild(document.createTextNode(et(w.counted)+' ET, '+ago(w.counted)));ln.title=(typeof w.n==='number'?w.n+' tasks have finished work waiting to land: '+words(w)+(w.limit!=null?'; new work stops at '+w.limit:''):'The count of tasks waiting to land could not be read')+'. Counted '+et(w.counted)+' ET, read '+et(w.at)+' ET.'}}
function draw(st){var h=(st&&st.hc)||{},m=(st&&st.meter)||{},e;
if(h.wait&&nw(h.wait.at))L.wait=h.wait;if(h.bl&&nw(h.bl.at))L.bl=h.bl;
if(m.five_hour&&nw(m.five_hour.read_at))L.use=m;
if(L.use){[['five_hour','5 hours'],['weekly','week']].forEach(function(k){var w=L.use[k[0]];if(w&&typeof w.pct==='number')fig('usage',k[1],Math.round(w.pct)+'%')})}
if(L.bl&&typeof L.bl.n==='number'){e=document.getElementById('lk-bk-n');if(e)e.textContent=L.bl.n}
tick()}
function tick(){if(L.wait)wait(L.wait);if(L.use)ag('lk-ag-usage',L.use.five_hour.read_at);if(L.bl)ag('lk-ag-bk',L.bl.at)}
setInterval(tick,15e3);S.onStatus.push(draw);if(S.status&&S.status())draw(S.status())});
// T-4110: Flow's queue charts. The switch (Merge Queue or Task Queue; 24 h or 7 days) shows one chart; a tap, a drag or a pointer
// over it, or an arrow key on it, reads the count at that time from the points the page carries (the page wrote the words).
document.addEventListener('DOMContentLoaded',function(){var V=document.querySelector('.lk-qv');if(!V)return;
var sw=V.querySelector('.lk-qs'),P=[].slice.call(V.querySelectorAll('.lk-qp')),B=[].slice.call(sw?sw.querySelectorAll('button'):[]),S={q:'merge',w:'24'};
function pl(p){return p.querySelector('.lk-plot')}
function pts(p){var e=pl(p);if(!e)return[];if(!e._p){try{e._p=JSON.parse(e.getAttribute('data-p'))}catch(x){e._p=[]}}return e._p}
function clear(p){var e=pl(p);if(!e)return;e.querySelector('.cu').classList.remove('on');e.querySelector('.lk-cd').hidden=true;p.querySelector('.lk-rd').textContent=''}
function mark(p,i){var d=pts(p),e=pl(p);if(!e||i<0||i>=d.length)return;var lo=+e.getAttribute('data-lo'),hi=+e.getAttribute('data-hi'),c=e.querySelector('.cu'),o=e.querySelector('.lk-cd');
c.setAttribute('x1',d[i][0]);c.setAttribute('x2',d[i][0]);c.classList.add('on');o.style.left=d[i][0]/10+'%';o.style.top=(100-(d[i][1]-lo)/(hi-lo)*100)+'%';o.hidden=false;
p.querySelector('.lk-rd').textContent=d[i][2];e._i=i}
function near(p,cx){var e=pl(p),d=pts(p),r=e.getBoundingClientRect(),x,i,b=-1;if(!d.length||!r.width)return -1;x=(cx-r.left)/r.width*1000;
for(i=0;i<d.length;i++)if(b<0||Math.abs(d[i][0]-x)<Math.abs(d[b][0]-x))b=i;
if(Math.abs(d[b][0]-x)>+e.getAttribute('data-gx')){clear(p);p.querySelector('.lk-rd').textContent='No count then';e._i=-1;return -1}return b}
function show(){P.forEach(function(p){p.hidden=!(p.getAttribute('data-q')===S.q&&p.getAttribute('data-w')===S.w);clear(p)});
B.forEach(function(b){var k=b.hasAttribute('data-q')?'q':'w';b.setAttribute('aria-pressed',b.getAttribute('data-'+k)===S[k]?'true':'false')})}
B.forEach(function(b){b.addEventListener('click',function(){var k=b.hasAttribute('data-q')?'q':'w';S[k]=b.getAttribute('data-'+k);show()})});
P.forEach(function(p){var e=pl(p);if(!e)return;function go(ev){var i=near(p,ev.clientX);if(i>=0)mark(p,i)}
e.addEventListener('pointerdown',go);e.addEventListener('pointermove',function(ev){if(ev.pointerType!=='touch'||ev.buttons)go(ev)});
e.addEventListener('keydown',function(ev){var d=pts(p),i=e._i==null||e._i<0?d.length:e._i;if(ev.key==='ArrowLeft')i=Math.max(0,i-1);else if(ev.key==='ArrowRight')i=Math.min(d.length-1,i+1);
else if(ev.key==='Escape'){clear(p);e._i=-1;return}else return;ev.preventDefault();mark(p,i)})});
if(sw){sw.hidden=false;show()}});

// T-4136 (friesevan #41 c6816980644): Operators & Direct follows each status newer than the build that carries the
// "operators" block; a status without it leaves the build's cards (tools/site/ops_look.py). Text goes in as textContent.
document.addEventListener('DOMContentLoaded',function(){var S=window.CompanySite,sec=document.getElementById('lk-ops');if(!S||!S.onStatus||!sec)return;
var F={Operator:sec.getAttribute('data-fo'),Direct:sec.getAttribute('data-fd')},B=+sec.getAttribute('data-at')||0,box=document.getElementById('lk-opl'),n=document.getElementById('lk-ops-n');
function mk(p,t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;p.appendChild(e);return e}
function cap(s){s=String(s||'');return s.charAt(0).toUpperCase()+s.slice(1)}
function mins(n){return n>=1440?Math.floor(n/1440)+' d '+Math.floor(n%1440/60)+' h':n>=60?Math.floor(n/60)+' h '+(n%60)+' min':n+' min'}
function draw(st){var o=st&&st.operators;if(!Array.isArray(o)||!(Date.parse(st.at)>=B))return;box.textContent='';
o.forEach(function(r){var w=r.w==='Direct'?'Direct':'Operator',c=mk(box,'div','lk-card lk-op'),q=mk(c,'div','lk-r1'),g,t,m,a,x=Date.parse(r.at);
c.setAttribute('data-w',w.toLowerCase());if(F[w]){g=mk(mk(q,'span','lk-faces'),'img');g.src=F[w];g.alt='';g.width=g.height=40}
t=mk(q,'span','t');mk(t,'b','',r.t||'');m=mk(t,'span','',[w,r.m?[cap(r.m),r.e].filter(Boolean).join(' '):''].filter(Boolean).join(' · '));
if(!isNaN(x)){m.appendChild(document.createTextNode(' · '));mk(m,'span','lk-nw',mins(Math.max(0,Math.floor((Date.now()-x)/6e4))))}
if(r.a){m.appendChild(document.createTextNode(' '));a=mk(m,'span','lk-tag'+(r.sr?' lk-src':''),r.a);if(r.sr)a.title='Runs on: '+r.a}});
if(!o.length)mk(box,'p','meta lk-opz','None running now.');n.textContent=o.length;sec.hidden=false}
S.onStatus.push(draw);if(S.status&&S.status())draw(S.status())});
