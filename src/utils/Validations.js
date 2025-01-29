const validations = {
    // Name validation
    name: {
        required: "This field is required",
        minLength: {
            value: 2,
            message: "Name must be at least 2 characters long"
        }
    },

    // Email validation
    email: {
        required: "This field is required",
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address"
        }
    },

    // Phone validation
    phone: {
        required: "This field is required",
        pattern: {
            value: /^0[2-9]\d{7,8}$/,
            message: "Invalid phone number"
        }
    },

    // Password validation
    password: {
        required: "This field is required",
        pattern: {
            value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*\-_])[A-Za-z\d!@#$%^&*\-_]{8,}$/,
            message: "Password must contain at least 8 characters, including uppercase, lowercase, number and special character"
        }
    },

    // General text field validation
    text: {
        required: "This field is required"
    }
};

export default validations;