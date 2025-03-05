# Google Drive Letter App

A web application that allows users to create, edit, and save letters directly to their Google Drive. Built with React, Node.js, and Google Drive API.

## Features

- 🔐 Google OAuth2.0 Authentication
- 📝 Letter Editor
- 💾 Save documents to Google Drive
- 🔄 Automatic token refresh
- 🎨 Material-UI Interface

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd google-drive-letter-app
```

### 2. Set up Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable the Google Drive API
4. Configure OAuth 2.0 credentials
   - Add authorized JavaScript origins: `http://localhost:5174`
   - Add authorized redirect URIs:
     - `http://localhost:5001/auth/google/callback`
     - `http://localhost:5174/auth/callback`

### 3. Environment Variables
Create `.env` file in the server directory:
```env
PORT=5001
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URL=http://localhost:5001/auth/google/callback
CLIENT_URL=http://localhost:5174
```

### 4. Install Dependencies

For the client:
```bash
cd client
npm install
```

For the server:
```bash
cd server
npm install
```

### 5. Run the Application

Start the server:
```bash
cd server
npm run dev
```

Start the client:
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5174
- Backend: http://localhost:5001

## Project Structure

```
google-drive-letter-app/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # React context providers
│   │   └── ...
│   └── package.json
│
└── server/                # Backend Node.js application
    ├── src/
    │   ├── config/       # Configuration files
    │   ├── controllers/  # Request handlers
    │   ├── middleware/   # Express middleware
    │   ├── routes/      # Express routes
    │   ├── services/    # Business logic
    │   └── index.js     # Entry point
    └── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details 