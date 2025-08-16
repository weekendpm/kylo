import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    // Actions and Audit
    await knex.schema.createTable('actions', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('org_id').references('id').inTable('orgs').onDelete('CASCADE');
        table.uuid('recon_result_id').references('id').inTable('recon_results').onDelete('CASCADE');
        table.enum('kind', ['STRIPE_DRAFT_INVOICE', 'CRM_TASK', 'EMAIL_NOTIFICATION']).notNullable();
        table.jsonb('payload_json').defaultTo('{}');
        table.string('external_ref'); // Stripe invoice ID, CRM task ID, etc.
        table.enum('status', ['PENDING', 'SUCCESS', 'FAILED', 'CANCELLED']).defaultTo('PENDING');
        table.text('error_message');
        table.uuid('created_by').references('id').inTable('users');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('executed_at');
        
        table.index(['org_id', 'status']);
        table.index(['org_id', 'kind']);
        table.index(['recon_result_id']);
        table.index(['created_by']);
        table.index(['external_ref']);
    });

    await knex.schema.createTable('audit_log', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('org_id').references('id').inTable('orgs').onDelete('CASCADE');
        table.uuid('actor_user_id').references('id').inTable('users');
        table.string('entity').notNullable(); // 'recon_result', 'integration', 'mapping', etc.
        table.uuid('entity_id').notNullable();
        table.string('action').notNullable(); // 'CREATE', 'UPDATE', 'DELETE', 'EXECUTE_ACTION'
        table.jsonb('before_json');
        table.jsonb('after_json');
        table.inet('ip_address');
        table.string('user_agent');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        
        table.index(['org_id', 'entity', 'entity_id']);
        table.index(['org_id', 'actor_user_id']);
        table.index(['created_at']);
        table.index(['entity', 'action']);
    });

    // Notifications and Settings
    await knex.schema.createTable('notification_settings', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('org_id').references('id').inTable('orgs').onDelete('CASCADE');
        table.enum('type', ['WEEKLY_DIGEST', 'DAILY_SUMMARY', 'ANOMALY_ALERT']).notNullable();
        table.boolean('enabled').defaultTo(true);
        table.jsonb('recipients').defaultTo('[]'); // Email addresses
        table.jsonb('config_json').defaultTo('{}'); // Thresholds, filters, etc.
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        
        table.unique(['org_id', 'type']);
        table.index(['org_id', 'enabled']);
    });

    await knex.schema.createTable('notification_runs', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('org_id').references('id').inTable('orgs').onDelete('CASCADE');
        table.enum('type', ['WEEKLY_DIGEST', 'DAILY_SUMMARY', 'ANOMALY_ALERT']).notNullable();
        table.timestamp('period_start');
        table.timestamp('period_end');
        table.enum('status', ['SUCCESS', 'FAILED']).notNullable();
        table.text('error_message');
        table.integer('recipients_sent').defaultTo(0);
        table.jsonb('summary_json'); // Metrics included in notification
        table.timestamp('sent_at').defaultTo(knex.fn.now());
        
        table.index(['org_id', 'type']);
        table.index(['sent_at']);
    });

    // File exports and downloads
    await knex.schema.createTable('exports', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('org_id').references('id').inTable('orgs').onDelete('CASCADE');
        table.uuid('created_by').references('id').inTable('users');
        table.enum('type', ['RECON_RESULTS_CSV', 'AUDIT_LOG_CSV', 'USAGE_DATA_CSV']).notNullable();
        table.jsonb('filters_json').defaultTo('{}'); // Export criteria
        table.enum('status', ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED']).defaultTo('PENDING');
        table.string('file_path'); // S3 path or local path
        table.string('download_url'); // Signed URL
        table.timestamp('url_expires_at');
        table.integer('record_count');
        table.text('error_message');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('completed_at');
        
        table.index(['org_id', 'status']);
        table.index(['created_by']);
        table.index(['created_at']);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('exports');
    await knex.schema.dropTableIfExists('notification_runs');
    await knex.schema.dropTableIfExists('notification_settings');
    await knex.schema.dropTableIfExists('audit_log');
    await knex.schema.dropTableIfExists('actions');
}