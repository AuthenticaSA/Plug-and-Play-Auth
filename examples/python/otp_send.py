"""
Send OTP via SMS / WhatsApp / Email (minimal script)
Usage:
  python otp_send.py sms +9665XXXXXXXX
  python otp_send.py whatsapp +9665XXXXXXXX
  python otp_send.py email user@example.com
Env:
  AUTHENTICA_API_KEY (required)
  BASE_URL (optional, defaults to https://api.authentica.sa)
"""

import os, sys, json, requests

BASE_URL = os.getenv('BASE_URL', 'https://api.authentica.sa')
API_KEY  = os.getenv('AUTHENTICA_API_KEY', 'YOUR_API_KEY')

if len(sys.argv) < 3:
    print('Usage: python otp_send.py <sms|whatsapp|email> <phone|email>')
    sys.exit(1)

method, recipient = sys.argv[1], sys.argv[2]

body = {'method': method}
if method == 'email':
    body['email'] = recipient
else:
    body['phone'] = recipient

r = requests.post(
    f"{BASE_URL}/api/v2/send-otp",
    headers={'Accept':'application/json','Content-Type':'application/json','X-Authorization':API_KEY},
    data=json.dumps(body)
)

try:
    j = r.json()
except Exception:
    j = {}

if not r.ok:
    print('Error:', r.status_code, j)
    sys.exit(1)

print('OTP sent:', {'success': True})
