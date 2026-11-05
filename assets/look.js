// Home bubbles (T-2076, stage 2): one panel open at a time; the hash still names it. Source: tools/site/home_look.py.
(function(){var b=document.querySelectorAll('.lk-b');function show(h){b.forEach(function(a){var on=a.hash===h;a.classList.toggle('open',on);
a.setAttribute('aria-expanded',on);var p=document.querySelector(a.hash);if(p)p.classList.toggle('open',on)})}
b.forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();var h=a.classList.contains('open')?'':a.hash;
history.replaceState(null,'',h||location.pathname);show(h)})});if(location.hash)show(location.hash)})();
// T-2400: Usage's tiles (personal accounts, API credits, the share) follow the live status, as the Overview glance did.
document.addEventListener('DOMContentLoaded',function(){var S=window.CompanySite,u=document.querySelector('#usage .lk-pt');
if(!S||!S.onStatus||!S.added||!u)return;function mk(p,t,c,x){var e=document.createElement(t);if(c)e.className=c;e.textContent=x;p.appendChild(e);return e}
S.onStatus.push(function(){var g=document.createElement('div');g.className='tiles lk-pt';S.added(g,function(g,h,l,big,sub){
var d=mk(g,'div','tile','');mk(d,'b','num',big);mk(d,'span','',sub?l+': '+sub:l)},'#usage');u.parentNode.replaceChild(g,u);u=g})});
// T-2400 (friesevan #41 c6650882035): Running follows every status, from lanes.js's sources (the old Home's): the main
// account's tasks, then each personal row not done; one card per task, at most 5. Status text goes in as textContent.
document.addEventListener('DOMContentLoaded',function(){var S=window.CompanySite,box=document.getElementById('lk-run');
if(!S||!S.onStatus||!S.lane||!box)return;var f={};try{f=JSON.parse(box.getAttribute('data-faces')||'{}')}catch(e){}
function mk(p,t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;p.appendChild(e);return e}
// Faces from the Team row's images, which the build inlines (no extra request for a portrait file).
var pic={};[].forEach.call(document.querySelectorAll('.lk-team a'),function(a){var m=/cast\/([^/.]+)\.html/.exec(a.getAttribute('href')||''),g=a.querySelector('img');if(m&&g)pic[m[1]]=g.getAttribute('src')});
function cap(s){s=String(s||'');return s.charAt(0).toUpperCase()+s.slice(1)}
function nm(s){s=String(s||'').replace(/^\s*\[[^\]]*\]\s*/,'').replace(/^\s*T-\d+\s*[:,]?\s*/,'');s=cap(s);return s.length>48?s.slice(0,47).replace(/\s+\S*$/,'')+'…':s}
function draw(st,isPub){var l=S.lane.main(st,isPub).concat(S.lane.rows(st).filter(function(r){return!r.d})),seen={},u=[];
l.forEach(function(r){var t=String(r.t||r.task||''),id=(t.match(/\bT-\d+/)||[r.task||''])[0];if(seen[id||t])return;seen[id||t]=1;u.push([r,id])});
box.textContent='';u.slice(0,5).forEach(function(x){var r=x[0],c=mk(box,'div','lk-card'),fs=mk(c,'span','lk-faces'),p=f[String(r.w||'').toLowerCase()],i,t,m;
if(p&&pic[p]){i=mk(fs,'img');i.src=pic[p];i.alt='';i.width=i.height=44}t=mk(c,'span','t');mk(t,'b','',nm(r.t||r.task));
m=r.at?Math.round((Date.now()-Date.parse(r.at))/6e4):NaN;mk(t,'span','',[cap(r.w),cap(r.m),m>=0?m+' min':''].filter(Boolean).join(' · '));mk(c,'span','idb',x[1])});
if(u.length>5)mk(box,'p','meta','and '+(u.length-5)+' more');if(!u.length)mk(box,'p','','Nothing running.');
var s=document.getElementById('lk-run-s');if(s)s.textContent=(st.session||{}).active||u.length?'a session is running':'no session running'}
S.onStatus.push(draw);if(S.status&&S.status())draw(S.status(),true)});
