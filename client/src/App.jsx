import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Auth/Login';
import TextEditor from './components/Editor/TextEditor';
import { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AuthCallback = () => {
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get('accessToken');
    const idToken = params.get('idToken');
    const userDataStr = params.get('userData');

    if (accessToken && idToken && userDataStr) {
      try {
        const userData = JSON.parse(decodeURIComponent(userDataStr));
        login({ 
          accessToken,
          idToken,
          ...userData 
        });
        navigate('/');
      } catch (error) {
        console.error('Failed to process authentication:', error);
        navigate('/login');
      }
    }
  }, [location, login, navigate]);

  return <div>Completing sign in...</div>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <TextEditor />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App; 