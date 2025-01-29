import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';

const NotFoundPage = () => {
    return (
        <>
            <Header
                title="404 - Page Not Found"
                subtitle="The page you're looking for doesn't exist"
            />

            <Container className="text-center py-5">
                <Button as={Link} to="/" variant="primary" size="lg">
                    Return to Home
                </Button>
            </Container>
        </>
    );
};

export default NotFoundPage;