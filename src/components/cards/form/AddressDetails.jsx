import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const AddressDetails = ({ register, errors }) => {
    return (
        <>
            <Row>
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>State*</Form.Label>
                        <Form.Control
                            {...register('state', {
                                required: 'State is required'
                            })}
                            isInvalid={!!errors.state}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.state?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Country*</Form.Label>
                        <Form.Control
                            {...register('country', {
                                required: 'Country is required'
                            })}
                            isInvalid={!!errors.country}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.country?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>City*</Form.Label>
                        <Form.Control
                            {...register('city', {
                                required: 'City is required'
                            })}
                            isInvalid={!!errors.city}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.city?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Street*</Form.Label>
                        <Form.Control
                            {...register('street', {
                                required: 'Street is required'
                            })}
                            isInvalid={!!errors.street}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.street?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col md={3}>
                    <Form.Group className="mb-3">
                        <Form.Label>House Number*</Form.Label>
                        <Form.Control
                            type="number"
                            {...register('houseNumber', {
                                required: 'House number is required'
                            })}
                            isInvalid={!!errors.houseNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.houseNumber?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col md={3}>
                    <Form.Group className="mb-3">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control
                            type="number"
                            {...register('zip')}
                            isInvalid={!!errors.zip}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.zip?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
        </>
    );
};

export default AddressDetails;