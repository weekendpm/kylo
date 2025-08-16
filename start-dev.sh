#!/bin/bash

# Revenue Recovery Copilot - Development Server Startup Script

echo "🚀 Starting Revenue Recovery Copilot Development Environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check if PostgreSQL is running
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL is not installed. Please install PostgreSQL 14+ and create the database."
    echo "   Run: createdb revenue_recovery"
fi

# Check if Redis is running
if ! command -v redis-cli &> /dev/null; then
    echo "⚠️  Redis is not installed. Please install Redis 6+ for background jobs."
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing root dependencies..."
    npm install
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Copying from env.example..."
    cp env.example .env
    echo "   Please edit .env with your configuration before continuing."
    echo "   Required: DATABASE_URL, JWT_SECRET"
    exit 1
fi

# Run database migrations
echo "🗄️  Running database migrations..."
cd backend && npm run db:migrate && cd ..

# Start the development servers
echo "🌟 Starting development servers..."
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop all servers"

npm run dev