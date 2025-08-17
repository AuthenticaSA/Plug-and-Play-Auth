"""
Minimal Nafath demo server (init + webhook)

Run:
  pip install fastapi uvicorn requests
  uvicorn nafath_server:app --port 3000

Local testing:
  Expose http://localhost:3000/webhook/nafath via cloudflared/ngrok and set the public URL in the portal.

Env:
  AUTHENTICA_API_KEY (required)
  BASE_URL (optional, defaults to https://api.authentica.sa)
  WEBHOOK_PASSWORD (shared secret used to verify webhook payloads)
"""

import os, json, requests
from fastapi import FastAPI, Request, HTTPException

app = FastAPI()
BASE_URL = os.getenv('BASE_URL','https://api.authentica.sa')
API_KEY  = os.getenv('AUTHENTICA_API_KEY','YOUR_API_KEY')
SECRET   = os.getenv('WEBHOOK_PASSWORD','your-secure-password')

@app.post('/nafath/init')
def nafath_init(payload: dict):
    r = requests.post(
        f"{BASE_URL}/api/v2/verify-by-nafath",
        headers={'Accept':'application/json','Content-Type':'application/json','X-Authorization':API_KEY},
        data=json.dumps({'user_id': payload.get('user_id','demo-user')})
    )
    return {'status': r.status_code, 'json': r.json()}

@app.post('/webhook/nafath')
async def nafath_webhook(req: Request):
    data = await req.json()
    if data.get('Password') != SECRET:
        raise HTTPException(status_code=401, detail='Invalid secret')
    print('Nafath result:', {'status': data.get('Status'), 'nationalId': data.get('NationalId')})
    return {'ok': True}
