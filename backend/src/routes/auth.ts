import { FastifyInstance } from 'fastify';
import { getDatabase } from '../database/connection';
import { logger } from '../utils/logger';
import bcrypt from 'bcrypt';
import { LoginRequest, AuthResponse, CreateOrgRequest } from '../types/database';

export default async function authRoutes(fastify: FastifyInstance) {
  const db = getDatabase();

  // Register new organization and admin user
  fastify.post<{ Body: CreateOrgRequest }>('/register', async (request, reply) => {
    try {
      const { name, domain, admin_email, admin_first_name, admin_last_name } = request.body;

      // Check if org with this domain already exists
      if (domain) {
        const existingOrg = await db('orgs').where({ domain }).first();
        if (existingOrg) {
          return reply.code(400).send({ error: 'Organization with this domain already exists' });
        }
      }

      // Check if user with this email already exists
      const existingUser = await db('users').where({ email: admin_email }).first();
      if (existingUser) {
        return reply.code(400).send({ error: 'User with this email already exists' });
      }

      // Create organization and admin user in transaction
      const result = await db.transaction(async (trx) => {
        // Create org
        const [org] = await trx('orgs').insert({
          name,
          domain,
          settings: {}
        }).returning('*');

        // Create admin user
        const [user] = await trx('users').insert({
          org_id: org.id,
          email: admin_email,
          first_name: admin_first_name,
          last_name: admin_last_name,
          role: 'ADMIN',
          status: 'ACTIVE'
        }).returning('*');

        return { org, user };
      });

      // Generate JWT token
      const token = fastify.jwt.sign({
        user_id: result.user.id,
        org_id: result.org.id,
        role: result.user.role,
        email: result.user.email
      });

      const response: AuthResponse = {
        token,
        user: result.user,
        org: result.org
      };

      logger.info('New organization registered', { org_id: result.org.id, admin_email });
      return response;
      
    } catch (error) {
      logger.error('Registration failed:', error);
      return reply.code(500).send({ error: 'Registration failed' });
    }
  });

  // Login
  fastify.post<{ Body: LoginRequest }>('/login', async (request, reply) => {
    try {
      const { email, password } = request.body;

      // Find user with org
      const user = await db('users')
        .join('orgs', 'users.org_id', 'orgs.id')
        .where('users.email', email)
        .where('users.status', 'ACTIVE')
        .select(
          'users.*',
          'orgs.id as org_id',
          'orgs.name as org_name',
          'orgs.domain as org_domain',
          'orgs.settings as org_settings'
        )
        .first();

      if (!user) {
        return reply.code(401).send({ error: 'Invalid credentials' });
      }

      // For MVP, skip password validation if no password is set (OAuth flow)
      if (user.password_hash && password) {
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
          return reply.code(401).send({ error: 'Invalid credentials' });
        }
      }

      // Update last login
      await db('users').where({ id: user.id }).update({ last_login_at: new Date() });

      // Generate JWT token
      const token = fastify.jwt.sign({
        user_id: user.id,
        org_id: user.org_id,
        role: user.role,
        email: user.email
      });

      const response: AuthResponse = {
        token,
        user: {
          id: user.id,
          org_id: user.org_id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          status: user.status,
          last_login_at: user.last_login_at,
          created_at: user.created_at,
          updated_at: user.updated_at
        },
        org: {
          id: user.org_id,
          name: user.org_name,
          domain: user.org_domain,
          settings: user.org_settings,
          created_at: user.created_at,
          updated_at: user.updated_at
        }
      };

      logger.info('User logged in', { user_id: user.id, org_id: user.org_id });
      return response;
      
    } catch (error) {
      logger.error('Login failed:', error);
      return reply.code(500).send({ error: 'Login failed' });
    }
  });

  // Get current user profile
  fastify.get('/me', {
    preHandler: [fastify.authenticate, fastify.requireOrg]
  }, async (request: any, reply) => {
    try {
      const { user_id } = request.user;
      
      const user = await db('users')
        .join('orgs', 'users.org_id', 'orgs.id')
        .where('users.id', user_id)
        .select(
          'users.*',
          'orgs.id as org_id',
          'orgs.name as org_name',
          'orgs.domain as org_domain',
          'orgs.settings as org_settings'
        )
        .first();

      if (!user) {
        return reply.code(404).send({ error: 'User not found' });
      }

      return {
        user: {
          id: user.id,
          org_id: user.org_id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          status: user.status,
          last_login_at: user.last_login_at,
          created_at: user.created_at,
          updated_at: user.updated_at
        },
        org: {
          id: user.org_id,
          name: user.org_name,
          domain: user.org_domain,
          settings: user.org_settings,
          created_at: user.created_at,
          updated_at: user.updated_at
        }
      };
      
    } catch (error) {
      logger.error('Get user profile failed:', error);
      return reply.code(500).send({ error: 'Failed to get user profile' });
    }
  });
}