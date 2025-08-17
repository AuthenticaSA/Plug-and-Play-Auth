"""
Check remaining balance (minimal script)
Usage:
  python balance.py
Env:
  AUTHENTICA_API_KEY (required)
  BASE_URL (optional)
"""

import os, requests

BASE_URL = os.getenv('BASE_URL', 'https://api.authentica.sa')
API_KEY  = os.getenv('AUTHENTICA_API_KEY', 'YOUR_API_KEY')

r = requests.get(
    f"{BASE_URL}/api/v2/balance",
    headers={'Accept':'application/json','X-Authorization': API_KEY}
)

try:
    j = r.json()
except Exception:
    j = {}

if not r.ok:
    print('Error:', r.status_code, j)
    raise SystemExit(1)

print('Balance:', j.get('data', {}).get('balance', j))
