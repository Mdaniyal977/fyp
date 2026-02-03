# Quick Setup Guide

## Step 1: Install Dependencies

Run this command from the root directory:
```bash
npm run install-all
```

This will install dependencies for:
- Root project (concurrently for running both servers)
- Backend server (Express, MongoDB, etc.)
- Frontend client (React, Material-UI, etc.)

## Step 2: Set Up MongoDB

### Option A: Local MongoDB
1. Install MongoDB on your system
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/voice-cv-maker`

### Option B: MongoDB Atlas (Cloud - Recommended for FYP)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Replace `<password>` with your database password

## Step 3: Configure Environment Variables

### Backend (.env file in `server/` folder)

Create `server/.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/voice-cv-maker
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/voice-cv-maker

JWT_SECRET=your-super-secret-jwt-key-change-this
OPENAI_API_KEY=sk-your-openai-api-key-here
```

**To get OpenAI API Key:**
1. Go to https://platform.openai.com/
2. Sign up or log in
3. Go to API Keys section
4. Create a new secret key
5. Copy and paste it in `.env` file

**Note:** The app works without OpenAI API key, but AI features will be limited.

### Frontend (Optional - .env file in `client/` folder)

Create `client/.env` file (only if backend is on different URL):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Step 4: Run the Application

### Development Mode (Recommended)
From root directory:
```bash
npm run dev
```

This starts:
- Backend server on http://localhost:5000
- Frontend React app on http://localhost:3000

### Run Separately

**Backend only:**
```bash
cd server
npm run dev
```

**Frontend only:**
```bash
cd client
npm start
```

## Step 5: Access the Application

1. Open your browser
2. Go to http://localhost:3000
3. Register a new account
4. Start creating your CV!

## Troubleshooting

### Port Already in Use
- Backend (5000): Change `PORT` in `server/.env`
- Frontend (3000): React will ask to use a different port

### MongoDB Connection Error
- Check if MongoDB is running
- Verify connection string in `.env`
- For MongoDB Atlas: Check IP whitelist (add 0.0.0.0/0 for development)

### Voice Input Not Working
- Use Chrome or Edge browser
- Allow microphone permissions when prompted
- Check browser console for errors

### Module Not Found Errors
- Run `npm run install-all` again
- Delete `node_modules` folders and reinstall:
  ```bash
  rm -rf node_modules server/node_modules client/node_modules
  npm run install-all
  ```

## Testing the Application

1. **Register/Login**: Create an account
2. **Create CV**: Click "Create New CV"
3. **Test Voice Input**: Click microphone icon and speak
4. **Test AI Analysis**: Click "Analyze CV" button
5. **Save CV**: Click "Save" button
6. **View Dashboard**: Go back to dashboard to see saved CVs

## For FYP Presentation

### Key Features to Demonstrate:
1. ✅ User registration and login
2. ✅ Voice input for CV creation
3. ✅ AI-powered CV analysis
4. ✅ Save and manage multiple CVs
5. ✅ Professional UI with Material-UI

### Technologies Used:
- Frontend: React.js, Material-UI
- Backend: Node.js, Express.js
- Database: MongoDB
- AI: OpenAI API
- Voice: Web Speech API

## Next Steps for Enhancement

1. Add PDF export functionality
2. Implement job recommendations API integration
3. Add more CV templates
4. Implement CV preview mode
5. Add social sharing features

