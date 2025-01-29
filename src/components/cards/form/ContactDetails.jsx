import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const ContactDetails = ({ register, errors }) => {
    return (
        <Row>
            <Col md={6}>
                <Form.Group className="mb-3">
                    <Form.Label>Phone*</Form.Label>
                    <Form.Control
                        {...register('phone', {
                            required: 'Phone number is required',
                            pattern: {
                                value: /^0[2-9]\d{7,8}$/,
                                message: 'Please enter a valid Israeli phone number'
                            }
                        })}
                        isInvalid={!!errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.phone?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email*</Form.Label>
                    <Form.Control
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address'
                            }
                        })}
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email?.message}
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>

            <Col md={6}>
                <Form.Group className="mb-3">
                    <Form.Label>Web</Form.Label>
                    <Form.Control
                        {...register('web', {
                            pattern: {
                                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                                message: 'Invalid URL format'
                            }
                        })}
                        isInvalid={!!errors.web}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.web?.message}
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
        </Row>
    );
};

export default ContactDetails;