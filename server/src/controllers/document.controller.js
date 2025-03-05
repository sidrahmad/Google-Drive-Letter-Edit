const DriveService = require('../services/drive.service');

const documentController = {
  async saveDocument(req, res) {
    try {
      const { title, content } = req.body;
      
      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
      }

      if (!req.oauth2Client) {
        return res.status(500).json({ error: 'OAuth2 client not initialized' });
      }

      const driveService = new DriveService(req.oauth2Client);
      
      try {
        const result = await driveService.createDocument(title, content);
        res.json(result);
      } catch (driveError) {
        console.error('Drive service error:', driveError);
        res.status(500).json({ error: driveError.message });
      }
    } catch (error) {
      console.error('Document controller error:', error);
      res.status(500).json({ error: 'Failed to save document' });
    }
  },

  async getDocuments(req, res) {
    try {
      if (!req.oauth2Client) {
        return res.status(500).json({ error: 'OAuth2 client not initialized' });
      }

      const driveService = new DriveService(req.oauth2Client);
      
      try {
        const documents = await driveService.listDocuments();
        res.json(documents);
      } catch (driveError) {
        console.error('Drive service error:', driveError);
        res.status(500).json({ error: driveError.message });
      }
    } catch (error) {
      console.error('Document controller error:', error);
      res.status(500).json({ error: 'Failed to fetch documents' });
    }
  }
};

module.exports = documentController; 