/**
 * Send OTP via SMS / WhatsApp / Email (minimal script)
 * Usage:
 *   node otp_send.js sms +9665XXXXXXXX
 *   node otp_send.js whatsapp +9665XXXXXXXX
 *   node otp_send.js email user@example.com
 * Env:
 *   AUTHENTICA_API_KEY (required)
 *   BASE_URL (optional, defaults to https://api.authentica.sa)
 */

const BASE_URL = process.env.BASE_URL || 'https://api.authentica.sa';
const API_KEY  = process.env.AUTHENTICA_API_KEY || 'YOUR_API_KEY';

const [, , method = 'sms', recipient] = process.argv;
if (!recipient) {
    console.error('Usage: node otp_send.js <sms|whatsapp|email> <phone|email>');
    process.exit(1);
}

const body = method === 'email' ? { method, email: recipient } : { method, phone: recipient };

(async () => {
    try {
        const res = await fetch(`${BASE_URL}/api/v2/send-otp`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Authorization': API_KEY,
            },
            body: JSON.stringify(body),
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
            console.error('Error:', res.status, json);
            process.exit(1);
        }
        console.log('OTP sent:', { success: true });
    } catch (e) {
        console.error('Network error:', e.message);
        process.exit(1);
    }
})();
