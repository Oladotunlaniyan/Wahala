import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const sql = fs.readFileSync(path.resolve(__dirname, './migrations/create_tables.sql'), 'utf-8');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function run() {
  if (!process.env.DATABASE_URL) {
    console.error('Please set DATABASE_URL in your environment (.env)');
    process.exit(1);
  }

  try {
    console.log('Running migrations...');
    await pool.query(sql);
    console.log('Migrations completed.');
  } catch (err) {
    console.error('Migration error:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

run();
