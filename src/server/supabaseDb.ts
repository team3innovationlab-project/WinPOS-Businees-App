import pg from 'pg';
import { createClient } from '@supabase/supabase-js';
import { DatabaseSchema } from './storage';

const { Pool } = pg;

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://qzscfazqaufdfdjnbmmd.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_nGLt4zwnnavyAt7RJAQDqQ__jhs7BN_';
const SUPABASE_DB_PASSWORD = process.env.SUPABASE_DB_PASSWORD || '5FgfUWu8%f/#Qv#';
const SUPABASE_HOST = process.env.SUPABASE_HOST || 'db.qzscfazqaufdfdjnbmmd.supabase.co';
const SUPABASE_PORT = parseInt(process.env.SUPABASE_PORT || '5432', 10);
const SUPABASE_USER = process.env.SUPABASE_USER || 'postgres';
const SUPABASE_DATABASE = process.env.SUPABASE_DATABASE || 'postgres';

// Initialize Supabase JS Client
export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Initialize PostgreSQL Connection Pool
export const pgPool = new Pool({
  host: SUPABASE_HOST,
  port: SUPABASE_PORT,
  user: SUPABASE_USER,
  password: SUPABASE_DB_PASSWORD,
  database: SUPABASE_DATABASE,
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

// Track connection health
let isConnected = false;
let lastPingTime = 0;
let lastError: string | null = null;

/**
 * Initialize all necessary schemas and tables in Supabase Postgres
 */
export async function initSupabaseSchema(): Promise<boolean> {
  let client: pg.PoolClient | null = null;
  try {
    client = await pgPool.connect();

    // 1. Unified state document store for instant atomic sync
    await client.query(`
      CREATE TABLE IF NOT EXISTS pos_state_store (
        id VARCHAR(100) PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    // 2. Relational table for sales and transactions
    await client.query(`
      CREATE TABLE IF NOT EXISTS pos_sales (
        id VARCHAR(100) PRIMARY KEY,
        receipt_number VARCHAR(100),
        business_id VARCHAR(100),
        total NUMERIC(12, 2) NOT NULL,
        subtotal NUMERIC(12, 2) NOT NULL,
        payment_method VARCHAR(50),
        cashier_name VARCHAR(150),
        cashier_id VARCHAR(100),
        customer_name VARCHAR(150),
        customer_phone VARCHAR(50),
        created_at TIMESTAMP WITH TIME ZONE NOT NULL,
        items JSONB NOT NULL,
        raw_data JSONB NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_pos_sales_created_at ON pos_sales (created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_pos_sales_payment ON pos_sales (payment_method);
    `);

    // 3. Relational table for store operational expenses
    await client.query(`
      CREATE TABLE IF NOT EXISTS pos_expenses (
        id VARCHAR(100) PRIMARY KEY,
        business_id VARCHAR(100),
        title VARCHAR(255) NOT NULL,
        amount NUMERIC(12, 2) NOT NULL,
        category VARCHAR(100) NOT NULL,
        recorded_by VARCHAR(150),
        created_at TIMESTAMP WITH TIME ZONE NOT NULL,
        raw_data JSONB NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_pos_expenses_created_at ON pos_expenses (created_at DESC);
    `);

    // 4. Relational table for inventory stock
    await client.query(`
      CREATE TABLE IF NOT EXISTS pos_stock (
        id VARCHAR(100) PRIMARY KEY,
        business_id VARCHAR(100),
        name VARCHAR(255) NOT NULL,
        barcode VARCHAR(100),
        price NUMERIC(12, 2) NOT NULL,
        cost_price NUMERIC(12, 2),
        quantity NUMERIC(12, 2) NOT NULL DEFAULT 0,
        category VARCHAR(100),
        low_stock_threshold NUMERIC(12, 2) DEFAULT 5,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        raw_data JSONB NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_pos_stock_barcode ON pos_stock (barcode);
    `);

    // 5. Audit & Sync event log table
    await client.query(`
      CREATE TABLE IF NOT EXISTS pos_audit_events (
        id BIGSERIAL PRIMARY KEY,
        event_type VARCHAR(100) NOT NULL,
        entity_id VARCHAR(100),
        payload JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    isConnected = true;
    lastPingTime = Date.now();
    lastError = null;
    console.log('[Supabase DB] Schema verified and initialized successfully on Supabase PostgreSQL.');
    return true;
  } catch (err: any) {
    isConnected = false;
    lastError = err?.message || String(err);
    console.warn('[Supabase DB] Schema initialization warning:', lastError);
    return false;
  } finally {
    if (client) client.release();
  }
}

/**
 * Fetch entire state document from Supabase
 */
export async function loadStateFromSupabase(): Promise<DatabaseSchema | null> {
  let client: pg.PoolClient | null = null;
  try {
    client = await pgPool.connect();
    const res = await client.query('SELECT data FROM pos_state_store WHERE id = $1', ['main_pos_state']);
    if (res.rows.length > 0 && res.rows[0].data) {
      isConnected = true;
      lastError = null;
      return res.rows[0].data as DatabaseSchema;
    }
    return null;
  } catch (err: any) {
    console.warn('[Supabase DB] Could not load state from Supabase:', err.message);
    lastError = err.message;
    return null;
  } finally {
    if (client) client.release();
  }
}

/**
 * Save entire state and update relational tables in Supabase
 */
export async function saveStateToSupabase(data: DatabaseSchema): Promise<boolean> {
  let client: pg.PoolClient | null = null;
  try {
    client = await pgPool.connect();

    // 1. Atomic state document upsert
    await client.query(
      `INSERT INTO pos_state_store (id, data, updated_at) 
       VALUES ($1, $2, NOW()) 
       ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`,
      ['main_pos_state', JSON.stringify(data)]
    );

    // 2. Mirror recent sales (last 100) into relational pos_sales table
    if (data.sales && data.sales.length > 0) {
      const recentSales = data.sales.slice(0, 100);
      for (const sale of recentSales) {
        const saleIso = sale.date ? `${sale.date}T${sale.time || '12:00:00'}Z` : new Date().toISOString();
        await client.query(
          `INSERT INTO pos_sales (
             id, receipt_number, business_id, total, subtotal, payment_method, 
             cashier_name, cashier_id, customer_name, customer_phone, created_at, items, raw_data
           ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
           ON CONFLICT (id) DO UPDATE SET 
             total = EXCLUDED.total,
             payment_method = EXCLUDED.payment_method,
             raw_data = EXCLUDED.raw_data`,
          [
            sale.id,
            sale.receiptNumber || sale.id,
            data.business?.id || 'biz_techwokx_gh',
            sale.totalAmount,
            sale.subtotal || sale.totalAmount,
            sale.paymentMethod,
            sale.cashierName || 'Staff Cashier',
            sale.cashierId || 'usr_staff',
            sale.customerName || null,
            sale.customerPhone || null,
            new Date(saleIso),
            JSON.stringify(sale.items || []),
            JSON.stringify(sale)
          ]
        );
      }
    }

    // 3. Mirror stock items into pos_stock
    if (data.stock && data.stock.length > 0) {
      for (const item of data.stock) {
        await client.query(
          `INSERT INTO pos_stock (
             id, business_id, name, barcode, price, cost_price, quantity, category, low_stock_threshold, raw_data
           ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
           ON CONFLICT (id) DO UPDATE SET 
             name = EXCLUDED.name,
             price = EXCLUDED.price,
             cost_price = EXCLUDED.cost_price,
             quantity = EXCLUDED.quantity,
             category = EXCLUDED.category,
             updated_at = NOW(),
             raw_data = EXCLUDED.raw_data`,
          [
            item.id,
            data.business?.id || 'biz_techwokx_gh',
            item.name,
            item.sku || null,
            item.sellingPrice,
            item.costPrice || null,
            item.currentQuantity,
            item.category || 'General',
            item.restockThreshold || 5,
            JSON.stringify(item)
          ]
        );
      }
    }

    // 4. Mirror expenses into pos_expenses
    if (data.expenses && data.expenses.length > 0) {
      const recentExpenses = data.expenses.slice(0, 100);
      for (const exp of recentExpenses) {
        const expIso = exp.date ? `${exp.date}T${exp.time || '12:00:00'}Z` : new Date().toISOString();
        await client.query(
          `INSERT INTO pos_expenses (
             id, business_id, title, amount, category, recorded_by, created_at, raw_data
           ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           ON CONFLICT (id) DO UPDATE SET 
             title = EXCLUDED.title,
             amount = EXCLUDED.amount,
             raw_data = EXCLUDED.raw_data`,
          [
            exp.id,
            data.business?.id || 'biz_techwokx_gh',
            exp.description || 'Shop Expense',
            exp.amount,
            exp.category,
            exp.recordedBy || 'Business Owner',
            new Date(expIso),
            JSON.stringify(exp)
          ]
        );
      }
    }

    isConnected = true;
    lastPingTime = Date.now();
    lastError = null;
    return true;
  } catch (err: any) {
    console.warn('[Supabase DB] Error syncing to Supabase:', err.message);
    lastError = err.message;
    return false;
  } finally {
    if (client) client.release();
  }
}

/**
 * Health check and metrics for Supabase status endpoint
 */
export async function getSupabaseHealth() {
  const start = Date.now();
  let client: pg.PoolClient | null = null;
  try {
    client = await pgPool.connect();
    const verRes = await client.query('SELECT version(), NOW() as server_time');
    const countsRes = await client.query(`
      SELECT 
        (SELECT COUNT(*) FROM pos_sales) as sales_count,
        (SELECT COUNT(*) FROM pos_stock) as stock_count,
        (SELECT COUNT(*) FROM pos_expenses) as expenses_count
    `);
    const latencyMs = Date.now() - start;

    isConnected = true;
    lastPingTime = Date.now();
    lastError = null;

    return {
      connected: true,
      provider: 'Supabase PostgreSQL 17',
      projectUrl: SUPABASE_URL,
      host: SUPABASE_HOST,
      port: SUPABASE_PORT,
      database: SUPABASE_DATABASE,
      latencyMs,
      serverTime: verRes.rows[0]?.server_time,
      version: verRes.rows[0]?.version,
      stats: {
        salesRows: parseInt(countsRes.rows[0]?.sales_count || '0', 10),
        stockRows: parseInt(countsRes.rows[0]?.stock_count || '0', 10),
        expenseRows: parseInt(countsRes.rows[0]?.expenses_count || '0', 10),
      },
      lastSyncedAt: new Date(lastPingTime).toISOString(),
    };
  } catch (err: any) {
    isConnected = false;
    lastError = err?.message || String(err);
    return {
      connected: false,
      provider: 'Supabase PostgreSQL 17',
      projectUrl: SUPABASE_URL,
      host: SUPABASE_HOST,
      error: lastError,
      latencyMs: Date.now() - start,
    };
  } finally {
    if (client) client.release();
  }
}
