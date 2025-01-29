import axiosInstance from './axiosConfig'; // Using pre-configured Axios instance
import tokenService from './tokenService'; // Token service for authentication

const cardService = {
    // Fetch all cards
    getAllCards: async () => {
        try {
            console.log('Requesting all cards from:', axiosInstance.defaults.baseURL + '/cards');
            const response = await axiosInstance.get('/cards');
            return response.data;
        } catch (error) {
            console.error('Error fetching all cards:', {
                url: error.config?.url,
                method: error.config?.method,
                headers: error.config?.headers,
                data: error.response?.data, // Backend response
                message: error.message,
            });
            throw error;
        }
    },


    // Fetch logged-in user's cards
    getMyCards: async () => {
        try {
            const response = await axiosInstance.get('/cards/my-cards');
            return response.data;
        } catch (error) {
            console.error('Error fetching my cards:', error.message);
            throw error;
        }
    },

    // Fetch favorite cards
    getFavoriteCards: async () => {
        try {
            const response = await axiosInstance.get('/cards'); // Fetch all cards
            return response.data.filter((card) => card.isFavorite); // Filter favorite cards
        } catch (error) {
            console.error('Error fetching favorite cards:', error.response?.data || error.message);
            throw new Error('Failed to fetch favorite cards');
        }
    },

    // Create a new card
    createCard: async (cardData) => {
        try {
            const token = tokenService.getToken();
            const response = await axiosInstance.post('/cards', cardData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update an existing card
    updateCard: async (cardId, cardData) => {
        try {
            const response = await axiosInstance.put(`/cards/${cardId}`, cardData);
            return response.data;
        } catch (error) {
            console.error('Error updating card:', error.message);
            throw error;
        }
    },

    // Toggle favorite status of a card using PATCH
    toggleFavorite: async (cardId) => {
        try {
            console.log(`Toggling favorite status for card ID: ${cardId}`); // Debugging
            const response = await axiosInstance.patch(`/cards/${cardId}`); // Adjusted endpoint
            console.log('Toggled favorite status for card:', response.data); // Debugging response
            return response.data;
        } catch (error) {
            console.error('Error toggling favorite status:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Failed to toggle favorite status');
        }
    },

    // Fetch a single card by ID
    getCardById: async (cardId) => {
        try {
            const response = await axiosInstance.get(`/cards/${cardId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching card by ID:', error.response?.data || error.message);
            throw new Error('Failed to fetch card details');
        }
    },

    // Delete a card by ID
    deleteCard: async (cardId) => {
        try {
            const response = await axiosInstance.delete(`/cards/${cardId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting card:', error.response?.data || error.message);
            throw new Error('Failed to delete card');
        }
    },
};

export default cardService;
