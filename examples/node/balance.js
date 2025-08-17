/**
 * Check remaining balance (minimal script)
 * Usage:
 *   node balance.js
 * Env:
 *   AUTHENTICA_API_KEY (required)
 *   BASE_URL (optional)
 */

const BASE_URL = process.env.BASE_URL || 'https://api.authentica.sa';
const API_KEY  = process.env.AUTHENTICA_API_KEY || 'YOUR_API_KEY';

(async () => {
    try {
        const res = await fetch(`${BASE_URL}/api/v2/balance`, {
            headers: { 'Accept': 'application/json', 'X-Authorization': API_KEY }
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) { console.error('Error:', res.status, json); process.exit(1); }
        console.log('Balance:', json?.data?.balance ?? json.balance ?? json);
    } catch (e) { console.error('Network error:', e.message); process.exit(1); }
})();
