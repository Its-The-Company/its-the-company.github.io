// Home (T-2667 for T-2480 and T-2469). Source: tools/site/home_look.py. Bubbles: one panel open at a time; the hash names it.
(function(){var b=document.querySelectorAll('.lk-b');function show(h){b.forEach(function(a){var on=a.hash===h;a.classList.toggle('open',on);
a.setAttribute('aria-expanded',on);var p=document.querySelector(a.hash);if(p)p.classList.toggle('open',on)})}
b.forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();var h=a.classList.contains('open')?'':a.hash;
history.replaceState(null,'',h||location.pathname);show(h)})});if(location.hash)show(location.hash)})();
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
// then each personal row not done), plus the tasks the build saw in a test or merge queue (data-life). Each task's stage
// comes from the build's machine records, else Review for a review task, else Coding. Sorted by stage (last first, or first
// first), filtered by a chip, four cards (three at 390) before Show more; the choice is kept in localStorage.
document.addEventListener('DOMContentLoaded',function(){var S=window.CompanySite,box=document.getElementById('lk-run');if(!box)return;
var f={},L={};try{f=JSON.parse(box.getAttribute('data-faces')||'{}')}catch(e){}try{L=JSON.parse(box.getAttribute('data-life')||'{}')}catch(e){}
var ST=['merging','mergeq','review','testing','testq','coding'],TR=ST.slice().reverse(),Q={testq:1,mergeq:1},
LB={coding:'Coding',testq:'Test queue',testing:'Testing',review:'Review',mergeq:'Merge queue',merging:'Merging'};
var pic={};[].forEach.call(document.querySelectorAll('.lk-team a'),function(a){var m=/cast\/([^/.]+)\.html/.exec(a.getAttribute('href')||''),g=a.querySelector('img');if(m&&g)pic[m[1]]=g.getAttribute('src')});
var K='lk-run-more',fl='all',up=false,all=false,items=L.init||[];try{all=localStorage.getItem(K)==='1'}catch(e){}
function mk(p,t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;p.appendChild(e);return e}
function cap(s){s=String(s||'');return s.charAt(0).toUpperCase()+s.slice(1)}
function nm(s){s=String(s||'').replace(/^\s*\[[^\]]*\]\s*/,'').replace(/^\s*T-\d+\s*[:,]?\s*/,'');s=cap(s);return s.length>48?s.slice(0,47).replace(/\s+\S*$/,'')+'…':s}
function mins(n){return n>=60?Math.floor(n/60)+' h '+(n%60)+' min':n+' min'}
function mark(p,s){mk(p,'span',Q[s]?'lk-qm':'lk-dot')}
function card(x){var c=mk(box,'div','lk-card lk-run'),r=mk(c,'div','lk-r1'),fs=mk(r,'span','lk-faces'),t,rt,ol,i=TR.indexOf(x.s),sc;c.setAttribute('data-stage',x.s);
(x.w||[]).slice(0,2).forEach(function(w){var p=f[String(w).toLowerCase()],g;if(p&&pic[p]){g=mk(fs,'img');g.src=pic[p];g.alt='';g.width=g.height=40}});
t=mk(r,'span','t');mk(t,'b','',x.t);mk(t,'span','',[(x.w||[]).filter(Boolean).map(cap).join(', '),cap(x.m),x.min>=0?mins(x.min):''].filter(Boolean).join(' · '));
rt=mk(r,'span','lk-rt');if(x.id)mk(rt,'span','idb',x.id);if(x.n)mk(rt,'span','lk-nt',x.n);
ol=mk(c,'ol','lk-track');ol.setAttribute('aria-label','Stage: '+LB[x.s]);TR.forEach(function(s,j){mk(ol,'li',j<i?'d':j===i?(Q[s]?'q':'a'):'',LB[s])});
sc=mk(c,'span','lk-ch lk-stc');mark(sc,x.s);sc.appendChild(document.createTextNode(LB[x.s]))}
function order(a,b){var d=ST.indexOf(a.s)-ST.indexOf(b.s);return (up?-d:d)||((b.min||0)-(a.min||0))}
function render(){var flt=document.getElementById('lk-flt'),cnt={},v,mo,so,c;items.forEach(function(x){cnt[x.s]=(cnt[x.s]||0)+1});if(fl!=='all'&&!cnt[fl])fl='all';
if(flt){flt.textContent='';[['all','All',items.length]].concat(ST.filter(function(s){return cnt[s]}).map(function(s){return[s,LB[s],cnt[s]]})).forEach(function(c){
var b=mk(flt,'button','lk-ch');b.type='button';b.setAttribute('aria-pressed',fl===c[0]);if(c[0]!=='all')mark(b,c[0]);b.appendChild(document.createTextNode(c[1]+' '));mk(b,'small','',String(c[2]));
b.onclick=function(){fl=c[0];render()}})}
box.textContent='';v=items.filter(function(x){return fl==='all'||x.s===fl}).sort(order);v.forEach(card);if(!items.length)mk(box,'p','','Nothing running.');
box.classList.toggle('lk-short',!all);mo=document.getElementById('lk-run-more');
if(mo){mo.hidden=v.length<=3;mo.textContent='';mo.classList.toggle('lk-o3',!all&&v.length<=4);mo.setAttribute('aria-expanded',all);
if(all)mo.textContent='Show fewer ▴';else{mk(mo,'span','lk-m4','Show '+(v.length-4)+' more ▾');mk(mo,'span','lk-m3','Show '+(v.length-3)+' more ▾')}}
so=document.getElementById('lk-sort');if(so){so.textContent='Sort: stage, '+(up?'first first':'last first')+' ▾';so.setAttribute('aria-pressed',up)}
c=document.getElementById('lk-run-n');if(c)c.textContent=items.length}
var so=document.getElementById('lk-sort'),mo=document.getElementById('lk-run-more');
if(so)so.onclick=function(){up=!up;render()};if(mo)mo.onclick=function(){all=!all;try{localStorage.setItem(K,all?'1':'0')}catch(e){}render()};
// T-2833: the idle alarm (no work session for 15+ minutes while work is allowed) follows every status too.
function idle(st){var q=st.idle,sf=document.getElementById('lk-sf'),ie=document.getElementById('lk-idle');if(sf&&!ie){ie=document.createElement('p');ie.id='lk-idle';ie.className='meta lk-idle';sf.insertBefore(ie,sf.firstChild)}
if(ie){if(q&&q.why&&q.since){var mn=Math.max(0,Math.round((Date.now()-Date.parse(q.since))/6e4));ie.textContent='No work session for '+(mn>=60?Math.floor(mn/60)+' h '+(mn%60)+' m':mn+' min')+' while work is allowed: '+q.why+'.'+(q.healed&&q.healed.length?' Done: '+q.healed.join('; ')+'.':'');ie.hidden=false}else ie.hidden=true}}
function draw(st,isPub){var l=S.lane.main(st,isPub).concat(S.lane.rows(st).filter(function(r){return!r.d})),seen={},u=[],now=Date.now(),o={},wk,
late=L.at?Math.max(0,Math.round((now-L.at)/6e4)):0;
l.forEach(function(r){var t=String(r.t||r.task||''),id=r.task||(t.match(/\bT-\d+/)||[''])[0],k=id||nm(t),s=(L.st||{})[id],m;if(r.w)o[String(r.w).toLowerCase()]=1;if(!k||seen[k])return;seen[k]=1;
m=r.at?Math.round((now-Date.parse(r.at))/6e4):NaN;u.push({id:id,t:nm(r.t||r.task),w:[r.w],m:r.m,min:m>=0?m:-1,s:s?s[0]:r.k==='review'?'review':'coding',n:s?s[1]:''})});
(L.q||[]).forEach(function(x){if(seen[x.id])return;seen[x.id]=1;u.push(Object.assign({},x,{min:x.min>=0?x.min+late:-1}))});
items=u;render();wk=document.getElementById('lk-working');if(wk)wk.textContent=Object.keys(o).length+' working';idle(st)}
render();if(S&&S.onStatus&&S.lane){S.onStatus.push(draw);if(S.status&&S.status())draw(S.status(),true)}});
