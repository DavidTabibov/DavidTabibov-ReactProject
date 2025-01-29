import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '../../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleInfo,
    faHeart,
    faIdCard
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    const { user } = useSelector(state => state.auth);
    const { darkMode } = useTheme();

    const getFooterLinks = () => {
        const links = [
            { to: '/about', text: 'About', icon: faCircleInfo }
        ];

        if (user) {
            links.push({ to: '/favorites', text: 'Favorites', icon: faHeart });

            if (user.isBusiness || user.isAdmin) {
                links.push({ to: '/my-cards', text: 'My Cards', icon: faIdCard });
            }
        }

        return links;
    };

    return (
        <footer
            className={`py-3 mt-auto ${darkMode ? 'bg-dark' : 'bg-light'}`}
            style={{
                borderTop: `1px solid ${darkMode ? '#404040' : '#dee2e6'}`,
                backgroundColor: darkMode ? '#2d2d2d' : '#ffffff'
            }}
        >
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12}>
                        <Nav className="justify-content-around">
                            {getFooterLinks().map((link, index) => (
                                <Nav.Item
                                    key={index}
                                    className="text-center"
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: '8px',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <Nav.Link
                                        as={Link}
                                        to={link.to}
                                        className={`d-flex flex-column align-items-center ${darkMode ? 'text-light' : 'text-dark'
                                            }`}
                                        style={{
                                            opacity: '0.85',
                                            transition: 'opacity 0.3s ease',
                                            textDecoration: 'none'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                                        onMouseOut={(e) => e.currentTarget.style.opacity = '0.85'}
                                    >
                                        <FontAwesomeIcon
                                            icon={link.icon}
                                            size="lg"
                                            className="mb-2"
                                            style={{
                                                color: darkMode ? '#e0e0e0' : '#444444',
                                                fontSize: '1.5rem'
                                            }}
                                        />
                                        <span
                                            className="small"
                                            style={{
                                                color: darkMode ? '#e0e0e0' : '#444444',
                                                fontSize: '0.875rem',
                                                fontWeight: '500'
                                            }}
                                        >
                                            {link.text}
                                        </span>
                                    </Nav.Link>
                                </Nav.Item>
                            ))}
                        </Nav>
                    </Col>
                </Row>

                {/* Copyright Section */}
                <Row className="mt-4 text-center">
                    <Col>
                        <p
                            className="mb-0 small"
                            style={{
                                color: darkMode ? '#a0a0a0' : '#666666',
                                fontSize: '0.75rem'
                            }}
                        >
                            &copy; {new Date().getFullYear()} BCard. All rights reserved.
                            <br />
                            Built by David Tabibov
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;