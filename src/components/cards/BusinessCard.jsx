
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPhone,
    faEye,
    faHeart as faHeartSolid,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BusinessCard = ({
    card,
    onFavorite,
}) => {
    const { user } = useSelector((state) => state.auth);
    const isFavorite = card?.likes?.includes(user?._id);

    if (!card) {
        return <div>Card information not available</div>;
    }

    return (
        <Card
            className="shadow-sm h-100"
            style={{
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                overflow: 'hidden',
                color: 'var(--text-color)',
                width: '350px', // Fixed width for all cards
                height: '350px', // Fixed height for all cards
                margin: '0 auto',
            }}
        >
            <Card.Img
                variant="top"
                src={card.image?.url || '/images/placeholder-business.jpg'}
                alt={card.title || 'Business Card Image'}
                style={{
                    width: '100%',
                    height: '300px', // Consistent height for images
                    objectFit: 'cover', // Ensure images fit properly
                }}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/placeholder-business.jpg';
                }}
            />

            <Card.Body
                style={{
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '15px',
                }}
            >
                <Card.Title style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                    {card.title || 'Untitled'}
                </Card.Title>
                <Card.Text>{card.subtitle || 'No subtitle'}</Card.Text>
                <Card.Text style={{ fontSize: '0.9rem' }}>
                    <strong>Phone:</strong> {card.phone || 'N/A'} <br />
                    <strong>Address:</strong> {card.address?.street || 'N/A'}, {card.address?.city || 'N/A'} <br />
                    <strong>Card Number:</strong> {card.cardNumber || 'N/A'}
                </Card.Text>
            </Card.Body>

            <Card.Footer
                className="d-flex justify-content-between align-items-center"
                style={{ padding: '10px' }}
            >
                <Button variant="outline-primary" size="sm" as={Link} to={`/cards/${card._id}`}
                    className="d-flex align-items-center gap-2 px-3 py-2"
                    style={{
                        borderRadius: '20px',
                        transition: 'all 0.3s ease',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                    }}>
                    <FontAwesomeIcon icon={faEye} />
                </Button>
                <div className="d-flex gap-2">
                    <a href={`tel:${card.phone}`} className="btn btn-link p-0 text-primary">
                        <FontAwesomeIcon icon={faPhone} />
                    </a>
                    {user && (
                        <Button
                            variant="link"
                            className={`p-0 ${isFavorite ? 'text-danger' : 'text-secondary'}`}
                            onClick={() => onFavorite(card._id)}
                        >
                            <FontAwesomeIcon icon={isFavorite ? faHeartSolid : faHeartRegular} />
                        </Button>
                    )}
                </div>
            </Card.Footer>
        </Card>

    );
};

BusinessCard.propTypes = {
    card: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string,
        subtitle: PropTypes.string,
        phone: PropTypes.string,
        image: PropTypes.shape({
            url: PropTypes.string,
        }),
        address: PropTypes.shape({
            street: PropTypes.string,
            city: PropTypes.string,
        }),
        cardNumber: PropTypes.string,
        likes: PropTypes.arrayOf(PropTypes.string),
        owner: PropTypes.string, // Ensure owner is defined for conditional delete logic
    }).isRequired,
    onFavorite: PropTypes.func.isRequired,
    onDelete: PropTypes.func, // Optional prop
    onEdit: PropTypes.func, // Optional prop
};

export default BusinessCard;
