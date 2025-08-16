# Kylo.ai

AI-powered revenue intelligence platform for detecting and recovering revenue leaks through automated usage reconciliation. Built for SMB finance and RevOps teams.

## Features

- **Revenue Leak Detection**: Reconcile actual usage vs reported usage to identify under-billing
- **Anomaly Analysis**: Detect missed overages, under-reported usage, and renewal drift
- **Actionable Outputs**: Draft invoices in Stripe, create CRM tasks, export audit trails
- **Real-time Dashboard**: Monitor leaks, confidence scores, and recovery actions
- **Integrations**: Stripe, Salesforce, HubSpot, and custom usage data sources
- **Audit & Compliance**: Comprehensive logging and role-based access control

## Architecture

- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS, TanStack Table (root directory)
- **Backend**: Node.js with Fastify, TypeScript (backend/ directory)
- **Database**: PostgreSQL with Knex.js migrations
- **Queue**: Redis with BullMQ for background jobs
- **Storage**: S3-compatible storage for exports and files
- **Deployment**: Vercel-ready with separate backend deployment

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
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   npm run install:backend
   
   # Set up environment variables
   cp env.example .env
   # Edit .env with your configuration
   
   # Set up the database
   createdb revenue_recovery
   npm run db:migrate
   
   # Start frontend (main app)
   npm run dev
   
   # In another terminal, start backend
   npm run dev:backend
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

### Vercel Deployment (Recommended for Frontend)

1. **Deploy Frontend to Vercel**
   ```bash
   # Connect your GitHub repo to Vercel
   # The vercel.json config is already set up
   # Environment variables needed in Vercel:
   # - NEXT_PUBLIC_API_URL (your backend URL)
   ```

2. **Deploy Backend Separately**
   - **Railway**: Connect GitHub repo, deploy from `backend/` directory
   - **Render**: Create web service from `backend/` directory  
   - **Vercel Functions**: For smaller backends, use Vercel's serverless functions

### Production Setup

1. **Database**: Use managed PostgreSQL (Neon, Supabase, AWS RDS)
2. **Redis**: Use managed Redis (AWS ElastiCache, Redis Cloud, Upstash)
3. **Frontend**: Vercel (automatic with GitHub integration)
4. **Backend**: Railway, Render, or Vercel Functions
5. **Storage**: Use AWS S3 or compatible object storage

### Environment Variables for Production

**Frontend (Vercel)**:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

**Backend**:
```
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=your-production-secret
STRIPE_SECRET_KEY=sk_live_...
# ... other production secrets
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