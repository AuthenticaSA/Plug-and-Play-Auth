# Voice Verification

Compare a **reference audio** sample with a **new audio** sample to verify the same speaker.

> Do not log raw audio/base64 in production. Keep formats consistent between reference and query.

---

## Endpoint

* **POST** `/api/v2/verify-by-voice`

> **Auth header:** `X-Authorization: YOUR_API_KEY`
> **Base URL:** `https://api.authentica.sa`
> **JSON headers:** `Accept: application/json`, `Content-Type: application/json`

---

## Node.js — minimal helper

```js
export async function voiceVerify(refBase64, queryBase64) {
  const BASE = process.env.BASE_URL || 'https://api.authentica.sa';
  const KEY  = process.env.AUTHENTICA_API_KEY || 'YOUR_API_KEY';
  const r = await fetch(`${BASE}/api/v2/verify-by-voice`, {
    method: 'POST',
    headers: { 'Accept':'application/json','Content-Type':'application/json','X-Authorization': KEY },
    body: JSON.stringify({ user_id:'demo', registered_audio: refBase64, query_audio: queryBase64 })
  });
  const j = await r.json(); if (!r.ok) throw new Error(JSON.stringify(j)); return j;
}
```

---

## Python — minimal helper

```python
import os, json, requests

def voice_verify(ref_b64: str, qry_b64: str):
    BASE = os.getenv('BASE_URL','https://api.authentica.sa')
    KEY  = os.getenv('AUTHENTICA_API_KEY','YOUR_API_KEY')
    r = requests.post(f"{BASE}/api/v2/verify-by-voice",
        headers={'Accept':'application/json','Content-Type':'application/json','X-Authorization':KEY},
        data=json.dumps({'user_id':'demo','registered_audio':ref_b64,'query_audio':qry_b64}))
    j = r.json();  raise Exception(j) if not r.ok else None;  return j
```

---

## Tips

* **Consistency**: Keep sample rate/encoding the same for reference & query.
* **Silence trimming**: Normalize input to reduce mismatch due to leading/trailing silence.
* **Privacy**: Get consent, set retention, and avoid logging base64.
