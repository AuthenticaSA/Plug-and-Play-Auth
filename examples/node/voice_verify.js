/**
 * Verify by voice using base64 audio (minimal script)
 * Usage:
 *   node voice_verify.js <BASE64_REF_AUDIO> <BASE64_QUERY_AUDIO>
 * Env:
 *   AUTHENTICA_API_KEY (required)
 *   BASE_URL (optional)
 */

const BASE_URL = process.env.BASE_URL || 'https://api.authentica.sa';
const API_KEY  = process.env.AUTHENTICA_API_KEY || 'YOUR_API_KEY';

const [, , refAud, queryAud] = process.argv;
if (!refAud || !queryAud) {
    console.error('Usage: node voice_verify.js <BASE64_REF_AUDIO> <BASE64_QUERY_AUDIO>');
    process.exit(1);
}

(async () => {
    try {
        const res = await fetch(`${BASE_URL}/api/v2/verify-by-voice`, {
            method: 'POST',
            headers: { 'Accept': 'application/json','Content-Type': 'application/json','X-Authorization': API_KEY },
            body: JSON.stringify({ user_id: 'demo', registered_audio: refAud, query_audio: queryAud })
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) { console.error('Error:', res.status, json); process.exit(1); }
        console.log('Voice result:', json);
    } catch (e) { console.error('Network error:', e.message); process.exit(1); }
})();
