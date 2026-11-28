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
if(n){n.className=p!==null&&p>=100?'meta lk-hotw':'meta';n.textContent=p===null?'no reading yet':w.resets_at&&Date.parse(w.resets_at)<=Date.now()?'reset due, not read yet':!r?(p>=100?'at its limit · ':'')+'reset time not known':p>=100?'at its limit · paused until '+r:'resets '+r}return p}
function draw(st){var ms=(st.personal||{}).meters,m=st.meter||{},z=0;
[].forEach.call(document.querySelectorAll('.lk-acct[data-acct]'),function(row){var a=row.getAttribute('data-acct');
if(a==='main'){if(m.five_hour)set(row,'five',m.five_hour,5);if(m.weekly)set(row,'week',m.weekly,168);return}
if(!ms)return;var r=ms[a]||null,p=set(row,'five',r&&r.five,5);set(row,'week',r&&r.week,168);if(p!==null&&p>=100)z++});
var pz=document.getElementById('lk-pz');if(pz&&ms){pz.hidden=false;pz.querySelector('b').textContent=z}}
S.onStatus.push(draw);if(S.status&&S.status())draw(S.status())});
// T-5837 (Odalys's review, 11-27): In flight's script (T-2667 to T-4747) left with the old task list; Sessions now's
// redraw is tools/site/home_sessions.py JS, which also keeps the Team row's count of workers at work.
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
return w.in_line.toLocaleString('en-US')+(nr?' in line for the merge script, ':' in the merge queue, ')+w.parked.toLocaleString('en-US')+(nr?' sent back for a fix':' sent back to retry')+(r>0?', '+r+' in neither part':r<0?' (the parts come to '+(w.in_line+w.parked)+', '+(-r)+' over the count)':'')}
// T-5837 (Odalys's review, 11-27): on the merge script's road the figure leaves out work sent back for a fix, as the
// build's (home_flow.landing and now_words): it never says more is waiting than Sessions now's merge turn line
function lw(w,nr){if(typeof w.n!=='number')return null;if(!nr||!w.n)return w.n;return typeof w.parked==='number'?Math.max(0,w.n-w.parked):null}
function nwd(w,nr){var r;if(!nr)return words(w);if([w.n,w.in_line,w.parked].some(function(x){return typeof x!=='number'}))return 'parts not recorded';r=w.n-w.in_line-w.parked;
return w.in_line.toLocaleString('en-US')+' in line for the merge script'+(r>0?', '+r+' in neither part':'')+'; '+w.parked.toLocaleString('en-US')+' sent back for a fix, not counted'}
// T-5454: the per-queue figures follow the same status (its by: merge_limit's queues of the same row); a queue the row
// lacks reads "not known", and the count in both is app + other less the one count
function qk(ln,w){var by=w.by,a,o,e;if(!by||typeof by!=='object')return;[].forEach.call(ln.querySelectorAll('.lk-nk[data-k]'),function(s){var q=by[s.getAttribute('data-k')]||{},b=s.querySelector('b'),i=s.querySelector('.lk-gg i'),u=s.querySelector('.lk-gg u'),m=s.querySelector('small'),top;
if(!b)return;if(typeof q.n!=='number'){b.textContent='not known';b.className='lk-nr';if(i)i.parentNode.hidden=true;return}b.textContent=q.n;b.className='';
if(i&&u&&q.limit>0){i.parentNode.hidden=false;top=Math.max(q.n,q.limit)*1.15;i.style.width=(q.n/top*100).toFixed(0)+'%';u.style.left=(q.limit/top*100).toFixed(0)+'%';i.parentNode.className='lk-gg'+(q.n>=q.limit?' over':'')}if(m&&q.limit!=null)m.textContent='of '+q.limit});
a=(by.app||{}).n;o=(by.other||{}).n;e=ln.querySelector('.lk-nb');if(e&&typeof a==='number'&&typeof o==='number'){e.textContent=Math.max(0,a+o-w.n)+' in both';e.hidden=a+o-w.n<=0}}
function wait(w){var ln=document.getElementById('lk-now'),c,g,b,i,u,sm,top,when,old,nr,v;if(!ln)return;c=ln.querySelector('.lk-nc');g=ln.querySelector('.lk-gate');nr=ln.getAttribute('data-road')==='merge.sh';v=lw(w,nr);
if(g){g.className='lk-gate '+(w.open?'ok':'held');g.textContent='';mk(g,'span','lk-wd',w.open?'New work open':'New work held');mk(g,'span','lk-ws',w.open?'Open':'Held').setAttribute('aria-hidden','true')}
if(c&&typeof w.n==='number'&&v!=null){b=c.querySelector('b');if(b)b.textContent=v;sm=c.querySelector('.lk-np');if(sm)sm.textContent=nwd(w,nr);
i=c.querySelector('.lk-gg i');u=c.querySelector('.lk-gg u');if(i&&u&&w.limit>0){top=Math.max(w.n,w.limit)*1.15;i.style.width=(w.n/top*100).toFixed(0)+'%';u.style.left=(w.limit/top*100).toFixed(0)+'%';i.parentNode.className='lk-gg'+(w.n>=w.limit?' over':'')}
sm=c.querySelector(':scope > small');if(sm&&w.limit!=null)sm.textContent='limit '+w.limit+(nr?' counts both':'');qk(ln,w)}
when=ln.querySelector('.lk-nwhen');if(when&&w.counted){old=Date.now()-Date.parse(w.counted)>18e5;when.className='lk-nwhen'+(old?' late':'');when.textContent='';mk(when,'span','lk-wd','counted ');
when.appendChild(document.createTextNode(et(w.counted)+' ET, '+ago(w.counted)));ln.title=(typeof w.n==='number'?w.n+' tasks have finished work '+(nr?'not on main':'waiting to land')+': '+words(w)+(w.limit!=null?'; new work stops at '+w.limit:''):'The count of tasks waiting to land could not be read')+'. Counted '+et(w.counted)+' ET, read '+et(w.at)+' ET.'}}
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
// T-5823 (friesevan #325 c7144608599, 4:11 PM 11-24): the Work panel's Completed work follows work_done.json, which
// tools/site_live.py writes beside status.json during a session, at most every 15 minutes, with the function and the
// steps the build draws it with (work_panel.panel_html, build.written_text). With a status, at most every 5 minutes, the
// file is read; once its read time is newer than the page's, the graphs (#mx-done, #mx-usd; T-5925: #mx-cm, #mx-cmusd),
// their read line and the Work bubble's 24-hour figure are replaced by its own. A failed or older read leaves them as they are.
document.addEventListener('DOMContentLoaded',function(){var S=window.CompanySite,sec=document.getElementById('bottlenecks'),np=document.getElementById('now-panel'),bx=document.getElementById('lk-run'),B=0,T=0,busy=0,url;
if(!S||!S.onStatus||!sec||!np||!window.fetch||!window.DOMParser)return;
try{B=JSON.parse(bx&&bx.getAttribute('data-life')||'{}').at||0}catch(e){}
url=String(np.getAttribute('data-status')||'').replace(/status\.json$/,'work_done.json');if(!/work_done\.json$/.test(url))return;
function rl(r){var h=r.querySelector('h3.mx-s'),p=h&&h.previousElementSibling;return p&&p.matches('p.meta')?p:null}
function swap(d){var at=Date.parse(d&&d.at),f,a,b;if(!(at>B)||typeof d.html!=='string'||!document.getElementById('mx-done'))return;
f=new DOMParser().parseFromString(d.html,'text/html').getElementById('bottlenecks');if(!f||!f.querySelector('#mx-done'))return;
['mx-done','mx-usd','mx-cm','mx-cmusd'].forEach(function(id){var o=document.getElementById(id),x=f.querySelector('#'+id);if(o&&x)o.replaceWith(document.importNode(x,true))});
a=rl(sec);b=rl(f);if(a&&b)a.replaceWith(document.importNode(b,true));
if(typeof d.n24==='number')[].forEach.call(document.querySelectorAll('.lk-bub a[href="#bottlenecks"] .lk-f > span'),function(s){var e=s.querySelector('b');if(e&&s.lastChild&&s.lastChild.nodeValue==='done, 24 h')e.textContent=d.n24.toLocaleString('en-US')});
B=at}
function read(){if(busy||Date.now()-T<3e5)return;busy=1;T=Date.now();fetch(url,{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error(r.status);return r.json()}).then(swap).catch(function(){}).then(function(){busy=0})}
S.onStatus.push(read);if(S.status&&S.status())read()});

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

