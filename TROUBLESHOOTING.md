# Troubleshooting Guide - Network Errors

## Common Network Errors & Solutions

### Error: "Failed to save CV: Network Error"

**Possible Causes:**
1. Backend server is not running
2. Server is running on different port
3. Firewall blocking connection
4. CORS issues

**Solutions:**

#### 1. Check if Backend Server is Running
```bash
# Open terminal in project root
npm run dev

# Or run separately:
cd server
npm run dev
```

#### 2. Verify Server is Running
- Open browser: http://localhost:5000/api/health
- Should see: `{"status":"OK","message":"Server is running"}`

#### 3. Check Server Port
- Default port: 5000
- If changed, update `client/.env`:
```
REACT_APP_API_URL=http://localhost:YOUR_PORT/api
```

#### 4. Check MySQL/XAMPP
- Make sure XAMPP MySQL is running
- Check `server/.env` has correct MySQL credentials

---

### Error: "Failed to improve text"

**Possible Causes:**
1. Backend server not running
2. OpenAI API key not configured
3. Network timeout
4. Authentication expired

**Solutions:**

#### 1. Check Backend Server
```bash
cd server
npm run dev
```

#### 2. Check OpenAI API Key
- Open `server/.env`
- Verify `OPENAI_API_KEY` is set
- Should be: `OPENAI_API_KEY=sk-proj-...`

#### 3. Check Authentication
- Make sure you're logged in
- Token might be expired - try logging out and back in

---

## Quick Fixes

### Fix 1: Restart Everything
```bash
# Stop all running processes (Ctrl+C)

# Start fresh
npm run dev
```

### Fix 2: Check Ports
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill process if needed
taskkill /PID <PID> /F
```

### Fix 3: Clear Browser Cache
- Press Ctrl+Shift+Delete
- Clear cache and cookies
- Refresh page (Ctrl+F5)

### Fix 4: Check Environment Variables
- `server/.env` should have:
  ```
  PORT=5000
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=
  DB_NAME=voice_cv_maker
  OPENAI_API_KEY=your-key-here
  ```

---

## Step-by-Step Debugging

### Step 1: Check Backend
```bash
cd server
node index.js
```
Should see: "Server is running on port 5000"

### Step 2: Check Database
```bash
cd server
node database/setup.js
```
Should see: "Database setup completed successfully!"

### Step 3: Check Frontend
```bash
cd client
npm start
```
Should open: http://localhost:3000

### Step 4: Test API
Open browser: http://localhost:5000/api/health
Should return: `{"status":"OK","message":"Server is running"}`

---

## Common Issues

### Issue: "ECONNREFUSED"
**Solution:** Backend server is not running. Start it with `npm run dev`

### Issue: "Timeout"
**Solution:** Server is slow or overloaded. Check server logs.

### Issue: "401 Unauthorized"
**Solution:** Token expired. Logout and login again.

### Issue: "503 Service Unavailable"
**Solution:** AI service not configured. Add OpenAI API key to `server/.env`

---

## Still Having Issues?

1. Check browser console (F12) for detailed errors
2. Check server terminal for error messages
3. Verify all dependencies installed: `npm run install-all`
4. Make sure MySQL is running in XAMPP
5. Check firewall settings

---

## Quick Test

Run this in browser console (F12):
```javascript
fetch('http://localhost:5000/api/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

If this works, server is running. If not, start the server.
