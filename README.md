# Business Card Management System

## Project Overview
A comprehensive web application designed to create, manage, and share digital business cards efficiently. This platform allows users to:
- Create professional digital business cards
- Store and organize contact information
- Share business card details securely
- Manage personal and professional networking contacts

## Key Features
- 🆕 Create personalized business cards
- 📝 Edit and update card details
- 🗑️ Delete business cards
- 👥 User authentication and profile management
- 🔒 Secure storage of contact information
- 📱 Responsive design for mobile and desktop

## API Configuration
- **Base URL:** `https://monkfish-app-z9uza.ondigitalocean.app/bcard2`

## Prerequisites
- Node.js (version 16 or higher)
- npm (Node Package Manager)

## Project Setup

### 1. Clone the Repository
```bash
git clone https://github.com/DavidTabibov/business-card-project.git
cd business-card-project
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the project root and add:
```env
REACT_APP_API_URL=https://monkfish-app-z9uza.ondigitalocean.app/bcard2
```

### 4. Run the Development Server
```bash
npm run dev
```
🔗 Application will run at: http://localhost:5173/

### 5. Build for Production
```bash
npm run build
```

## Technologies Used
- 🚀 React
- ⚡ Vite
- 🔐 JWT Authentication
- 🎨 Bootstrap for Responsive Design
- 🌐 Axios for API Communication

## User Workflow
1. Register or Log in to the application
2. Create a new business card with your professional details
3. Edit or update your card as needed
4. Share your digital business card with colleagues and contacts
5. Manage and organize multiple business cards

## Troubleshooting
- Ensure all dependencies are installed correctly
- Verify internet connection
- Check environment variables are set properly
- Clear browser cache if experiencing unexpected issues

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/BusinessCardEnhancement`)
3. Commit your changes (`git commit -m 'Add business card sharing feature'`)
4. Push to the branch (`git push origin feature/BusinessCardEnhancement`)
5. Open a Pull Request

## Security
- Secure user authentication
- Protected routes
- Encrypted data transmission
- Personal information protection

## Future Enhancements
- QR code generation for business cards
- Advanced sharing options
- Integration with professional networking platforms

## License
Distributed under the MIT License.

## Contact
For support or inquiries, please open an issue in the GitHub repository.

## Acknowledgments
- React Community
- Vite Build Tool
- DigitalOcean Hosting Platform