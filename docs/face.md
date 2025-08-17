# Face Verification

Compare a **reference image** with a **new image** to confirm it’s the same person.

> Avoid logging raw images/base64 in production. Store reference media encrypted and with user consent.

---

## Endpoint

* **POST** `/api/v2/verify-by-face`

> **Auth header:** `X-Authorization: YOUR_API_KEY`
> **Base URL:** `https://api.authentica.sa`
> **JSON headers:** `Accept: application/json`, `Content-Type: application/json`

---

## Node.js — minimal helper

```js
export async function faceVerify(refBase64, queryBase64) {
  const BASE = process.env.BASE_URL || 'https://api.authentica.sa';
  const KEY  = process.env.AUTHENTICA_API_KEY || 'YOUR_API_KEY';
  const r = await fetch(`${BASE}/api/v2/verify-by-face`, {
    method: 'POST',
    headers: { 'Accept':'application/json','Content-Type':'application/json','X-Authorization':KEY },
    body: JSON.stringify({ user_id:'demo', registered_face_image: refBase64, query_face_image: queryBase64 })
  });
  const j = await r.json(); if (!r.ok) throw new Error(JSON.stringify(j)); return j;
}
```

---

## Python — minimal helper

```python
import os, json, requests

def face_verify(ref_b64: str, qry_b64: str):
    BASE = os.getenv('BASE_URL','https://api.authentica.sa')
    KEY  = os.getenv('AUTHENTICA_API_KEY','YOUR_API_KEY')
    r = requests.post(f"{BASE}/api/v2/verify-by-face",
        headers={'Accept':'application/json','Content-Type':'application/json','X-Authorization':KEY},
        data=json.dumps({'user_id':'demo','registered_face_image':ref_b64,'query_face_image':qry_b64}))
    j = r.json();  raise Exception(j) if not r.ok else None;  return j
```

---

## Tips

* **Quality**: Good lighting, centered face, minimal occlusion.
* **Reference storage**: You may store a reference image once, then omit `registered_face_image` on future calls.
* **Privacy**: Obtain explicit user consent; set data retention periods.
