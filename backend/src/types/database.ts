export interface Org {
  id: string;
  name: string;
  domain?: string;
  settings: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: string;
  org_id: string;
  email: string;
  password_hash?: string;
  first_name?: string;
  last_name?: string;
  role: 'ADMIN' | 'ANALYST';
  status: 'ACTIVE' | 'INACTIVE';
  last_login_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface ApiKey {
  id: string;
  org_id: string;
  name: string;
  key_hash: string;
  scopes: string[];
  last_used_at?: Date;
  expires_at?: Date;
  created_at: Date;
}

export interface Integration {
  id: string;
  org_id: string;
  type: 'STRIPE' | 'SALESFORCE' | 'HUBSPOT' | 'PRODUCT_LOGS';
  status: 'ACTIVE' | 'INACTIVE' | 'ERROR';
  auth_json: Record<string, any>;
  config_json: Record<string, any>;
  last_sync_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface IntegrationRun {
  id: string;
  integration_id: string;
  status: 'RUNNING' | 'SUCCESS' | 'FAILED';
  error_message?: string;
  records_processed: number;
  started_at: Date;
  finished_at?: Date;
}

export interface Product {
  id: string;
  org_id: string;
  name: string;
  external_id?: string;
  pricing_json: Record<string, any>;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface UsageEventMapping {
  id: string;
  org_id: string;
  product_id: string;
  source_metric: string;
  stripe_meter_id?: string;
  transform_sql?: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface UsageActual {
  id: string;
  org_id: string;
  account_id: string;
  product_id: string;
  ts_bucket: Date;
  units: number;
  source: string;
  source_ref?: string;
  created_at: Date;
}

export interface UsageReported {
  id: string;
  org_id: string;
  account_id: string;
  product_id: string;
  ts_bucket: Date;
  units: number;
  stripe_subscription_item_id?: string;
  stripe_usage_record_id?: string;
  created_at: Date;
}

export interface Entitlement {
  id: string;
  org_id: string;
  account_id: string;
  product_id: string;
  period_start: Date;
  period_end: Date;
  included_units: number;
  overage_rate?: number;
  stripe_subscription_id?: string;
  stripe_price_id?: string;
  created_at: Date;
}

export interface ReconRun {
  id: string;
  org_id: string;
  period_start: Date;
  period_end: Date;
  status: 'RUNNING' | 'COMPLETED' | 'FAILED';
  error_message?: string;
  anomalies_found: number;
  total_leak_value: number;
  started_at: Date;
  finished_at?: Date;
}

export interface ReconResult {
  id: string;
  recon_run_id: string;
  org_id: string;
  account_id: string;
  product_id: string;
  period_start: Date;
  period_end: Date;
  actual_units: number;
  reported_units: number;
  entitlement_units?: number;
  overage_rate?: number;
  leak_units: number;
  leak_value: number;
  anomaly_type: 'UNDER_REPORTED' | 'MISSED_OVERAGE' | 'RENEWAL_DRIFT';
  confidence: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  details_json: Record<string, any>;
  status: 'NEW' | 'REVIEWED' | 'ACTION_DRAFTED' | 'ACTION_SENT' | 'DISMISSED';
  created_at: Date;
  updated_at: Date;
}

export interface Action {
  id: string;
  org_id: string;
  recon_result_id: string;
  kind: 'STRIPE_DRAFT_INVOICE' | 'CRM_TASK' | 'EMAIL_NOTIFICATION';
  payload_json: Record<string, any>;
  external_ref?: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED';
  error_message?: string;
  created_by?: string;
  created_at: Date;
  executed_at?: Date;
}

export interface AuditLog {
  id: string;
  org_id: string;
  actor_user_id?: string;
  entity: string;
  entity_id: string;
  action: string;
  before_json?: Record<string, any>;
  after_json?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  created_at: Date;
}

export interface NotificationSetting {
  id: string;
  org_id: string;
  type: 'WEEKLY_DIGEST' | 'DAILY_SUMMARY' | 'ANOMALY_ALERT';
  enabled: boolean;
  recipients: string[];
  config_json: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export interface NotificationRun {
  id: string;
  org_id: string;
  type: 'WEEKLY_DIGEST' | 'DAILY_SUMMARY' | 'ANOMALY_ALERT';
  period_start?: Date;
  period_end?: Date;
  status: 'SUCCESS' | 'FAILED';
  error_message?: string;
  recipients_sent: number;
  summary_json?: Record<string, any>;
  sent_at: Date;
}

export interface Export {
  id: string;
  org_id: string;
  created_by: string;
  type: 'RECON_RESULTS_CSV' | 'AUDIT_LOG_CSV' | 'USAGE_DATA_CSV';
  filters_json: Record<string, any>;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  file_path?: string;
  download_url?: string;
  url_expires_at?: Date;
  record_count?: number;
  error_message?: string;
  created_at: Date;
  completed_at?: Date;
}

// API Request/Response types
export interface CreateOrgRequest {
  name: string;
  domain?: string;
  admin_email: string;
  admin_first_name: string;
  admin_last_name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: Omit<User, 'password_hash'>;
  org: Org;
}

export interface ReconResultFilters {
  account_id?: string;
  product_id?: string;
  anomaly_type?: ReconResult['anomaly_type'];
  status?: ReconResult['status'];
  severity?: ReconResult['severity'];
  period_start?: Date;
  period_end?: Date;
  min_leak_value?: number;
  min_confidence?: number;
  limit?: number;
  offset?: number;
}

export interface DashboardSummary {
  total_leak_value: number;
  total_anomalies: number;
  affected_accounts: number;
  median_confidence: number;
  top_anomalies: ReconResult[];
  leak_by_type: Record<string, number>;
  leak_by_severity: Record<string, number>;
}