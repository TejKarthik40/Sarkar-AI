@echo off
echo Starting Sarkar AI...

echo Starting Backend...
start cmd /k "cd backend && uvicorn main:app --reload"

echo Starting Frontend...
start cmd /k "cd frontend && npm run dev"

echo Done! Access Frontend at http://localhost:3000 and Backend at http://localhost:8000/docs
