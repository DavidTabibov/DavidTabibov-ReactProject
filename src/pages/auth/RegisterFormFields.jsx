import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';

const RegisterFormFields = ({ register, errors }) => {
    return (
        <div
            className="p-4 mx-auto"
            style={{
                width: '100%',
                backgroundColor: 'var(--card-bg, #e0f0ff)',
                borderRadius: '12px',
                border: '1px solid var(--form-border-color, #ddd)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s ease, color 0.3s ease',
            }}
        >
            {/* Group fields in rows, two fields per row */}
            <Row className="mb-4">
                <Col md={6}>
                    {/* First Name */}
                    <Form.Group controlId="firstName" className="mb-3">
                        <Form.Label className="fw-bold">First Name *</Form.Label>
                        <Form.Control
                            {...register('firstName', {
                                required: 'First name is required',
                                minLength: { value: 2, message: 'Must be at least 2 characters' },
                            })}
                            isInvalid={!!errors.firstName}
                            placeholder="Enter your first name"
                            className="rounded-pill"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.firstName?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    {/* Middle Name */}
                    <Form.Group controlId="middleName" className="mb-3">
                        <Form.Label className="fw-bold">Middle Name</Form.Label>
                        <Form.Control
                            {...register('middleName')}
                            placeholder="Enter your middle name"
                            className="rounded-pill"
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={6}>
                    {/* Last Name */}
                    <Form.Group controlId="lastName" className="mb-3">
                        <Form.Label className="fw-bold">Last Name *</Form.Label>
                        <Form.Control
                            {...register('lastName', {
                                required: 'Last name is required',
                                minLength: { value: 2, message: 'Must be at least 2 characters' },
                            })}
                            isInvalid={!!errors.lastName}
                            placeholder="Enter your last name"
                            className="rounded-pill"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.lastName?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    {/* Phone */}
                    <Form.Group controlId="phone" className="mb-3">
                        <Form.Label className="fw-bold">Phone *</Form.Label>
                        <Form.Control
                            {...register('phone', {
                                required: 'Phone number is required',
                                pattern: {
                                    value: /^0[2-9]\d{7,8}$/,
                                    message: 'Invalid phone number',
                                },
                            })}
                            isInvalid={!!errors.phone}
                            placeholder="Enter your phone number"
                            className="rounded-pill"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.phone?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={6}>
                    {/* Email */}
                    <Form.Group controlId="email" className="mb-3">
                        <Form.Label className="fw-bold">Email *</Form.Label>
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
                            className="rounded-pill"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    {/* Password */}
                    <Form.Group controlId="password" className="mb-3">
                        <Form.Label className="fw-bold">Password *</Form.Label>
                        <Form.Control
                            type="password"
                            {...register('password', {
                                required: 'Password is required',
                                pattern: {
                                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#^_-])[A-Za-z\d@$!%*?&#^_-]{8,}$/,
                                    message: 'Password must include uppercase, lowercase, number, and special character',
                                },
                            })}
                            isInvalid={!!errors.password}
                            placeholder="Enter your password"
                            className="rounded-pill"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={6}>
                    {/* Street */}
                    <Form.Group controlId="street" className="mb-3">
                        <Form.Label className="fw-bold">Street *</Form.Label>
                        <Form.Control
                            {...register('street', {
                                required: 'Street is required',
                            })}
                            isInvalid={!!errors.street}
                            placeholder="Enter street"
                            className="rounded-pill"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.street?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    {/* City */}
                    <Form.Group controlId="city" className="mb-3">
                        <Form.Label className="fw-bold">City *</Form.Label>
                        <Form.Control
                            {...register('city', {
                                required: 'City is required',
                            })}
                            isInvalid={!!errors.city}
                            placeholder="Enter city"
                            className="rounded-pill"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.city?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={6}>
                    {/* Country */}
                    <Form.Group controlId="country" className="mb-3">
                        <Form.Label className="fw-bold">Country *</Form.Label>
                        <Form.Control
                            {...register('country', {
                                required: 'Country is required',
                            })}
                            isInvalid={!!errors.country}
                            placeholder="Enter country"
                            className="rounded-pill"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.country?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    {/* Image URL (Optional) */}
                    <Form.Group controlId="imageUrl" className="mb-3">
                        <Form.Label className="fw-bold">Image URL (Optional)</Form.Label>
                        <Form.Control
                            {...register('imageUrl', { validate: (value) => !value || value.match(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/) || "Enter a valid image URL" })}
                            placeholder="Enter image URL (optional)"
                            className="rounded-pill"
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={6}>
                    {/* Image Alt */}
                    <Form.Group controlId="imageAlt" className="mb-3">
                        <Form.Label className="fw-bold">Image Alt</Form.Label>
                        <Form.Control
                            {...register('imageAlt')}
                            placeholder="Enter image description"
                            className="rounded-pill"
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    {/* House Number */}
                    <Form.Group controlId="houseNumber" className="mb-3">
                        <Form.Label className="fw-bold">House Number *</Form.Label>
                        <Form.Control
                            type="number"
                            {...register('houseNumber', {
                                required: 'House number is required',
                            })}
                            isInvalid={!!errors.houseNumber}
                            placeholder="Enter house number"
                            className="rounded-pill"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.houseNumber?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    {/* Zip */}
                    <Form.Group controlId="zip" className="mb-3">
                        <Form.Label className="fw-bold">Zip</Form.Label>
                        <Form.Control
                            type="number"
                            {...register('zip')}
                            placeholder="Enter zip code"
                            className="rounded-pill"
                        />
                    </Form.Group>
                </Col>
            </Row>
        </div>

    );
};
export default RegisterFormFields;
