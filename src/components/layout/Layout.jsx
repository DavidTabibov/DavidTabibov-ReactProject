import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Navbar from './Navbar';
import Footer from './Footer';
import tokenService from '../../services/tokenService';
import '../../styles/Layout/Layout.css';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const handleTokenExpiration = () => {
            // Dispatch logout action dynamically
            dispatch({ type: 'auth/logout' });
            navigate('/login');
            toast.warn('Your session has expired. Please log in again.', {
                toastId: 'session-expired',
            });
        };

        tokenService.tokenExpirationCallback(handleTokenExpiration);

        return () => {
            tokenService.stopTokenCheck();
        };
    }, [dispatch, navigate]);

    return (
        <div className="layout">
            <Navbar />
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
