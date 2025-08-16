import { FastifyInstance } from 'fastify';
import { getDatabase } from '../database/connection';
import { logger } from '../utils/logger';

export default async function actionRoutes(fastify: FastifyInstance) {
  const db = getDatabase();

  // Create Stripe draft invoice action
  fastify.post('/stripe/draft-invoice', {
    preHandler: [fastify.authenticate, fastify.requireOrg]
  }, async (request: any, reply) => {
    try {
      // Placeholder for Stripe invoice drafting
      return reply.code(501).send({ error: 'Stripe draft invoice not implemented yet' });
    } catch (error) {
      logger.error('Failed to create Stripe draft invoice:', error);
      return reply.code(500).send({ error: 'Failed to create Stripe draft invoice' });
    }
  });

  // Create CRM task action
  fastify.post('/crm/task', {
    preHandler: [fastify.authenticate, fastify.requireOrg]
  }, async (request: any, reply) => {
    try {
      // Placeholder for CRM task creation
      return reply.code(501).send({ error: 'CRM task creation not implemented yet' });
    } catch (error) {
      logger.error('Failed to create CRM task:', error);
      return reply.code(500).send({ error: 'Failed to create CRM task' });
    }
  });

  // Get actions for organization
  fastify.get('/', {
    preHandler: [fastify.authenticate, fastify.requireOrg]
  }, async (request: any, reply) => {
    try {
      const actions = await db('actions')
        .join('recon_results', 'actions.recon_result_id', 'recon_results.id')
        .join('products', 'recon_results.product_id', 'products.id')
        .where('actions.org_id', request.org_id)
        .select(
          'actions.*',
          'recon_results.account_id',
          'recon_results.leak_value',
          'products.name as product_name'
        )
        .orderBy('actions.created_at', 'desc')
        .limit(50);

      return { actions };
    } catch (error) {
      logger.error('Failed to get actions:', error);
      return reply.code(500).send({ error: 'Failed to get actions' });
    }
  });
}