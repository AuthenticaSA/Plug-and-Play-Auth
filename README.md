<a id="top"></a>

# Authentica API — OTP, Face & Voice Biometrics, SMS (Node.js & Python Examples)

*Saudi Arabia identity verification APIs — OTP via SMS/WhatsApp/Email, Face & Voice biometrics, and transactional SMS. Built for developers: REST/JSON, minimal examples, and fast integration.*

A single page you can **read on GitHub** and immediately understand how to integrate **Authentica**:

> **Free to start**
> - **Email OTP is free** — send & verify by **email** at no cost.
> - **100 free credits** on signup for **SMS**, **WhatsApp**, **Face**, and **Voice**.
> - 👉 **[Create your account »](https://portal.authentica.sa/signUp)**

A single page you can **read on GitHub** and immediately understand how to integrate **Authentica**:


* **OTP** via **SMS / WhatsApp / Email**
* **Biometrics**: **Face** & **Voice** verification
* **Custom SMS** and **Balance** checks

> This README includes **minimal, commented Node.js & Python snippets**. Full, runnable scripts live in `/examples/` (also readable inline on GitHub). Cloning is **optional**.

---

## About Authentica

**Authentica** is a Saudi identity & communications platform that provides simple JSON APIs for **secure user verification** and **trusted messaging**. Teams use it to verify users, fight fraud, and streamline onboarding—especially for products serving users in the Kingdom of Saudi Arabia.

**What Authentica offers**

* **Multi-channel OTP**: Send and verify one-time codes via **SMS**, **WhatsApp**, or **Email**.
* **Biometrics**: **Face** and **Voice** matching to step-up trust when needed.
* **Outbound messaging**: **Custom SMS** using approved sender IDs.
* **Webhooks**: Asynchronous callbacks for status updates.
* **Developer-friendly**: Clean REST endpoints, JSON payloads, and clear error semantics.

**Common use cases**

* Sign-up / login (passwordless or 2FA)
* Risk-based step-up for sensitive actions
* Account recovery and user re-verification
* Transactional notifications and alerts (SMS)

**What this repo provides**

* A **docs-first README** you can read on GitHub to learn flows end-to-end.
* Short **deep-dive pages** in `/docs/` for OTP, Face, Voice, SMS, and Webhooks.
* Tiny, **runnable examples** in `/examples/` for **Node.js** and **Python**—kept minimal so you can copy/paste quickly.

[↑ Back to top](#top)

---

## How to use this page

1. Skim **Before you start** (headers, formats, optional env names).
2. Pick a flow (OTP, Face, Voice, SMS, Balance).
3. Copy a **Node** or **Python** snippet as your starting point.
4. If you want a runnable script, click the file under **Examples Index**.

### ⚡ Quick Navigation

* [About Authentica](#about-authentica)
* [Before you start](#before-you-start)
* [OTP — Send & Verify](#otp-send--verify)
* [Face Verification](#face-verification)
* [Voice Verification](#voice-verification)
* [Custom SMS](#custom-sms)
* [Balance](#balance)
* [Webhooks (general)](#webhooks-general)
* [Examples Index](#examples-index-click-to-read-code-inline-on-github)
* [Docs quick links](#docs-quick-links)
* [Troubleshooting](#troubleshooting)
* [Security & Best Practices](#security--best-practices)
* [Useful Links & Contact](#useful-links--contact)

---

## Repository map (what exists in this repo)

```
authentica-documentation/
├─ README.md                     # You are here
├─ docs/                         # Short, focused deep dives (optional reading)
│  ├─ otp.md
│  ├─ face.md
│  ├─ voice.md
│  ├─ custom-sms.md
│  └─ webhooks.md
├─ examples/
│  ├─ node/
│  │  ├─ otp_send.js            # tiny, commented scripts
│  │  ├─ otp_verify.js
│  │  ├─ face_verify.js
│  │  ├─ voice_verify.js
│  │  ├─ custom_sms.js
│  │  └─ balance.js
│  └─ python/
│     ├─ otp_send.py
│     ├─ otp_verify.py
│     ├─ face_verify.py
│     ├─ voice_verify.py
│     ├─ custom_sms.py
│     └─ balance.py

```

### Docs quick links

* [OTP](docs/otp.md)
* [Face Verification](docs/face.md)
* [Voice Verification](docs/voice.md)
* [Custom SMS](docs/custom-sms.md)
* [Webhooks](docs/webhooks.md)

### Examples Index (click to read code inline on GitHub)

| Feature      | Node.js file                                                    | Python file                                                         |
| ------------ | --------------------------------------------------------------- | ------------------------------------------------------------------- |
| OTP — Send   | [examples/node/otp\_send.js](examples/node/otp_send.js)         | [examples/python/otp\_send.py](examples/python/otp_send.py)         |
| OTP — Verify | [examples/node/otp\_verify.js](examples/node/otp_verify.js)     | [examples/python/otp\_verify.py](examples/python/otp_verify.py)     |
| Face verify  | [examples/node/face\_verify.js](examples/node/face_verify.js)   | [examples/python/face\_verify.py](examples/python/face_verify.py)   |
| Voice verify | [examples/node/voice\_verify.js](examples/node/voice_verify.js) | [examples/python/voice\_verify.py](examples/python/voice_verify.py) |
| Custom SMS   | [examples/node/custom\_sms.js](examples/node/custom_sms.js)     | [examples/python/custom\_sms.py](examples/python/custom_sms.py)     |
| Balance      | [examples/node/balance.js](examples/node/balance.js)            | [examples/python/balance.py](examples/python/balance.py)            |

> Every example is intentionally short and commented. Use them as runnable references; no boilerplate frameworks beyond `express` (Node) and `fastapi/requests` (Python) where needed.

---

## Before you start

**Base URL**

```
https://api.authentica.sa
```

**Auth header**

```
X-Authorization: YOUR_API_KEY
```

**JSON headers**

```
Accept: application/json
Content-Type: application/json
```

**Runtime requirements**

* Node.js **18+** (global `fetch`) or add a `fetch` polyfill for older versions
* Python **3.9+**

**Formats & notes**

* Phone numbers: **E.164** (e.g., `+9665XXXXXXXX`).
* Face/Voice media: **base64** strings (avoid logging in production).
* Timeouts/retries: treat all calls as network I/O; add retries with jitter in your app if needed.

**Optional environment variables** (used by examples; not required to understand the README)

```
AUTHENTICA_API_KEY=your_api_key
BASE_URL=https://api.authentica.sa
```

[↑ Back to top](#top)

---

## OTP: Send & Verify

**Use for**: Login, 2FA, passwordless, recovery.

#### Flow (Mermaid renders on GitHub)

```mermaid
sequenceDiagram
  autonumber
  participant App as Your App
  participant Auth as Authentica
  App->>Auth: POST /api/v2/send-otp (sms/whatsapp/email)
  Auth-->>App: 200 (queued/sent)
  Note over App: User receives OTP
  App->>Auth: POST /api/v2/verify-otp (phone/email + otp)
  Auth-->>App: 200 (verified: true/false)
```

### Node — Send OTP (choose channel)

```js
// sendOtp('sms', '+9665XXXXXXXX')  or  sendOtp('email', 'user@example.com')
async function sendOtp(method, recipient) {
  const BASE_URL = process.env.BASE_URL || 'https://api.authentica.sa';
  const API_KEY  = process.env.AUTHENTICA_API_KEY || 'YOUR_API_KEY';
  const body = method === 'email' ? { method, email: recipient } : { method, phone: recipient };
  const res = await fetch(`${BASE_URL}/api/v2/send-otp`, {
    method: 'POST',
    headers: { 'Accept':'application/json','Content-Type':'application/json','X-Authorization': API_KEY },
    body: JSON.stringify(body)
  });
  const json = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(json));
  return json; // { success: true, ... }
}
```

### Python — Send OTP

```python
# send_otp('sms', '+9665XXXXXXXX')  or  send_otp('email', 'user@example.com')
import os, json, requests

def send_otp(method: str, recipient: str):
    BASE_URL = os.getenv('BASE_URL','https://api.authentica.sa')
    API_KEY  = os.getenv('AUTHENTICA_API_KEY','YOUR_API_KEY')
    body = {'method': method, ('email' if method=='email' else 'phone'): recipient}
    r = requests.post(f"{BASE_URL}/api/v2/send-otp",
        headers={'Accept':'application/json','Content-Type':'application/json','X-Authorization':API_KEY},
        data=json.dumps(body))
    j = r.json()
    if not r.ok: raise Exception(j)
    return j
```

### Node — Verify OTP

```js
// verifyOtp('+9665XXXXXXXX', '123456')  or  verifyOtp('user@example.com','123456')
async function verifyOtp(recipient, otp) {
  const BASE_URL = process.env.BASE_URL || 'https://api.authentica.sa';
  const API_KEY  = process.env.AUTHENTICA_API_KEY || 'YOUR_API_KEY';
  const body = recipient.includes('@') ? { email: recipient, otp } : { phone: recipient, otp };
  const res = await fetch(`${BASE_URL}/api/v2/verify-otp`, {
    method: 'POST',
    headers: { 'Accept':'application/json','Content-Type':'application/json','X-Authorization': API_KEY },
    body: JSON.stringify(body)
  });
  const json = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(json));
  return json; // { verified: true }
}
```

### Python — Verify OTP

```python
# verify_otp('+9665XXXXXXXX', '123456')  or  verify_otp('user@example.com','123456')
import os, json, requests

def verify_otp(recipient: str, otp: str):
    BASE_URL = os.getenv('BASE_URL','https://api.authentica.sa')
    API_KEY  = os.getenv('AUTHENTICA_API_KEY','YOUR_API_KEY')
    body = {'otp': otp}
    body['email' if '@' in recipient else 'phone'] = recipient
    r = requests.post(f"{BASE_URL}/api/v2/verify-otp",
        headers={'Accept':'application/json','Content-Type':'application/json','X-Authorization':API_KEY},
        data=json.dumps(body))
    j = r.json()
    if not r.ok: raise Exception(j)
    return j
```

**Tips**

* For SMS/WhatsApp use `phone`; for Email use `email`.
* If delivery is inconsistent, try another channel (WhatsApp ↔ SMS).
* Check E.164 formatting.

[↑ Back to top](#top)

---

## Face Verification

**Use for**: Step-up checks (account recovery, high-risk actions).

#### Flow (Mermaid renders on GitHub)

```mermaid
sequenceDiagram
  autonumber
  participant App as Your App
  participant Auth as Authentica
  App->>Auth: POST /api/v2/verify-by-face
  Auth-->>App: 200 { match, score }
```

### Node — Verify by face (base64 images)

```js
async function verifyByFace(refBase64, queryBase64) {
  const BASE_URL = process.env.BASE_URL || 'https://api.authentica.sa';
  const API_KEY  = process.env.AUTHENTICA_API_KEY || 'YOUR_API_KEY';
  const res = await fetch(`${BASE_URL}/api/v2/verify-by-face`, {
    method: 'POST',
    headers: { 'Accept':'application/json','Content-Type':'application/json','X-Authorization': API_KEY },
    body: JSON.stringify({ user_id: 'demo', registered_face_image: refBase64, query_face_image: queryBase64 })
  });
  const json = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(json));
  return json; // expect match info/score
}
```

### Python — Verify by face

```python
import os, json, requests

def verify_by_face(ref_b64: str, query_b64: str):
    BASE_URL = os.getenv('BASE_URL','https://api.authentica.sa')
    API_KEY  = os.getenv('AUTHENTICA_API_KEY','YOUR_API_KEY')
    r = requests.post(f"{BASE_URL}/api/v2/verify-by-face",
        headers={'Accept':'application/json','Content-Type':'application/json','X-Authorization':API_KEY},
        data=json.dumps({'user_id':'demo','registered_face_image':ref_b64,'query_face_image':query_b64}))
    j = r.json()
    if not r.ok: raise Exception(j)
    return j
```

**Tips**

* Clear, well-lit images; avoid heavy compression.
* You can store a reference image once, then omit `registered_face_image` later.

[↑ Back to top](#top)

---

## Voice Verification

**Use for**: High-assurance checks, hands-free flows.

#### Flow (Mermaid renders on GitHub)

```mermaid
sequenceDiagram
  autonumber
  participant App as Your App
  participant Auth as Authentica
  App->>Auth: POST /api/v2/verify-by-voice
  Auth-->>App: 200 { match, score }
```

### Node — Verify by voice (base64 audio)

```js
async function verifyByVoice(refBase64, queryBase64) {
  const BASE_URL = process.env.BASE_URL || 'https://api.authentica.sa';
  const API_KEY  = process.env.AUTHENTICA_API_KEY || 'YOUR_API_KEY';
  const res = await fetch(`${BASE_URL}/api/v2/verify-by-voice`, {
    method: 'POST',
    headers: { 'Accept':'application/json','Content-Type':'application/json','X-Authorization': API_KEY },
    body: JSON.stringify({ user_id: 'demo', registered_audio: refBase64, query_audio: queryBase64 })
  });
  const json = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(json));
  return json; // expect match info/score
}
```

### Python — Verify by voice

```python
import os, json, requests

def verify_by_voice(ref_b64: str, query_b64: str):
    BASE_URL = os.getenv('BASE_URL','https://api.authentica.sa')
    API_KEY  = os.getenv('AUTHENTICA_API_KEY','YOUR_API_KEY')
    r = requests.post(f"{BASE_URL}/api/v2/verify-by-voice",
        headers={'Accept':'application/json','Content-Type':'application/json','X-Authorization':API_KEY},
        data=json.dumps({'user_id':'demo','registered_audio':ref_b64,'query_audio':query_b64}))
    j = r.json()
    if not r.ok: raise Exception(j)
    return j
```

**Tips**

* Use similar sampling/quality for reference & query audio.
* Do not log base64 audio.

[↑ Back to top](#top)

---

## Custom SMS

**Use for**: Non-OTP notifications with a **registered sender name**.

#### Flow (Mermaid renders on GitHub)

```mermaid
sequenceDiagram
  autonumber
  participant App as Your App
  participant Auth as Authentica
  App->>Auth: POST /api/v2/send-sms
  Auth-->>App: 200 (queued)
  Note over App,Auth: Carrier delivers SMS to user
```

### Node — Send custom SMS

```js
async function sendCustomSms(phone, message, senderName) {
  const BASE_URL = process.env.BASE_URL || 'https://api.authentica.sa';
  const API_KEY  = process.env.AUTHENTICA_API_KEY || 'YOUR_API_KEY';
  const res = await fetch(`${BASE_URL}/api/v2/send-sms`, {
    method: 'POST',
    headers: { 'Accept':'application/json','Content-Type':'application/json','X-Authorization': API_KEY },
    body: JSON.stringify({ phone, message, sender_name: senderName })
  });
  const json = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(json));
  return json; // queued
}
```

### Python — Send custom SMS

```python
import os, json, requests

def send_custom_sms(phone: str, message: str, sender_name: str):
    BASE_URL = os.getenv('BASE_URL','https://api.authentica.sa')
    API_KEY  = os.getenv('AUTHENTICA_API_KEY','YOUR_API_KEY')
    r = requests.post(f"{BASE_URL}/api/v2/send-sms",
        headers={'Accept':'application/json','Content-Type':'application/json','X-Authorization':API_KEY},
        data=json.dumps({'phone':phone,'message':message,'sender_name':sender_name}))
    j = r.json()
    if not r.ok: raise Exception(j)
    return j
```

**Tip**: Ensure your sender name is **registered/approved** in Authentica.

[↑ Back to top](#top)

---

## Balance

#### Flow (Mermaid renders on GitHub)

```mermaid
sequenceDiagram
  autonumber
  participant App as Your App
  participant Auth as Authentica
  App->>Auth: GET /api/v2/balance
  Auth-->>App: 200 { balance }
```

### Node — Check balance

```js
async function checkBalance() {
    const BASE_URL = process.env.BASE_URL || 'https://api.authentica.sa';
    const API_KEY  = process.env.AUTHENTICA_API_KEY || 'YOUR_API_KEY';
    const res = await fetch(`${BASE_URL}/api/v2/balance`, {
        headers: { 'Accept': 'application/json','X-Authorization': API_KEY }
    });
    const json = await res.json();
    if (!res.ok) throw new Error(JSON.stringify(json));
    return json; // e.g., { data: { balance: 21934 } }
}
```

### Python — Check balance

```python
import os, requests

def check_balance():
    BASE_URL = os.getenv('BASE_URL','https://api.authentica.sa')
    API_KEY  = os.getenv('AUTHENTICA_API_KEY','YOUR_API_KEY')
    r = requests.get(f"{BASE_URL}/api/v2/balance",
        headers={'Accept':'application/json','X-Authorization':API_KEY})
    j = r.json()
    if not r.ok: raise Exception(j)
    return j
```

[↑ Back to top](#top)

---

## Webhooks (general)

* Expose a **POST** endpoint (e.g., `/webhook/events`).
* **Verify** a shared secret/password from the payload; reject if missing/invalid.
* For local testing, use **cloudflared** or **ngrok** to create a public URL.
* Consider **replay protection** (timestamps/nonces) and **IP allowlists**.

[↑ Back to top](#top)

---

## Security & Best Practices

* Never log **PII** (full phone/email) or **base64 media**.
* Store reference **face/voice** media **encrypted at rest**; obtain explicit user consent.
* Validate **webhooks** and handle failures idempotently.
* Enforce **E.164** phone formatting.
* Map common error codes (400 invalid params, 401 bad key, 429 rate limits) to actionable messages.

[↑ Back to top](#top)

---

## Troubleshooting

* **401 Unauthorized** → Check `X-Authorization` and account status in the portal.
* **OTP not delivered** → Confirm E.164, correct channel, registered sender (SMS), and carrier coverage.
* **Face/Voice mismatch** → Improve sample quality; ensure correct base64 and consistent formats.
* **No webhook** → Verify public URL, firewall, and secret/password validation.

[↑ Back to top](#top)

---

## Useful Links & Contact

* Website: [https://authentica.sa](https://authentica.sa)
* API Docs: [https://authenticasa.docs.apiary.io/#reference](https://authenticasa.docs.apiary.io/#reference)
* Portal/Dashboard: [https://portal.authentica.sa/](https://portal.authentica.sa/)
* Support / Sales: [**support@authentica.sa**](mailto:support@authentica.sa)

[↑ Back to top](#top)

---


<!-- SEO: Authentica, Saudi Arabia, KSA, OTP, SMS, WhatsApp, Email, Face Recognition, Voice Biometrics, identity verification, REST API, JSON, Node.js, Python, examples -->
