import axios from 'axios';
import tokenService from './tokenService';
import store from '../store';

const axiosInstance = axios.create({
    baseURL: 'https://monkfish-app-z9uza.ondigitalocean.app/bcard2',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = tokenService.getToken();
        const state = store.getState();
        const user = state?.auth?.user;
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor to handle 401 Unauthorized
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            store.dispatch({ type: 'auth/logout' }); // Dispatch logout dynamically
        }
        return Promise.reject(error);
    }
);

// Periodically check token validity
setInterval(() => {
    if (!tokenService.isValidToken()) {
        store.dispatch({ type: 'auth/logout' }); // Dispatch logout dynamically
    }
}, 60000);

export default axiosInstance;
