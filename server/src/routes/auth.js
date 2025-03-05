const router = require('express').Router();
const { google } = require('googleapis');
const googleConfig = require('../config/google-oauth');

const oauth2Client = new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
);

router.get('/google', (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: googleConfig.scopes,
        prompt: 'consent'
    });
    res.json({ url });
});

router.get('/google/callback', async (req, res) => {
    const { code } = req.query;
    console.log('Received callback with code:', code ? 'present' : 'missing');
    
    if (!code) {
        console.error('No code received in callback');
        return res.redirect(`${process.env.CLIENT_URL}/login?error=no_code`);
    }

    try {
        console.log('Attempting to get tokens...');
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        
        console.log('Getting user info...');
        const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
        const { data } = await oauth2.userinfo.get();
        
        console.log('User info retrieved:', { email: data.email });
        
        // Get ID token from tokens
        const idToken = tokens.id_token;
        const accessToken = tokens.access_token;
        
        // Redirect with both tokens and user info
        const redirectUrl = `${process.env.CLIENT_URL}/auth/callback?accessToken=${accessToken}&idToken=${idToken}&userData=${encodeURIComponent(JSON.stringify(data))}`;
        console.log('Redirecting to:', redirectUrl);
        res.redirect(redirectUrl);
    } catch (error) {
        console.error('Auth error details:', error);
        res.redirect(`${process.env.CLIENT_URL}/login?error=${encodeURIComponent(error.message)}`);
    }
});

module.exports = router;

