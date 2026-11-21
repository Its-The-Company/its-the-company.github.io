---
layout: "default"
title: "T-0802: independent re-review of T-0801 (pkg_sandbox Mach default-deny), Odalys, 2026-11-21"
section: "documents"
description: "Most of the bar is met, and well. Three things are not, and T-0299 does not lift on this review."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/pkg-sandbox-t0801-review-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 31 · Sat Nov 21</span><span><code>pywidget/docs/reviews/pkg-sandbox-t0801-review-odalys.md</code></span></div><h1>T-0802: independent re-review of T-0801 (pkg_sandbox Mach default-deny), Odalys, 2026-11-21</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Commit reviewed: c911b90f80 ("pkg_sandbox refuses every Mach name but one; signals and task ports denied").
Evidence used: only the diff of tools/pkg_sandbox.py, tests/pkg_sandbox_test.py and tests/pkg_sandbox_mutants.json, the
suite, and libsandbox's own answers (`sandbox_check` from outside, of a process that only runs /bin/sleep). Those three
files are unchanged from c911b90f80 to this branch's HEAD (8ccfe4ed54). Bar: the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> ruling at deeea6a0 (end of
pkg-sandbox-c13-review-odalys.md). No escape probe, no Mach name lookup of my own, no task_for_pid, no bundle, no .xpc.
Scratch: /Volumes/SANDISK SSD/company-scratch/T-0802-odalys (copy of tools/ and tests/, mutants.json, run_one.py,
sbcheck*.py).

## Verdict: Not held (3 items, all new; Ines rules on them once)

Most of the bar is met, and well. Three things are not, and T-0299 does not <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span> on this review.

**N1. Route A is open for the one allowed name.** libsandbox answers the XPC-service-name question (filter 12) with the
global-name rules too. Under the real profile, both verbs:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Verdict: Not held (3 items, all new; Ines rules on them once), scrolls sideways" style="--tw:421px" markdown="1">

| Question (`sandbox_check`, from outside) | Answer |
|---|---|
| mach-lookup, xpc-service-name `com.apple.system.opendirectoryd.libinfo` | **0 (allowed)** |
| mach-lookup, xpc-service-name, the made-up name | 1 |
| mach-lookup, global-name libinfo / made-up | 0 / 1 |

</div>


A package controls its own XPC service's bundle identifier, so it can give that service the allowed name. The suite's
route A test asks only about a made-up name, so it cannot see this. Whether launchd asks the profile on that path is not
known, as T-0801 says. If it does not, A is open for every name anyway. Either way, "the profile refuses route A" is
false for this name, and the code does not say so. Fix (compiled, not run in the suite): put
`(deny mach-lookup (xpc-service-name-regex #""))` after the allow line. With it, libinfo answers 1 as an XPC name and 0
as a global name. Add a test: OPEN_NAME with filter 12 answers 1.

**N2. Two Mach operations are not mach-lookup and are not denied.** Against the real profile, libsandbox answers 0 for
`mach-cross-domain-lookup` and `mach-register`. Under bare `(allow default)` it also answers 0. `(deny mach-lookup)` does
not reach them by text or by answer. I do not know whether a user process can reach anything with them: cross-domain
lookups need launchd's private entitlements, and registering a name could stand in for a service. Neither was tried.
Fix (compiled): `(deny mach-cross-domain-lookup mach-register)`. Both then answer 1. Test it with sandbox_check and the
bare control, as for the task ports. If a build needs either, that is a chair decision.

**N3. The same-sandbox signal allow is not tested.** With `(allow signal (target same-sandbox))` deleted, the suite
passes (mutant O1). The "signal to itself" control stays open because a signal to itself is never checked. So it is
hollow for this line. This fails closed: without the line the box is stricter, and a real build that signals its own
children would break. Fix: the probe forks a grandchild and sends it signal 0, which must answer open.

## The bar, point by point

1. **Default-deny shape: held.** The profile text for both verbs is `(deny mach-lookup)`, then one
   `(allow mach-lookup (global-name "com.apple.system.opendirectoryd.libinfo"))`. The entry has a comment that says what
   asked for it (getpwuid at startup, both Pythons, both verbs). It is an exact name with no regex. The empty-list guard
   is right: with an empty list and no guard, the line is `(allow mach-lookup )`, and O6 below catches it.
2. **Every route refused or written down as held: held, except N1 and N2.** NEVER_ALLOW covers all 55 sample names in
   ROUTE_SAMPLES, including every group in the chair's table. job-creation is held by text, as ruled. Route A is
   written down as "profile answers deny; launchd path not shown", and N1 is the exception to that.
3. **Tests fail if any part is removed: held, except N3.** 20 mutants, run one at a time with PKG_SANDBOX_FAIL_FAST in
   the scratch copy. 16 were killed and 4 survived.
   - All 12 T-0801 and B2 mutants in the JSON were killed: no Mach deny, allow everything, a prefix regex, a never-allow
     name allowed, the open name left out, three never-allow groups left out, no signal deny, `(allow signal)`, no
     task-port deny, mach-priv-task-port dropped.
   - Mine killed: O5 (windowserver.active added to the allow list; no probe looks it up, so only the text check can
     catch it, and it does), O6 (empty list, no guard), O7 (the deny narrowed to `^com\.apple\.`: the made-up name
     answers 1102), O8 (the allow written before the deny).
   - O1 survived: that is N3.
   - O2, O3 and O4 survived (dropping mach-task-name, -inspect or -read). They are equivalent mutants, not gaps.
     libsandbox answers 1 for all four task-port operations under `(deny mach-priv-task-port)` alone (falling back from
     there: read, then inspect, then name). The three lower names are belt and braces.
   - Never-allow text check, as text against the suite's samples: 33 of 34 patterns are each the only cover for some
     sample. The exception is `remotepairingd`: its one sample, com.apple.CoreDevice.remotepairingd, is also covered by
     `^com\.apple\.CoreDevice\.`, so deleting it fails nothing. No named route loses cover (Low, no hold).