// T-5837: Home's sessions block, redrawn from the live status's "fw" (tools/site/home_sessions.py body_html's rules)
document.addEventListener('DOMContentLoaded',function(){var S=window.CompanySite,box=document.getElementById('ss-body'),sec=document.getElementById('lk-ss');
if(!S||!S.onStatus||!box||!sec)return;var NM={},LN={};try{NM=JSON.parse(sec.getAttribute('data-nm')||'{}')}catch(e){}
var ST=['Up next','Building','In review','Waiting to merge','Merging','Merged'],SW={building:'Building',review:'In review',waiting:'Waiting to merge',merging:'Merging',held:'Held'},
AC=[['main','Main account']].concat(['a','b'].map(function(l){return [l,(NM.a||{})[l]||'Account '+l.toUpperCase()]})),HW={wait:'{n} has waited {m} for the merge turn',turn:'{n} has held the merge turn for {m}',held:'{n} has been held for {m}'};
function e(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;')}
function clk(s){return new Date(s*1e3).toLocaleTimeString('en-US',{timeZone:'America/New_York',hour:'numeric',minute:'2-digit'}).replace(/[  ]/g,' ')+' ET'}
function dtd(s){var p={};new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',weekday:'short',month:'short',day:'numeric'}).formatToParts(new Date(s*1e3)).forEach(function(x){p[x.type]=x.value});return p.weekday+' '+p.month+' '+p.day+', '+clk(s)}
// T-3163: a number is never shown without a name: the build's (data-nm), else the live status's (stg.nm), else the words
function tn(i){return (NM.t||{})[i]||LN[i]||'Name not recorded'}
function sp(m){m=Math.max(0,Math.floor(m));if(m<60)return m+' min';if(m<1440)return Math.floor(m/60)+' h'+(m%60?' '+(m%60)+' min':'');var d=Math.floor(m/1440),h=Math.floor(m%1440/60);return d+' day'+(d==1?'':'s')+(h?' '+h+' h':'')}
function mn(a,b){return Math.floor((a-b)/60)}
function fn(i){var f=(NM.f||{})[i];if(f)return (f[0]+' '+f[1]).trim();return i+' '+tn(i)}
function wo(k){var p=k.split('/');return [p[0],p.slice(1).join('/')]}
function pl(n,w,ws){return n+' '+(n==1?w:(ws||w+'s'))}
function tl(t,at){if(!t)return 'Merge turn: not read.';var o,h=t[0],s=t[1],w=t[2],lk=t[3];
if(h){var hn=h=='?'?'a merge run':fn(h);o=s?'Merge turn: '+hn+' has held it for '+sp(mn(at,s)):'Merge turn: '+hn+' holds it'}
else if(lk){o='Merge turn: free; '+(lk[0]=='?'?'a merge with no app change':fn(lk[0]))+' is merging, '+sp(mn(at,lk[1]))+' so far'}else o='Merge turn: free';
o+=w.length?'; waiting: '+w.map(function(x){return (x[0]=='?'?'a merge run':fn(x[0]))+(x[1]?' for '+sp(mn(at,x[1])):'')}).join(', '):'; nobody waiting';return o+'.'}
function hl(x){if(!x)return 'Largest hold now: none.';var k=wo(x[1]),n=(x[1]==''||x[1]=='?')?'a merge run':fn(k[0])+(k[1]?' ('+k[1]+"'s session)":'');
return 'Largest hold now: '+HW[x[0]].replace('{n}',n).replace('{m}',sp(x[2]))+'.'+(x[3]>1?' One of '+x[3]+' holds now.':'')}
function row(r,at){var i=r[0],g=r[1],s=r[2],w;if(g==5)w=s?'merged '+clk(s):'merged';else if(g&&s)w=ST[g].toLowerCase()+' for '+sp(mn(at,s));else w=ST[g].toLowerCase();
w+=(r[3]&&g<5?' · built':'')+(r[4]?' · '+pl(r[4],'test job')+' queued or running':'');
return '<li class="ss-r"><span class="ss-n"><b>'+e(i)+'</b> '+e(tn(i))+'</span><span class="ss-t s'+g+'" role="img" aria-label="'+e(ST[g])+'"></span><small class="ss-w">'+e(w)+'</small></li>'}
function qrow(i){return '<li class="ss-r"><span class="ss-n"><b>'+e(i)+'</b> '+e(tn(i))+'</span><span class="ss-t sq" role="img" aria-label="Queued"></span><small class="ss-w">queued</small></li>'}
function cw(ss){if(!ss.length)return 'no feature in hand';var by={};ss.forEach(function(x){by[x[2]]=(by[x[2]]||0)+1});
return pl(ss.length,'feature')+' in hand: '+Object.keys(SW).filter(function(k){return by[k]}).map(function(k){return by[k]+' '+SW[k].toLowerCase()}).join(', ')}
function more(n){return n?'<li class="ss-r ss-0">and '+pl(n,'more step')+'</li>':''}
function sess(x,at){var k=wo(x[1]),hd=SW[x[2]]+(x[3]?' for '+sp(mn(at,x[3])):''),rs=x[4].map(function(r){return row(r,at)}).join('')||'<li class="ss-r ss-0">No step in hand now.</li>';
return '<div class="ss-f" data-k="'+e(x[1])+'"><p class="ss-fh"><b>'+e(fn(k[0]))+'</b>'+(k[1]?'<span class="ss-wk">'+e(k[1])+"'s session</span>":'')+'<span class="ss-st st-'+x[2]+'">'+e(hd)+'</span>'
+(x[6]?'<span class="ss-st">'+pl(x[6],'test job')+' queued or running</span>':'')+'</p><ol class="ss-steps">'+rs+more(x[5])+'</ol></div>'}
function body(fw){var at=fw.at,o=['<p class="ss-asof">Read '+e(clk(at))+'.</p>','<p class="ss-line" id="ss-turn">'+e(tl(fw.t,at))+'</p>','<p class="ss-line ss-hold" id="ss-hold">'+e(hl(fw.x))+'</p>',
'<div class="ss-key" aria-hidden="true"><span></span><span class="ss-kt">'+ST.map(function(s){return '<i>'+e(s)+'</i>'}).join('')+'</span><span></span></div>'],mh=fw.mh||[0,0,0];
AC.forEach(function(a){var ss=(fw.s||[]).filter(function(x){return x[0]==a[0]}),nt='';
if(a[0]=='main'&&!mh[0])nt='Its record of features in hand could not be read.';else if(a[0]=='main'&&mh[2])nt=mh[1]?'Its record of features in hand was last written '+dtd(mh[1])+', more than 6 hours ago.':'Its record of features in hand is not dated.';
else if(a[0]!='main'&&!fw.pr)nt='Who is at work on it could not be read.';
o.push('<div class="ss-acc" data-acct="'+a[0]+'"><h3>'+e(a[1])+'<small>'+e(cw(ss))+'</small></h3>'+(nt?'<p class="meta">'+e(nt)+'</p>':'')+ss.map(function(x){return sess(x,at)}).join('')+'</div>')});
var q=fw.q,qs;if(q==null)qs='<p class="meta">The queue could not be read.</p>';else if(!q.length)qs='<p class="meta">No feature is queued.</p>';
else qs=q.map(function(x,k){var f=(NM.f||{})[x[0]],ac='';AC.forEach(function(a){if(f&&f[2]==a[0])ac=a[1]});var rs=x[1].map(qrow).join('')+more(x[2]);
return '<div class="ss-f ss-qf"><p class="ss-fh"><span class="ss-qn">'+(k+1)+'</span><b>'+e(fn(x[0]))+'</b>'+(ac?'<span class="ss-wk">'+e(ac)+'</span>':'')+(x[3]?'<span class="ss-st">waits for '+e(fn(x[3]))+' to finish</span>':'')+'</p>'+(rs?'<ol class="ss-steps">'+rs+'</ol>':'')+'</div>'}).join('');
o.push('<div class="ss-acc ss-q"><h3>Queued next<small>in the order they start</small></h3>'+qs+'</div>');
var ms=fw.m||[];if(ms.length)o.push('<div class="ss-acc ss-m"><h3>Merged today<small>'+pl(ms.length,'merge')+'</small></h3><ol class="ss-ml">'+ms.filter(function(x){return x[1]}).map(function(x){return '<li><span class="ss-mt">'+e(clk(x[1]))+'</span><span>'+e(fn(x[0]))+(x[2]>=60?'<small> waited '+e(sp(Math.floor(x[2]/60)))+' for the turn</small>':'')+'</span></li>'}).join('')+'</ol></div>');
else o.push('<div class="ss-acc ss-m"><h3>Merged today<small>none yet</small></h3></div>');return o.join('')}
function hfig(){var x=document.getElementById('ss-holdfig');return x}
// the Team row's count of workers at work, which the old In flight list kept (home_look's build rule: each worker once,
// over the main account's running tasks and the personal sessions not done)
function wk(st,isPub){var e=document.getElementById('lk-working'),o={},l;if(!e||!st||!st.tasks)return;
try{l=S.lane?S.lane.main(st,isPub).concat(S.lane.rows(st)):(st.tasks.run||[])}catch(x){l=st.tasks.run||[]}
l.forEach(function(r){if(r&&r.w&&!r.d)o[String(r.w).toLowerCase()]=1});e.textContent=Object.keys(o).length+' working'}
function draw(st,isPub){wk(st,isPub);if(st&&st.stg&&st.stg.nm)LN=st.stg.nm;var fw=st&&st.fw;if(!fw||!fw.at||(S.lastFw&&S.lastFw>fw.at))return;S.lastFw=fw.at;box.innerHTML=body(fw);var f=hfig();if(f)f.textContent=fw.x?sp(fw.x[2]):'none'}
S.ssBody=body;S.onStatus.push(draw);if(S.status&&S.status())draw(S.status())});
