import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BusinessCard from '../components/cards/BusinessCard';
import cardService from '../services/cardService';
import Header from '../components/layout/Header';
import '../styles/pages/HomePage.css';


const HomePage = () => {
    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useSelector((state) => state.auth);
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('search')?.toLowerCase();
    // Fetch all cards on component mount
    useEffect(() => {
        fetchCards();
    }, []);
    // Filter cards whenever the search term or cards list changes
    useEffect(() => {
        const searchTermLower = searchTerm ? searchTerm.toLowerCase() : '';

        if (!searchTermLower) {
            setFilteredCards(cards); // Show all cards when search is empty
            return;
        }
        const filtered = cards.filter((card) =>
            card.title.toLowerCase().includes(searchTermLower) ||
            card.description.toLowerCase().includes(searchTermLower) ||
            card.subtitle.toLowerCase().includes(searchTermLower) ||
            (card.address?.city && card.address.city.toLowerCase().includes(searchTermLower))
        );
        setFilteredCards(filtered);
    }, [searchTerm, cards]);

    // Fetch all cards from the backend
    const fetchCards = async () => {
        try {
            setIsLoading(true);
            const data = await cardService.getAllCards(); // Fetch cards
            console.log('Fetched cards:', data); // Debug fetched data
            setCards(data); // Update all cards
            setFilteredCards(data); // Initialize filtered cards
        } catch (error) {
            toast.error('Failed to fetch cards');
            console.error('Error fetching cards:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle toggling favorite status for a card
    const handleFavorite = async (cardId) => {
        if (!user) {
            toast.info('Please login to add favorites');
            return;
        }
        try {
            await cardService.toggleFavorite(cardId); // Toggle favorite status in backend
            await fetchCards(); // Re-fetch cards to update state
            const updatedCard = cards.find((card) => card._id === cardId);
            const isLiked = updatedCard?.likes?.includes(user._id);
            if (isLiked) {
                toast.info('Card removed from favorites!');
            } else {
                toast.success('Card added to favorites!');
            }
        } catch (error) {
            toast.error('Failed to update favorites');
            console.error('Error updating favorites:', error);
        }
    };

    return (
        <>
            <Header
                title="Welcome to BCard"
                subtitle="Discover and connect with businesses around you"
            />

            <Container className="py-5">
                {/* Show "Create New Business Card" button for business users */}
                {user?.role === 'business' && (
                    <div className="text-center mb-4">
                        <Button
                            as={Link}
                            to="/cards/new"
                            variant="primary"
                            size="lg"
                        >
                            Create New Business Card
                        </Button>
                    </div>
                )}

                {/* Show loading spinner */}
                {isLoading ? (
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Show search results */}
                        {searchTerm && (
                            <div className="mb-4">
                                <h4>Search Results for: "{searchTerm}"</h4>
                                <p>{filteredCards.length} cards found</p>
                            </div>
                        )}

                        {/* Display cards */}
                        <Row
                            xs={1}
                            sm={cards.length === 1 ? 1 : 2}
                            md={cards.length === 1 ? 1 : cards.length === 2 ? 2 : 3}
                            className="g-4"
                            style={{ marginBottom: '2rem' }}
                        >
                            {filteredCards.map((card) => (
                                <Col key={card._id}
                                    className="d-flex justify-content-center mb-4"
                                    style={{
                                        maxWidth: cards.length === 1 ? '600px' : 'none',
                                        margin: cards.length === 1 ? '0 auto' : 'initial'
                                    }}>
                                    <BusinessCard
                                        card={card}
                                        onFavorite={handleFavorite} // Handle favorite toggle
                                        onEdit={() => {/* Future: Add edit handler */ }}
                                        onDelete={() => {/* Future: Add delete handler */ }}
                                    />
                                </Col>
                            ))}
                        </Row>

                        {/* Show message if no cards are found */}
                        {!isLoading && filteredCards.length === 0 && (
                            <div className="text-center mt-5">
                                {searchTerm ? (
                                    <h3>No cards found matching your search</h3>
                                ) : (
                                    <>
                                        <h3>No business cards available</h3>
                                        {user?.role === 'business' && (
                                            <p>
                                                Start by <Link to="/cards/new">creating your first business card</Link>
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                    </>
                )}
            </Container>
        </>
    );
};

export default HomePage;
