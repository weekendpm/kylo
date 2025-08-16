# Revenue Recovery Copilot

A sophisticated SaaS platform for detecting and recovering revenue leaks through automated usage reconciliation. Built for SMB finance and RevOps teams.

## Features

- **Revenue Leak Detection**: Reconcile actual usage vs reported usage to identify under-billing
- **Anomaly Analysis**: Detect missed overages, under-reported usage, and renewal drift
- **Actionable Outputs**: Draft invoices in Stripe, create CRM tasks, export audit trails
- **Real-time Dashboard**: Monitor leaks, confidence scores, and recovery actions
- **Integrations**: Stripe, Salesforce, HubSpot, and custom usage data sources
- **Audit & Compliance**: Comprehensive logging and role-based access control

## Architecture

- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS, TanStack Table
- **Backend**: Node.js with Fastify, TypeScript
- **Database**: PostgreSQL with Knex.js migrations
- **Queue**: Redis with BullMQ for background jobs
- **Storage**: S3-compatible storage for exports and files

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- Redis 6+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kylo
   ```

2. **Quick Start (Recommended)**
   ```bash
   ./start-dev.sh
   ```
   This script will:
   - Install all dependencies
   - Set up environment files
   - Run database migrations
   - Start both frontend and backend servers

3. **Manual Setup**
   ```bash
   # Install dependencies
   npm run install:all
   
   # Set up environment variables
   cp env.example .env
   # Edit .env with your configuration
   
   # Set up the database
   createdb revenue_recovery
   npm run db:migrate
   
   # Start development servers
   npm run dev
   ```

   This starts:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## Environment Configuration

Key environment variables (see `env.example` for complete list):

```bash
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/revenue_recovery

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
SMTP_HOST=smtp.postmarkapp.com
SMTP_USER=your-smtp-user
SMTP_PASSWORD=your-smtp-password

# AWS (for S3 exports)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=revenue-recovery-exports
```

## Database Schema

The system uses a multi-tenant architecture with the following key entities:

- **Organizations & Users**: Multi-tenant with role-based access (Admin, Analyst)
- **Integrations**: Stripe, CRM, and usage data source connections
- **Products & Mappings**: Map product usage events to billing meters
- **Usage Data**: Actual vs reported usage reconciliation
- **Reconciliation Results**: Detected anomalies with confidence scoring
- **Actions**: Automated invoice drafts, CRM tasks, notifications
- **Audit Logs**: Complete activity tracking for compliance

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new organization
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

### Dashboard
- `GET /api/dashboard/summary` - Overview metrics and top anomalies
- `GET /api/dashboard/accounts/:id` - Account-specific details

### Reconciliation
- `GET /api/recon/results` - List anomalies with filtering
- `GET /api/recon/runs` - Reconciliation job history
- `POST /api/recon/runs` - Trigger new reconciliation

### Actions
- `POST /api/actions/stripe/draft-invoice` - Create Stripe invoice draft
- `POST /api/actions/crm/task` - Create CRM upsell task
- `GET /api/actions` - List all actions

### Integrations
- `GET /api/integrations/status` - Integration health status
- `POST /api/integrations/stripe/connect` - Connect Stripe account

## Usage Data Integration

The platform supports multiple usage data sources:

### Option A: Direct SQL Connection
```sql
-- Expected schema for usage data
CREATE TABLE api_call_logs (
  account_id VARCHAR(255),
  product_key VARCHAR(255),
  ts TIMESTAMP,
  units INTEGER
);
```

### Option B: S3 Parquet Files
Daily parquet files with columns: `account_id`, `product_key`, `ts`, `units`

### Option C: API Ingestion
Send usage data via REST API:
```bash
POST /api/usage/ingest
{
  "account_id": "customer-123",
  "product_key": "api_calls",
  "timestamp": "2024-01-15T10:00:00Z",
  "units": 1000
}
```

## Reconciliation Logic

The core reconciliation engine:

1. **Data Collection**: Pulls usage from product logs and Stripe
2. **Time Bucketing**: Aggregates by day/hour within billing periods
3. **Variance Detection**: Compares actual vs reported usage
4. **Leak Calculation**: Computes under-reported units and missed overages
5. **Confidence Scoring**: Assesses data quality and mapping accuracy
6. **Anomaly Classification**: Categorizes by type and severity

### Example Reconciliation
```sql
-- Find under-reported usage for an account/product/period
WITH actual AS (
  SELECT SUM(units) as total_actual
  FROM usage_actual 
  WHERE account_id = 'customer-123' 
    AND product_id = 'api-calls'
    AND ts_bucket BETWEEN '2024-01-01' AND '2024-01-31'
),
reported AS (
  SELECT SUM(units) as total_reported
  FROM usage_reported
  WHERE account_id = 'customer-123'
    AND product_id = 'api-calls' 
    AND ts_bucket BETWEEN '2024-01-01' AND '2024-01-31'
)
SELECT 
  actual.total_actual,
  reported.total_reported,
  GREATEST(actual.total_actual - reported.total_reported, 0) as leak_units
FROM actual, reported;
```

## Deployment

### Production Setup

1. **Database**: Use managed PostgreSQL (AWS RDS, Google Cloud SQL)
2. **Redis**: Use managed Redis (AWS ElastiCache, Redis Cloud)
3. **Frontend**: Deploy to Vercel or Netlify
4. **Backend**: Deploy to Railway, Render, or AWS ECS
5. **Storage**: Use AWS S3 or compatible object storage

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d
```

## Development

### Project Structure
```
kylo/
├── frontend/                 # Next.js frontend
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # Reusable components
│   │   └── lib/             # Utilities and providers
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── routes/          # API endpoints
│   │   ├── services/        # Business logic
│   │   ├── database/        # Migrations and models
│   │   └── utils/           # Utilities
└── docs/                    # Documentation
```

### Running Tests
```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

### Database Migrations
```bash
# Create new migration
cd backend && npm run db:generate migration_name

# Run migrations
npm run db:migrate

# Rollback last migration
npm run db:rollback
```

## Security & Compliance

- **Multi-tenant isolation**: Row-level security by organization
- **Encrypted secrets**: All API keys and tokens encrypted at rest
- **Audit logging**: Complete activity trails for compliance
- **RBAC**: Admin and Analyst roles with scoped permissions
- **API rate limiting**: Prevent abuse and ensure fair usage
- **Signed URLs**: Secure file downloads with expiration

## Monitoring & Observability

- **Application metrics**: Response times, error rates, throughput
- **Business metrics**: Revenue leak detected, actions taken, confidence scores
- **Error tracking**: Centralized error logging with correlation IDs
- **Performance monitoring**: Database query performance and API latency

## Support & Documentation

- **API Documentation**: Available at `/api/docs` when running
- **Health Check**: Monitor status at `/health`
- **Logs**: Structured JSON logging with correlation tracking

## License

Copyright (c) 2024 Revenue Recovery Copilot. All rights reserved.

---

For questions or support, please contact the development team or check the documentation at `/docs`.