/**
 * Minimal Nafath demo server (init + webhook)
 *
 * Run:
 *   npm i express
 *   node nafath_server.js
 *
 * Test locally:
 *   Expose http://localhost:3000/webhook/nafath via cloudflared/ngrok and
 *   set the public URL in the Authentica portal.
 *
 * Env:
 *   AUTHENTICA_API_KEY (required)
 *   BASE_URL (optional, defaults to https://api.authentica.sa)
 *   WEBHOOK_PASSWORD (shared secret used to verify webhook payloads)
 */

const express = require('express');

const app = express();
app.use(express.json());

const BASE_URL = process.env.BASE_URL || 'https://api.authentica.sa';
const API_KEY  = process.env.AUTHENTICA_API_KEY || 'YOUR_API_KEY';
const SECRET   = process.env.WEBHOOK_PASSWORD || 'your-secure-password';

// Initiate Nafath verification for a user
app.post('/nafath/init', async (req, res) => {
    try {
        const r = await fetch(`${BASE_URL}/api/v2/verify-by-nafath`, {
            method: 'POST',
            headers: { 'Accept': 'application/json','Content-Type': 'application/json','X-Authorization': API_KEY },
            body: JSON.stringify({ user_id: (req.body && req.body.user_id) || 'demo-user' })
        });
        const j = await r.json().catch(() => ({}));
        res.status(r.status).json(j);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// Receive webhook from Authentica after user acts in Nafath app
app.post('/webhook/nafath', (req, res) => {
    if (!req.body || req.body.Password !== SECRET) return res.sendStatus(401);
    console.log('Nafath result:', { status: req.body.Status, nationalId: req.body.NationalId });
    res.sendStatus(200);
});

app.listen(3000, () => console.log('Nafath demo server on http://localhost:3000'));
