import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import multipart from '@fastify/multipart';
import { logger } from './utils/logger';

// Route imports
import authRoutes from './routes/auth';
import integrationRoutes from './routes/integrations';
import productRoutes from './routes/products';
import reconRoutes from './routes/reconciliation';
import actionRoutes from './routes/actions';
import dashboardRoutes from './routes/dashboard';
import exportRoutes from './routes/exports';

export async function createServer(): Promise<FastifyInstance> {
  const server = Fastify({
    logger: {
      level: process.env.LOG_LEVEL || 'info',
    },
    trustProxy: true,
  });

  // Register plugins
  await server.register(cors, {
    origin: [
      'http://localhost:3000',
      'https://localhost:3000',
      process.env.FRONTEND_URL || 'http://localhost:3000'
    ],
    credentials: true,
  });

  await server.register(jwt, {
    secret: process.env.JWT_SECRET || 'super-secret-key-change-in-production',
    sign: {
      expiresIn: '24h',
    },
  });

  await server.register(multipart);

  // Health check
  server.get('/health', async (request, reply) => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  // Authentication decorator
  server.decorate('authenticate', async function (request: any, reply: any) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ error: 'Unauthorized' });
    }
  });

  // Organization context decorator
  server.decorate('requireOrg', async function (request: any, reply: any) {
    const { org_id } = request.user;
    if (!org_id) {
      reply.code(403).send({ error: 'Organization context required' });
      return;
    }
    request.org_id = org_id;
  });

  // Register routes
  await server.register(authRoutes, { prefix: '/api/auth' });
  await server.register(integrationRoutes, { prefix: '/api/integrations' });
  await server.register(productRoutes, { prefix: '/api/products' });
  await server.register(reconRoutes, { prefix: '/api/recon' });
  await server.register(actionRoutes, { prefix: '/api/actions' });
  await server.register(dashboardRoutes, { prefix: '/api/dashboard' });
  await server.register(exportRoutes, { prefix: '/api/exports' });

  // Global error handler
  server.setErrorHandler((error, request, reply) => {
    logger.error('Unhandled error:', error);
    
    if (error.statusCode) {
      reply.status(error.statusCode).send({
        error: error.message,
        statusCode: error.statusCode,
      });
    } else {
      reply.status(500).send({
        error: 'Internal Server Error',
        statusCode: 500,
      });
    }
  });

  return server;
}