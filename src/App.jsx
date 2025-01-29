import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Layout from './components/layout/Layout';
import AppRoutes from './routes/AppRoutes';
import store from './store';
import tokenService from './services/tokenService';
import { setUser, clearUser } from './store/slices/authSlice';
import { jwtDecode } from 'jwt-decode';
import { ThemeProvider } from './context/ThemeContext';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/darkMode.css';
import './App.css';
import { faEdit, faTrash, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

const AppContent = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      const token = tokenService.getToken(); // Get the token from localStorage
      if (token) {
        if (tokenService.isValidToken()) {
          const user = jwtDecode(token); // Decode token to get user data
          dispatch(setUser(user)); // Restore Redux state with user data
        } else {
          console.warn('Token expired. Logging out.');
          tokenService.removeToken(); // Remove expired token
          dispatch(clearUser()); // Clear Redux state
        }
      }
      setIsLoading(false); // Stop the loading spinner
    };

    initAuth();
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;

  return <AppRoutes />;
};

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <Layout>
            <AppContent />
            <ToastContainer />
          </Layout>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
