import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Container,
  Paper,
  Typography,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const TextEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();

  const handleSave = async () => {
    setSaving(true);
    try {
      if (!user?.idToken || !user?.accessToken) {
        throw new Error('Authentication tokens not found. Please log in again.');
      }

      console.log('Sending save request with tokens:', {
        idToken: user.idToken.substring(0, 10) + '...',
        accessToken: user.accessToken.substring(0, 10) + '...'
      });

      const response = await fetch('http://localhost:5001/api/documents/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.idToken}`,
          'X-Access-Token': user.accessToken,
        },
        credentials: 'include',
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error response:', errorData);
        throw new Error(errorData.error || 'Failed to save document');
      }
      
      // Show success message
      alert('Document saved successfully!');
    } catch (error) {
      console.error('Error saving document:', error);
      alert(error.message || 'Failed to save document');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Content"
            multiline
            rows={12}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleSave}
            disabled={saving}
            sx={{ mt: 3, mb: 2 }}
          >
            {saving ? 'Saving...' : 'Save to Google Drive'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default TextEditor; 