4. **Harmless with a deny missing: held.** By reading: the probes only look names up (no message is sent). Signal 0
   delivers nothing. sandbox_check performs nothing. The bare control only sleeps. Measured (n=1): I saved launchd labels
   before and after the Mach-open mutants (B2, O6, open name dropped), and none changed. Over the other 15 mutants, 16
   mdworker jobs ended and one CoreSimulator SimDevice label was replaced by another. Nothing in the probe touches
   CoreSimulator; I take that to be another session's simulator, but I did not show it. Over the first three mutants
   the label count went 562 -> 567, but I had not saved the labels for that window.

Signals and task ports: compiled and tested as ruled, apart from N3. sandbox_check gives 1 for the child and 0 under
the bare control, for all four operations. Filter 12 really is the XPC service name: under
`(deny mach-lookup (xpc-service-name "a"))` it answers 1 for a, 0 for b, and 0 as a global name. Note for anyone who
repeats this: sandbox_check is variadic. Without the suite's three argtypes, ctypes on arm64 passes the name in the
wrong place and every answer is -1.

Suite: `tests/run.sh pkg_sandbox_test.py` PASS 358 FAIL 0 (208.5 s, inside the heavy slot); in the scratch copy 358/0
(82 s).

## For the chair: what (allow default) still leaves open, by profile text

The profile denies these, and nothing else: network-outbound to remote ip and unix-socket, file-read-data and xattr
outside the read list, file-read* of the named secret paths, file-write* outside the run dir and four device paths,
unlink of the run dir, mach-lookup except libinfo, signal outside the sandbox, the four task-port operations, exec of
four paths, job-creation, and user-preference-read and -write. I asked libsandbox about every operation name used in
this Mac's own profiles (/System/Library/Sandbox/Profiles, /usr/share/sandbox). Each one below answers 0 (open) for the
real profile. How far each reaches is from what I know of macOS, not measured. I would rule on the first two.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: For the chair: what (allow default) still leaves open, by profile text, scrolls sideways" style="--tw:640px" markdown="1">

| Open operation(s) | What it could reach (not measured) |
|---|---|
| network-inbound, network-bind | Listen on a port. Only outbound is denied, so if the firewall allows it, a peer on the LAN could connect in. That is a two-way channel. The biggest one left. |
| hid-control, iokit-open-user-client, iokit-open-service, iokit-set-properties, iokit-get-properties | Synthetic input (route G) through IOKit rather than the windowserver name; TCC Post Event / Accessibility of the responsible app is the gate I know of |
| sysctl-read, process-info-* (pidinfo, listpids, setcontrol, dirtycontrol, rusage, ledger, codesignature, pidfdinfo) | Read other processes of our user, including argv and environment through sysctl. Data only; it can leave only through the run dir the wrapper keeps (T-0800). |
| appleevent-send, lsopen, darwin-notification-post, distributed-notification-post, authorization-right-obtain, device-camera, device-microphone | Open by text, but each goes through a Mach service that the default now refuses (aeserver, lsd, notifyd, distnoted, authd, the camera services). Held by the Mach default, not by its own deny. |
| file-issue-extension, mach-issue-extension, iokit-issue-extension, generic-issue-extension | An extension unlocks nothing here, because no allow rule takes an `(extension ...)` filter |
| ipc-posix-shm-*, ipc-posix-sem-create | Named shared memory and semaphores shared with other processes of our user |
| pseudo-tty, file-ioctl | No controlling terminal (the child starts with start_new_session), and /dev/ttys* is not writable. TIOCSTI needs the controlling terminal, as far as I know. |
| process-fork, process-exec (other paths), process-exec-interpreter, dynamic-code-generation, file-map-executable | Run code, but it stays under the same profile (intended) |
| file-read-metadata, file-test-existence, file-search | stat and readlink everywhere (intended, B1) |
| mach-priv-host-port, nvram-set and -delete, system-kext-*, system-privilege, system-audit, system-fsctl, file-mount, system-socket and the rest of system-* | <span title="How many people show, in their own words, that they want this.">Need</span> root, or need nothing an ordinary user holds (from what I know) |
| socket-ioctl, socket-option-*, necp-client-open, process-codesigning*, qtn-exec, syscall-* | No known reach beyond the denied network |

</div>


libsandbox could not say (-1, under both the bare control and the profile) for mach-per-user-lookup,
mach-message-send and mach-task-special-port. They are unknown names or parent groups on this Mac.

## What happens next

T-0299 stays held. Pernille does not tick it on this review. N1 and N2 are one profile line each, with a test, and N3
is one probe. They go to Ines for the one ruling. If she accepts any of them as held instead, the T-0299 lift line has to
name it, along with job-creation and route A's launchd path.
{% endraw %}

</div>
