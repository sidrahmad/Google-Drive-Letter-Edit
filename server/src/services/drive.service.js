const { google } = require('googleapis');
const googleConfig = require('../config/google-oauth');

class DriveService {
  constructor(auth) {
    this.drive = google.drive({ version: 'v3', auth });
  }

  async createDocument(title, content) {
    try {
      const fileMetadata = {
        name: title,
        mimeType: 'application/vnd.google-apps.document'
      };

      const media = {
        mimeType: 'text/plain',
        body: content
      };

      const response = await this.drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
      });

      return response.data;
    } catch (error) {
      throw new Error('Failed to create document: ' + error.message);
    }
  }

  async listDocuments() {
    try {
      const response = await this.drive.files.list({
        q: "mimeType='application/vnd.google-apps.document'",
        fields: 'files(id, name, modifiedTime)',
        spaces: 'drive'
      });

      return response.data.files;
    } catch (error) {
      throw new Error('Failed to list documents: ' + error.message);
    }
  }
}

module.exports = DriveService; 