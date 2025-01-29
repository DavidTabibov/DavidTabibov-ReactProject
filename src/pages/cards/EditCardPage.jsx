import React, { useEffect, useState } from "react";
import { Container, Form, Button, Card, Spinner, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/layout/Header";
import cardService from "../../services/cardService";

const EditCardPage = () => {
    const [cardData, setCardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchCardDetails();
    }, [id]);

    const fetchCardDetails = async () => {
        try {
            const card = await cardService.getCardById(id);
            setCardData(card);
        } catch (error) {
            toast.error("Failed to fetch card details.");
            navigate("/my-cards");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const payload = {
            title: formData.get("title"),
            subtitle: formData.get("subtitle"),
            description: formData.get("description"),
            phone: formData.get("phone"),
            email: formData.get("email"),
            web: formData.get("web") || "",
            image: {
                url: formData.get("imageUrl") || "",
                alt: formData.get("imageAlt") || "Card image",
            },
            address: {
                state: formData.get("state") || "",
                country: formData.get("country"),
                city: formData.get("city"),
                street: formData.get("street"),
                houseNumber: Number(formData.get("houseNumber")),
                zip: Number(formData.get("zip")) || 0,
            },
        };

        try {
            await cardService.updateCard(id, payload);
            toast.success("Card updated successfully!");
            navigate("/my-cards");
        } catch (error) {
            toast.error("Failed to update the card.");
        }
    };

    if (isLoading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" />
            </Container>
        );
    }

    if (!cardData) return null;

    return (
        <Container className="py-4">
            <Header
                title="Edit Card"
                subtitle="Update your card details"
            />
            <Card className="p-4 mx-auto" style={{ maxWidth: "900px" }}>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="title" className="mb-3">
                                <Form.Label>Title *</Form.Label>
                                <Form.Control name="title" defaultValue={cardData.title} required />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="subtitle" className="mb-3">
                                <Form.Label>Subtitle *</Form.Label>
                                <Form.Control name="subtitle" defaultValue={cardData.subtitle} required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="description" className="mb-3">
                        <Form.Label>Description *</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            defaultValue={cardData.description}
                            required
                        />
                    </Form.Group>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="phone" className="mb-3">
                                <Form.Label>Phone *</Form.Label>
                                <Form.Control name="phone" defaultValue={cardData.phone} required />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="email" className="mb-3">
                                <Form.Label>Email *</Form.Label>
                                <Form.Control type="email" name="email" defaultValue={cardData.email} required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="web" className="mb-3">
                                <Form.Label>Website</Form.Label>
                                <Form.Control name="web" defaultValue={cardData.web || ""} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="imageUrl" className="mb-3">
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control name="imageUrl" defaultValue={cardData.image.url} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="imageAlt" className="mb-3">
                                <Form.Label>Image Alt</Form.Label>
                                <Form.Control name="imageAlt" defaultValue={cardData.image.alt} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="state" className="mb-3">
                                <Form.Label>State</Form.Label>
                                <Form.Control name="state" defaultValue={cardData.address.state} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="country" className="mb-3">
                                <Form.Label>Country *</Form.Label>
                                <Form.Control name="country" defaultValue={cardData.address.country} required />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="city" className="mb-3">
                                <Form.Label>City *</Form.Label>
                                <Form.Control name="city" defaultValue={cardData.address.city} required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="street" className="mb-3">
                                <Form.Label>Street *</Form.Label>
                                <Form.Control name="street" defaultValue={cardData.address.street} required />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="houseNumber" className="mb-3">
                                <Form.Label>House Number *</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="houseNumber"
                                    defaultValue={cardData.address.houseNumber}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="zip" className="mb-3">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control type="number" name="zip" defaultValue={cardData.address.zip} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-between">
                        <Button
                            variant="outline-danger"
                            onClick={() => navigate("/my-cards")}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary"
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = 'var(--button-hover-bg-primary, #007bff)';
                                e.target.style.color = 'var(--button-hover-text-primary, #fff)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.color = 'var(--button-text-color, #007bff)';
                            }}
                        >
                            Submit
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default EditCardPage;
