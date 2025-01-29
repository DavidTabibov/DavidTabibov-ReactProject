import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ThemeContext } from '../../context/ThemeContext'; // Assuming ThemeContext exists

const DeleteModal = ({ show, onClose, confirmDelete }) => {
    const { isDarkMode } = useContext(ThemeContext); // Get dark mode state

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header
                closeButton
                className={isDarkMode ? "bg-dark text-white border-secondary" : ""}
            >
                <Modal.Title>Delete Card</Modal.Title>
            </Modal.Header>
            <Modal.Body className={`text-center py-4 ${isDarkMode ? "bg-dark text-white" : ""}`}>
                <p className={isDarkMode ? "text-light" : ""}>
                    Are you sure you want to delete this card?
                </p>
                <p className={`text-muted small ${isDarkMode ? "text-secondary" : ""}`}>
                    This action cannot be undone.
                </p>
            </Modal.Body>
            <Modal.Footer className={isDarkMode ? "bg-dark text-white border-secondary" : ""}>
                <Button variant={isDarkMode ? "outline-light" : "primary"} onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={confirmDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;
