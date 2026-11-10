---
layout: "default"
title: "ADR-009: Python&#x27;s https through system TLS, and dropping the bundled OpenSSL"
section: "documents"
description: "The first thing that breaks the &quot;None&quot; answer is two files. Python&#x27;s _ssl and _hashlib each link their own static copy of OpenSSL 3.5.9 (strings of the vendored .so; otool -L shows only Python and libSystem). nm finds\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/build-plan/decisions/' | relative_url }}">← Decisions</a><a href="{{ '/documents/pywidget/adr-009-python-tls-export-compliance.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Decision</span><span>Day 16 · Fri Nov 6</span><span><code>pywidget/docs/decisions/ADR-009-python-tls-export-compliance.md</code></span></div><h1>ADR-009: Python's https through system TLS, and dropping the bundled OpenSSL</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
- Status: **proposed** (T-3121, Pernille, 2026-11-06). For Idris and Ines. The export-compliance answer itself is the Investors' declaration; nothing here changes `pywidget/ios/project.yml` or either Info.plist.
- Asked by: an Investor, #41 c6695960505 ("Missing Compliance"); company answer c6696069438 promised this sizing.
- Numbering: ADR-008 is held for the builder ADR that [`pywidget/docs/research/L17-builder.md`](l17-builder.html) line 3 proposes, so this is ADR-009.
- Not legal advice. Below are Apple's published words and the facts of our build, nothing more.

## 1. Facts

The first thing that breaks the "None" answer is two files. Python's `_ssl` and `_hashlib` each link their own static copy of **OpenSSL 3.5.9** (strings of the vendored `.so`; `otool -L` shows only Python and libSystem). `nm` finds 119 AES, 53-54 ChaCha and 125 RSA symbols in **each** one. That includes `_hashlib`, whose Python API only hashes.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. Facts, scrolls sideways" style="--tw:463px" markdown="1">

