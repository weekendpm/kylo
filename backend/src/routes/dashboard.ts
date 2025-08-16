import { FastifyInstance } from 'fastify';
import { getDatabase } from '../database/connection';
import { logger } from '../utils/logger';
import { DashboardSummary } from '../types/database';

export default async function dashboardRoutes(fastify: FastifyInstance) {
  const db = getDatabase();

  // Get dashboard summary
  fastify.get('/summary', {
    preHandler: [fastify.authenticate, fastify.requireOrg]
  }, async (request: any, reply) => {
    try {
      const { period_start, period_end } = request.query;
      
      // Default to last 30 days if no period specified
      const defaultStart = new Date();
      defaultStart.setDate(defaultStart.getDate() - 30);
      const defaultEnd = new Date();

      const start = period_start ? new Date(period_start) : defaultStart;
      const end = period_end ? new Date(period_end) : defaultEnd;

      // Get summary metrics
      const [metrics] = await db('recon_results')
        .where('org_id', request.org_id)
        .where('period_start', '>=', start)
        .where('period_end', '<=', end)
        .select(
          db.raw('SUM(leak_value) as total_leak_value'),
          db.raw('COUNT(*) as total_anomalies'),
          db.raw('COUNT(DISTINCT account_id) as affected_accounts'),
          db.raw('AVG(confidence) as median_confidence')
        )
        .first();

      // Get top anomalies
      const topAnomalies = await db('recon_results')
        .join('products', 'recon_results.product_id', 'products.id')
        .where('recon_results.org_id', request.org_id)
        .where('recon_results.period_start', '>=', start)
        .where('recon_results.period_end', '<=', end)
        .select(
          'recon_results.*',
          'products.name as product_name'
        )
        .orderBy('leak_value', 'desc')
        .limit(10);

      // Get leak by type
      const leakByType = await db('recon_results')
        .where('org_id', request.org_id)
        .where('period_start', '>=', start)
        .where('period_end', '<=', end)
        .groupBy('anomaly_type')
        .select('anomaly_type', db.raw('SUM(leak_value) as total_value'))
        .then(rows => rows.reduce((acc, row) => {
          acc[row.anomaly_type] = parseFloat(row.total_value) || 0;
          return acc;
        }, {} as Record<string, number>));

      // Get leak by severity
      const leakBySeverity = await db('recon_results')
        .where('org_id', request.org_id)
        .where('period_start', '>=', start)
        .where('period_end', '<=', end)
        .groupBy('severity')
        .select('severity', db.raw('SUM(leak_value) as total_value'))
        .then(rows => rows.reduce((acc, row) => {
          acc[row.severity] = parseFloat(row.total_value) || 0;
          return acc;
        }, {} as Record<string, number>));

      const summary: DashboardSummary = {
        total_leak_value: parseFloat(metrics?.total_leak_value) || 0,
        total_anomalies: parseInt(metrics?.total_anomalies) || 0,
        affected_accounts: parseInt(metrics?.affected_accounts) || 0,
        median_confidence: parseFloat(metrics?.median_confidence) || 0,
        top_anomalies: topAnomalies,
        leak_by_type: leakByType,
        leak_by_severity: leakBySeverity
      };

      return summary;
    } catch (error) {
      logger.error('Failed to get dashboard summary:', error);
      return reply.code(500).send({ error: 'Failed to get dashboard summary' });
    }
  });

  // Get account details
  fastify.get('/accounts/:accountId', {
    preHandler: [fastify.authenticate, fastify.requireOrg]
  }, async (request: any, reply) => {
    try {
      const { accountId } = request.params;

      // Get account anomalies
      const anomalies = await db('recon_results')
        .join('products', 'recon_results.product_id', 'products.id')
        .where('recon_results.org_id', request.org_id)
        .where('recon_results.account_id', accountId)
        .select(
          'recon_results.*',
          'products.name as product_name'
        )
        .orderBy('recon_results.period_start', 'desc');

      // Get usage trends (placeholder)
      const usageTrends = [];

      return {
        account_id: accountId,
        anomalies,
        usage_trends: usageTrends
      };
    } catch (error) {
      logger.error('Failed to get account details:', error);
      return reply.code(500).send({ error: 'Failed to get account details' });
    }
  });
}