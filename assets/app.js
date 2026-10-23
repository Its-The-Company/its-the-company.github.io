// The Company site: the "Now" panel (home) and the chat view and composer (chat.html). Plain JS, no libraries.
// The Investor's fine-grained GitHub token stays in this browser and goes only to api.github.com.
// Text from GitHub is always inserted with textContent, never as HTML.
(function () {
  'use strict';
  var API = 'https://api.github.com';
  var KEY = 'company-chat-token', MODE = 'company-chat-mode', NAME = 'company-chat-name';
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function getToken() { return sessionStorage.getItem(KEY) || localStorage.getItem(KEY) || ''; }
  function setToken(t, remember) {
    sessionStorage.removeItem(KEY); localStorage.removeItem(KEY);
    if (t) (remember ? localStorage : sessionStorage).setItem(KEY, t);
  }
  function gh(path, opts) {
    var h = { 'Accept': 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' };
    var t = getToken(); if (t) h['Authorization'] = 'Bearer ' + t;
    if (opts && opts.etag) h['If-None-Match'] = opts.etag;
    // no-store: api.github.com answers "private, max-age=60", so the browser cache would hide changes for up to a
    // minute. We keep our own ETags instead; a 304 reaches this code and costs no rate limit.
    return fetch(API + path, { headers: h, cache: 'no-store' });
  }
  function cap(s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }
  function ago(iso) {
    var s = Math.max(0, (Date.now() - Date.parse(iso)) / 1000);
    if (isNaN(s)) return '';
    return s < 90 ? Math.round(s) + ' s' : s < 5400 ? Math.round(s / 60) + ' min' : Math.round(s / 3600) + ' h';
  }
  function pctText(m) {
    if (!m || m.pct == null) return 'not read yet';
    var r = m.resets_at ? new Date(m.resets_at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : '';
    return Math.round(m.pct) + '% used' + (r ? ', resets ' + r : '');
  }

  // ---- Now panel -------------------------------------------------------------------------
  // Elapsed time comes from `started`, not `seconds`: the variable is rewritten only when something a reader sees
  // changes, so a pushed `seconds` counter goes stale between writes.
  function list(items, fmt) { var ul = el('ul'); items.forEach(function (x) { ul.appendChild(el('li', null, fmt(x))); }); return ul; }
  function renderNow(box, st, source) {
    box.textContent = '';
    box.appendChild(el('h3', null, 'Now'));
    var s = st.session || {};
    box.appendChild(el('p', null, s.active ? 'A ' + (s.kind || 'work') + ' session is running' + (s.started ? ' (started ' + ago(s.started) + ' ago).' : '.') : 'No session is running; the next one starts at the next 15-minute tick.'));
    var ws = st.workers || [];
    if (ws.length) {
      box.appendChild(el('p', 'now-sub', 'Working now'));
      box.appendChild(list(ws, function (w) { return cap(w.name) + ': ' + w.task + (w.model ? ' [' + w.model + ']' : '') + (w.started ? ', for ' + ago(w.started) : ''); }));
    } else if (s.active) box.appendChild(el('p', 'muted', 'No worker call is running at this moment.'));
    var rec = (st.recent || []).slice(0, 3);
    if (rec.length) {
      box.appendChild(el('p', 'now-sub', 'Just finished'));
      box.appendChild(list(rec, function (w) { return cap(w.name) + ': ' + w.task + (w.finished ? ', ' + ago(w.finished) + ' ago' : ''); }));
    }
    var q = st.queue || {};
    box.appendChild(el('p', 'now-sub', 'Queue: ' + (q.runnable_count || 0) + ' tasks ready, ' + (q.blocked_count || 0) + ' blocked'));
    if ((q.runnable || []).length) box.appendChild(list(q.runnable.slice(0, 5), function (t) { return '[' + t.kind + '] ' + t.text; }));
    var m = st.meter || {};
    box.appendChild(el('p', null, '5-hour limit: ' + pctText(m.five_hour) + '. Week: ' + pctText(m.weekly) + '.'));
    box.appendChild(el('p', 'muted', source + (st.at ? ' · updated ' + ago(st.at) + ' ago' : '')));
  }
  function nowPanel(box) {
    var repo = box.getAttribute('data-repo'), etag = null, last = null, busy = false;
    function pub() {
      return fetch(box.getAttribute('data-status'), { cache: 'no-store' }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then(function (st) { renderNow(box, st, 'public copy, refreshed with each site build (every 15 minutes or so)'); }).catch(function () {});
    }
    // With a token: the COMPANY_STATUS variable, rewritten within seconds of a change. Polled every 5 s with an
    // ETag; an unchanged answer is a 304 and does not count against the token's rate limit.
    function live(force) {
      if (busy || (document.hidden && force !== true)) return; busy = true;
      var p = (!getToken() || !repo) ? pub() : gh('/repos/' + repo + '/actions/variables/COMPANY_STATUS', { etag: etag }).then(function (r) {
        if (r.status === 304 && last) return last;
        if (!r.ok) throw new Error(r.status);
        etag = r.headers.get('ETag'); return r.json().then(function (v) { last = JSON.parse(v.value); return last; });
      }).then(function (st) { renderNow(box, st, 'live copy, seconds old while a session runs'); }).catch(function () { etag = null; last = null; return pub(); });
      p.then(function () { busy = false; }, function () { busy = false; });
    }
    // The first read always runs (a tab opened in the background still gets a panel); polls skip hidden tabs.
    live(true); setInterval(live, getToken() ? 5000 : 60000);
    document.addEventListener('visibilitychange', function () { if (!document.hidden) live(); });
  }

  // ---- Chat view (read only) -------------------------------------------------------------
  function chat(root) {
    var repo = root.getAttribute('data-repo');
    // The composer is off unless the build set data-composer="on" (site.json chat_composer, default false).
    var composerOn = root.getAttribute('data-composer') === 'on';
    var status = el('p', 'muted', ''), lanes = el('div', 'lanes');
    var bar = el('div', 'chat-bar'), input = el('input'); input.type = 'password'; input.placeholder = 'Fine-grained GitHub token (Issues: read' + (composerOn ? ' and write' : '') + ', Contents: read, Variables: read)'; input.autocomplete = 'off';
    var remember = el('input'); remember.type = 'checkbox'; var rl = el('label', null, ' remember on this device'); rl.insertBefore(remember, rl.firstChild);
    var save = el('button', null, 'Save token'), forget = el('button', null, 'Forget token');
    bar.appendChild(input); bar.appendChild(rl); bar.appendChild(save); bar.appendChild(forget);
    root.appendChild(el('p', null, 'This page reads the Investors\' conversation threads from the private company repository, using your own token. The token stays in this browser and is sent only to api.github.com. ' +
      (composerOn ? 'Messages you send here are posted to the GitHub issue under your own account (the token needs Issues: read and write).'
                  : 'Sending from this page is switched off until an Investor has confirmed reading with their own token; reply on GitHub for now.')));
    root.appendChild(bar); root.appendChild(status);
    var etags = {}, cache = {}, issuesList = [], allowNames = [], issuesSig = null;
    // ---- Composer: a comment on a thread, or a new chat issue. The author is the token's account, so
    // inbox.py sees an ordinary allowlisted comment (Commandment 57). The "as:" line is cosmetic.
    var comp = el('div', 'composer'); comp.appendChild(el('h3', null, 'Send a message'));
    var nameIn = el('input'); nameIn.type = 'text'; nameIn.maxLength = 40; nameIn.placeholder = 'Display name (optional)'; nameIn.value = localStorage.getItem(NAME) || '';
    var sel = el('select'); var msgIn = el('textarea'); msgIn.rows = 4; msgIn.placeholder = 'Message. It is handled as if typed into Claude Code.';
    var topicIn = el('input'); topicIn.type = 'text'; topicIn.maxLength = 30; topicIn.placeholder = 'Topic for a new chat (letters, digits, dashes)';
    var urg = el('input'); urg.type = 'checkbox'; var ul2 = el('label', null, ' mark urgent'); ul2.insertBefore(urg, ul2.firstChild);
    var send = el('button', null, 'Send'), out = el('p', 'muted', '');
    [sel, topicIn, msgIn, nameIn, ul2, send, out].forEach(function (x) { comp.appendChild(x); comp.appendChild(document.createTextNode(' ')); });
    if (composerOn) root.appendChild(comp);
    root.appendChild(lanes);
    function setIssues(list) {
      var sig = list.filter(function (i) { return !i.pull_request && i.state === 'open'; }).slice(0, 40)
        .map(function (i) { return i.number + ':' + i.title; }).join('|');
      if (sig === issuesSig) { issuesList = list; return; }
      issuesSig = sig; issuesList = list; var keep = sel.value; sel.textContent = '';
      sel.appendChild(Object.assign(el('option', null, 'New chat (opens an issue)'), { value: 'new' }));
      list.filter(function (i) { return !i.pull_request && i.state === 'open'; }).slice(0, 40).forEach(function (i) {
        sel.appendChild(Object.assign(el('option', null, 'Reply on #' + i.number + ' ' + i.title.slice(0, 50)), { value: String(i.number) }));
      });
      if (keep) sel.value = keep; if (!sel.value) sel.value = 'new';
      topicIn.style.display = sel.value === 'new' ? '' : 'none';
    }
    sel.onchange = function () { topicIn.style.display = sel.value === 'new' ? '' : 'none'; };
    function post(path, body) {
      return fetch(API + path, { method: 'POST', headers: { 'Accept': 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'Authorization': 'Bearer ' + getToken(), 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
        .then(function (r) { if (!r.ok) throw new Error('GitHub answered ' + r.status + (r.status === 403 || r.status === 404 ? ' (does the token have Issues: read and write?)' : '')); return r.json(); });
    }
    function cleanName(n) { return (n || '').replace(/[^A-Za-z0-9 _.-]/g, '').trim().slice(0, 40); }
    // "mark urgent" mentions every allowlisted account, so GitHub notifies them the way an Urgent Request does.
    function mentions(names) { return names.length ? 'Urgent: ' + names.map(function (n) { return '@' + n; }).join(' ') : ''; }
    function stamp(text, name, cc) { return text.replace(/<!--[\s\S]*?-->/g, '').trim() + (cc ? '\n\n' + cc : '') + (name ? '\n\n<!-- as: ' + name + ' -->' : ''); }
    send.onclick = function () {
      if (!composerOn) return;
      var text = msgIn.value.trim(), name = cleanName(nameIn.value), urgent = urg.checked, target = sel.value;
      if (!getToken()) { out.textContent = 'Save your token first.'; return; }
      if (!text) { out.textContent = 'Write a message first.'; return; }
      localStorage.setItem(NAME, name); send.disabled = true; out.textContent = 'Sending...';
      var warn = '';
      // The allowlist is read on every load; if the first load has not finished, read it now.
      var who = (!urgent || allowNames.length) ? Promise.resolve(allowNames) : allow();
      var p = who.then(function (names) {
        var cc = urgent ? mentions(names) : '';
        if (target === 'new') {
          var topic = topicIn.value.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/^-+|-+$/g, '').slice(0, 30);
          var labels = ['chat']; if (topic) labels.push('topic:' + topic); if (urgent) labels.push('urgent');
          return post('/repos/' + repo + '/issues', { title: (topic ? topic + ': ' : 'Chat: ') + text.replace(/\s+/g, ' ').slice(0, 60), body: stamp(text, name, cc), labels: labels });
        }
        return post('/repos/' + repo + '/issues/' + target + '/comments', { body: stamp(text, name, cc) }).then(function (r) {
          // The comment is already posted here: a failed label must not read as "Not sent", or it gets sent twice.
          return urgent ? post('/repos/' + repo + '/issues/' + target + '/labels', { labels: ['urgent'] })
            .then(function () { return r; }, function (e) { warn = ' The urgent label was not added (' + e.message + '); the mentions were sent.'; return r; }) : r;
        });
      });
      p.then(function (r) { msgIn.value = ''; urg.checked = false; out.textContent = 'Sent (' + (r.html_url || 'ok') + '). A receipt follows within a tick; the reply appears here.' + warn; etags = {}; load(); })
        .catch(function (e) { out.textContent = 'Not sent: ' + e.message; }).then(function () { send.disabled = false; });
    };
    save.onclick = function () { setToken(input.value.trim(), remember.checked); input.value = ''; load(); };
    forget.onclick = function () { setToken('', false); etags = {}; cache = {}; allowNames = []; issuesSig = null; lanes.textContent = ''; status.textContent = 'Token removed from this browser.'; };
    function get(path) {
      return gh(path, { etag: etags[path] }).then(function (r) {
        if (r.status === 304) return cache[path];
        if (!r.ok) throw new Error('GitHub answered ' + r.status);
        etags[path] = r.headers.get('ETag'); return r.json().then(function (j) { cache[path] = j; return j; });
      });
    }
    function allow() {
      return get('/repos/' + repo + '/contents/investors/allowlist.md').then(function (f) {
        var text = atob(f.content.replace(/\n/g, ''));
        allowNames = text.split('\n').map(function (l) { return l.replace(/^[\s*\-]+/, '').replace(/^@/, '').trim().toLowerCase(); })
          .filter(function (l) { return /^[a-z0-9-]{1,39}$/.test(l); });
        return allowNames;
      });
    }
    function load() {
      if (!getToken()) { status.textContent = 'Paste your token above to read the threads. Without one this page shows nothing private.'; return; }
      status.textContent = 'Loading...';
      Promise.all([allow(), get('/repos/' + repo + '/issues?state=all&per_page=100&sort=updated'), get('/repos/' + repo + '/issues/comments?per_page=100&sort=created&direction=desc')])
        .then(function (res) { setIssues(res[1]); draw(res[0], res[1], res[2]); status.textContent = 'Updated ' + new Date().toLocaleTimeString() + ' (refreshes every 30 seconds while this tab is open).'; })
        .catch(function (e) { status.textContent = 'Could not load: ' + e.message + '. Check the token and its permissions.'; });
    }
    // Topic chats, not per-person lanes. Sender chips: a display name (an optional "<!-- as: Name -->" line the
    // composer adds; cosmetic only, the GitHub login is the identity) in a colour fixed by the login. The name is
    // always printed, so colour is never the only signal. Anyone not on the allowlist is shown as the Company.
    var PAL = ['#1b6ca8', '#b5541c', '#2e7d32', '#8e44ad', '#8a6d00', '#00838f'];
    function colour(login) { var h = 0, k; for (k = 0; k < login.length; k++) h = (h * 31 + login.charCodeAt(k)) >>> 0; return PAL[h % PAL.length]; }
    function sender(login, body, names) {
      var l = (login || '').toLowerCase(), m = /<!--\s*as:\s*([^>]{1,40}?)\s*-->/.exec(body || ''), inv = names.indexOf(l) >= 0;
      var chip = el('span', 'chip', inv ? (m ? m[1] : login) : 'Company');
      chip.style.background = inv ? colour(l) : '#5b6270'; chip.title = login || '';
      return chip;
    }
    function plain(body) { return (body || '').replace(/<!--[\s\S]*?-->/g, '').trim().slice(0, 600); }
    var ORDER = ['Urgent', 'Chat', 'Pitch', 'Report', 'Emergency'];
    function topicOf(i) {
      var ls = (i.labels || []).map(function (x) { return (x.name || x).toLowerCase(); }), k;
      for (k = 0; k < ls.length; k++) if (ls[k].indexOf('topic:') === 0) return 'Topic: ' + ls[k].slice(6);
      for (k = 0; k < ORDER.length; k++) if (ls.indexOf(ORDER[k].toLowerCase()) >= 0) return ORDER[k];
      return 'Other';
    }
    function draw(names, issues, comments) {
      var by = {}; (comments || []).forEach(function (c) { var n = (c.issue_url || '').split('/').pop(); (by[n] = by[n] || []).push(c); });
      var groups = {};
      issues.filter(function (i) { return !i.pull_request; }).forEach(function (i) {
        var g = topicOf(i); if (!groups[g]) { groups[g] = el('div', 'lane'); groups[g].appendChild(el('h3', null, g)); }
        var t = el('div', 'thread'); t.appendChild(el('b', null, '#' + i.number + ' ' + i.title + (i.state === 'closed' ? ' (closed)' : '')));
        var first = el('div', 'msg', plain(i.body)); first.insertBefore(sender(i.user && i.user.login, i.body, names), first.firstChild); t.appendChild(first);
        var shown = (by[i.number] || []).slice(0, 5).reverse();
        function addMsg(c, into) {
          var m = el('div', 'msg', plain(c.body)); m.insertBefore(el('small', null, ' ' + ago(c.created_at) + ' ago'), m.firstChild);
          m.insertBefore(sender(c.user && c.user.login, c.body, names), m.firstChild); into.appendChild(m);
        }
        shown.forEach(function (c) { addMsg(c, t); });
        // The repo-wide read holds only the 100 newest comments, so an older thread can have replies it did not
        // get. i.comments (the issue's own count) says so; "Show all" reads that one thread.
        if ((i.comments || 0) > shown.length) {
          (function (num, total, thread) {
            var more = el('button', null, 'Show all ' + total + ' replies'); more.type = 'button';
            more.onclick = function () {
              more.disabled = true; more.textContent = 'Loading...';
              get('/repos/' + repo + '/issues/' + num + '/comments?per_page=100').then(function (all) {
                Array.prototype.slice.call(thread.querySelectorAll('.msg')).slice(1).forEach(function (x) { thread.removeChild(x); });
                var box = el('div', 'full'); all.forEach(function (c) { addMsg(c, box); });
                thread.insertBefore(box, more); more.style.display = 'none';
              }).catch(function (e) { more.disabled = false; more.textContent = 'Could not load (' + e.message + '); retry'; });
            };
            thread.appendChild(more);
          })(i.number, i.comments, t);
        }
        groups[g].appendChild(t);
      });
      function rank(n) { var k = ORDER.indexOf(n); return k < 0 ? (n.indexOf('Topic: ') === 0 ? ORDER.length : ORDER.length + 1) : k; }
      lanes.textContent = ''; Object.keys(groups).sort(function (a, b) { return rank(a) - rank(b) || (a < b ? -1 : a > b ? 1 : 0); }).forEach(function (n) { lanes.appendChild(groups[n]); });
    }
    load(); setInterval(load, 30000);
  }

  var n = document.getElementById('now-panel'); if (n) nowPanel(n);
  var c = document.getElementById('chat-root'); if (c) chat(c);
})();
