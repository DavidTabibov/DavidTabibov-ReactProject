const BASE_URL = 'https://monkfish-app-z9uza.ondigitalocean.app/bcard2';
const authService = {
    // Register method
    register: async (userData) => {
        console.log('Registering user with:', userData);

        try {
            const url = `${BASE_URL}/users`;
            console.log('API URL:', url); // Log the full URL being called
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            console.log('API Response Status:', response.status); // Debugging response status
            console.log('API Response Headers:', response.headers); // Debugging response headers
            const isJson = response.headers.get('content-type')?.includes('application/json');

            if (!response.ok) {
                // Handle errors (JSON or plain text)
                if (isJson) {
                    const errorData = await response.json(); // Parse JSON error
                    throw new Error(errorData.message || 'Registration failed');
                } else {
                    const errorText = await response.text(); // Parse plain-text error
                    throw new Error(errorText.trim() || 'Registration failed');
                }
            }

            // Handle successful response
            if (isJson) {
                const data = await response.json(); // Parse JSON response
                console.log('Registration successful:', data);
                return data;
            } else {
                const textResponse = await response.text(); // Handle plain text
                console.log('Registration successful:', textResponse);
                return { message: textResponse };
            }
        } catch (error) {
            throw error;
        }
    },

    // Login method
    login: async (credentials) => {
        try {
            const response = await fetch(`${BASE_URL}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            const responseBody = await response.text(); // Read response as text

            if (!response.ok) {
                try {
                    const errorData = JSON.parse(responseBody); // Try parsing JSON error
                    throw new Error(errorData?.message || 'Invalid email or password.');
                } catch {
                    throw new Error(responseBody.trim() || 'Invalid email or password.'); // Handle plain-text error
                }
            }

            // ✅ Detect if response is a JSON object or a plain text token
            if (responseBody.startsWith("{")) {
                return JSON.parse(responseBody); // ✅ Response is JSON, parse normally
            } else {
                return { token: responseBody.trim() }; // ✅ Response is plain text token
            }

        } catch (err) {
            console.error("Login error:", err?.message || "Unknown error occurred"); // ✅ Prevents undefined errors
            throw new Error(err?.message || 'Something went wrong. Please try again.');
        }
    },



    // Update user method
    updateUser: async (userId, userData) => {
        try {
            const response = await fetch(`${BASE_URL}/users/${userId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const responseBody = await response.text(); // Read response as plain text first

            if (!response.ok) {
                try {
                    const errorData = JSON.parse(responseBody); // Parse JSON error
                    throw new Error(errorData.message || 'Update failed');
                } catch {
                    throw new Error(responseBody.trim() || 'Update failed'); // Handle plain text error
                }
            }

            return JSON.parse(responseBody); // Expecting JSON for updated user details
        } catch (error) {
            console.error('Update error:', error);
            throw error;
        }
    },

    // Delete user method
    deleteUser: async (userId) => {
        try {
            const response = await fetch(`${BASE_URL}/users/${userId}`, {
                method: 'DELETE',
            });

            const responseBody = await response.text(); // Read response as plain text first

            if (!response.ok) {
                try {
                    const errorData = JSON.parse(responseBody); // Parse JSON error
                    throw new Error(errorData.message || 'Delete failed');
                } catch {
                    throw new Error(responseBody.trim() || 'Delete failed'); // Handle plain text error
                }
            }

            return JSON.parse(responseBody); // Expecting JSON for delete confirmation
        } catch (error) {
            console.error('Delete error:', error);
            throw error;
        }
    },

    // Save token to localStorage
    saveToken: (token) => {
        localStorage.setItem('token', token);
    },

    // Remove token from localStorage
    removeToken: () => {
        localStorage.removeItem('token');
    },

    // Get token from localStorage
    getToken: () => {
        return localStorage.getItem('token');
    },

    // Decode JWT token
    getDecodedToken: () => {
        const token = localStorage.getItem('token');
        if (!token) return null;

        try {
            const payload = token.split('.')[1];
            return JSON.parse(atob(payload)); // Decode and parse the token
        } catch (error) {
            console.error('Failed to decode token:', error);
            return null; // Return null if decoding fails
        }
    },
};

export default authService;
