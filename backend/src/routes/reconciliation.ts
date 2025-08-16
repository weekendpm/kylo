import { FastifyInstance } from 'fastify';
import { getDatabase } from '../database/connection';
import { logger } from '../utils/logger';
import { ReconResultFilters } from '../types/database';

export default async function reconRoutes(fastify: FastifyInstance) {
  const db = getDatabase();

  // Get reconciliation results with filters
  fastify.get<{ Querystring: ReconResultFilters }>('/results', {
    preHandler: [fastify.authenticate, fastify.requireOrg]
  }, async (request: any, reply) => {
    try {
      const {
        account_id,
        product_id,
        anomaly_type,
        status,
        severity,
        period_start,
        period_end,
        min_leak_value,
        min_confidence,
        limit = 50,
        offset = 0
      } = request.query;

      let query = db('recon_results')
        .join('products', 'recon_results.product_id', 'products.id')
        .where('recon_results.org_id', request.org_id)
        .select(
          'recon_results.*',
          'products.name as product_name'
        );

      // Apply filters
      if (account_id) query = query.where('recon_results.account_id', account_id);
      if (product_id) query = query.where('recon_results.product_id', product_id);
      if (anomaly_type) query = query.where('recon_results.anomaly_type', anomaly_type);
      if (status) query = query.where('recon_results.status', status);
      if (severity) query = query.where('recon_results.severity', severity);
      if (period_start) query = query.where('recon_results.period_start', '>=', period_start);
      if (period_end) query = query.where('recon_results.period_end', '<=', period_end);
      if (min_leak_value) query = query.where('recon_results.leak_value', '>=', min_leak_value);
      if (min_confidence) query = query.where('recon_results.confidence', '>=', min_confidence);

      const results = await query
        .orderBy('recon_results.leak_value', 'desc')
        .limit(limit)
        .offset(offset);

      const totalQuery = query.clone().clearSelect().clearOrder().count('* as count');
      const [{ count: total }] = await totalQuery;

      return {
        results,
        pagination: {
          total: parseInt(total as string),
          limit,
          offset,
          has_more: parseInt(total as string) > offset + limit
        }
      };
    } catch (error) {
      logger.error('Failed to get reconciliation results:', error);
      return reply.code(500).send({ error: 'Failed to get reconciliation results' });
    }
  });

  // Get reconciliation runs
  fastify.get('/runs', {
    preHandler: [fastify.authenticate, fastify.requireOrg]
  }, async (request: any, reply) => {
    try {
      const runs = await db('recon_runs')
        .where('org_id', request.org_id)
        .orderBy('started_at', 'desc')
        .limit(20);

      return { runs };
    } catch (error) {
      logger.error('Failed to get reconciliation runs:', error);
      return reply.code(500).send({ error: 'Failed to get reconciliation runs' });
    }
  });

  // Trigger new reconciliation run
  fastify.post('/runs', {
    preHandler: [fastify.authenticate, fastify.requireOrg]
  }, async (request: any, reply) => {
    try {
      // Placeholder for reconciliation engine
      return reply.code(501).send({ error: 'Reconciliation engine not implemented yet' });
    } catch (error) {
      logger.error('Failed to start reconciliation run:', error);
      return reply.code(500).send({ error: 'Failed to start reconciliation run' });
    }
  });
}