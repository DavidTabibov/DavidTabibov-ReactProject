import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import userService from '../../services/userService';
import authService from '../../services/authService';
import { clearUser } from '../../store/slices/authSlice';
import { Row, Col } from 'react-bootstrap';

const EditProfilePage = () => {
    const user = useSelector((state) => state.auth.user);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        const checkAuthAndFetchProfile = async () => {
            if (!user) {
                toast.error('Please login to edit your profile');
                navigate('/login');
                return;
            }
            try {
                const decodedToken = authService.getDecodedToken();
                const userId = decodedToken?._id;

                if (!userId) {
                    throw new Error('User ID not found in token');
                }
                await fetchUserProfile(userId);
            } catch (error) {
                console.error('Authentication error:', error.message);
                toast.error('Session expired. Please log in again.');
                navigate('/login');
            }
        };
        checkAuthAndFetchProfile();
    }, [user, navigate]);
    const fetchUserProfile = async (userId) => {
        try {
            console.log('Fetching profile for user ID:', userId); // Debug user ID
            const profile = await userService.getProfile(userId);
            console.log('Profile fetched:', profile);
            setValue('first', profile?.name?.first || '');
            setValue('middle', profile?.name?.middle || '');
            setValue('last', profile?.name?.last || '');
            setValue('email', profile?.email || '');
            setValue('phone', profile?.phone || '');
            setValue('isBusiness', profile?.isBusiness || false);
            setValue('imageUrl', profile?.image?.url || '');
            setValue('imageAlt', profile?.image?.alt || '');
            setValue('state', profile?.address?.state || '');
            setValue('country', profile?.address?.country || '');
            setValue('city', profile?.address?.city || '');
            setValue('street', profile?.address?.street || '');
            setValue('houseNumber', profile?.address?.houseNumber || '');
            setValue('zip', profile?.address?.zip || '');
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching profile:', error.message || error); // Debug error
            setError('Failed to fetch profile. Please try again later.');
            toast.error('Failed to fetch profile.');
        }
    };

    const onSubmit = async (data) => {
        console.log('Submitting profile update with data:', data);
        try {
            setIsLoading(true);
            const decodedToken = authService.getDecodedToken();
            const userId = decodedToken?._id;
            if (!userId) {
                throw new Error('User ID not found in token');
            }
            const payload = {
                ...data,
                isBusiness: !!data.isBusiness, // Ensure it's a boolean
            };
            const isBusinessStatusChanged = payload.isBusiness !== user.isBusiness;
            const emailChanged = payload.email !== user.email;
            // Update profile
            await userService.updateProfile(userId, payload);
            // Handle business user toggle separately
            if (!user.isAdmin && data.isBusiness !== user.isBusiness) {
                console.log('Updating business status...');
                await userService.updateBusinessStatus(userId, !!data.isBusiness);
                toast.success(
                    `Account updated to ${data.isBusiness ? 'Business User' : 'Regular User'}. Please log in again.`
                );
                // Log the user out after business status change
                authService.removeToken();
                dispatch(clearUser());
                navigate('/login');
            } else {
                toast.success('Profile updated successfully!');
            }
        } catch (error) {
            console.error('Error updating profile or business status:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || 'Failed to update profile.');
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Container
            className="py-4"
            style={{
                backgroundColor: 'var(--background-color)',
                borderRadius: '10px',
                padding: '20px',
                transition: 'background-color 0.3s ease, color 0.3s ease',
                color: 'var(--text-color, #000)', // Dynamically adapt text
            }}
        >
            {/* Header */}
            <div
                className="text-center py-3 mb-4"
                style={{
                    backgroundColor: 'var(--header-bg)',
                    color: 'var(--header-text-color)',
                    borderRadius: '10px',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                    transition: 'background-color 0.3s ease, color 0.3s ease',
                }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '2rem' }}>Edit Profile</h1>
                <p
                    style={{
                        fontSize: '1.1rem',
                        marginBottom: '0',
                        color: 'var(--header-subtext-color, #f0f0f0)', // Subtle contrast in light and dark mode
                    }}>
                    Update your personal details
                </p>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            {isLoading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status" />
                </div>
            ) : (
                <Card
                    className="shadow-lg p-4 mx-auto"
                    style={{
                        maxWidth: '850px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--card-bg, #e0f0ff)',
                        border: '1px solid var(--card-border-color, #ddd)',
                        color: 'var(--text-color, #000)',
                        transition: 'background-color 0.3s ease, color 0.3s ease',
                    }}>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row className="mb-3">
                            <Col md={4}>
                                {/* First Name Field */}
                                <Form.Group className="mb-3" controlId="first">
                                    <Form.Label className="fw-bold">First Name *</Form.Label>
                                    <Form.Control
                                        {...register('first', { required: 'First name is required' })}
                                        isInvalid={!!errors.first}
                                        placeholder="Enter your first name"
                                        className="rounded-pill" />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.first?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                {/* Middle Name Field */}
                                <Form.Group className="mb-3" controlId="middle">
                                    <Form.Label className="fw-bold">Middle Name</Form.Label>
                                    <Form.Control
                                        {...register('middle')}
                                        placeholder="Enter your middle name"
                                        className="rounded-pill" />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                {/* Last Name Field */}
                                <Form.Group className="mb-3" controlId="last">
                                    <Form.Label className="fw-bold">Last Name *</Form.Label>
                                    <Form.Control
                                        {...register('last', { required: 'Last name is required' })}
                                        isInvalid={!!errors.last}
                                        placeholder="Enter your last name"
                                        className="rounded-pill"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.last?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        {/* Image Fields */}
                        <Row className="mb-4">
                            <Col md={6}>
                                <Form.Group controlId="imageUrl">
                                    <Form.Label className="fw-bold">Image URL</Form.Label>
                                    <Form.Control
                                        {...register('imageUrl')}
                                        placeholder="Enter image URL"
                                        className="rounded-pill" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="imageAlt">
                                    <Form.Label className="fw-bold">Image Alt</Form.Label>
                                    <Form.Control
                                        {...register('imageAlt')}
                                        placeholder="Enter image description"
                                        className="rounded-pill" />
                                </Form.Group>
                            </Col>
                        </Row>
                        {/* Address Fields */}
                        <Row className="mb-4">
                            {/* Phone Field */}
                            <Col md={4}>
                                <Form.Group controlId="phone">
                                    <Form.Label className="fw-bold">Phone *</Form.Label>
                                    <Form.Control
                                        {...register('phone', {
                                            required: 'Phone number is required',
                                            pattern: {
                                                value: /^0[2-9]\d{7,8}$/,
                                                message: 'Invalid phone number format. Example: 0521234567',
                                            },
                                        })}
                                        isInvalid={!!errors.phone}
                                        placeholder="Enter your phone number"
                                        className="rounded-pill" />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.phone?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId="state">
                                    <Form.Label className="fw-bold">State</Form.Label>
                                    <Form.Control
                                        {...register('state')}
                                        placeholder="Enter state"
                                        className="rounded-pill" />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId="country">
                                    <Form.Label className="fw-bold">Country *</Form.Label>
                                    <Form.Control
                                        {...register('country', { required: 'Country is required' })}
                                        isInvalid={!!errors.country}
                                        placeholder="Enter country"
                                        className="rounded-pill" />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.country?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col md={4}>
                                <Form.Group controlId="street">
                                    <Form.Label className="fw-bold">Street *</Form.Label>
                                    <Form.Control
                                        {...register('street', { required: 'Street is required' })}
                                        isInvalid={!!errors.street}
                                        placeholder="Enter street"
                                        className="rounded-pill" />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.street?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId="houseNumber">
                                    <Form.Label className="fw-bold">House Number *</Form.Label>
                                    <Form.Control
                                        type="number"
                                        {...register('houseNumber', { required: 'House number is required' })}
                                        isInvalid={!!errors.houseNumber}
                                        placeholder="Enter house number"
                                        className="rounded-pill" />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.houseNumber?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId="zip">
                                    <Form.Label className="fw-bold">Zip</Form.Label>
                                    <Form.Control
                                        type="number"
                                        {...register('zip')}
                                        placeholder="Enter zip code"
                                        className="rounded-pill" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col md={4}>
                                <Form.Group controlId="city">
                                    <Form.Label className="fw-bold">City *</Form.Label>
                                    <Form.Control
                                        {...register('city', { required: 'City is required' })}
                                        isInvalid={!!errors.city}
                                        placeholder="Enter city"
                                        className="rounded-pill" />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.city?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>0
                        {/* Business User Checkbox */}
                        {!user.isAdmin && (
                            <Form.Group
                                className="mb-3"
                                controlId="isBusiness"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '10px',
                                    borderRadius: '10px',
                                    border: '1px solid var(--checkbox-border-color, #ddd)',
                                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                                    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                                }}>
                                <Form.Check
                                    type="checkbox"
                                    label="Business User"
                                    {...register('isBusiness')}
                                    className="fw-bold"
                                    style={{
                                        accentColor: 'var(--checkbox-accent-color, #007bff)', // Custom checkbox color
                                        transition: 'transform 0.2s ease',
                                    }} />
                            </Form.Group>
                        )}
                        {/* Submit Button */}
                        <div className="d-flex justify-content-end gap-3">
                            <Button
                                variant="outline-danger"
                                onClick={() => navigate('/')}
                                style={{
                                    borderRadius: '20px',
                                    padding: '10px 20px',
                                    fontWeight: 'bold',
                                    border: '2px solid var(--button-border-color, #dc3545)',
                                    color: 'var(--button-text-color, #dc3545)',
                                    backgroundColor: 'transparent',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = 'var(--button-hover-bg-danger, #dc3545)';
                                    e.target.style.color = 'var(--button-hover-text-danger, #fff)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.color = 'var(--button-text-color, #dc3545)';
                                }}>
                                Cancel
                            </Button>
                            <Button
                                variant="outline-primary"
                                type="submit"
                                disabled={isLoading}
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
                                }}>
                                {isLoading ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </Form>
                </Card>
            )}
        </Container>
    );
};
export default EditProfilePage;
