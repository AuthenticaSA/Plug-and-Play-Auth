"""
Verify OTP (minimal script)
Usage:
  python otp_verify.py +9665XXXXXXXX 123456
  python otp_verify.py user@example.com 123456
Env:
  AUTHENTICA_API_KEY (required)
  BASE_URL (optional)
"""

import os, sys, json, requests

BASE_URL = os.getenv('BASE_URL', 'https://api.authentica.sa')
API_KEY  = os.getenv('AUTHENTICA_API_KEY', 'YOUR_API_KEY')

if len(sys.argv) < 3:
    print('Usage: python otp_verify.py <phone|email> <otp>')
    sys.exit(1)

recipient, otp = sys.argv[1], sys.argv[2]

body = {'otp': otp}
body['email' if '@' in recipient else 'phone'] = recipient

r = requests.post(
    f"{BASE_URL}/api/v2/verify-otp",
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

print('Verification result:', j.get('verified', j.get('success', True)))
