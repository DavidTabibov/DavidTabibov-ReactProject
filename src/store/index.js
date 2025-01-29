// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import authMiddleware from './middleware/authMiddleware';

const store = configureStore({
    reducer: { auth: authReducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authMiddleware), // Combine default middleware with custom middleware
});

export default store;
