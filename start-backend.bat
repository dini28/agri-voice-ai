@echo off
echo Starting AgriNova Backend Server...
echo.

cd backend

echo Installing dependencies...
call npm install

echo.
echo Starting server...
echo Backend will be available at http://localhost:3001
echo Press Ctrl+C to stop the server
echo.

call npm run dev

pause
