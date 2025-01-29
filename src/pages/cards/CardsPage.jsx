import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import BusinessCard from "../../components/cards/BusinessCard";
import SearchBar from "../../components/search/SearchBar";
import cardService from "../../services/cardService";
import Header from "../../components/layout/Header";

const CardsPage = () => {
    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        try {
            setIsLoading(true);
            const data = await cardService.getAllCards();
            setCards(data);
            setFilteredCards(data);
        } catch (error) {
            toast.error("Failed to fetch cards");
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (searchTerm) => {
        if (!searchTerm) {
            setFilteredCards(cards);
            return;
        }

        const term = searchTerm.toLowerCase();
        const filtered = cards.filter(
            (card) =>
                card.title.toLowerCase().includes(term) ||
                card.subtitle.toLowerCase().includes(term) ||
                card.description.toLowerCase().includes(term) ||
                card.address.city.toLowerCase().includes(term)
        );
        setFilteredCards(filtered);
    };

    const handleFavorite = async (cardId) => {
        try {
            await cardService.toggleFavorite(cardId);
            await fetchCards(); // רענון הכרטיסים
            toast.success("Card updated in favorites");
        } catch (error) {
            console.error("Error updating favorite:", error);
            toast.error(error.message || "Failed to update favorite");
        }
    };

    return (
        <>
            <Header
                title={user ? "Business Page" : "Cards Page"}
                subtitle="Browse through our collection of business cards"
            />

            <Container className="py-4">
                <SearchBar onSearch={handleSearch} />

                {isLoading ? (
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        {filteredCards.length === 0 ? (
                            <div className="text-center">
                                <h3>No cards found</h3>
                                <p>Try adjusting your search criteria</p>
                            </div>
                        ) : (
                            <Row xs={1} md={2} lg={3} className="g-4">
                                {filteredCards.map((card) => (
                                    <Col key={card._id}>
                                        <BusinessCard card={card} onFavorite={handleFavorite} mode="all" />
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

export default CardsPage;
