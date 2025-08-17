/**
 * Verify by face using base64 images (minimal script)
 * Usage:
 *   node face_verify.js <BASE64_REF_IMAGE> <BASE64_QUERY_IMAGE>
 * Env:
 *   AUTHENTICA_API_KEY (required)
 *   BASE_URL (optional)
 */

const BASE_URL = process.env.BASE_URL || 'https://api.authentica.sa';
const API_KEY  = process.env.AUTHENTICA_API_KEY || 'YOUR_API_KEY';

const [, , refImg, queryImg] = process.argv;
if (!refImg || !queryImg) {
    console.error('Usage: node face_verify.js <BASE64_REF_IMAGE> <BASE64_QUERY_IMAGE>');
    process.exit(1);
}

(async () => {
    try {
        const res = await fetch(`${BASE_URL}/api/v2/verify-by-face`, {
            method: 'POST',
            headers: { 'Accept': 'application/json','Content-Type': 'application/json','X-Authorization': API_KEY },
            body: JSON.stringify({ user_id: 'demo', registered_face_image: refImg, query_face_image: queryImg })
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) { console.error('Error:', res.status, json); process.exit(1); }
        console.log('Face result:', json);
    } catch (e) { console.error('Network error:', e.message); process.exit(1); }
})();
