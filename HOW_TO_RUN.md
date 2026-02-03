# How to Run the Voice CV Maker Project

## Prerequisites

Before running the project, make sure you have:

1. **Node.js** installed (v14 or higher)
   - Check: `node --version`
   - Download: https://nodejs.org/

2. **XAMPP** installed and running
   - Download: https://www.apachefriends.org/
   - Make sure **MySQL** service is running in XAMPP Control Panel

3. **npm** (comes with Node.js)
   - Check: `npm --version`

## Step-by-Step Setup

### 1. Start XAMPP MySQL

1. Open **XAMPP Control Panel**
2. Click **Start** next to **MySQL**
3. Wait until MySQL status shows as "Running" (green)

### 2. Install Dependencies

Open a terminal/command prompt in the project root directory and run:

```bash
npm run install-all
```

This will install dependencies for:
- Root project
- Server (backend)
- Client (frontend)

**Note:** If you get errors, you can install them separately:
```bash
npm install
cd server
npm install
cd ../client
npm install
cd ..
```

### 3. Set Up Database

The database should already be set up, but if you need to recreate it:

```bash
cd server
node database/setup.js
cd ..
```

This will:
- Create the `voice_cv_maker` database
- Create `users` and `cvs` tables

**Alternative:** You can also run the SQL file manually in phpMyAdmin:
- Go to http://localhost/phpmyadmin
- Click "New" to create a database
- Select the `voice_cv_maker` database
- Go to "Import" tab
- Upload `server/database/schema.sql`

### 4. Configure Environment Variables

**Server Configuration** (`server/.env`):
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=voice_cv_maker
JWT_SECRET=your-secret-key-change-this-in-production
OPENAI_API_KEY=your-openai-api-key-here
```

**Note:** 
- If your XAMPP MySQL has a password, update `DB_PASSWORD` in `server/.env`
- `OPENAI_API_KEY` is optional (AI features will have limited functionality without it)

**Client Configuration** (Optional - `client/.env`):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

The client should work without this file as it likely has default values.

### 5. Run the Project

From the project root directory, run:

```bash
npm run dev
```

This will start:
- **Backend Server** on http://localhost:5000
- **Frontend React App** on http://localhost:3000

The browser should automatically open to http://localhost:3000

## Running Separately

If you prefer to run backend and frontend separately:

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run client
```

## Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/api/health
- **phpMyAdmin:** http://localhost/phpmyadmin

## Troubleshooting

### MySQL Connection Error

**Problem:** `MySQL connection error` or `ECONNREFUSED`

**Solutions:**
1. Make sure XAMPP MySQL is running (green status in XAMPP Control Panel)
2. Check `server/.env` file has correct MySQL credentials
3. Default XAMPP MySQL settings:
   - Host: `localhost`
   - User: `root`
   - Password: (empty)

### Port Already in Use

**Problem:** `Port 5000 is already in use` or `Port 3000 is already in use`

**Solutions:**
1. Stop other applications using these ports
2. Or change the port in:
   - Backend: `server/.env` → `PORT=5001` (or another port)
   - Frontend: `client/.env` → `PORT=3001` (or another port)

### Database Not Found

**Problem:** `Unknown database 'voice_cv_maker'`

**Solution:**
```bash
cd server
node database/setup.js
```

### Dependencies Not Installed

**Problem:** `Cannot find module` errors

**Solution:**
```bash
npm run install-all
```

Or install manually:
```bash
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..
```

### Frontend Can't Connect to Backend

**Problem:** API calls failing, CORS errors

**Solutions:**
1. Make sure backend is running on port 5000
2. Check `client/.env` has correct API URL
3. Verify backend CORS is enabled (should be by default)

## Project Structure

```
fyp-main/
├── client/              # React frontend
│   ├── src/
│   └── package.json
├── server/              # Node.js backend
│   ├── config/          # Database configuration
│   ├── database/        # SQL schema and setup
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   └── index.js         # Server entry point
├── package.json         # Root package.json
└── HOW_TO_RUN.md        # This file
```

## Quick Start Commands

```bash
# Install everything
npm run install-all

# Setup database
cd server && node database/setup.js && cd ..

# Run project (both frontend and backend)
npm run dev

# Run only backend
npm run server

# Run only frontend
npm run client
```

## Need Help?

1. Check that XAMPP MySQL is running
2. Verify all dependencies are installed
3. Check `.env` files are configured correctly
4. Look at the terminal output for specific error messages
5. Verify ports 3000 and 5000 are available
