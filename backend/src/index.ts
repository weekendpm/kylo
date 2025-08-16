import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import multipart from '@fastify/multipart';
import { createServer } from './server';
import { logger } from './utils/logger';
import { connectDatabase } from './database/connection';

async function start() {
  try {
    // Test database connection
    await connectDatabase();
    logger.info('Database connected successfully');

    // Create and configure Fastify server
    const server = await createServer();
    
    const port = parseInt(process.env.PORT || '3001', 10);
    const host = process.env.HOST || '0.0.0.0';

    await server.listen({ port, host });
    
    logger.info(`🚀 Revenue Recovery Copilot API running on http://${host}:${port}`);
    logger.info(`📊 Dashboard: http://localhost:3000`);
    
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

start();