| File (device arm64, `stdlib-manifest.json`) | Bytes |
|---|---|
| `_ssl.cpython-315-iphoneos.so` | 4,639,472 |
| `_hashlib.cpython-315-iphoneos.so` | 3,626,864 |
| **Together** (of `Frameworks/`, 23,404,544, ADR-003 2.6) | **8,266,336 (35.3%)** |
| `ssl.pyc` in the stdlib zip | 68,687 |
| Kept either way: built-in hash modules `_md5 _sha1 _sha2 _sha3 _blake2 _hmac` (CPython's HACL*-derived code: digests and HMAC, no cipher) | 649,392 |

</div>


Everything else is Apple's: `pywidget.net.get` uses URLSession (`Shared/NetFetch.swift`), the Keychain, and a CryptoKit digest (submission-answers.md 2b). The widget extension runs no Python (`lane.py:279` lists `ssl`, `urllib`, `http` as names it cannot import).

Apple's published rules (saved under `research/inbound/apple/developer.apple.com/`):
- *Overview of export compliance* (fetched 2026-11-06 7:29 PM): "If your app uses, accesses, contains, implements, or incorporates encryption ...". Its examples include "Standard encryption algorithms" and "Crypto functionality within Apple's operating system".
- *Export compliance documentation for encryption* (7:29 PM): "encryption limited to that within the Apple operating system" needs **no documentation**. "An industry standard algorithm, not provided within the Apple operating system" needs the **French encryption declaration**, which is "only required if you're distributing your app on the App Store in France".
- *Complying with Encryption Export Regulations* (2026-10-26): `ITSAppUsesNonExemptEncryption` is `NO` if the app "including any third-party libraries it links against" uses no encryption or only exempt forms, or `YES` otherwise. The page also says exempt forms may still need a year-end self-classification report.
- None of the three pages mentions hashing.

## 2. Path (ii): drop `_ssl`, `ssl` and `_hashlib`, with no replacement

**Work [estimate]: about 1 day.** Manifest v3 strips the three names and re-measures. `stdlib_cut.py`/`install_stdlib.sh` already read `stripped`. Add a build gate that fails if any Mach-O in the `.app` carries OpenSSL symbols (`_OPENSSL_init_crypto`, `_EVP_`). That gate keeps a native wheel from quietly bringing OpenSSL back.

**What breaks.** I checked this with host 3.13 and both modules blocked. `urlopen("https://...")` raises `URLError: unknown url type: https`, because `http.client` has no `HTTPSConnection`.
- Our own code: `pywidget.http` (`App/Runtime/pywidget/http.py` lines 41-45, 191, 278; it is built on `http.client` + `ssl`). Through it, the GitHub premade widget (`widgets/premade/github.py:64`). Also `examples/http_status.py` and `examples/earthquakes_today.py`.
- Packages (manifest.toml, pure tier): **requests** and **urllib3** import `ssl` inside `try`. They still load, but https raises urllib3's "Can't connect to HTTPS URL because the SSL module is not available." (`connectionpool.py:1058`). jedi, parso, pyflakes, idna and charset-normalizer use no TLS. jedi, parso and requests' digest auth hash with sha256 or md5, which still works.
- User scripts: every https call from Python, plus `ssl` itself (SMTP/IMAP/FTP over TLS, asyncio TLS). Requests is the C1 headline package, so this is not shippable alone.

**Compliance effect:** the same as (i), below.

## 3. Path (i): https through URLSession over the bridge, plus (ii)

ADR-003 2.4 option (iii). It is only worth doing together with (ii): while `_ssl` ships, the answer does not change.

**Design, probed.** I have `pywidget/docs/research/t3121_systls_probe.py`, host-only, with a fake bridge in place of Swift. It passes 4/4. Without the urllib3 line it fails with the ImportError above, so the probe is live. It shows:
- **http.client and urllib.request:** an `HTTPSConnection` whose socket buffers the request and hands it to the bridge. `http.client` then parses the reply bytes itself. It has to be set, along with `http.client._create_https_context`, before `urllib.request` is imported (`request.py:1377`). That means bootstrap, before user code.
- **requests:** set `HTTPSConnectionPool.ConnectionCls`. urllib3 ships the same hook for Pyodide (`urllib3/contrib/emscripten`, and `urllib3/__init__.py:208` injects it).

**Work [estimate]: 7-9 engineer-days, in two parallel halves.**
- **Idris, Swift, 2-3 days.** `net.request` beside `net.get`: any method, request body, binary response with repeated headers, Python-controlled redirects, and certificate failures mapped to a named error. NetFetch today is GET-only (line 255), returns text, <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span> the body at 1 MiB and the reply at 2 MiB (line 31). `pywidget.http` allows 10 MiB, so bodies need a file handoff in the run's folder.
- **Pernille, Python, 3-4 days.** The shim in `_pywidget_runtime`. `pywidget.http` rebased onto it, with its TLS paragraph and C2 s6 rewritten. Host tests against a fake bridge. A device test list.
- **Both, about 1 day.** Path (ii)'s strip, plus the gate.

**What still breaks after (i):**
- `import ssl` raises ImportError. Direct users lose SMTP/IMAP/POP/FTP over TLS, asyncio TLS streams, `requests(verify=False)` and client certificates. Installable pure packages that import `ssl` unguarded also fail to load (an httpx-style client; not checked against a pin). I would not ship a stub `ssl`: a fake that reports TLS but never encrypts is the one failure worse than an ImportError.
- Responses are buffered up to the cap, so `stream=True` downloads larger than the cap fail.
- URLSession https follows App Transport Security defaults (TLS 1.2+, forward secrecy). An old server that OpenSSL reaches today can be refused. How often this happens is unmeasured. Plain `http://` stays on Python sockets, which ATS does not cover.

**Gains:**
- 8,266,336 B leave `Frameworks/`, plus 68,687 B from the zip. The shim adds about 20 KB [estimate].
- Apple's trust store, user-installed roots and revocation now apply.
- ADR-003 2.4 item 2 (no `/etc/ssl/cert.pem` on device) goes away.
- certifi stays, because `requests/certs.py` imports it.

**Compliance effect of (i) or (ii):** the only crypto code we would still ship ourselves is digests and HMAC (649,392 B). There would be no cipher, no key exchange and no TLS. All confidentiality comes from Apple's OS. Those facts match the reference table's first row ("limited to that within the Apple operating system", no documents, no French declaration). Apple's pages do not say whether hash functions count, so that reading belongs to the Investors.

## 4. `_hashlib`

Hashing alone is not confidentiality encryption, but `_hashlib.so` is not hashing alone. It carries the full libcrypto: AES, ChaCha20 and RSA, against Apple's "contains". Python cannot reach those ciphers (`ctypes` is stripped under L12), but the bytes ship. So dropping `_ssl` while keeping `_hashlib` saves 4.6 MB and changes nothing about the answer.

Without `_hashlib`, `hashlib` falls back to the built-in modules. sha1/2/3, md5, blake2, shake and `hmac` work, and so does every hash our code and the eight packages use. **Lost:** `hashlib.pbkdf2_hmac`, `hashlib.scrypt`, and OpenSSL-only names such as `ripemd160`. All checked on host 3.13 and in the 3.15.1 `hashlib.py` lines 195-213 and `hmac.py` lines 7-17. The device is unmeasured.

## 5. Recommendation

1. **Do (i) and (ii) as one piece, aimed at the App Store submission build. Not before internal TestFlight, which needs no documents.** Do not ship (ii) alone. Until then the company's answer to an Investor stands ("Standard encryption algorithms ...").
2. **Ines (product):** accept losing `import ssl` for scripts (section 3) for 1.0. If that is a no, keep OpenSSL. In that case the one saving left is one shared OpenSSL framework in place of two static copies, about 3.5 MB [estimate]. That is a recipe change for me.
3. **Idris:** `net.request` and the gate. `ITSAppUsesNonExemptEncryption` goes in only after the Investors choose. If they choose `NO`, it lands in the same build that drops OpenSSL, never earlier.
4. **The Investors:** whether a build with only OS crypto plus built-in hash functions takes the first row, and whether to keep France out until then. Both are their declaration.
{% endraw %}

</div>
