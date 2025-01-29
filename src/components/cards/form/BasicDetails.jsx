import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const BasicDetails = ({ register, errors }) => {
    return (
        <Row>
            <Col md={6}>
                <Form.Group className="mb-3">
                    <Form.Label>Business Name*</Form.Label>
                    <Form.Control
                        {...register('title', {
                            required: 'Business name is required',
                            minLength: {
                                value: 2,
                                message: 'Business name must be at least 2 characters'
                            }
                        })}
                        isInvalid={!!errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.title?.message}
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>

            <Col md={6}>
                <Form.Group className="mb-3">
                    <Form.Label>Subtitle*</Form.Label>
                    <Form.Control
                        {...register('subtitle', {
                            required: 'Subtitle is required'
                        })}
                        isInvalid={!!errors.subtitle}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.subtitle?.message}
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
        </Row>
    );
};

export default BasicDetails;