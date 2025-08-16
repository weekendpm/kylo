import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    // Tenancy
    await knex.schema.createTable('orgs', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('name').notNullable();
        table.string('domain');
        table.jsonb('settings').defaultTo('{}');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('users', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('org_id').references('id').inTable('orgs').onDelete('CASCADE');
        table.string('email').notNullable();
        table.string('password_hash');
        table.string('first_name');
        table.string('last_name');
        table.enum('role', ['ADMIN', 'ANALYST']).defaultTo('ANALYST');
        table.enum('status', ['ACTIVE', 'INACTIVE']).defaultTo('ACTIVE');
        table.timestamp('last_login_at');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        
        table.unique(['org_id', 'email']);
        table.index(['org_id', 'role']);
    });

    await knex.schema.createTable('api_keys', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('org_id').references('id').inTable('orgs').onDelete('CASCADE');
        table.string('name').notNullable();
        table.string('key_hash').notNullable();
        table.jsonb('scopes').defaultTo('[]');
        table.timestamp('last_used_at');
        table.timestamp('expires_at');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        
        table.index(['org_id']);
        table.index(['key_hash']);
    });

    // Integrations
    await knex.schema.createTable('integrations', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('org_id').references('id').inTable('orgs').onDelete('CASCADE');
        table.enum('type', ['STRIPE', 'SALESFORCE', 'HUBSPOT', 'PRODUCT_LOGS']).notNullable();
        table.enum('status', ['ACTIVE', 'INACTIVE', 'ERROR']).defaultTo('ACTIVE');
        table.jsonb('auth_json').defaultTo('{}');
        table.jsonb('config_json').defaultTo('{}');
        table.timestamp('last_sync_at');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        
        table.unique(['org_id', 'type']);
        table.index(['org_id', 'status']);
    });

    await knex.schema.createTable('integration_runs', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('integration_id').references('id').inTable('integrations').onDelete('CASCADE');
        table.enum('status', ['RUNNING', 'SUCCESS', 'FAILED']).notNullable();
        table.text('error_message');
        table.integer('records_processed').defaultTo(0);
        table.timestamp('started_at').defaultTo(knex.fn.now());
        table.timestamp('finished_at');
        
        table.index(['integration_id', 'status']);
        table.index(['started_at']);
    });

    // Reference and Mapping
    await knex.schema.createTable('products', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('org_id').references('id').inTable('orgs').onDelete('CASCADE');
        table.string('name').notNullable();
        table.string('external_id'); // Stripe price ID or similar
        table.jsonb('pricing_json').defaultTo('{}');
        table.boolean('active').defaultTo(true);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        
        table.index(['org_id', 'active']);
        table.index(['org_id', 'external_id']);
    });

    await knex.schema.createTable('usage_event_mappings', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('org_id').references('id').inTable('orgs').onDelete('CASCADE');
        table.uuid('product_id').references('id').inTable('products').onDelete('CASCADE');
        table.string('source_metric').notNullable(); // e.g., 'api_calls', 'storage_gb'
        table.string('stripe_meter_id');
        table.text('transform_sql'); // Optional SQL snippet to normalize counts
        table.boolean('active').defaultTo(true);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        
        table.index(['org_id', 'active']);
        table.index(['org_id', 'source_metric']);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('usage_event_mappings');
    await knex.schema.dropTableIfExists('products');
    await knex.schema.dropTableIfExists('integration_runs');
    await knex.schema.dropTableIfExists('integrations');
    await knex.schema.dropTableIfExists('api_keys');
    await knex.schema.dropTableIfExists('users');
    await knex.schema.dropTableIfExists('orgs');
}