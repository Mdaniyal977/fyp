# Quick Fix Guide - Server Crash & Port Issues

## 🔧 Fix Server Crash & Port 3000 Issue

### Step 1: Kill All Node Processes
```bash
taskkill /F /IM node.exe
```

### Step 2: Check Ports
```bash
# Check port 3000
netstat -ano | findstr :3000

# Check port 5000
netstat -ano | findstr :5000

# Kill specific process if needed
taskkill /PID <PID> /F
```

### Step 3: Start Fresh
```bash
# Option 1: Use the batch file
restart-server.bat

# Option 2: Manual start
npm run dev
```

---

## 🚨 Common Issues & Fixes

### Issue 1: Port 3000 Already in Use
**Fix:**
```bash
# Find process
netstat -ano | findstr :3000

# Kill it
taskkill /PID <PID> /F

# Or kill all node processes
taskkill /F /IM node.exe
```

### Issue 2: Server Crashed
**Possible Causes:**
1. MySQL not running
2. Database connection error
3. Syntax error in code

**Fix:**
1. Check XAMPP MySQL is running
2. Check `server/.env` file
3. Check server terminal for error messages
4. Restart server

### Issue 3: Network Errors
**Fix:**
1. Make sure backend is running on port 5000
2. Check `http://localhost:5000/api/health`
3. Verify MySQL is running

---

## ✅ Quick Restart Steps

1. **Stop Everything:**
   ```bash
   taskkill /F /IM node.exe
   ```

2. **Wait 2 seconds**

3. **Start Server:**
   ```bash
   npm run dev
   ```

4. **Check:**
   - Backend: http://localhost:5000/api/health
   - Frontend: http://localhost:3000

---

## 🔍 Debug Steps

### Check Server Logs:
Look at terminal output for:
- MySQL connection errors
- Port already in use
- Syntax errors
- Missing dependencies

### Check Browser Console:
Press F12 → Console tab
- Look for network errors
- Check API calls
- See detailed error messages

---

## 💡 Pro Tips

1. **Always check MySQL is running** before starting server
2. **Kill old processes** before restarting
3. **Check both ports** (3000 and 5000)
4. **Read error messages** carefully - they tell you what's wrong

---

## 🆘 Still Having Issues?

1. Check `server/.env` file exists and has correct values
2. Run `npm run install-all` to ensure all dependencies installed
3. Check XAMPP MySQL is running
4. Look at server terminal for specific error messages
