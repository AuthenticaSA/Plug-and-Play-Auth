# Webhooks (General)

Authentica sends **HTTP POST** callbacks to your server for asynchronous events (e.g., **Nafath** status). This page shows secure, minimal patterns—no frameworks required.

---

## Checklist

* Expose a **POST** endpoint (e.g., `/webhook/nafath`).
* **Verify** a shared secret/password included in the payload.
* Use a **public URL** (cloudflared / ngrok) during local testing.
* Add **replay protection** (timestamps/nonces) and consider **IP allowlists**.
* Log minimally; mask sensitive identifiers.

---

## Expected payload (example)

```json
{
  "TransactionId": "6419747b-b0d7-4564-8755-a7f5541d6b10",
  "NationalId": "1234567891",
  "Status": "COMPLETED",
  "Password": "your-secure-password"
}
```

> The exact shape may vary by integration. Always verify the shared secret field (e.g., `Password`).

---

## Node.js — middleware helper (Express)

```js
// requireSecret middleware: rejects requests with wrong/missing secret
export function requireSecret(envKey = 'WEBHOOK_PASSWORD') {
  const SECRET = process.env[envKey];
  return (req, res, next) => {
    if (req.body?.Password !== SECRET) return res.sendStatus(401);
    next();
  };
}

// Usage:
// app.use(express.json());
// app.post('/webhook/nafath', requireSecret(), (req, res) => { res.sendStatus(200); });
```

---

## Python — dependency helper (FastAPI)

```python
import os
from fastapi import HTTPException

def require_secret(data: dict, env_key: str = 'WEBHOOK_PASSWORD'):
    if data.get('Password') != os.getenv(env_key):
        raise HTTPException(status_code=401, detail='Invalid secret')

# Usage in route:
# data = await request.json()
# require_secret(data)
# return {'ok': True}
```

---

## Operational tips

* **Idempotency**: make handlers safe to call more than once.
* **Timeouts**: return 200 quickly; do heavy work async.
* **Monitoring**: log success/failure counts; alert on spikes.
* **Security**: rotate webhook secrets periodically.
