import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import Header from '../components/layout/Header';

const AboutPage = () => {
    return (
        <>
            <Header
                title="About BCard"
                subtitle="Your Digital Business Card Platform"
            />

            <Container className="py-4">
                <Row className="mb-4">
                    <Col>
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title className="mb-4">Project Overview</Card.Title>
                                <Card.Text>
                                    BCard is a modern web application built with React that enables businesses
                                    to create and manage their digital business cards. Our platform provides
                                    an easy-to-use interface for creating, editing, and sharing business information.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mb-4 g-4">
                    <Col md={6}>
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>Features</Card.Title>
                                <ul className="list-unstyled mt-3">
                                    <li className="mb-2">✓ Create and manage digital business cards</li>
                                    <li className="mb-2">✓ Responsive design for all devices</li>
                                    <li className="mb-2">✓ Secure user authentication</li>
                                    <li className="mb-2">✓ Dark mode support</li>
                                    <li className="mb-2">✓ Save favorite business cards</li>
                                    <li className="mb-2">✓ Business location with maps integration</li>
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>How to Use</Card.Title>
                                <div className="mt-3">
                                    <h6 className="mb-2">For Business Users:</h6>
                                    <ol className="small">
                                        <li>Register an account with the "Business" option</li>
                                        <li>Create your business card with all relevant information</li>
                                        <li>Edit or update your card anytime</li>
                                        <li>Share your digital card with others</li>
                                    </ol>

                                    <h6 className="mb-2 mt-4">For Regular Users:</h6>
                                    <ol className="small">
                                        <li>Browse available business cards</li>
                                        <li>Save favorite cards for quick access</li>
                                        <li>Contact businesses directly through the platform</li>
                                        <li>Get directions to business locations</li>
                                    </ol>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Technical Information</Card.Title>
                                <div className="mt-3">
                                    <h6>Built With:</h6>
                                    <ul className="small">
                                        <li>React for frontend development</li>
                                        <li>Redux for state management</li>
                                        <li>React Bootstrap for UI components</li>
                                        <li>Axios for API communication</li>
                                        <li>JWT for secure authentication</li>
                                    </ul>

                                    <h6 className="mt-4">API Integration:</h6>
                                    <p className="small">
                                        The application communicates with a RESTful API backend using secure
                                        HTTP requests. All data is transmitted and stored securely, with
                                        proper validation and error handling.
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AboutPage;