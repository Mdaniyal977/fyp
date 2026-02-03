# Quick Start Guide

## 🚀 Fast Setup (3 Steps)

### Step 1: Start XAMPP MySQL
- Open **XAMPP Control Panel**
- Click **Start** for **MySQL** (wait until it's green/running)

### Step 2: Install Dependencies
```bash
npm run install-all
```

### Step 3: Run the Project
```bash
npm run dev
```

That's it! The app will open at **http://localhost:3000**

---

## 📋 What Happens When You Run `npm run dev`?

- ✅ Backend server starts on **http://localhost:5000**
- ✅ Frontend React app starts on **http://localhost:3000**
- ✅ Browser automatically opens

---

## 🔧 If Something Goes Wrong

### Database Error?
```bash
cd server
node database/setup.js
cd ..
```

### Port Already in Use?
- Stop other apps using ports 3000 or 5000
- Or kill the process: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`

### Dependencies Missing?
```bash
npm run install-all
```

---

## 📁 Important Files

- **Backend Config:** `server/.env`
- **Database Setup:** `server/database/setup.js`
- **SQL Schema:** `server/database/schema.sql`

---

## 🌐 Access Points

- **App:** http://localhost:3000
- **API:** http://localhost:5000
- **Health Check:** http://localhost:5000/api/health
- **phpMyAdmin:** http://localhost/phpmyadmin

---

For detailed instructions, see **HOW_TO_RUN.md**
