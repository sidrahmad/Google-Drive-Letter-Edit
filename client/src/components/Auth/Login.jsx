import { Button, Container, Typography, Box } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const handleGoogleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5001/auth/google', {
        credentials: 'include'
      });
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Failed to initialize Google login:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom>
          Welcome to Letter App
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoogleLogin}
          sx={{ mt: 3, mb: 2 }}
        >
          Sign in with Google
        </Button>
      </Box>
    </Container>
  );
};

export default Login; 