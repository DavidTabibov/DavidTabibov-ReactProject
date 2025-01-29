import React, { useEffect, useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPhone,
    faEnvelope,
    faGlobe,
    faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import cardService from '../../services/cardService';
import Header from '../../components/layout/Header';
import BusinessMap from '../../components/maps/BusinessMap';


const CardDetailsPage = () => {
    const [card, setCard] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        fetchCard();
    }, [id]);
    const fetchCard = async () => {
        try {
            const response = await cardService.getCardById(id);
            setCard(response);
        } catch (error) {
            toast.error('Failed to fetch card details');
            navigate('/cards');
        } finally {
            setIsLoading(false);
        }
    };
    if (isLoading) {
        return (
            <Container className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </Container>
        );
    }
    if (!card) return null;
    const isOwner = user?._id === card.user_id;
    const isAdmin = user?.role === 'admin';
    const canModify = isOwner || isAdmin;
    return (
        <>
            <Header
                title={card.title}
                subtitle={card.subtitle}
            />
            <Container className="py-3">
                <Card
                    className="shadow-sm border-0"
                    style={{
                        borderRadius: '15px',
                        overflow: 'hidden',
                        color: 'var(--text-color)',
                        width: '25rem',
                    }}
                >
                    {/* תמונה רספונסיבית */}
                    <div
                        className="ratio ratio-16x9"
                        style={{
                            backgroundColor: 'var(--card-bg)',
                            overflow: 'hidden',
                        }}
                    >
                        <img
                            src={card.image?.url || '/images/placeholder-business.jpg'}
                            alt={card.title}
                            className="img-fluid w-100"
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                                filter: 'brightness(0.95)',
                            }}
                            onError={(e) => {
                                e.target.onerror = null;  // Prevent infinite loop
                                e.target.src = '/images/placeholder-business.jpg';  // Fallback image
                                console.log('Image failed to load:', card.image?.url);  // Debug log
                            }}
                        />
                    </div>
                    <Card.Body>
                        <div>
                            <div>
                                <Card.Title
                                    className="mb-2"
                                    style={{
                                        fontSize: '1.8rem',
                                        color: 'var(--text-color)',
                                        textAlign: 'center',
                                        width: '100%', // Takes full width inside flex container
                                        maxWidth: '600px', // Limits the width on larger screens
                                        wordWrap: 'break-word', // Ensures long text doesn't break layout
                                    }}>
                                    {card.title}
                                </Card.Title>
                                <Card.Subtitle
                                    className="mb-3"
                                    style={{
                                        fontSize: '1.2rem',
                                        color: 'var(--text-color)',
                                        textAlign: 'center',
                                        width: '100%',
                                        maxWidth: '500px', // Keeps subtitle width balanced with the title
                                        wordWrap: 'break-word',
                                    }}
                                >
                                    {card.subtitle}
                                </Card.Subtitle>
                            </div>
                        </div>
                        <Card.Text className="mt-3" style={{ color: 'var(--text-color)' }}>
                            {card.description}
                        </Card.Text>

                        <hr style={{ borderColor: 'var(--border-color)' }} />

                        <div className="contact-details">
                            <div className="mb-2" style={{ color: 'var(--text-color)' }}>
                                <FontAwesomeIcon icon={faPhone} className="me-2 text-muted" />
                                <a href={`tel:${card.phone}`} className="text-decoration-none" style={{ color: 'var(--text-color)' }}>
                                    {card.phone}
                                </a>
                            </div>
                            <div className="mb-2" style={{ color: 'var(--text-color)' }}>
                                <FontAwesomeIcon icon={faEnvelope} className="me-2 text-muted" />
                                <a href={`mailto:${card.email}`} className="text-decoration-none" style={{ color: 'var(--text-color)' }}>
                                    {card.email}
                                </a>
                            </div>
                            {card.web && (
                                <div className="mb-2" style={{ color: 'var(--text-color)' }}>
                                    <FontAwesomeIcon icon={faGlobe} className="me-2 text-muted" />
                                    <a
                                        href={card.web}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-decoration-none"
                                        style={{ color: 'var(--text-color)' }}
                                    >
                                        {card.web}
                                    </a>
                                </div>
                            )}
                            <div style={{ color: 'var(--text-color)' }}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-muted" />
                                {`${card.address.street || ''} ${card.address.houseNumber || ''}, ${card.address.city || ''}, ${card.address.country || ''}`}
                            </div>
                        </div>
                        <div className="mt-4">
                            <BusinessMap address={card.address} />
                        </div>
                    </Card.Body>
                </Card>
            </Container >
        </>
    );
};

export default CardDetailsPage;
