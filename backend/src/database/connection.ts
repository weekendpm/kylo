import knex, { Knex } from 'knex';
import { logger } from '../utils/logger';

const config = require('../../knexfile.js');

let db: Knex;

export function getDatabase(): Knex {
  if (!db) {
    const environment = process.env.NODE_ENV || 'development';
    db = knex(config[environment]);
  }
  return db;
}

export async function connectDatabase(): Promise<void> {
  try {
    const database = getDatabase();
    await database.raw('SELECT 1');
    logger.info('Database connection established');
  } catch (error) {
    logger.error('Failed to connect to database:', error);
    throw error;
  }
}

export async function closeDatabase(): Promise<void> {
  if (db) {
    await db.destroy();
    logger.info('Database connection closed');
  }
}