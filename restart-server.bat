@echo off
echo Stopping existing processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo Starting server...
cd server
start "Backend Server" cmd /k "npm run dev"

timeout /t 3 /nobreak >nul

echo Starting client...
cd ../client
start "Frontend Client" cmd /k "npm start"

echo.
echo Server and Client starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
pause
