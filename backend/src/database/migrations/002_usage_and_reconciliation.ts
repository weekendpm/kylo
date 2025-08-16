import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    // Raw Facts
    await knex.schema.createTable('usage_actual', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('org_id').references('id').inTable('orgs').onDelete('CASCADE');
        table.string('account_id').notNullable(); // Customer/tenant identifier
        table.uuid('product_id').references('id').inTable('products').onDelete('CASCADE');
        table.timestamp('ts_bucket').notNullable(); // Time bucket (day/hour)
        table.decimal('units', 15, 4).notNullable(); // Usage units
        table.string('source').notNullable(); // 'PRODUCT_LOGS', 'API', etc.
        table.string('source_ref'); // Reference to source record
        table.timestamp('created_at').defaultTo(knex.fn.now());
        
        table.index(['org_id', 'account_id', 'product_id', 'ts_bucket']);
        table.index(['org_id', 'ts_bucket']);
        table.index(['account_id', 'product_id', 'ts_bucket']);
    });

    await knex.schema.createTable('usage_reported', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('org_id').references('id').inTable('orgs').onDelete('CASCADE');
        table.string('account_id').notNullable();
        table.uuid('product_id').references('id').inTable('products').onDelete('CASCADE');
        table.timestamp('ts_bucket').notNullable();
        table.decimal('units', 15, 4).notNullable();
        table.string('stripe_subscription_item_id');
        table.string('stripe_usage_record_id');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        
        table.index(['org_id', 'account_id', 'product_id', 'ts_bucket']);
        table.index(['org_id', 'ts_bucket']);
        table.index(['stripe_subscription_item_id']);
    });

    await knex.schema.createTable('entitlements', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('org_id').references('id').inTable('orgs').onDelete('CASCADE');
        table.string('account_id').notNullable();
        table.uuid('product_id').references('id').inTable('products').onDelete('CASCADE');
        table.timestamp('period_start').notNullable();
        table.timestamp('period_end').notNullable();
        table.decimal('included_units', 15, 4).notNullable();
        table.decimal('overage_rate', 10, 4); // Price per unit over entitlement
        table.string('stripe_subscription_id');
        table.string('stripe_price_id');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        
        table.index(['org_id', 'account_id', 'product_id']);
        table.index(['org_id', 'period_start', 'period_end']);
    });

    // Reconciliation
    await knex.schema.createTable('recon_runs', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('org_id').references('id').inTable('orgs').onDelete('CASCADE');
        table.timestamp('period_start').notNullable();
        table.timestamp('period_end').notNullable();
        table.enum('status', ['RUNNING', 'COMPLETED', 'FAILED']).notNullable();
        table.text('error_message');
        table.integer('anomalies_found').defaultTo(0);
        table.decimal('total_leak_value', 15, 2).defaultTo(0);
        table.timestamp('started_at').defaultTo(knex.fn.now());
        table.timestamp('finished_at');
        
        table.index(['org_id', 'status']);
        table.index(['org_id', 'period_start', 'period_end']);
    });

    await knex.schema.createTable('recon_results', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('recon_run_id').references('id').inTable('recon_runs').onDelete('CASCADE');
        table.uuid('org_id').references('id').inTable('orgs').onDelete('CASCADE');
        table.string('account_id').notNullable();
        table.uuid('product_id').references('id').inTable('products').onDelete('CASCADE');
        table.timestamp('period_start').notNullable();
        table.timestamp('period_end').notNullable();
        table.decimal('actual_units', 15, 4).notNullable();
        table.decimal('reported_units', 15, 4).notNullable();
        table.decimal('entitlement_units', 15, 4);
        table.decimal('overage_rate', 10, 4);
        table.decimal('leak_units', 15, 4).notNullable();
        table.decimal('leak_value', 15, 2).notNullable();
        table.enum('anomaly_type', ['UNDER_REPORTED', 'MISSED_OVERAGE', 'RENEWAL_DRIFT']).notNullable();
        table.decimal('confidence', 3, 2).notNullable(); // 0.00 to 1.00
        table.enum('severity', ['LOW', 'MEDIUM', 'HIGH']).notNullable();
        table.jsonb('details_json').defaultTo('{}');
        table.enum('status', ['NEW', 'REVIEWED', 'ACTION_DRAFTED', 'ACTION_SENT', 'DISMISSED']).defaultTo('NEW');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        
        table.index(['org_id', 'status']);
        table.index(['org_id', 'anomaly_type']);
        table.index(['org_id', 'period_start', 'period_end', 'anomaly_type']);
        table.index(['account_id', 'product_id']);
        table.index(['leak_value']);
        table.index(['confidence']);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('recon_results');
    await knex.schema.dropTableIfExists('recon_runs');
    await knex.schema.dropTableIfExists('entitlements');
    await knex.schema.dropTableIfExists('usage_reported');
    await knex.schema.dropTableIfExists('usage_actual');
}