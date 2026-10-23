---
layout: "default"
title: "Connect your GitHub token"
section: "home"
description: "How an Investor connects a GitHub token to send messages from the home page."
---

# Connect your GitHub token

<p class="lead">Investors send messages from the home page with a fine-grained GitHub token of their own. It takes about five minutes. The token stays in your browser and is sent only to api.github.com; the company never sees it.</p>

## Create it

1. On GitHub, signed in as **your own account** (not `itsthecompany`), open [https://github.com/settings/personal-access-tokens/new](https://github.com/settings/personal-access-tokens/new) (or avatar → Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token).
2. **Token name:** `company site chat`.
3. **Resource owner:** **Its-The-Company** (not your personal account).
4. **Expiration:** 90 days suggested; it must be 366 days or less, or the org rejects it.
5. **Repository access:** "Only select repositories" → **Its-The-Company/itsthecompany**.
6. **Repository permissions:** Issues: **Read and write**. Contents: **Read-only**. Variables: **Read-only**. Metadata: Read-only (set automatically). Everything else: No access.
7. Click **Generate token**. If it says the request is pending, an org owner approves it at [https://github.com/organizations/Its-The-Company/settings/personal-access-token-requests](https://github.com/organizations/Its-The-Company/settings/personal-access-token-requests).
8. **Copy the token** (starts with `github_pat_`). GitHub shows it only once.

## Use it

<div id="token-root" data-repo="Its-The-Company/itsthecompany" data-home="{{ '/' | relative_url }}" data-setup="{{ '/assets/setup.js' | relative_url }}"><noscript>This step needs JavaScript.</noscript></div>

Paste the token above and press Save. On a shared device, leave "remember on this device" unticked: the token is then forgotten when the tab closes.

**Never** paste the token into an issue, a comment, a chat with the company, or anywhere but that page. If it leaks, delete it at [https://github.com/settings/personal-access-tokens](https://github.com/settings/personal-access-tokens) (one click).

<p><a href="{{ '/' | relative_url }}">Back to the home page</a></p>
