const { OAuth2Client } = require('google-auth-library');
const { google } = require('googleapis');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const accessToken = req.headers['x-access-token'];

    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header' });
    }

    if (!accessToken) {
      return res.status(401).json({ error: 'No access token provided' });
    }

    const idToken = authHeader.split(' ')[1];
    if (!idToken) {
      return res.status(401).json({ error: 'No ID token provided' });
    }

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    
    try {
      const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: process.env.GOOGLE_CLIENT_ID
      });

      const payload = ticket.getPayload();
      
      // Create a new OAuth2 client with the user's access token
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URL
      );
      
      // Set credentials using the access token from the frontend
      oauth2Client.setCredentials({
        access_token: accessToken
      });

      req.user = payload;
      req.oauth2Client = oauth2Client;
      next();
    } catch (verifyError) {
      console.error('Token verification failed:', verifyError);
      res.status(401).json({ error: 'Invalid token' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = authMiddleware; 