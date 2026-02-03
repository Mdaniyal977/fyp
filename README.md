# Voice-Activated CV Maker with AI-Powered Optimization

A full-stack web application that allows users to create professional CVs using voice input and AI-powered optimization suggestions.

## Features

- 🎤 **Voice-Activated CV Creation**: Speak your information and it's automatically converted to text
- 🤖 **AI-Powered Suggestions**: Get intelligent recommendations to improve your CV
- 📝 **Comprehensive CV Sections**: Personal info, work experience, education, skills, certifications, and more
- 💾 **Save & Manage Multiple CVs**: Create and manage multiple CV versions
- 🔐 **User Authentication**: Secure sign up and login system
- 📊 **Dashboard**: Easy access to all your saved CVs

## Technology Stack

### Frontend
- React.js
- Material-UI (MUI)
- React Router
- React Speech Recognition
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- OpenAI API Integration

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd E:\FYP
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```
   This will install dependencies for root, server, and client.

3. **Set up environment variables**

   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/voice-cv-maker
   JWT_SECRET=your-secret-key-change-this-in-production
   OPENAI_API_KEY=your-openai-api-key-here
   ```

   For the client, create a `.env` file in the `client` directory (optional):
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start MongoDB**
   - If using local MongoDB, make sure the MongoDB service is running
   - Or use MongoDB Atlas and update the `MONGODB_URI` in `.env`

## Running the Application

### Development Mode (Both Frontend and Backend)

From the root directory:
```bash
npm run dev
```

This will start both the backend server (port 5000) and the React frontend (port 3000).

### Run Separately

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm run client
```

## Usage

1. **Register/Login**: Create an account or sign in
2. **Create CV**: Click "Create New CV" on the dashboard
3. **Voice Input**: Click the microphone icon next to any field to start voice input
4. **AI Analysis**: Click "Analyze CV" in the AI Suggestions panel to get improvement recommendations
5. **Save**: Click "Save" to store your CV
6. **Edit**: Access your saved CVs from the dashboard

## Project Structure

```
voice-cv-maker/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/       # React context (Auth)
│   │   ├── pages/         # Page components
│   │   └── App.js
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
│   └── index.js
├── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### CV Management
- `GET /api/cv` - Get all CVs for user
- `GET /api/cv/:id` - Get single CV
- `POST /api/cv` - Create new CV
- `PUT /api/cv/:id` - Update CV
- `DELETE /api/cv/:id` - Delete CV

### AI Features
- `POST /api/ai/analyze` - Analyze CV and get suggestions
- `POST /api/ai/improve-text` - Improve specific text
- `GET /api/ai/job-recommendations` - Get job recommendations

## Voice Input

The application uses the Web Speech API for voice recognition. For best results:
- Use Chrome or Edge browser
- Ensure microphone permissions are granted
- Speak clearly and pause between sentences

## AI Features

The AI features require an OpenAI API key:
1. Get an API key from [OpenAI](https://platform.openai.com/)
2. Add it to `server/.env` as `OPENAI_API_KEY`
3. The app will work without it but AI features will be limited

## Future Enhancements

- Video CV feature
- LinkedIn integration
- ATS-friendly CV checker
- Multi-language voice support
- Resume scoring system
- PDF export functionality
- Job recommendations based on CV content

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally, or
- Update `MONGODB_URI` in `.env` with your MongoDB Atlas connection string

### Voice Input Not Working
- Check browser compatibility (Chrome/Edge recommended)
- Grant microphone permissions in browser settings
- Check if HTTPS is required (some browsers require HTTPS for microphone access)

### AI Features Not Working
- Verify `OPENAI_API_KEY` is set in `server/.env`
- Check your OpenAI API quota/credits
- The app will still work with fallback suggestions

## License

MIT License - Feel free to use this project for your FYP!

## Support

For issues or questions, please check the code comments or create an issue in your repository.

