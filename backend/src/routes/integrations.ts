import { FastifyInstance } from 'fastify';
import { getDatabase } from '../database/connection';
import { logger } from '../utils/logger';

export default async function integrationRoutes(fastify: FastifyInstance) {
  const db = getDatabase();

  // Get all integrations for org
  fastify.get('/', {
    preHandler: [fastify.authenticate, fastify.requireOrg]
  }, async (request: any, reply) => {
    try {
      const integrations = await db('integrations')
        .where('org_id', request.org_id)
        .select('*');

      return { integrations };
    } catch (error) {
      logger.error('Failed to get integrations:', error);
      return reply.code(500).send({ error: 'Failed to get integrations' });
    }
  });

  // Connect Stripe integration
  fastify.post('/stripe/connect', {
    preHandler: [fastify.authenticate, fastify.requireOrg]
  }, async (request: any, reply) => {
    try {
      // Placeholder for Stripe OAuth flow
      return reply.code(501).send({ error: 'Stripe integration not implemented yet' });
    } catch (error) {
      logger.error('Failed to connect Stripe:', error);
      return reply.code(500).send({ error: 'Failed to connect Stripe' });
    }
  });

  // Get integration status
  fastify.get('/status', {
    preHandler: [fastify.authenticate, fastify.requireOrg]
  }, async (request: any, reply) => {
    try {
      const status = await db('integrations')
        .where('org_id', request.org_id)
        .select('type', 'status', 'last_sync_at')
        .then(rows => rows.reduce((acc, row) => {
          acc[row.type] = {
            status: row.status,
            last_sync_at: row.last_sync_at
          };
          return acc;
        }, {} as Record<string, any>));

      return { status };
    } catch (error) {
      logger.error('Failed to get integration status:', error);
      return reply.code(500).send({ error: 'Failed to get integration status' });
    }
  });
}