import { jwtDecode } from 'jwt-decode';
import { setUser, setError, setLoading, clearUser } from '../slices/authSlice';
import authService from '../../services/authService';
import { toast } from 'react-toastify';


const authMiddleware = (store) => (next) => async (action) => {
    const { dispatch } = store;

    switch (action.type) {
        case 'auth/login': {
            dispatch(setLoading(true));
            try {
                const { token } = await authService.login(action.payload); // Login API call
                authService.saveToken(token); // Save token in localStorage
                const user = authService.getDecodedToken(); // Decode the token
                dispatch(setUser(user)); // Set user in Redux state
                toast.success(`Welcome back, ${user.name?.first || 'User'}!`); // Success toast
            } catch (error) {
                dispatch(setError(error.message)); // Set error in Redux state
                toast.error(error.message || 'Invalid credentials. Please try again.');
            } finally {
                dispatch(setLoading(false));
            }
            break;
        }


        case 'auth/register': {
            dispatch(setLoading(true));
            try {
                const { token, user } = await authService.register(action.payload); // Register API call
                authService.saveToken(token); // Save token in localStorage
                dispatch(setUser(user)); // Update Redux state with user info
                toast.success(`Registration successful! Welcome, ${user.name || 'User'}!`); // Registration success toast
            } catch (error) {
                console.error('Registration API error:', error.message); // Log API errors
                dispatch(setError(error.message || 'Registration failed. Please try again.'));
                toast.error(error.message || 'Failed to register. Please check your details.');
            } finally {
                dispatch(setLoading(false));
            }
            break;
        }

        case 'auth/logout': {
            const state = store.getState();
            if (state.auth.isAuthenticated) { // Only show toast if the user was logged in
                authService.removeToken(); // Remove token
                dispatch(clearUser()); // Clear Redux state
                dispatch(setError(null)); // Clear error on logout
                toast.info('You have been logged out.'); // Logout toast
            }
        }
        default:
            break;
    }
    return next(action);
};

export default authMiddleware;
