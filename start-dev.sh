#!/bin/bash

# Kylo.ai Frontend - Development Server Startup Script

echo "🚀 Starting Kylo.ai Frontend Development Environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Start the development server
echo "🌟 Starting frontend development server..."
echo "   Frontend: http://localhost:3000"
echo "   Demo Login: demo@demo (any password)"
echo ""
echo "Press Ctrl+C to stop the server"

# Start frontend in development mode
npm run dev