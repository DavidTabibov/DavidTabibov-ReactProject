// src/store/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload; // Set the user data
            state.isAuthenticated = true; // Mark user as authenticated
        },
        clearUser: (state) => {
            state.user = null; // Clear user data
            state.isAuthenticated = false; // Mark as not authenticated
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setUser, clearUser, setLoading, setError, } = authSlice.actions;
export default authSlice.reducer;
