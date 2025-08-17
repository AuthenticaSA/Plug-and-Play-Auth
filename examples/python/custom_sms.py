"""
Send a custom SMS using a registered sender name (minimal script)
Usage:
  python custom_sms.py +9665XXXXXXXX "Hello from Authentica" YOUR_SENDER_NAME
Env:
  AUTHENTICA_API_KEY (required)
  BASE_URL (optional)
"""

import os, sys, json, requests

BASE_URL = os.getenv('BASE_URL', 'https://api.authentica.sa')
API_KEY  = os.getenv('AUTHENTICA_API_KEY', 'YOUR_API_KEY')

if len(sys.argv) < 4:
    print('Usage: python custom_sms.py <phone> <message> <sender_name>')
    sys.exit(1)

phone, message, sender = sys.argv[1], sys.argv[2], sys.argv[3]

r = requests.post(
    f"{BASE_URL}/api/v2/send-sms",
    headers={'Accept':'application/json','Content-Type':'application/json','X-Authorization':API_KEY},
    data=json.dumps({'phone': phone, 'message': message, 'sender_name': sender})
)

try:
    j = r.json()
except Exception:
    j = {}

if not r.ok:
    print('Error:', r.status_code, j)
    sys.exit(1)

print('SMS queued')
