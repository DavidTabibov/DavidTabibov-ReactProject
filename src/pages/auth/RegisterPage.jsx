import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import RegisterFormFields from './RegisterFormFields'; // Ensure this component exists
import authService from '../../services/authService'; // Import authService


const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();


    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const formattedData = {
            name: {
                first: data.firstName || '',
                middle: data.middleName || '',
                last: data.lastName || '',
            },
            phone: data.phone || '',
            email: data.email.toLowerCase(), // Convert email to lowercase
            password: data.password || '',
            image: {
                url: data.imageUrl?.trim() ? data.imageUrl : '', // ✅ Ensures empty value is sent if not provided
                alt: data.imageAlt?.trim() || 'Profile Image',
            },
            address: {
                street: data.street || '',
                city: data.city || '',
                country: data.country || '',
                houseNumber: data.houseNumber || '',
                zip: data.zip || '',
            },
            isBusiness: !!data.isBusiness, // Convert to boolean if not already
            isAdmin: false, // Default to false unless explicitly set by the backend
        };
        try {
            const response = await authService.register(formattedData);
            console.log('Registration successful:', response); // Debug success
            toast.success('Registration successful! Please log in.');
            navigate('/login'); // Redirect to login page
        } catch (error) {

            if (error.message.includes('User already registered')) {
                toast.error('This email is already registered. Please log in or use a different email.');
            } else {
                toast.error('Registration failed. Please check your details and try again.');
            }
        }
    };

    return (
        <Container
            className="py-4"
            style={{
                backgroundColor: 'var(--background-color, #e0f0ff)',
                borderRadius: '12px',
                padding: '20px',
                maxWidth: '1400px', // Increased width of the container
                transition: 'background-color 0.3s ease, color 0.3s ease',
            }}
        >
            {/* Header Section */}
            <div
                className="text-center py-3 mb-4"
                style={{
                    backgroundColor: 'var(--header-bg, #007bff)',
                    color: 'var(--header-text-color, #ffffff)',
                    borderRadius: '10px',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                }}
            >
                <h1 style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>Register</h1>
                <p
                    style={{
                        fontSize: '1.3rem',
                        marginBottom: '0',
                        color: 'var(--header-subtext-color, #f0f0f0)',
                    }}
                >
                    Create your account
                </p>
            </div>

            <Row className="justify-content-center">
                <Col lg={12}> {/* Adjusted column width to take up more space */}
                    <Card
                        className="shadow-lg p-4"
                        style={{
                            borderRadius: '12px',
                            backgroundColor: 'var(--card-bg, #ffffff)',
                            border: '1px solid var(--card-border-color, #ddd)',
                            color: 'var(--text-color, #000)', // Default text color
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            maxWidth: '1200px', // Adjusted the card width
                            margin: '0 auto', // Centered card
                        }}
                    >
                        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                            {/* Dynamic Form Fields */}
                            <RegisterFormFields register={register} errors={errors} />

                            <div className="d-flex justify-content-end gap-2 mt-4">
                                <Button
                                    variant="outline-danger"
                                    onClick={() => navigate('/')}
                                    className="rounded-pill"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    style={{
                                        borderRadius: '20px',
                                        padding: '10px 20px',
                                        fontWeight: 'bold',
                                        border: '2px solid var(--button-border-color, #007bff)',
                                        color: 'var(--button-text-color, #007bff)',
                                        backgroundColor: 'transparent',
                                        transition: 'all 0.3s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = 'var(--button-hover-bg-primary, #007bff)';
                                        e.target.style.color = 'var(--button-hover-text-primary, #fff)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = 'transparent';
                                        e.target.style.color = 'var(--button-text-color, #007bff)';
                                    }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Registering...' : 'Submit'}
                                </Button>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>

            {/* Footer Section */}
            <div
                className="text-center mt-4 py-3"
                style={{
                    backgroundColor: 'var(--footer-bg, #007bff)',
                    color: 'var(--footer-text-color, #ffffff)',
                    borderRadius: '10px',
                    boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
                }}
            >
                <p className="mb-0" style={{ fontSize: '1.1rem', fontWeight: '500' }}>
                    Join us today and start creating your business cards!
                </p>
            </div>
        </Container>
    );
};

export default RegisterPage;
