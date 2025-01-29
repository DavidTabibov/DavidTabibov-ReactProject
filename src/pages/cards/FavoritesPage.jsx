
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import BusinessCard from '../../components/cards/BusinessCard';
import cardService from '../../services/cardService';
import Header from '../../components/layout/Header';

const FavoritesPage = () => {
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            toast.info('Please login to view favorites');
            navigate('/login');
            return;
        }
        loadFavorites();
    }, [user, navigate]);

    const loadFavorites = async () => {
        try {
            setIsLoading(true);
            const data = await cardService.getAllCards();
            const favoriteCards = data.filter((card) => card.likes.includes(user._id));
            console.log('Fetched favorite cards:', favoriteCards);
            setCards(favoriteCards);
        } catch (error) {
            toast.error('Failed to fetch favorite cards');
            console.error('Error fetching favorites:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFavorite = async (cardId) => {
        try {
            // Toggle favorite status in backend
            const updatedCard = await cardService.toggleFavorite(cardId);
            // Re-fetch favorites or update them locally if necessary
            await loadFavorites();
            // Determine if the card is now liked or unliked
            const isLiked = updatedCard?.likes?.includes(user._id);
            // Show the appropriate toast message
            if (isLiked) {
                toast.success('Card added to favorites!');
            } else {
                toast.info('Card removed from favorites!');
            }
        } catch (error) {
            toast.error('Failed to update favorites');
            console.error('Error toggling favorite:', error);
        }
    };
    return (
        <>
            <Header
                title="Favorite Cards"
                subtitle="Your collection of favorite business cards"
            />

            <Container className="py-4">
                {isLoading ? (
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        {cards.length === 0 ? (
                            <Alert variant="info" className="text-center">
                                <Alert.Heading>No favorite cards yet</Alert.Heading>
                                <p>
                                    Start adding cards to your favorites by clicking the heart icon
                                    on any business card!
                                </p>
                            </Alert>
                        ) : (
                            <Row
                                xs={1}
                                sm={cards.length === 1 ? 1 : 2}
                                md={cards.length === 1 ? 1 : cards.length === 2 ? 2 : 3}
                                className="g-4"
                                style={{ marginBottom: '2rem' }}  // Add margin to the bottom of the row
                            >
                                {cards.map((card) => (
                                    <Col
                                        key={card._id}
                                        className="d-flex justify-content-center mb-4" // Add margin-bottom to each column
                                        style={{
                                            maxWidth: cards.length === 1 ? '600px' : 'none',
                                            margin: cards.length === 1 ? '0 auto' : 'initial'
                                        }}
                                    >
                                        <BusinessCard
                                            card={card}
                                            onFavorite={handleFavorite}
                                            onDelete={() => { }}
                                            style={{
                                                width: '100%',
                                                maxWidth: cards.length === 1 ? '100%' : '400px'
                                            }}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </>
                )}
            </Container>
        </>
    );
};

export default FavoritesPage;
