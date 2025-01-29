import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPhone, faHeart as faHeartSolid, faPen, faEye } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import cardService from '../../services/cardService'

const MyCardsPage = ({ user }) => {
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [cardToDelete, setCardToDelete] = useState(null);
    useEffect(() => {
        if (!user || !user._id) {
            console.warn('User is undefined or not authenticated yet.');
            return; // Prevent API calls until user is defined
        }
        fetchMyCards();
    }, [user]);
    const fetchMyCards = async () => {
        try {
            setIsLoading(true);
            const response = await cardService.getMyCards();
            setCards(response);
        } catch (error) {
            console.error('Error fetching my cards:', error);
            toast.error('Failed to fetch your cards');
        } finally {
            setIsLoading(false);
        }
    };
    // Updated handleDelete function
    const handleDelete = (cardId) => {
        setCardToDelete(cardId);
        setShowDeleteModal(true);
    };
    // New function to handle the actual deletion
    const confirmDelete = async () => {
        try {
            await cardService.deleteCard(cardToDelete);
            toast.success('Card deleted successfully');
            await fetchMyCards();
        } catch (error) {
            console.error('Error deleting card:', error.response?.data || error.message);
            toast.error('Failed to delete card.');
        }
        setShowDeleteModal(false);
        setCardToDelete(null);
    };
    const handleFavorite = async (cardId) => {
        try {
            await cardService.toggleFavorite(cardId);
            const updatedCards = cards.map((card) =>
                card._id === cardId ? { ...card, likes: toggleLike(card.likes, user._id) } : card
            );
            setCards(updatedCards);
            const isLiked = updatedCards.find((card) => card._id === cardId)?.likes?.includes(user._id);
            toast.success(isLiked ? 'Added to favorites!' : 'Removed from favorites!');
        } catch (error) {
            console.error('Error toggling favorite:', error.response?.data || error.message);
            toast.error('Failed to toggle favorite.');
        }
    };
    const toggleLike = (likes, userId) => {
        return likes.includes(userId) ? likes.filter((id) => id !== userId) : [...likes, userId];
    };
    return (
        <>
            <Container className="py-4">
                <div className="text-center mb-5">
                    <small
                        className="mt-1 d-block"
                        style={{
                            color: 'var(--text-color, #6c757d)',  // Use your theme text color
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            fontSize: '0.85rem',
                            fontWeight: '500',
                            letterSpacing: '1px',
                        }}>
                        Click here to add a new business card to your collection
                    </small>
                    <Button
                        variant="primary"
                        onClick={() => navigate('/create-card')}
                        className="py-3 px-4 shadow-lg d-flex align-items-center mx-auto"
                        style={{
                            borderRadius: '30px',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            minWidth: '100px',
                            justifyContent: 'center',
                            backgroundColor: 'var(--primary-color, #0d6efd)',  // Use CSS variable with fallback
                            color: 'var(--light-text, #fff)'
                        }}>
                        <i className="fas fa-plus-circle me-2"></i>
                        Create New Card
                    </Button>
                </div>
                {isLoading ? (
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        {cards.length === 0 ? (
                            <div className="text-center">
                                <h3>No cards available</h3>
                                <p>Create your first business card now!</p>
                            </div>
                        ) : (
                            <Row
                                xs={1}
                                sm={cards.length === 1 ? 1 : 2}
                                md={cards.length === 1 ? 1 : cards.length === 2 ? 2 : 3}
                                className="g-4"
                                style={{ marginBottom: '2rem' }} >
                                {cards.map((card) => (
                                    <Col
                                        key={card._id}
                                        className="d-flex justify-content-center mb-4"
                                        style={{
                                            maxWidth: cards.length === 1 ? '600px' : 'none',
                                            margin: cards.length === 1 ? '0 auto' : 'initial'
                                        }} >
                                        <Card
                                            className="shadow-sm h-100 w-100"
                                            style={{
                                                border: '1px solid var(--border-color)',
                                                borderRadius: '10px',
                                                overflow: 'hidden',
                                                color: 'var(--text-color)',
                                                maxWidth: cards.length === 1 ? '100%' : '400px'
                                            }}>
                                            <Card.Img
                                                variant="top"
                                                src={card.image?.url || '/images/placeholder-business.jpg'}
                                                alt={card.title || 'Business Card Image'}
                                                style={{
                                                    width: '100%',
                                                    height: '250px',
                                                    objectFit: 'cover',
                                                }}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/images/placeholder-business.jpg';
                                                }}/>
                                            <Card.Body>
                                                <Card.Title>{card.title || 'Untitled'}</Card.Title>
                                                <Card.Text>{card.subtitle || 'No subtitle'}</Card.Text>
                                                <Card.Text>
                                                    <strong>Phone:</strong> {card.phone} <br />
                                                    <strong>Address:</strong>{' '}
                                                    {`${card.address.street || 'N/A'}, ${card.address.city || 'N/A'
                                                        }`} <br />
                                                    <strong>Card Number:</strong> {card.bizNumber || 'N/A'}
                                                </Card.Text>
                                            </Card.Body>

                                            <Card.Footer className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex gap-2 ">
                                                    <Button
                                                        variant="outline-primary"
                                                        size="sm"
                                                        onClick={() => navigate(`/cards/${card._id}`)}
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
                                                    {(user?.isAdmin || user?.isBusiness) && (
                                                        <div className="d-flex gap-2">
                                                            <Button
                                                                variant="link"
                                                                className="text-danger p-0"
                                                                onClick={() => handleDelete(card._id)}>
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </Button>
                                                            <Button
                                                                variant="link"
                                                                className="text-primary p-0"
                                                                onClick={() => navigate(`/cards/edit/${card._id}`)}>
                                                                <FontAwesomeIcon icon={faPen} />
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="d-flex gap-2">
                                                    <Button
                                                        variant="link"
                                                        className="text-primary p-0"
                                                        href={`tel:${card.phone}`}>
                                                        <FontAwesomeIcon icon={faPhone} />
                                                    </Button>
                                                    <Button
                                                        variant="link"
                                                        className={`p-0 ${card.likes?.includes(user._id)
                                                            ? 'text-danger'
                                                            : 'text-secondary'
                                                            }`}
                                                        onClick={() => handleFavorite(card._id)}>
                                                        <FontAwesomeIcon
                                                            icon={
                                                                card.likes?.includes(user._id)
                                                                    ? faHeartSolid
                                                                    : faHeartRegular
                                                            }/>
                                                    </Button>
                                                </div>
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </>
                )}
            </Container>
            <Modal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                centered>
                <Modal.Header closeButton style={{ border: 'none', background: '' }}>
                    <Modal.Title style={{ color: '#007BFF' }}>Delete Card</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center py-4">
                    <p style={{ color: '#007BFF' }}>Are you sure you want to delete this card?</p>
                    <p className="text-muted small" style={{ color: '#007BFF' }}>
                        This action cannot be undone.
                    </p>
                </Modal.Body>
                <Modal.Footer style={{ border: 'none' }}>
                    <Button
                        variant="outline-secondary"
                        onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default MyCardsPage;
