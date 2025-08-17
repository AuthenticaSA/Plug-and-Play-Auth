/**
 * Send a custom SMS using a registered sender name (minimal script)
 * Usage:
 *   node custom_sms.js +9665XXXXXXXX "Hello from Authentica" YOUR_SENDER_NAME
 * Env:
 *   AUTHENTICA_API_KEY (required)
 *   BASE_URL (optional)
 */

const BASE_URL = process.env.BASE_URL || 'https://api.authentica.sa';
const API_KEY  = process.env.AUTHENTICA_API_KEY || 'YOUR_API_KEY';

const [, , phone, message, sender] = process.argv;
if (!phone || !message || !sender) {
    console.error('Usage: node custom_sms.js <phone> <message> <sender_name>');
    process.exit(1);
}

(async () => {
    try {
        const res = await fetch(`${BASE_URL}/api/v2/send-sms`, {
            method: 'POST',
            headers: { 'Accept': 'application/json','Content-Type': 'application/json','X-Authorization': API_KEY },
            body: JSON.stringify({ phone, message, sender_name: sender })
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) { console.error('Error:', res.status, json); process.exit(1); }
        console.log('SMS queued');
    } catch (e) { console.error('Network error:', e.message); process.exit(1); }
})();
