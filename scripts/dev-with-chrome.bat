@echo off
echo Starting Next.js development server...
echo.
echo The server will open in Chrome automatically in a few seconds...
echo.

REM Start Next.js dev server in background and open Chrome after delay
start /B npm run dev
timeout /t 5 /nobreak >nul
start chrome http://localhost:3000

echo.
echo Server is running at http://localhost:3000
echo Chrome should open automatically.
echo.
echo Press Ctrl+C to stop the server.
