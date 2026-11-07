// Home (T-2667 for T-2480 and T-2469). Source: tools/site/home_look.py. Bubbles: one panel open at a time; the hash names it.
(function(){var b=document.querySelectorAll('.lk-b');function show(h){b.forEach(function(a){var on=a.hash===h;a.classList.toggle('open',on);
a.setAttribute('aria-expanded',on);var p=document.querySelector(a.hash);if(p)p.classList.toggle('open',on)})}
b.forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();var h=a.classList.contains('open')?'':a.hash;
history.replaceState(null,'',h||location.pathname);show(h)})});if(location.hash)show(location.hash)})();
// T-3187 (friesevan #41 c6701678631): (1) a star on each Running and Queued card; the stars are shared by both Investors, in
// investors/favorites.json on GitHub ({"tasks": [...]}), written with the Investor's own token, one commit a tap, read fresh
// first and once more if GitHub moved it (as personal.js writes billing.json); no token: the build's stars show, no buttons.
// Starred cards sort first; tools/fav_notice.py posts on #41 when a starred task merges. (2) One search box filters Running and
// Queued (every word must match the name, ID or worker). (3) A tap on a task's name, in any panel, opens it to the full name.
// Registered before Running's listener, so S.lk is there when Running draws. Text goes in as textContent.
document.addEventListener('DOMContentLoaded',function(){var S=window.CompanySite,H=document.querySelector('.lk-home');if(!S||!H)return;
var F={},fn=[],O={},Q='',P='investors/favorites.json',repo=H.getAttribute('data-repo')||'',chain=Promise.resolve(),
CARD='.lk-run,.lk-q,.lk-qr,.lk-mnow,.lk-blk',inp=document.getElementById('lk-find'),fb=document.getElementById('lk-findbox'),
fn2=document.getElementById('lk-find-n'),fv=document.getElementById('lk-fav-n'),tok=!!(S.getToken&&S.getToken()&&/^[\w.-]+\/[\w.-]+$/.test(repo));
try{JSON.parse(H.getAttribute('data-fav')||'[]').forEach(function(i){F[i]=1})}catch(e){}
function okId(i){return typeof i==='string'&&/^T-\d+$/.test(i)}
function b64(t){var b=new TextEncoder().encode(t),s='';for(var i=0;i<b.length;i++)s+=String.fromCharCode(b[i]);return btoa(s)}
function unb64(s){var a=atob(String(s).replace(/\n/g,'')),b=new Uint8Array(a.length);for(var i=0;i<a.length;i++)b[i]=a.charCodeAt(i);return new TextDecoder().decode(b)}
function path(){return '/repos/'+repo+'/contents/'+P}
function say(t){if(fv){fv.textContent=t;fv.hidden=!t}}
function match(t){if(!Q)return true;t=String(t||'').toLowerCase();return Q.split(/\s+/).every(function(w){return t.indexOf(w)>=0})}
function star(p,id){var on=!!F[id],b;if(!okId(id))return;
if(tok){b=document.createElement('button');b.type='button';b.className='lk-star';b.setAttribute('aria-pressed',on);
b.setAttribute('aria-label','Star '+id);b.title=on?'Starred: sorts first; a notice in Chat when it merges':'Star: sorts first; a notice in Chat when it merges';
b.textContent=on?'★':'☆';b.onclick=function(e){e.stopPropagation();tap(id)}}
else if(on){b=document.createElement('span');b.className='lk-star on';b.setAttribute('role','img');b.setAttribute('aria-label','Starred');b.textContent='★'}
if(b)p.appendChild(b)}
function aria(c){var n=c&&c.querySelector('.lk-tn');if(n){n.setAttribute('role','button');n.tabIndex=0;n.setAttribute('aria-expanded',c.classList.contains('lk-open'))}}
function key(c){return c.getAttribute('data-id')||((c.querySelector('.lk-tn')||{}).textContent||'')}
function toggle(c){var k=key(c),on=!c.classList.contains('lk-open');c.classList.toggle('lk-open',on);if(on)O[k]=1;else delete O[k];aria(c)}
var A=null,pic={},fc={};[].forEach.call(document.querySelectorAll('.lk-team a'),function(a){var m=/cast\/([^/.]+)\.html/.exec(a.getAttribute('href')||''),g=a.querySelector('img');if(m&&g)pic[m[1]]=g.getAttribute('src')});
try{fc=JSON.parse((document.getElementById('lk-run')||H).getAttribute('data-faces')||'{}')}catch(e){}
function mk(p,t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;p.appendChild(e);return e}
// a Queued row past the page's 30, from data-all ([id, number, name, worker]): drawn while it matches the search or is starred
function qrow(a){var c=document.createElement('div'),p=fc[String(a[3]||'').toLowerCase()],g,t;c.className='lk-card lk-q lk-x';c.setAttribute('data-id',a[0]);c.setAttribute('data-n',a[1]);
c.setAttribute('data-q',[a[2],a[0],a[3]].join(' '));mk(c,'span','lk-n',String(a[1]));if(p&&pic[p]){g=mk(c,'img');g.src=pic[p];g.alt='';g.width=g.height=24}else mk(c,'span').style.width='24px';
t=mk(c,'span','t');mk(t,'b','lk-tn',a[2]);mk(c,'span','idb',a[0]);aria(c);return c}
function queued(){var q=document.getElementById('lk-q'),rows,mx,qb;if(!q)return;if(!A){A=[];try{A=JSON.parse(q.getAttribute('data-all')||'[]')}catch(e){}}
[].slice.call(q.querySelectorAll('.lk-x')).forEach(function(c){q.removeChild(c)});
A.forEach(function(a){if(okId(a[0])&&(F[a[0]]||(Q&&match([a[2],a[0],a[3]].join(' ')))))q.appendChild(qrow(a))});
rows=[].slice.call(q.children);mx=+q.getAttribute('data-max')||4;qb=document.getElementById('lk-q-more');
if(qb&&/^Show \d+ more/.test(qb.textContent))qb.textContent='Show '+Math.max(0,rows.length-mx)+' more ▾';
rows.sort(function(a,b){return (F[b.getAttribute('data-id')]?1:0)-(F[a.getAttribute('data-id')]?1:0)||(+a.getAttribute('data-n')-+b.getAttribute('data-n'))});
rows.forEach(function(c,i){var s=c.querySelector('.lk-star');q.appendChild(c);c.classList.toggle('lk-fold',i>=mx);if(s)s.parentNode.removeChild(s);star(c,c.getAttribute('data-id'));
c.hidden=!match(c.getAttribute('data-q'))});
var no=document.getElementById('lk-q-none');if(!no&&Q){no=document.createElement('p');no.id='lk-q-none';no.className='meta';no.textContent='No queued task matches.';q.parentNode.insertBefore(no,q.nextSibling)}
if(no)no.hidden=!Q||rows.some(function(c){return !c.hidden})}
function count(){if(!fn2)return;if(!Q){fn2.textContent='';return}
var r=document.querySelectorAll('#lk-run .lk-run').length,q=document.querySelectorAll('#lk-q>.lk-q:not([hidden])').length;
fn2.textContent=r+' in Running, '+q+' in Queued match'}
function fire(){fn.forEach(function(f){try{f()}catch(e){}});queued();count()}
function read(){return S.gh(path()+'?ref=main').then(function(r){if(r.status===404)return{list:[],sha:null};if(!r.ok)throw new Error(S.said(r));
return r.json().then(function(j){var o=null;try{o=JSON.parse(unb64(j.content||''))}catch(e){}
if(!o||typeof o!=='object'||Array.isArray(o))throw new Error('investors/favorites.json on GitHub is not valid JSON');
return{list:(Array.isArray(o.tasks)?o.tasks:[]).filter(okId),sha:j.sha,o:o}})})}
function take(l){F={};l.forEach(function(i){F[i]=1});fire()}
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
S.lk={fav:function(id){return !!F[id]},on:function(f){fn.push(f)},match:match,q:function(){return Q},star:star,open:function(k){return !!O[k]},aria:aria};
H.addEventListener('click',function(e){var t=e.target,c;if(!t.closest||t.closest('button,a,input,summary,select,label'))return;c=t.closest(CARD);
if(c&&H.contains(c)&&c.querySelector('.lk-tn'))toggle(c)});
H.addEventListener('keydown',function(e){var t=e.target,c;if((e.key==='Enter'||e.key===' ')&&t.classList&&t.classList.contains('lk-tn')){c=t.closest(CARD);if(c){e.preventDefault();toggle(c)}}});
[].forEach.call(H.querySelectorAll('.lk-tn'),function(n){aria(n.closest(CARD))});
if(inp&&fb){fb.hidden=false;inp.addEventListener('input',function(){Q=inp.value.trim().toLowerCase();H.classList.toggle('lk-searching',!!Q);fire()})}
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
document.addEventListener('DOMContentLoaded',function(){var S=window.CompanySite;if(!S||!S.onStatus)return;
function et(t){var d=new Date(t);return !t||isNaN(d)?'':d.toLocaleString('en-GB',{timeZone:'America/New_York',weekday:'short',hour:'2-digit',minute:'2-digit'}).replace(',','')}
function pace(r,h){var e=Date.parse(r);return isNaN(e)?null:Math.max(0,Math.min(100,100-(e-Date.now())/(h*36e3)))}
function set(row,k,w,h){var c=row.querySelector('[data-w="'+k+'"]');if(!c)return null;var i=c.querySelector('i'),s=c.querySelector('s'),v=c.querySelector('.lk-v'),n=c.querySelector('p');
var p=w&&typeof w.pct==='number'?w.pct:null,t=w?pace(w.resets_at,h):null,r=w&&w.resets_at?et(w.resets_at):'';
i.style.width=(p===null?0:Math.max(0,Math.min(100,p)))+'%';i.className=p!==null&&p>=100?'hot':'';v.textContent=p===null?'–':Math.round(p)+'%';
if(s){s.hidden=t===null;if(t!==null)s.style.left=t+'%'}
if(n){n.className=p!==null&&p>=100?'meta lk-hotw':'meta';n.textContent=p===null?'no reading yet':!r?(p>=100?'at its limit · ':'')+'reset time not known':p>=100?'at its limit · lane paused to '+r:'resets '+r}return p}
function draw(st){var ms=(st.personal||{}).meters,m=st.meter||{},z=0;
[].forEach.call(document.querySelectorAll('.lk-acct[data-acct]'),function(row){var a=row.getAttribute('data-acct');
if(a==='main'){if(m.five_hour)set(row,'five',m.five_hour,5);if(m.weekly)set(row,'week',m.weekly,168);return}
if(!ms)return;var r=ms[a]||null,p=set(row,'five',r&&r.five,5);set(row,'week',r&&r.week,168);if(p!==null&&p>=100)z++});
var pz=document.getElementById('lk-pz');if(pz&&ms){pz.hidden=false;pz.querySelector('b').textContent=z}}
S.onStatus.push(draw);if(S.status&&S.status())draw(S.status())});
// T-2667 (T-2469, friesevan #41 c6650882035): Running follows every status, from lanes.js's sources (the main account's tasks,
// then each personal row not done); T-3009: only those (an agent at work now). The tasks the build saw in a test or merge
// stage are counted apart in #lk-wq (Waiting for tests, Waiting to merge), from data-life's stages. Each task's stage
// comes from the build's machine records, else Review for a review task, else Coding. Sorted by stage (last first, or first
// first), filtered by a chip, four cards (three at 390) before Show more; the choice is kept in localStorage.
document.addEventListener('DOMContentLoaded',function(){var S=window.CompanySite,box=document.getElementById('lk-run');if(!box)return;
var f={},L={};try{f=JSON.parse(box.getAttribute('data-faces')||'{}')}catch(e){}try{L=JSON.parse(box.getAttribute('data-life')||'{}')}catch(e){}
var RUN=['coding','review','testq','testing','mergeq','mergetest','parked','merging'],ST=RUN.slice().reverse(),TR=RUN.filter(function(s){return s!=='parked'}),Q={testq:1,mergeq:1,parked:1},
LB={coding:'Coding',testq:'Test queue',testing:'Testing',review:'Review',mergeq:'Merge queue',mergetest:'Merge testing',parked:'Parked',merging:'Merging'};
var pic={};[].forEach.call(document.querySelectorAll('.lk-team a'),function(a){var m=/cast\/([^/.]+)\.html/.exec(a.getAttribute('href')||''),g=a.querySelector('img');if(m&&g)pic[m[1]]=g.getAttribute('src')});
var K='lk-run-more',fl='all',up=false,all=false,items=L.init||[];try{all=localStorage.getItem(K)==='1'}catch(e){}
function mk(p,t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;p.appendChild(e);return e}
function cap(s){s=String(s||'');return s.charAt(0).toUpperCase()+s.slice(1)}
function nm(s){s=String(s||'').replace(/^\s*\[[^\]]*\]\s*/,'').replace(/^\s*T-\d+\s*[:,]?\s*/,'');s=cap(s);return s.length>160?s.slice(0,159).replace(/\s+\S*$/,'')+'…':s}
var K3=window.CompanySite&&window.CompanySite.lk;  // T-3187: stars, search and open cards (the block above)
function mins(n){return n>=60?Math.floor(n/60)+' h '+(n%60)+' min':n+' min'}
function mark(p,s){mk(p,'span',Q[s]?'lk-qm':'lk-dot')}
function card(x){var c=mk(box,'div','lk-card lk-run'),r=mk(c,'div','lk-r1'),fs=mk(r,'span','lk-faces'),t,rt,ol,tr=x.s==='parked'?TR.map(function(s){return s==='mergetest'?'parked':s}):TR,i=tr.indexOf(x.s),sc;c.setAttribute('data-stage',x.s);
c.setAttribute('data-id',x.id||x.t);if(K3&&K3.open(x.id||x.t))c.classList.add('lk-open');
(x.w||[]).slice(0,2).forEach(function(w){var p=f[String(w).toLowerCase()],g;if(p&&pic[p]){g=mk(fs,'img');g.src=pic[p];g.alt='';g.width=g.height=40}});
t=mk(r,'span','t');mk(t,'b','lk-tn',x.t);mk(t,'span','',[(x.w||[]).filter(Boolean).map(cap).join(', '),cap(x.m),x.min>=0?mins(x.min):''].filter(Boolean).join(' · '));
rt=mk(r,'span','lk-rt');if(x.id)mk(rt,'span','idb',x.id);if(x.n)mk(rt,'span','lk-nt',x.n);if(K3){K3.star(r,x.id);K3.aria(c)}
ol=mk(c,'ol','lk-track');ol.setAttribute('aria-label','Stage: '+LB[x.s]);tr.forEach(function(s,j){mk(ol,'li',j<i?'d':j===i?(Q[s]?'q':'a'):'',LB[s])});
sc=mk(c,'span','lk-ch lk-stc');mark(sc,x.s);sc.appendChild(document.createTextNode(LB[x.s]))}
function order(a,b){var d=ST.indexOf(a.s)-ST.indexOf(b.s),fa=K3&&K3.fav(a.id)?1:0,fb=K3&&K3.fav(b.id)?1:0;return (fb-fa)||(up?-d:d)||((b.min||0)-(a.min||0))}
function hit(x){return !K3||K3.match([x.t,x.id,(x.w||[]).join(' '),LB[x.s],x.n].map(function(s){return s||''}).join(' '))}
function render(){var flt=document.getElementById('lk-flt'),cnt={},v,mo,so,c;items.forEach(function(x){cnt[x.s]=(cnt[x.s]||0)+1});if(fl!=='all'&&!cnt[fl])fl='all';
if(flt){flt.textContent='';[['all','All',items.length]].concat(RUN.filter(function(s){return cnt[s]}).map(function(s){return[s,LB[s],cnt[s]]})).forEach(function(c){
var b=mk(flt,'button','lk-ch');b.type='button';b.setAttribute('aria-pressed',fl===c[0]);if(c[0]!=='all')mark(b,c[0]);b.appendChild(document.createTextNode(c[1]+' '));mk(b,'small','',String(c[2]));
b.onclick=function(){fl=c[0];render()}})}
var sq=!!(K3&&K3.q());box.textContent='';v=items.filter(function(x){return (fl==='all'||x.s===fl)&&hit(x)}).sort(order);v.forEach(card);
if(!items.length)mk(box,'p','','Nothing running.');else if(!v.length&&sq)mk(box,'p','meta','No running task matches.');
box.classList.toggle('lk-short',!all&&!sq);
['lk-run-more','lk-run-more-top'].forEach(function(k){mo=document.getElementById(k);
if(mo){mo.hidden=v.length<=3||sq;mo.textContent='';mo.classList.toggle('lk-o3',!all&&v.length<=4);mo.setAttribute('aria-expanded',all);
if(all)mo.textContent='Show fewer ▴';else{mk(mo,'span','lk-m4','Show '+(v.length-4)+' more ▾');mk(mo,'span','lk-m3','Show '+(v.length-3)+' more ▾')}}});
so=document.getElementById('lk-sort');if(so){so.textContent='Sort: stage, '+(up?'first first':'last first')+' ▾';so.setAttribute('aria-pressed',up)}
c=document.getElementById('lk-run-n');if(c)c.textContent=items.length}
var so=document.getElementById('lk-sort'),mo=document.getElementById('lk-run-more');
if(so)so.onclick=function(){up=!up;render()};['lk-run-more','lk-run-more-top'].forEach(function(k){var m=document.getElementById(k);if(m)m.onclick=function(){all=!all;try{localStorage.setItem(K,all?'1':'0')}catch(e){}render()}});
// T-2833: the idle alarm (no work session for 15+ minutes while work is allowed) follows every status too.
function idle(st){var q=st.idle,sf=document.getElementById('lk-sf'),ie=document.getElementById('lk-idle');if(sf&&!ie){ie=document.createElement('p');ie.id='lk-idle';ie.className='meta lk-idle';sf.insertBefore(ie,sf.firstChild)}
if(ie){if(q&&q.why&&q.since){var mn=Math.max(0,Math.round((Date.now()-Date.parse(q.since))/6e4));ie.textContent='No work session for '+(mn>=60?Math.floor(mn/60)+' h '+(mn%60)+' m':mn+' min')+' while work is allowed: '+q.why+'.'+(q.healed&&q.healed.length?' Done: '+q.healed.join('; ')+'.':'');ie.hidden=false}else ie.hidden=true}}
function draw(st,isPub){var l=S.lane.main(st,isPub).concat(S.lane.rows(st).filter(function(r){return!r.d})),seen={},u=[],now=Date.now(),o={},wk;
l.forEach(function(r){var t=String(r.t||r.task||''),id=r.task||(t.match(/\bT-\d+/)||[''])[0],k=id||nm(t),s=(L.st||{})[id],m;if(s&&s[0]==='parked'&&r.at&&Date.parse(r.at)>s[2])s=[r.k==='review'?'review':'coding','Fix after a failed merge'];if(r.w)o[String(r.w).toLowerCase()]=1;if(!k||seen[k])return;seen[k]=1;
m=r.at?Math.round((now-Date.parse(r.at))/6e4):NaN;u.push({id:id,t:nm(r.t||r.task)||nm((L.nm||{})[id])||'Name not recorded',w:[r.w],m:r.m,min:m>=0?m:-1,s:s?s[0]:r.k==='review'?'review':'coding',n:s?s[1]:''})});
items=u;render();wk=document.getElementById('lk-working');if(wk)wk.textContent=Object.keys(o).length+' working';idle(st)}
(function(){var W={tests:{testq:1},merge:{mergeq:1}},st=L.st||{};
[].forEach.call(document.querySelectorAll('#lk-wq a[data-wq]'),function(a){var w=W[a.getAttribute('data-wq')]||{},n=0,b=a.querySelector('b');
Object.keys(st).forEach(function(k){if(st[k]&&w[st[k][0]])n++});if(b)b.textContent=n})})();
render();if(K3)K3.on(render);if(S&&S.onStatus&&S.lane){S.onStatus.push(draw);if(S.status&&S.status())draw(S.status(),true)}});
// T-2940: Queued (and T-3094 the Merge queue) folds behind a button at the top of its list: rows past data-max carry lk-fold; the one Lock In dropdown in Usage (main account, all lanes or
// any subset) posts through lockin.js (S.lockSet: LOCK IN / UNLOCK on the Chat issue) and personal.js (S.laneLock: the lane's
// own lock key, in the file the Lanes switches write). A token holder only; each send takes two taps, as every other Lock In button does.
document.addEventListener('DOMContentLoaded',function(){var S=window.CompanySite,d=document.getElementById('lk-lockmenu');
function mk(p,t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;p.appendChild(e);return e}
[['lk-q','lk-q-more'],['lk-mq','lk-mq-more']].forEach(function(k){var q=document.getElementById(k[0]),qb=document.getElementById(k[1]),qa=false,mx,n;if(!q||!qb)return;
mx=+q.getAttribute('data-max')||4;n=q.children.length;[].forEach.call(q.children,function(c,i){c.classList.toggle('lk-fold',i>=mx)});
function pq(){q.classList.toggle('lk-qshort',!qa);qb.hidden=n<=mx;qb.setAttribute('aria-expanded',qa);qb.textContent=qa?'Show fewer ▴':'Show '+(n-mx)+' more ▾'}
qb.onclick=function(){qa=!qa;pq()};pq()});
if(!d||!S||!S.getToken||!S.getToken())return;d.hidden=false;
var box=d.querySelector('div'),arm=null,armT=0,tm,note;
function build(){var p=document.getElementById('personal'),st=(p&&p.getAttribute('data-state')||'').split(' ').filter(Boolean),rows=[['All lanes','all'],['Main account','main']],cb={},b;
st.forEach(function(x){var a=x.split(':');if(a[1]==='1'&&/^[a-z0-9]$/.test(a[0]))rows.push(['Account '+a[0].toUpperCase(),a[0]])});
box.textContent='';box.className='lk-lm';
rows.forEach(function(r){var l=mk(box,'label'),i=mk(l,'input');i.type='checkbox';cb[r[1]]=i;l.appendChild(document.createTextNode(r[0]));
i.onchange=function(){if(r[1]==='all')Object.keys(cb).forEach(function(k){if(k!=='main')cb[k].checked=i.checked});arm=null}});
b=mk(box,'div','lk-lb');note=mk(box,'small','meta');note.setAttribute('role','status');
[['Lock In',true,'lk-lgo'],['Spread',false,'lk-lsp']].forEach(function(o){var bt=mk(b,'button','btn '+o[2],o[0]);bt.type='button';
bt.onclick=function(){var t=Date.now(),ids=Object.keys(cb).filter(function(k){return k!=='all'&&k!=='main'&&cb[k].checked}),m=cb.main.checked;
if(!m&&!ids.length){note.textContent='Pick the main account or a lane first.';return}
if(arm!==o[1]){arm=o[1];armT=t;clearTimeout(tm);tm=setTimeout(function(){arm=null;note.textContent=''},5000);note.textContent='Tap again within 5 seconds to '+(o[1]?'lock in':'spread')+'.';return}
if(t-armT<400)return;arm=null;clearTimeout(tm);note.textContent='Sending...';
if(m&&S.lockSet)S.lockSet(o[1]);
if(ids.length&&S.laneLock)S.laneLock(ids,o[1]).then(function(w){note.textContent=w},function(e){note.textContent='Not sent: '+(e&&e.message?e.message:'network error')+'.'});
else note.textContent=ids.length?'Lanes are not available here.':'Sent. This changes when the company reads it, usually within 15 minutes.'}})}
d.addEventListener('toggle',function(){if(d.open)build()})});
