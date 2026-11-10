// Home (T-2667 for T-2480 and T-2469). Source: tools/site/home_look.py. Bubbles: one panel open at a time; the hash names it.
(function(){var b=document.querySelectorAll('.lk-b');function show(h){b.forEach(function(a){var on=a.hash===h;a.classList.toggle('open',on);
a.setAttribute('aria-expanded',on);var p=document.querySelector(a.hash);if(p)p.classList.toggle('open',on)})}
b.forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();var h=a.classList.contains('open')?'':a.hash,p;
history.replaceState(null,'',h||location.pathname);show(h);
// T-3996: the panels sit under More now, and Needs you's count links to one from the top of the page: bring it into view
p=h&&document.querySelector(h);if(p&&p.scrollIntoView)p.scrollIntoView({block:'nearest'})})});if(location.hash)show(location.hash)})();
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
function toggle(c){var k=key(c),on=!c.classList.contains('lk-open');c.classList.toggle('lk-open',on);if(on){O[k]=1;tree(c)}else delete O[k];aria(c)}
// T-3316 (friesevan #41 c6709231564; redone as T-3434): each task's parents and children. data-lin is lineage.page_data:
// n {id: [name, state]}, u {child: [parents]}, a {second lead ID: first}; G.d is the same edges the other way. walk() is
// lineage.rows: each task once in full, a later meeting one row marked again, so a cycle ends. A relative with a card here
// is a link to it (go); one with none is its name and a word, never a dead link. The tree is drawn when a card first
// opens. Text goes in as textContent.
var G={n:{},u:{},a:{},d:{}},J={},LS={q:'Queued',w:'Waiting',b:'Blocked',d:'Done',a:'Archived',c:'Cancelled',u:'Not on the board'},LMAX=40;
try{var g0=JSON.parse(H.getAttribute('data-lin')||'{}');G.n=g0.n||{};G.u=g0.u||{};G.a=g0.a||{}}catch(e){}
Object.keys(G.u).sort().forEach(function(c){G.u[c].forEach(function(p){(G.d[p]=G.d[p]||[]).push(c)})});
function lid(i){i=String(i||'').replace(/\.\d+$/,'');return G.a[i]||i}
function pl(n,w,e){return n?n+' '+w+(n===1?'':e):''}
function lw(i){i=lid(i);return[pl((G.u[i]||[]).length,'parent','s'),pl((G.d[i]||[]).length,'child','ren')].filter(Boolean).join(' · ')}
function badge(p,i){var w=lw(i);if(w)mk(p,'span','lk-lin',w)}
function walk(i,g){var s={},o=[],t=[],n;s[i]=1;function push(x,d){(g[x]||[]).slice().reverse().forEach(function(y){t.push([y,d])})}push(i,1);
while(t.length&&o.length<LMAX){n=t.pop();o.push([n[1],n[0],s[n[0]]?1:0]);if(!s[n[0]]){s[n[0]]=1;push(n[0],n[1]+1)}}
if(t.length)while(t.length){n=t.pop();if(!s[n[0]]){s[n[0]]=1;push(n[0],0)}}
o.left=Object.keys(s).length-1-o.filter(function(r){return !r[2]}).length;return o}
function qcard(i){var q=document.getElementById('lk-q');return q?[].filter.call(q.children,function(c){return lid(c.getAttribute('data-id'))===i})[0]:null}
function carded(i){return !!((S.lk.has&&S.lk.has(i))||qcard(i)||(A||[]).some(function(a){return a[0]===i}))}
function qname(i){var c=qcard(i),a=(A||[]).filter(function(x){return x[0]===i})[0];return c?(c.querySelector('.lk-tn')||{}).textContent:a?a[2]:''}
function lrow(ul,r,me){var t=r[1],li=mk(ul,'li'),go=!r[2]&&carded(t),n=G.n[t]||['','u'],e=mk(li,go?'a':'span');
li.setAttribute('data-tid',t);li.setAttribute('data-d',r[0]);if(r[2])li.setAttribute('data-again','1');li.style.paddingLeft=(Math.min(r[0],5)-1)*14+'px';
if(go){e.href='#lk-run';e.setAttribute('data-go',t)}mk(e,'span','idb',t);mk(e,'span','lk-tt',n[0]||qname(t)||'Name not recorded ('+t+')');
if(r[2])mk(e,'span','lk-ts',t===me?'This task':'Shown above');else if(!go)mk(e,'span','lk-ts',LS[n[1]]||LS.u)}
function tree(c){var i=lid(c.getAttribute('data-id')),o;if(!c.matches('.lk-run,.lk-q')||c.querySelector('.lk-tree')||!lw(i))return;o=mk(c,'div','lk-tree');
[['up','Parents',G.u],['down','Children',G.d]].forEach(function(s){var rs=walk(i,s[2]),ul;if(!rs.length)return;mk(o,'h4','',s[1]);ul=mk(o,'ul');ul.setAttribute('data-way',s[0]);
rs.forEach(function(r){lrow(ul,r,i)});if(rs.left>0)mk(ul,'li','lk-tm','+'+rs.left+' more on the board')})}
function go(i){var c,n,b;if(Q&&inp){inp.value='';Q='';H.classList.remove('lk-searching');fire()}
c=S.lk.run&&S.lk.run(i);if(!c){J[i]=1;queued();c=qcard(i);b=document.getElementById('lk-q-more');
if(c&&c.classList.contains('lk-fold')&&b&&c.parentNode.classList.contains('lk-qshort'))b.click()}
if(!c)return;if(!c.classList.contains('lk-open'))toggle(c);c.classList.add('lk-hit');setTimeout(function(){c.classList.remove('lk-hit')},2000);
c.scrollIntoView({block:'center'});n=c.querySelector('.lk-tn');if(n)n.focus({preventScroll:true})}
var A=null,pic={},fc={};[].forEach.call(document.querySelectorAll('.lk-team a'),function(a){var m=/cast\/([^/.]+)\.html/.exec(a.getAttribute('href')||''),g=a.querySelector('img');if(m&&g)pic[m[1]]=g.getAttribute('src')});
try{fc=JSON.parse((document.getElementById('lk-run')||H).getAttribute('data-faces')||'{}')}catch(e){}
function mk(p,t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;p.appendChild(e);return e}
// a Queued row past the page's 30, from data-all ([id, number, name, worker, category]): drawn while it matches the search or is starred
function qrow(a){var c=document.createElement('div'),p=fc[String(a[3]||'').toLowerCase()],g,t;c.className='lk-card lk-q lk-x';c.setAttribute('data-id',a[0]);c.setAttribute('data-n',a[1]);
c.setAttribute('data-q',[a[2],a[0],a[3]].join(' '));mk(c,'span','lk-n',String(a[1]));if(p&&pic[p]){g=mk(c,'img');g.src=pic[p];g.alt='';g.width=g.height=24}else mk(c,'span').style.width='24px';
t=mk(c,'span','t');mk(t,'b','lk-tn',a[2]);badge(t,a[0]);if(a[4]){g=mk(c,'span','lk-cat',a[4]);g.title='Category: '+a[4]}mk(c,'span','idb',a[0]);aria(c);return c}
function queued(){var q=document.getElementById('lk-q'),rows,mx,qb;if(!q)return;if(!A){A=[];try{A=JSON.parse(q.getAttribute('data-all')||'[]')}catch(e){}}
[].slice.call(q.querySelectorAll('.lk-x')).forEach(function(c){q.removeChild(c)});
A.forEach(function(a){if(okId(a[0])&&(F[a[0]]||J[a[0]]||(Q&&match([a[2],a[0],a[3]].join(' ')))))q.appendChild(qrow(a))});
rows=[].slice.call(q.children);mx=+q.getAttribute('data-max')||4;qb=document.getElementById('lk-q-more');
if(qb&&/^Show \d+ more/.test(qb.textContent))qb.textContent='Show '+Math.max(0,rows.length-mx)+' more ▾';
rows.sort(function(a,b){return (F[b.getAttribute('data-id')]?1:0)-(F[a.getAttribute('data-id')]?1:0)||(+a.getAttribute('data-n')-+b.getAttribute('data-n'))});
rows.forEach(function(c,i){var s=c.querySelector('.lk-star');q.appendChild(c);c.classList.toggle('lk-fold',i>=mx);if(s)s.parentNode.removeChild(s);tok&&up(c,c.getAttribute('data-id'));star(c,c.getAttribute('data-id'));
c.hidden=!match(c.getAttribute('data-q'))});
var no=document.getElementById('lk-q-none');if(!no&&Q){no=document.createElement('p');no.id='lk-q-none';no.className='meta';no.textContent='No queued task matches.';q.parentNode.insertBefore(no,q.nextSibling)}
if(no)no.hidden=!Q||rows.some(function(c){return !c.hidden})}
function count(){if(!fn2)return;if(!Q){fn2.textContent='';return}
var q=document.querySelectorAll('#lk-q>.lk-q:not([hidden])').length;
fn2.textContent=q+(q===1?' queued task matches':' queued tasks match')}
function fire(){fn.forEach(function(f){try{f()}catch(e){}});queued();count()}
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
function anc(i){var s={},t=[[lid(i),0]],x;while(t.length){x=t.shift();(G.u[x[0]]||[]).forEach(function(p){p=lid(p);if(!s[p]){s[p]=x[1]+1;t.push([p,x[1]+1])}})}return s}
function nums(){var m={},q=document.getElementById('lk-q');(A||[]).forEach(function(a){if(okId(a[0]))m[lid(a[0])]=a[1]});
[].forEach.call(q?q.children:[],function(d){var i=d.getAttribute('data-id');if(okId(i))m[lid(i)]=+d.getAttribute('data-n')});return m}
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
lin:function(c,i){badge(c,i);if(c.classList.contains('lk-open'))tree(c)}};
H.addEventListener('click',function(e){var t=e.target,c,l=t.closest&&t.closest('a[data-go]');if(l){e.preventDefault();go(l.getAttribute('data-go'));return}
if(!t.closest||t.closest('button,a,input,summary,select,label,.lk-tree'))return;c=t.closest(CARD);
if(c&&H.contains(c)&&c.querySelector('.lk-tn'))toggle(c)});
H.addEventListener('keydown',function(e){var t=e.target,c;if((e.key==='Enter'||e.key===' ')&&t.classList&&t.classList.contains('lk-tn')){c=t.closest(CARD);if(c){e.preventDefault();toggle(c)}}});
[].forEach.call(H.querySelectorAll('.lk-tn'),function(n){aria(n.closest(CARD))});
if(inp&&fb){fb.hidden=false;inp.addEventListener('input',function(){Q=inp.value.trim().toLowerCase();H.classList.toggle('lk-searching',!!Q);fire()})}
queued();
if(tok)read().then(function(f){take(f.list)},function(){})});
// T-3996: the Team row's "N working" follows every status the page already reads (no loop of its own): the In flight
// cards that used to set it left Home. The same sources: the main account's tasks, then each personal row not done.
document.addEventListener('DOMContentLoaded',function(){var S=window.CompanySite,wk=document.getElementById('lk-working');
if(!S||!S.onStatus||!S.lane||!wk||document.getElementById('lk-run'))return;
function draw(st,isPub){var o={};S.lane.main(st,isPub).concat(S.lane.rows(st).filter(function(r){return!r.d})).forEach(function(r){if(r.w)o[String(r.w).toLowerCase()]=1});
wk.textContent=Object.keys(o).length+' working'}
S.onStatus.push(draw);if(S.status&&S.status())draw(S.status(),true)});
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
// T-2667 (T-2469, friesevan #41 c6650882035): In flight (T-3284, was Running) follows every status, from lanes.js's sources
// (the main account's tasks, then each personal row not done), and T-3284 item 3 adds every task the build saw in a queue,
// a test, Parked or a merge (data-life's init). Each task's stage comes from the build's machine records, else Review for a
// review task, else Coding. All, Coding and Review filter; the chips past them jump to their panel. Each card's track is its
// history (steps(), hist_steps in home_look.py). Sorted by stage (last first, or first first), four cards (three at 390)
// before Show more; the choice is kept in localStorage.
document.addEventListener('DOMContentLoaded',function(){var S=window.CompanySite,box=document.getElementById('lk-run');if(!box)return;
var f={},L={};try{f=JSON.parse(box.getAttribute('data-faces')||'{}')}catch(e){}try{L=JSON.parse(box.getAttribute('data-life')||'{}')}catch(e){}
var RUN=['coding','review','testq','testing','mergeq','mergetest','parked','merging'],ST=RUN.slice().reverse(),Q={testq:1,mergeq:1,parked:1},
LB={coding:'Coding',testq:'Test queue',testing:'Testing',review:'Review',mergeq:'Merge queue',mergetest:'Merge testing',parked:'Parked',merging:'Merging'},
JU={testq:'lk-simq',testing:'simulators',mergeq:'lk-mqh',mergetest:'lk-mt',parked:'lk-parked',merging:'merging'},
M3=['mergeq','mergetest','merging'],EX={coding:M3,review:M3,testq:['testing'].concat(M3),testing:M3,mergeq:M3.slice(1),parked:M3,mergetest:['merging'],merging:[]};
var pic={};[].forEach.call(document.querySelectorAll('.lk-team a'),function(a){var m=/cast\/([^/.]+)\.html/.exec(a.getAttribute('href')||''),g=a.querySelector('img');if(m&&g)pic[m[1]]=g.getAttribute('src')});
var K='lk-run-more',fl='all',up=false,all=false,items=L.init||[],IN={};try{all=localStorage.getItem(K)==='1'}catch(e){}
items.forEach(function(x){if(x.id)IN[x.id]=x});
var CT={};Object.keys(L.cat||{}).forEach(function(k){String(L.cat[k]).split(' ').forEach(function(n){if(n)CT['T-'+n]=k})});  // T-3427: {label: "numbers"}
function mk(p,t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;p.appendChild(e);return e}
function cap(s){s=String(s||'');return s.charAt(0).toUpperCase()+s.slice(1)}
// T-2401 (#41 c6648649825): the model and the effort a lane gives the task, 'Opus high', as home_look.level
function lv(x){return x.m?[cap(x.m),x.e].filter(Boolean).join(' '):''}
// T-3318: src_words in home_look.py; '' for an unknown source, never a guess
function sw(s,n){s=String(s||'');var k=/^(plan|key)-([a-z])$/.exec(s);return s==='plan'?'Main plan':s==='api'?'Company API credits':k?(k[1]==='key'?'Key '+k[2].toUpperCase():String(n||'')||'Account '+k[2].toUpperCase()):''}
function nm(s){s=String(s||'').replace(/^\s*\[[^\]]*\]\s*/,'').replace(/^\s*T-\d+\s*[:,]?\s*/,'');s=cap(s);return s.length>160?s.slice(0,159).replace(/\s+\S*$/,'')+'…':s}
var K3=window.CompanySite&&window.CompanySite.lk;  // T-3187: stars, search and open cards (the block above)
function mins(n){return n>=60?Math.floor(n/60)+' h '+(n%60)+' min':n+' min'}
function mark(p,s){mk(p,'span',Q[s]?'lk-qm':'lk-dot')}
function steps(x){var p=(x.h||[]).map(function(h){return h.slice()}),c=Q[x.s]?'q':'a';
if(!p.length&&x.s!=='coding'&&x.s!=='review')p=[['coding',null,'d','']];if(x.s==='coding'&&p.length&&p[p.length-1][2]==='f')c='a lb';
p.push([x.s,x.min>=0?x.min:null,c,'']);return p.concat(EX[x.s].filter(function(e){return e!=='mergetest'||x.x}).map(function(e){return[e,null,'n','']}))}
function hist(c,x){var st=steps(x),k=st.filter(function(h){return h[2]!=='n'}).length,old=Math.max(0,k-6),ol=mk(c,'ol','lk-hist');
ol.setAttribute('aria-label','Steps, now '+LB[x.s]);if(old)mk(ol,'li','e','+'+old+' earlier');
var wd=[],nx=[];st.forEach(function(h,j){var li=mk(ol,'li',(h[2]+(j<old?' old':'')).trim(),LB[h[0]]),w=[h[1]==null?'':h[1]<1?'<1 min':mins(h[1]),h[3]].filter(Boolean).join(' · ');if(w)mk(li,'small','',w);
li.title=LB[h[0]]+(w?' · '+w:'')+({f:' · failed',q:' · waiting now',n:' · expected'}[h[2]]||(h[2].indexOf('a')>=0?' · now':''));
if(h[2]==='n')nx.push(LB[h[0]]);else wd.push((h[2].indexOf('lb')>=0?'↩ ':'')+LB[h[0]]+(w?' '+w:''))});
mk(c,'p','lk-hw meta',wd.join(' → ')+(nx.length?'; next: '+nx.join(', '):''))}
function card(x){var c=mk(box,'div','lk-card lk-run'),r=mk(c,'div','lk-r1'),fs=mk(r,'span','lk-faces'),t,m,rt,sc;c.setAttribute('data-stage',x.s);
c.setAttribute('data-id',x.id||x.t);if(K3&&K3.open(x.id||x.t))c.classList.add('lk-open');
(x.w||[]).slice(0,2).forEach(function(w){var p=f[String(w).toLowerCase()],g;if(p&&pic[p]){g=mk(fs,'img');g.src=pic[p];g.alt='';g.width=g.height=40}});
t=mk(r,'span','t');mk(t,'b','lk-tn',x.t);m=mk(t,'span','',[(x.w||[]).filter(Boolean).map(cap).join(', '),lv(x),x.min>=0?mins(x.min):''].filter(Boolean).join(' · '));
if(x.a){m.appendChild(document.createTextNode(' '));sc=mk(m,'span','lk-tag'+(x.sr?' lk-src':''),x.a);if(x.sr)sc.title='Runs on: '+x.a}
if(x.c){sc=mk(m,'span','lk-cat',x.c);sc.title='Category: '+x.c}
rt=mk(r,'span','lk-rt');if(x.id)mk(rt,'span','idb',x.id);if(x.n)mk(rt,'span','lk-nt',x.n);if(K3){K3.star(r,x.id);K3.aria(c)}
hist(c,x);sc=mk(c,'span','lk-ch lk-stc');mark(sc,x.s);sc.appendChild(document.createTextNode(LB[x.s]));if(K3)K3.lin(c,x.id)}
function order(a,b){var d=ST.indexOf(a.s)-ST.indexOf(b.s),fa=K3&&K3.fav(a.id)?1:0,fb=K3&&K3.fav(b.id)?1:0;return (fb-fa)||(up?-d:d)||((b.min||0)-(a.min||0))}
function hit(x){return !K3||K3.match([x.t,x.id,(x.w||[]).join(' '),LB[x.s],x.n,x.a].map(function(s){return s||''}).join(' '))}
function render(){var flt=document.getElementById('lk-flt'),cnt={},v,mo,so,c;items.forEach(function(x){cnt[x.s]=(cnt[x.s]||0)+1});if(fl!=='all'&&!cnt[fl])fl='all';
if(flt){flt.textContent='';[['all','All',items.length]].concat(RUN.filter(function(s){return cnt[s]}).map(function(s){return[s,LB[s],cnt[s]]})).forEach(function(c){
var j=JU[c[0]],b=mk(flt,j?'a':'button',j?'lk-ch lk-jump':'lk-ch');if(j)b.href='#'+j;else{b.type='button';b.setAttribute('aria-pressed',fl===c[0]);b.onclick=function(){fl=c[0];render()}}
if(c[0]!=='all')mark(b,c[0]);b.appendChild(document.createTextNode(c[1]+' '));mk(b,'small','',String(c[2]))})}
var sq=!!(K3&&K3.q());box.textContent='';v=items.filter(function(x){return (fl==='all'||x.s===fl)&&hit(x)}).sort(order);v.forEach(card);
if(!items.length)mk(box,'p','','Nothing in flight.');else if(!v.length&&sq)mk(box,'p','meta','No task in flight matches.');
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
// T-3190: the tasks finished this session, from each status (Home is built far less often than a status is written)
function fin(st){var d=(st.session||{}).active?(st.tasks||{}).fin:null,e=document.getElementById('lk-dn'),b=document.getElementById('lk-fin'),u=document.getElementById('lk-fin-l'),m=document.getElementById('lk-fin-m'),r=d&&d.rows||[],x=d?d.n-r.length:0;
if(e){e.hidden=!d;if(d)e.querySelector('b').textContent=d.n}if(!b||!u)return;b.hidden=!r.length;u.textContent='';
r.forEach(function(a){var li=mk(u,'li');mk(li,'span','idb',a[0]);li.appendChild(document.createTextNode(' '+(nm(a[1])||nm((L.nm||{})[a[0]])||'Name not recorded')))});
if(m){m.hidden=x<1;m.textContent='and '+x+' earlier'}}
function draw(st,isPub){var ml=S.lane.main(st,isPub),l=ml.concat(S.lane.rows(st).filter(function(r){return!r.d})),seen={},u=[],now=Date.now(),o={},wk,ms=sw((st.tasks||{}).src);
l.forEach(function(r){var t=String(r.t||r.task||''),id=r.task||(t.match(/\bT-\d+/)||[''])[0],k=id||nm(t),s=(L.st||{})[id],m,b=IN[id]||{},ln=/^([ab])\d*$/.exec(r.lane||''),mn=ml.indexOf(r)>=0,rs=mn?ms:sw(r.src||(ln?'plan-'+ln[1]:''),r.n);if(s&&s[0]==='parked'&&r.at&&Date.parse(r.at)>s[2])s=[r.k==='review'?'review':'coding','Fix after a failed merge'];if(r.w)o[String(r.w).toLowerCase()]=1;if(!k||seen[k])return;seen[k]=1;
m=r.at?Math.round((now-Date.parse(r.at))/6e4):NaN;u.push({id:id,t:nm(r.t||r.task)||nm((L.nm||{})[id])||'Name not recorded',w:[r.w||(b.w||[])[0]||'worker not recorded'],m:r.m||b.m||'model not recorded',e:r.e&&r.m?r.e:r.m?'':b.e||'',min:m>=0?m:-1,s:s?s[0]:r.k==='review'?'review':'coding',n:s?s[1]:'',
a:rs||(mn?'Main':ln?'Account '+ln[1].toUpperCase():''),sr:rs?1:0,h:b.h,x:b.x,c:b.c||CT[id]||''})});
(L.init||[]).forEach(function(x){if(x.s!=='coding'&&x.s!=='review'&&!seen[x.id||x.t]){seen[x.id||x.t]=1;u.push(x)}});  // T-3284 item 3
items=u;render();wk=document.getElementById('lk-working');if(wk)wk.textContent=Object.keys(o).length+' working';idle(st);fin(st)}
// T-3316: a tree's link to an In flight card shows the whole list, then hands back the card
if(K3){K3.has=function(i){return items.some(function(x){return K3.id(x.id)===i})};K3.run=function(i){if(!K3.has(i))return null;fl='all';all=true;render();
return [].filter.call(box.children,function(c){return K3.id(c.getAttribute('data-id'))===i})[0]||null}}
render();if(K3)K3.on(render);if(S&&S.onStatus&&S.lane){S.onStatus.push(draw);if(S.status&&S.status())draw(S.status(),true)}});
// T-2940: Queued (and T-3094 the Merge queue) folds behind a button at the top of its list: rows past data-max carry lk-fold.
// T-3325 (redo of T-3191; friesevan #41 c6701941684, c6702049968): the one Lock In control in Usage sets every account, the
// main one and each enabled lane, together: Spread, Lock In until midnight or Lock In until daily usage, posted through
// lockin.js (S.lockSet: UNLOCK, LOCK IN or LOCK IN DAILY on the Chat issue). No per-lane choice. A token holder only; two taps.
document.addEventListener('DOMContentLoaded',function(){var S=window.CompanySite,d=document.getElementById('lk-lockmenu');
function mk(p,t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;p.appendChild(e);return e}
[['lk-q','lk-q-more'],['lk-mq','lk-mq-more'],['lk-pk','lk-pk-more']].forEach(function(k){var q=document.getElementById(k[0]),qb=document.getElementById(k[1]),qa=false,mx,n;if(!q||!qb)return;
mx=+q.getAttribute('data-max')||4;n=q.children.length;[].forEach.call(q.children,function(c,i){c.classList.toggle('lk-fold',i>=mx)});
function pq(){q.classList.toggle('lk-qshort',!qa);qb.hidden=n<=mx;qb.setAttribute('aria-expanded',qa);qb.textContent=qa?'Show fewer ▴':'Show '+(n-mx)+' more ▾'}
qb.onclick=function(){qa=!qa;pq()};pq()});
if(!d||!S||!S.getToken||!S.getToken())return;d.hidden=false;
var box=d.querySelector('div'),arm=null,armT=0,tm,note,bs=[];
function mark(){var m=S.lockMode?S.lockMode():'';bs.forEach(function(x){x[0].setAttribute('aria-pressed',x[1]===m?'true':'false');x[0].classList.toggle('on',x[1]===m)})}
function build(){var b;box.textContent='';box.className='lk-lm';bs=[];
mk(box,'p','meta','One setting for every account: the main account and each lane. All go back to Spread at midnight.');
b=mk(box,'div','lk-lb');note=mk(box,'small','meta');note.setAttribute('role','status');
[['Spread','spread','lk-lsp','Each account spreads its week to finish a few hours before its own reset.'],['Lock In until midnight','midnight','lk-lgo','Every account at full speed until midnight, then Spread.'],['Lock In until daily usage','daily','lk-lgd','Every account at full speed until it has used its share of today (its remaining week split evenly over the days to its reset), then it holds until midnight.']].forEach(function(o){
var bt=mk(b,'button','btn '+o[2],o[0]);bt.type='button';bt.title=o[3];bs.push([bt,o[1]]);
bt.onclick=function(){var t=Date.now();
if(arm!==o[1]){arm=o[1];armT=t;clearTimeout(tm);tm=setTimeout(function(){arm=null;note.textContent=''},5000);note.textContent='Tap again within 5 seconds for '+o[0]+', every account. '+o[3];return}
if(t-armT<400)return;arm=null;clearTimeout(tm);note.textContent=S.lockSet?S.lockSet(o[1]):'Not available here.';mark()}});mark()}
if(S.onStatus)S.onStatus.push(mark);
d.addEventListener('toggle',function(){if(d.open)build()})});
