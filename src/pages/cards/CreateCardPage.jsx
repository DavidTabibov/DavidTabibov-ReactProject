import React from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Header from '../../components/layout/Header';
import cardService from '../../services/cardService'

const CreateCardPage = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target).entries());
        // Format data for submission
        const payload = {
            title: formData.title,
            subtitle: formData.subtitle,
            description: formData.description,
            phone: formData.phone,
            email: formData.email,
            web: formData.web || '',
            image: {
                url: formData.image || '',
                alt: formData.imageAlt || 'business card image',
            },
            address: {
                street: formData.street || '',
                city: formData.city || '',
                state: formData.state || '',
                country: formData.country || '',
                houseNumber: Number(formData.houseNumber) || 0,
                zip: Number(formData.zip) || 0,
            },
        };
        // **Frontend Validation for Phone**
        const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/; // Adjust regex if needed
        if (!phoneRegex.test(payload.phone)) {
            toast.error('Please enter a valid phone number!');
            return;
        }
        if (!user || (!user.isBusiness && user.isAdmin === false)) {
            toast.error('You must be logged in as a business user or admin to create cards');
            return <Navigate to="/" replace />;
        };
        try {
            toast.loading('Creating card...');
            // Make API request to create the card
            await cardService.createCard(payload);
            toast.dismiss();
            toast.success('Business card created successfully!');
            navigate('/my-cards');
        } catch (error) {
            // **Backend Validation Error Handling**
            toast.dismiss();
            if (error.response?.data?.includes('duplicate key error')) {
                toast.error('This email is already associated with another card. Please use a different email.');
            } else if (error.response?.data?.includes('phone must be a valid phone number')) {
                toast.error('Invalid phone number. Please enter a valid phone number.');
            } else if (error.response?.status === 403) {
                toast.error('You are not authorized to create a card. Please check your account permissions.');
            } else {
                toast.error(error.response?.data?.message || 'Failed to create card. Please try again.');
            }
            console.error('Error creating card:', error);
        }
    };

    return (
        <Container className="py-4" style={{ maxWidth: '800px' }}>
            <Header
                title="Create New Business Card"
                subtitle="Fill in the details to create your business card"
            />
            <Form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: '0 auto' }}>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="title">
                            <Form.Label>Title *</Form.Label>
                            <Form.Control type="text" name="title" required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="subtitle">
                            <Form.Label>Subtitle *</Form.Label>
                            <Form.Control type="text" name="subtitle" required />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="description" className="mb-3">
                    <Form.Label>Description *</Form.Label>
                    <Form.Control as="textarea" name="description" required />
                </Form.Group>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="phone">
                            <Form.Label>Phone *</Form.Label>
                            <Form.Control type="text" name="phone" required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="email">
                            <Form.Label>Email *</Form.Label>
                            <Form.Control type="email" name="email" required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="web">
                            <Form.Label>Website</Form.Label>
                            <Form.Control type="url" name="web" />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="image">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control type="url" name="image" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="state">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" name="state" />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="country">
                            <Form.Label>Country *</Form.Label>
                            <Form.Control type="text" name="country" required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="city">
                            <Form.Label>City *</Form.Label>
                            <Form.Control type="text" name="city" required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="street">
                            <Form.Label>Street *</Form.Label>
                            <Form.Control type="text" name="street" required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="houseNumber">
                            <Form.Label>House Number *</Form.Label>
                            <Form.Control type="number" name="houseNumber" required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="zip">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control type="number" name="zip" />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="d-flex justify-content-end gap-2">
                    <Button variant="secondary" onClick={() => navigate('/my-cards')}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                        Submit
                    </Button>
                </div>
            </Form>
        </Container>

    );
};

export default CreateCardPage;
