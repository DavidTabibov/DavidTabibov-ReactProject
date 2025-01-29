import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from '../pages/HomePage.jsx';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage.jsx';
import CardsPage from '../pages/cards/CardsPage';
import MyCardsPage from '../pages/cards/MyCardsPage';
import FavoritesPage from '../pages/cards/FavoritesPage';
import CardDetailsPage from '../pages/cards/CardDetailsPage';
import CreateCardPage from '../pages/cards/CreateCardPage';
import EditCardPage from '../pages/cards/EditCardPage';
import AboutPage from '../pages/AboutPage';
import NotFoundPage from '../pages/NotFoundPage';
import EditProfilePage from '../pages/profile/EditProfilePage';
import CrmPage from '../pages/admin/CrmPage.jsx';


// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    if (isAuthenticated === undefined) {
        console.warn('[ProtectedRoute] State still initializing.');
        return null;
    }
    if (!isAuthenticated) {
        console.log('[ProtectedRoute] Redirecting to /login');
        return <Navigate to="/login" replace />;
    }

    const hasRequiredRole = allowedRoles.some((role) => {
        if (role === 'business') return user?.isBusiness;
        if (role === 'admin') return user?.isAdmin;
        return false;
    });


    if (allowedRoles.length > 0 && !hasRequiredRole) {
        console.log('[ProtectedRoute] Unauthorized role. Redirecting to /');
        return <Navigate to="/" replace />;
    }

    return children;
};

const AppRoutes = () => {
    const user = useSelector((state) => state.auth.user); // Get user from Redux store
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    if (user === undefined || isAuthenticated === undefined) {
        console.warn('User is not available yet.'); // Keep the warning for debugging
        return null; // Prevent rendering until `user` and `isAuthenticated` are defined
    }
    if (!user) {
        console.warn('User is not available yet.'); // Debugging information
    }
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cards" element={<CardsPage />} />
            <Route path="/cards/:id" element={<CardDetailsPage />} />

            {/* Protected Routes */}
            <Route
                path="/my-cards"
                element={
                    <ProtectedRoute allowedRoles={['business', 'admin']}>
                        {user ? <MyCardsPage user={user} /> : <div>Loading...</div>}
                    </ProtectedRoute>
                }
            />
            <Route
                path="/create-card"
                element={
                    <ProtectedRoute allowedRoles={['business', 'admin']}>
                        <CreateCardPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/cards/edit/:id"
                element={
                    <ProtectedRoute allowedRoles={['business', 'admin']}>
                        <EditCardPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/favorites"
                element={
                    <ProtectedRoute>
                        <FavoritesPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile/edit"
                element={
                    <ProtectedRoute>
                        <EditProfilePage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/sandbox"
                element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <CrmPage />
                    </ProtectedRoute>
                }
            />

            {/* Catch-all route */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRoutes;
