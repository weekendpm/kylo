import { FastifyInstance } from 'fastify';
import { getDatabase } from '../database/connection';
import { logger } from '../utils/logger';

export default async function productRoutes(fastify: FastifyInstance) {
  const db = getDatabase();

  // Get all products and mappings
  fastify.get('/mappings', {
    preHandler: [fastify.authenticate, fastify.requireOrg]
  }, async (request: any, reply) => {
    try {
      const mappings = await db('usage_event_mappings')
        .join('products', 'usage_event_mappings.product_id', 'products.id')
        .where('usage_event_mappings.org_id', request.org_id)
        .where('usage_event_mappings.active', true)
        .select(
          'usage_event_mappings.*',
          'products.name as product_name',
          'products.external_id as product_external_id'
        );

      return { mappings };
    } catch (error) {
      logger.error('Failed to get product mappings:', error);
      return reply.code(500).send({ error: 'Failed to get product mappings' });
    }
  });

  // Create or update product mapping
  fastify.post('/mappings', {
    preHandler: [fastify.authenticate, fastify.requireOrg]
  }, async (request: any, reply) => {
    try {
      // Placeholder for mapping creation
      return reply.code(501).send({ error: 'Product mapping creation not implemented yet' });
    } catch (error) {
      logger.error('Failed to create product mapping:', error);
      return reply.code(500).send({ error: 'Failed to create product mapping' });
    }
  });
}