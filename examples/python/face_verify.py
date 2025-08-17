"""
Verify by face using base64 images (minimal script)
Usage:
  python face_verify.py <BASE64_REF_IMAGE> <BASE64_QUERY_IMAGE>
Env:
  AUTHENTICA_API_KEY (required)
  BASE_URL (optional)
"""

import os, sys, json, requests

BASE_URL = os.getenv('BASE_URL', 'https://api.authentica.sa')
API_KEY  = os.getenv('AUTHENTICA_API_KEY', 'YOUR_API_KEY')

if len(sys.argv) < 3:
    print('Usage: python face_verify.py <BASE64_REF_IMAGE> <BASE64_QUERY_IMAGE>')
    sys.exit(1)

ref_b64, qry_b64 = sys.argv[1], sys.argv[2]

r = requests.post(
    f"{BASE_URL}/api/v2/verify-by-face",
    headers={'Accept':'application/json','Content-Type':'application/json','X-Authorization':API_KEY},
    data=json.dumps({'user_id':'demo','registered_face_image': ref_b64, 'query_face_image': qry_b64})
)

try:
    j = r.json()
except Exception:
    j = {}

if not r.ok:
    print('Error:', r.status_code, j)
    sys.exit(1)

print('Face result:', j)
