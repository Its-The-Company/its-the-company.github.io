// Home bubbles (T-2076, stage 2): one panel open at a time; the hash still names it. Source: tools/site/home_look.py.
(function(){var b=document.querySelectorAll('.lk-b');function show(h){b.forEach(function(a){var on=a.hash===h;a.classList.toggle('open',on);
a.setAttribute('aria-expanded',on);var p=document.querySelector(a.hash);if(p)p.classList.toggle('open',on)})}
b.forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();var h=a.classList.contains('open')?'':a.hash;
history.replaceState(null,'',h||location.pathname);show(h)})});if(location.hash)show(location.hash)})();
