import axiosInstance from './axiosConfig';
import tokenService from './tokenService';

const BASE_URL = 'https://monkfish-app-z9uza.ondigitalocean.app/bcard2';

const userService = {
    // Fetch the user profile by user ID
    getProfile: async (userId) => {
        console.log('Fetching profile for user ID:', userId); // Debug userId

        try {
            const token = tokenService.getToken();
            if (!token) {
                throw new Error('Authentication token is missing. Please log in again.');
            }

            const response = await fetch(`${BASE_URL}/users/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token, // Pass the token in headers
                },
            });

            const isJson = response.headers.get('content-type')?.includes('application/json');

            if (!response.ok) {
                const errorData = isJson ? await response.json() : await response.text();
                console.error('Profile fetch error:', errorData); // Debug error
                throw new Error(errorData.message || errorData || 'Failed to fetch profile');
            }

            const data = await response.json(); // Parse successful response
            console.log('Profile fetched successfully:', data); // Debug success
            return data;
        } catch (error) {
            console.error('Profile fetch error:', error.message); // Debug error
            throw error;
        }
    },

    // Update the user profile
    updateProfile: async (userId, userData) => {
        try {
            const token = tokenService.getToken();
            if (!token) {
                throw new Error('Authentication token is missing. Please log in again.');
            }

            console.log('Updating profile for userId:', userId); // Debugging userId
            console.log('Payload data:', userData); // Debugging payload

            const response = await axiosInstance.put(
                `/users/${userId}`, // Construct URL dynamically with userId
                {
                    name: {
                        first: userData.first,
                        middle: userData.middle || '',
                        last: userData.last,
                    },
                    phone: userData.phone,
                    image: {
                        url: userData.imageUrl || '',
                        alt: userData.imageAlt || '',
                    },
                    address: {
                        state: userData.state || '',
                        country: userData.country,
                        city: userData.city,
                        street: userData.street,
                        houseNumber: Number(userData.houseNumber),
                        zip: Number(userData.zip) || 0,
                    },
                },
                {
                    headers: { 'x-auth-token': token }, // Pass the token in headers
                }
            );

            console.log('Profile updated successfully:', response.data); // Debugging success
            return response.data;
        } catch (error) {
            console.error('Profile update error:', error.response?.data || error.message); // Debugging error
            throw new Error(error.response?.data?.message || 'Failed to update profile');
        }
    },
    updateBusinessStatus: async (userId, isBusiness) => {
        try {
            const response = await axiosInstance.patch(`/users/${userId}`, { isBusiness });
            return response.data;
        } catch (error) {
            console.error('Error updating business status:', error.response?.data || error.message);
            throw error;
        }
    },

};
export default userService;
