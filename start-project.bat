@echo off
echo Starting Combo Meal Recommendation Engine...
echo.
echo Starting Backend Server...
start "Backend Server" cmd /k "cd /d c:\Users\asif1\Desktop\Menu\backend && node server.js"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd /d c:\Users\asif1\Desktop\Menu\frontend && npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
pause
