@echo off
echo ========================================
echo   Voice CV Maker - Starting Project
echo ========================================
echo.

echo Step 1: Checking XAMPP MySQL...
echo Please make sure XAMPP MySQL is running!
echo.
pause

echo Step 2: Killing old processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo Step 3: Starting Backend Server...
start "Backend Server - Port 5000" cmd /k "cd server && npm run dev"

timeout /t 5 /nobreak >nul

echo Step 4: Starting Frontend Client...
start "Frontend Client - Port 3000" cmd /k "cd client && npm start"

echo.
echo ========================================
echo   Project Started Successfully!
echo ========================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to close this window...
pause >nul
