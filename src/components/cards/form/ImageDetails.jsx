import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const ImageDetails = ({ register, errors }) => {
    return (
        <Row>
            <Col md={6}>
                {/* Image URL Field */}
                <Form.Group className="mb-3">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        {...register('imageUrl', {
                            pattern: {
                                value: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
                                message: 'Please enter a valid image URL (jpg, jpeg, png, gif, or webp)',
                            },
                        })}
                        isInvalid={!!errors.imageUrl}
                        placeholder="Enter image URL"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.imageUrl?.message}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                        Enter a valid image URL (e.g., https://example.com/image.jpg)
                    </Form.Text>
                </Form.Group>
            </Col>
            <Col md={6}>
                {/* Image Alt Field */}
                <Form.Group className="mb-3">
                    <Form.Label>Image Alt Text</Form.Label>
                    <Form.Control
                        {...register('imageAlt', {
                            required: 'Alt text is required',
                            minLength: {
                                value: 2,
                                message: 'Alt text must be at least 2 characters',
                            },
                        })}
                        isInvalid={!!errors.imageAlt}
                        placeholder="Enter image alt text"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.imageAlt?.message}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                        Provide a brief description of the image for accessibility (e.g., "Company logo").
                    </Form.Text>
                </Form.Group>
            </Col>
        </Row>
    );
};

export default ImageDetails;
