import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setError } from '../../store/slices/authSlice'; // Ensure this action is available in your slice
import Header from '../../components/layout/Header';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
    // Clear error state when the component mounts
    useEffect(() => {
        dispatch(setError(null)); // Clear any existing errors
    }, [dispatch]);
    // Redirect to the homepage if authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const onSubmit = async (data) => {
        try {
            // Dispatch login action
            await dispatch({ type: 'auth/login', payload: data });
        } catch (err) {
            toast.error("Invalid email or password. Please try again.");

        }
    };

    return (
        <>
            <Header title="LOGIN" subtitle="Welcome back! Please login to your account" />
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Email Field */}
                <Form.Group controlId="email" className="mb-4">
                    <Form.Label
                        className="fw-bold"
                        style={{
                            color: 'var(--text-color, #000)', // Adjusts for both light and dark mode
                            transition: 'color 0.3s ease',
                        }}
                    >
                        Email *
                    </Form.Label>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid var(--form-border-color, #ddd)',
                            borderRadius: '50px',
                            padding: '0.5rem',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            backgroundColor: 'var(--input-bg, #fff)',
                            transition: 'background-color 0.3s ease, border-color 0.3s ease',
                        }}
                    >
                        <i
                            className="fas fa-envelope"
                            style={{
                                marginLeft: '0.5rem',
                                color: 'var(--icon-color, #007bff)',
                                fontSize: '1.2rem',
                            }}
                        ></i>
                        <Form.Control
                            type="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                            isInvalid={!!errors.email}
                            placeholder="Enter your email"
                            style={{
                                border: 'none',
                                outline: 'none',
                                boxShadow: 'none',
                                marginLeft: '0.5rem',
                                backgroundColor: 'transparent',
                                color: 'var(--text-color, #000)',
                                width: '100%',
                            }}
                        />
                    </div>
                    <Form.Control.Feedback type="invalid">
                        {errors.email?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Password Field */}
                <Form.Group controlId="password" className="mb-4">
                    <Form.Label
                        className="fw-bold"
                        style={{
                            color: 'var(--text-color, #000)',
                            transition: 'color 0.3s ease',
                        }}
                    >
                        Password *
                    </Form.Label>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid var(--form-border-color, #ddd)',
                            borderRadius: '50px',
                            padding: '0.5rem',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            backgroundColor: 'var(--input-bg, #fff)',
                            transition: 'background-color 0.3s ease, border-color 0.3s ease',
                        }}
                    >
                        <i
                            className="fas fa-lock"
                            style={{
                                marginLeft: '0.5rem',
                                color: 'var(--icon-color, #007bff)',
                                fontSize: '1.2rem',
                            }}
                        ></i>
                        <Form.Control
                            type="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            })}
                            isInvalid={!!errors.password}
                            placeholder="Enter your password"
                            style={{
                                border: 'none',
                                outline: 'none',
                                boxShadow: 'none',
                                marginLeft: '0.5rem',
                                backgroundColor: 'transparent',
                                color: 'var(--text-color, #000)',
                                width: '100%',
                            }}
                        />
                    </div>
                    <Form.Control.Feedback type="invalid">
                        {errors.password?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                {/* Buttons */}
                <div className="d-grid gap-3 mt-4">
                    <Button
                        variant="danger"
                        style={{
                            borderRadius: '50px',
                            backgroundColor: 'var(--danger-bg, #ff4d4d)',
                            color: 'var(--text-color, #fff)',
                            border: 'none',
                            padding: '10px 20px',
                            transition: 'background-color 0.3s ease',
                        }}
                        onClick={() => navigate('/')}
                    >
                        CANCEL
                    </Button>
                    <Button
                        type="submit"
                        style={{
                            borderRadius: '50px',
                            backgroundColor: 'var(--primary-bg, #007bff)',
                            color: 'var(--text-color, #fff)',
                            border: 'none',
                            padding: '10px 20px',
                            transition: 'background-color 0.3s ease',
                        }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'LOGIN'}
                    </Button>
                </div>
            </Form>
        </>
    );
};

export default LoginPage;
