// src/services/tokenService.js
import { jwtDecode } from 'jwt-decode';

const TOKEN_CHECK_INTERVAL = 60000;
let tokenCheckInterval = null;

const tokenService = {
    setToken: (token) => {
        try {
            localStorage.setItem('token', token);
            console.log('Token stored successfully');
            tokenService.startTokenCheck();
        } catch (error) {
            console.error('Error storing token:', error);
            throw new Error('Failed to store token');
        }
    },

    getToken: () => {
        try {
            return localStorage.getItem('token');
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    },

    removeToken: () => {
        try {
            localStorage.removeItem('token');
            console.log('Token removed successfully');
            tokenService.stopTokenCheck();
        } catch (error) {
            console.error('Error removing token:', error);
        }
    },

    getDecodedToken: () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return null;
            return jwtDecode(token); // Decode token payload
        } catch (error) {
            console.error('Error decoding token:', error);
            tokenService.removeToken(); // Remove invalid token
            return null;
        }
    },

    isValidToken: () => {
        const token = localStorage.getItem('token');
        if (!token) return false;

        try {
            const payload = jwtDecode(token); // Decode token to check expiration
            return payload.exp * 1000 > Date.now(); // Token is valid if not expired
        } catch (error) {
            console.error('Invalid token:', error);
            return false;
        }
    },

    startTokenCheck: () => {
        if (!tokenCheckInterval && tokenService.isValidToken()) {
            tokenCheckInterval = setInterval(() => {
                if (!tokenService.isValidToken() && tokenService.onTokenExpired) {
                    tokenService.onTokenExpired();
                }
            }, TOKEN_CHECK_INTERVAL);
        }
    },

    stopTokenCheck: () => {
        if (tokenCheckInterval) {
            clearInterval(tokenCheckInterval);
            tokenCheckInterval = null;
        }
    },

    tokenExpirationCallback: (callback) => {
        tokenService.onTokenExpired = callback;
    },

    isValidToken: () => {
        const token = localStorage.getItem('token');
        if (!token) return false;

        try {
            const payload = JSON.parse(atob(token.split('.')[1])); // Decode token
            const isExpired = payload.exp * 1000 < Date.now(); // Check if token is expired
            if (isExpired) {
                console.warn('Token has expired');
                localStorage.removeItem('token'); // Clear expired token
            }
            return !isExpired;
        } catch (error) {
            console.error('Invalid token:', error);
            return false;
        }
    },
};
export default tokenService;
