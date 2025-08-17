/**
 * Verify OTP (minimal script)
 * Usage:
 *   node otp_verify.js +9665XXXXXXXX 123456
 *   node otp_verify.js user@example.com 123456
 * Env:
 *   AUTHENTICA_API_KEY (required)
 *   BASE_URL (optional, defaults to https://api.authentica.sa)
 */

const BASE_URL = process.env.BASE_URL || 'https://api.authentica.sa';
const API_KEY  = process.env.AUTHENTICA_API_KEY || 'YOUR_API_KEY';

const [, , recipient, otp] = process.argv;
if (!recipient || !otp) {
    console.error('Usage: node otp_verify.js <phone|email> <otp>');
    process.exit(1);
}

const body = recipient.includes('@') ? { email: recipient, otp } : { phone: recipient, otp };

(async () => {
    try {
        const res = await fetch(`${BASE_URL}/api/v2/verify-otp`, {
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
        console.log('Verification result:', json.verified ?? json.success ?? true);
    } catch (e) {
        console.error('Network error:', e.message);
        process.exit(1);
    }
})();
