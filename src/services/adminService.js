import axiosInstance from './axiosConfig';

const adminService = {
    // ✅ משיכת כל המשתמשים
    getAllUsers: async () => {
        try {
            const response = await axiosInstance.get('/users');
            console.log("Fetched Users:", response.data); // בדוק את הנתונים שמוחזרים
            return response.data;
        } catch (error) {
            console.error("Get All Users Error:", error.response?.data || error.message);
            throw {
                message: error.response?.data?.message || 'Failed to fetch users',
                status: error.response?.status
            };
        }
    },

    // ✅ עדכון משתמש
    updateUser: async (userId, userData) => {
        try {
            console.log(`Updating user with ID: ${userId}`, userData);

            const response = await axiosInstance.put(`/users/${userId}`, userData);
            console.log("Update User Response:", response.data); // בדוק את התגובה מהשרת
            return response.data;
        } catch (error) {
            console.error("Update User Error:", error.response?.data || error.message);
            throw {
                message: error.response?.data?.message || 'Failed to update user',
                status: error.response?.status
            };
        }
    },

    // ✅ עדכון סטטוס משתמש ל-Business/Regular
    updateUserStatus: async (userId, isBusiness) => {
        try {
            console.log(`Updating user status for ID: ${userId}, isBusiness: ${isBusiness}`);

            // שליחת בקשת PATCH עם `isBusiness` בגוף הבקשה
            const response = await axiosInstance.patch(`/users/${userId}`, { isBusiness });
            console.log("Update Status Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Update User Status Error:", error.response?.data || error.message);
            throw {
                message: error.response?.data?.message || 'Failed to update user status',
                status: error.response?.status
            };
        }
    },


    // ✅ מחיקת משתמש
    deleteUser: async (userId) => {
        try {
            console.log(`Deleting user: ${userId}`);
            const response = await axiosInstance.delete(`/users/${userId}`);
            console.log("Delete Response:", response.data); // בדוק את התגובה מהשרת
            return response.data;
        } catch (error) {
            console.error("Delete User Error:", error.response?.data || error.message);
            throw {
                message: error.response?.data?.message || 'Failed to delete user',
                status: error.response?.status
            };
        }
    }
};

export default adminService;
