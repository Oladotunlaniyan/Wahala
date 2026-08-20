import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { Pool } from 'pg';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log(process.env.DATABASE_URL);

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Copy backend/.env.example to backend/.env and set DATABASE_URL');
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// console.log(pool);

const app = express();
app.use(express.json());

// GET /

app.get('/', async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the root endpoint of send help"
  })
});

app.get('/api/v1', async (require, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the api route for send-help"
  })
});

// GET /api/v1/health
app.get('/api/v1/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok' });
  } catch (err) {
    res.status(500).json({ status: 'error', error: String(err) });
  }
});

// GET /api/v1/states
app.get('/api/v1/states', async (req, res) => {
  try {
    const q = await pool.query('SELECT id, name, slug FROM states ORDER BY name');
    res.json({ states: q.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to fetch states' });
  }
});

// GET /api/v1/states/:state_id/lgas
app.get('/api/v1/states/:state_id/lgas', async (req, res) => {
  const { state_id } = req.params;
  try {
    let stateIdNum: number | null = null;
    if (/^[0-9]+$/.test(state_id)) {
      stateIdNum = Number(state_id);
    } else {
      // try lookup by slug
      const s = await pool.query('SELECT id FROM states WHERE slug=$1 OR LOWER(name)=LOWER($2) LIMIT 1', [state_id, state_id]);
      if (s.rowCount) stateIdNum = s.rows[0].id;
    }

    if (!stateIdNum) {
      return res.status(404).json({ error: 'state not found' });
    }

    const q = await pool.query('SELECT id, name, slug FROM lgas WHERE state_id=$1 ORDER BY name', [stateIdNum]);
    res.json({ lgas: q.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to fetch lgas' });
  }
});

// GET /api/v1/contacts?state=:state_id&lga=:lga_id
app.get('/api/v1/contacts', async (req, res) => {
  const { state: stateParam, lga: lgaParam } = req.query as { [k: string]: string };
  try {
    if (!stateParam || !lgaParam) {
      return res.status(400).json({ error: 'state and lga query parameters are required' });
    }

    // resolve state id
    let stateId: number | null = null;
    if (/^[0-9]+$/.test(stateParam)) stateId = Number(stateParam);
    else {
      const s = await pool.query('SELECT id FROM states WHERE slug=$1 OR LOWER(name)=LOWER($2) LIMIT 1', [stateParam, stateParam]);
      if (s.rowCount) stateId = s.rows[0].id;
    }

    if (!stateId) return res.status(404).json({ error: 'state not found' });

    // resolve lga id
    let lgaId: number | null = null;
    if (/^[0-9]+$/.test(lgaParam)) lgaId = Number(lgaParam);
    else {
      const l = await pool.query('SELECT id FROM lgas WHERE (slug=$1 OR LOWER(name)=LOWER($2)) AND state_id=$3 LIMIT 1', [lgaParam, lgaParam, stateId]);
      if (l.rowCount) lgaId = l.rows[0].id;
    }

    if (!lgaId) return res.status(404).json({ error: 'lga not found for state' });

    const contactsQ = await pool.query(
      `SELECT c.id as contact_id, c.name as service, c.notes, c.is_toll_free, c.last_verified_at, c.source_url,
         json_agg(json_build_object('id', cn.id, 'number', cn.number, 'label', cn.label, 'is_active', cn.is_active) ORDER BY cn.id) AS numbers
       FROM contacts c
       LEFT JOIN contact_numbers cn ON cn.contact_id = c.id
       WHERE c.state_id = $1 AND c.lga_id = $2 AND c.is_active = true
       GROUP BY c.id
       ORDER BY c.id`,
      [stateId, lgaId]
    );

    res.json({ state_id: stateId, lga_id: lgaId, contacts: contactsQ.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to fetch contacts' });
  }
});

// GET /api/v1/quicknumbers
app.get('/api/v1/quicknumbers', async (req, res) => {
  const quick = [
    { name: 'National Emergency', number: '112', is_toll_free: true },
    { name: 'FRSC', number: '122', is_toll_free: true },
    { name: 'Police', number: '199', is_toll_free: true }
  ];
  res.json({ quick_numbers: quick });
});

// POST /api/v1/reports
app.post('/api/v1/reports', async (req, res) => {
  const { state_id, lga_id, service_name, reported_number, correct_number, reporter_email, notes } = req.body as any;
  if (!service_name && !reported_number) {
    return res.status(400).json({ error: 'service_name or reported_number required' });
  }
  try {
    const result = await pool.query(
      `INSERT INTO reports(state_id, lga_id, service_name, reported_number, correct_number, reporter_email, notes)
       VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id, status, created_at`,
      [state_id || null, lga_id || null, service_name || null, reported_number || null, correct_number || null, reporter_email || null, notes || null]
    );

    res.status(201).json({ report: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to create report' });
  }
});

app.listen(PORT, () => {
  console.log(`Send Help backend listening on http://localhost:${PORT}`);
});
