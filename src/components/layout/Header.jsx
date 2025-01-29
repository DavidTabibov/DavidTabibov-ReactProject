import React from 'react';
import { Container } from 'react-bootstrap';
import '../../styles/Layout/Header.css';
import { faEdit, faTrash, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

const Header = ({ title, subtitle }) => {
    return (
        <header
            className="header"
            style={{
                textAlign: 'center',
                padding: '20px',
                marginBottom: '20px',
                backgroundColor: 'var(--header-bg, #007bff)', // Blue for light mode
                color: 'var(--header-text-color, #ffffff)', // White for contrast
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)', // Subtle shadow for elevation
                transition: 'background-color 0.3s ease, color 0.3s ease', // Smooth transitions for dark mode
            }}
        >
            <Container>
                <h1
                    className="header-title"
                    style={{
                        fontWeight: 'bold',
                        fontSize: '2.5rem',
                        margin: 0,
                        color: 'var(--header-title, #ffffff)', // Ensure the title is readable
                    }}
                >
                    {title}
                </h1>
                {subtitle && (
                    <p
                        className="header-subtitle"
                        style={{
                            fontSize: '1.2rem',
                            margin: '10px 0 0',
                            color: 'var(--header-subtext, #f8f9fa)', // Slightly lighter for subtitle
                        }}
                    >
                        {subtitle}
                    </p>
                )}
            </Container>
        </header>
    );
};

export default Header;
