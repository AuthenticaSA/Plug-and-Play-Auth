# Custom SMS

Send non‑OTP SMS messages using your **registered sender name**.

---

## Endpoint

* **POST** `/api/v2/send-sms`

> **Auth header:** `X-Authorization: YOUR_API_KEY`
> **Base URL:** `https://api.authentica.sa`
> **JSON headers:** `Accept: application/json`, `Content-Type: application/json`

---

## Node.js — minimal helper

```js
export async function sendSms(phone, message, senderName) {
  const BASE = process.env.BASE_URL || 'https://api.authentica.sa';
  const KEY  = process.env.AUTHENTICA_API_KEY || 'YOUR_API_KEY';
  const r = await fetch(`${BASE}/api/v2/send-sms`, {
    method:'POST',
    headers:{'Accept':'application/json','Content-Type':'application/json','X-Authorization':KEY},
    body: JSON.stringify({ phone, message, sender_name: senderName })
  });
  const j = await r.json(); if(!r.ok) throw new Error(JSON.stringify(j)); return j; // queued
}
```

---

## Python — minimal helper

```python
import os, json, requests

def send_sms(phone: str, message: str, sender_name: str):
    BASE = os.getenv('BASE_URL','https://api.authentica.sa')
    KEY  = os.getenv('AUTHENTICA_API_KEY','YOUR_API_KEY')
    r = requests.post(f"{BASE}/api/v2/send-sms",
        headers={'Accept':'application/json','Content-Type':'application/json','X-Authorization':KEY},
        data=json.dumps({'phone':phone,'message':message,'sender_name':sender_name}))
    j = r.json();  raise Exception(j) if not r.ok else None;  return j
```

---

## Important Notes

* **Sender name** must be **registered/approved** in the portal.
* Respect **local regulations** and opt‑out/consent requirements.
* Use **E.164** phone numbers (e.g., `+9665…`).
