@echo off
echo Starting Voice CV Maker...
echo.
echo Starting backend server...
start "Backend Server" cmd /k "cd server && npm run dev"
timeout /t 3 /nobreak >nul
echo.
echo Starting frontend client...
start "Frontend Client" cmd /k "cd client && npm start"
echo.
echo Both servers are starting...
echo Backend will be available at http://localhost:5000
echo Frontend will be available at http://localhost:3000
echo.
pause

