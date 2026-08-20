import { Pool } from 'pg';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function splitNumbers(raw: any): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.map(String).map((s) => s.trim()).filter(Boolean);
  return String(raw)
    .split(/[,;|\\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

async function seed() {
  if (!process.env.DATABASE_URL) {
    console.error('Please set DATABASE_URL in your environment (.env)');
    process.exit(1);
  }

  console.log('Importing data from src/data.ts...');
  // Import the project's data.ts. We rely on ts-node to run this script directly.
  // The path is relative from backend/src/seed.ts -> ../../src/data.ts
  // Use dynamic require to support ts-node
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const dataModule = require(path.resolve(__dirname, './data.ts'));
  const emergencyData = dataModule.default || dataModule.emergencyData || dataModule;
  const statePoliceContacts = dataModule.statePoliceContacts || {};

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    console.log('Clearing existing data (tables: contact_numbers, contacts, services, lgas, states, reports)');
    await client.query('TRUNCATE contact_numbers, contacts, services, lgas, states, reports RESTART IDENTITY CASCADE');

    const stateMap = new Map<string, number>();
    const lgaMap = new Map<string, number>();
    const serviceMap = new Map<string, number>();

    // Insert states and LGAs
    for (const stateName of Object.keys(emergencyData)) {
      const slug = slugify(stateName);
      const resState = await client.query(
        'INSERT INTO states(name, slug) VALUES($1,$2) RETURNING id',
        [stateName, slug]
      );
      const stateId = resState.rows[0].id as number;
      stateMap.set(stateName, stateId);

      const areas = emergencyData[stateName] || {};
      for (const lgaName of Object.keys(areas)) {
        const lgaSlug = slugify(lgaName);
        const resLga = await client.query(
          'INSERT INTO lgas(state_id, name, slug) VALUES($1,$2,$3) RETURNING id',
          [stateId, lgaName, lgaSlug]
        );
        const lgaId = resLga.rows[0].id as number;
        lgaMap.set(`${stateName}::${lgaName}`, lgaId);

        // For each service in the area, create service/contact/number rows
        const services = areas[lgaName];
        for (const serviceName of Object.keys(services)) {
          const rawNumber = services[serviceName];
          // normalize service entry into a service row (optional)
          const svcKey = serviceName.toLowerCase();
          let serviceId: number | undefined = serviceMap.get(svcKey);
          if (!serviceId) {
            const cat = svcKey.includes('police') ? 'police' : svcKey.includes('fire') ? 'fire' : svcKey.includes('ambulance') ? 'ambulance' : 'other';
            const resSvc = await client.query('INSERT INTO services(name, category) VALUES($1,$2) RETURNING id', [serviceName, cat]);
            serviceId = resSvc.rows[0].id as number;
            serviceMap.set(svcKey, serviceId);
          }

          const resContact = await client.query(
            'INSERT INTO contacts(state_id, lga_id, service_id, name, notes, is_toll_free) VALUES($1,$2,$3,$4,$5,$6) RETURNING id',
            [stateId, lgaId, serviceId, serviceName, null, false]
          );
          const contactId = resContact.rows[0].id as number;

          // Numbers may be a reference to statePoliceContacts or direct numbers
          let numbers: string[] = [];
          if (typeof rawNumber === 'string' && rawNumber in statePoliceContacts) {
            numbers = splitNumbers(statePoliceContacts[rawNumber]);
          } else {
            numbers = splitNumbers(rawNumber);
          }

          // If no numbers, but there is a statePoliceContacts entry for the state, prefer that
          if (numbers.length === 0) {
            const statePoliceKey = Object.keys(statePoliceContacts).find(k => k.toLowerCase().includes(stateName.toLowerCase().split(' ')[0]));
            if (statePoliceKey && statePoliceContacts[statePoliceKey]) {
              numbers = splitNumbers(statePoliceContacts[statePoliceKey]);
            }
          }

          for (const num of numbers) {
            await client.query('INSERT INTO contact_numbers(contact_id, number, raw_number) VALUES($1,$2,$3)', [contactId, num, num]);
          }
        }
      }
    }

    // Also insert any states that are present in statePoliceContacts but not in emergencyData (defensive)
    for (const stateKey of Object.keys(statePoliceContacts)) {
      // try to map key to existing state
      const exists = Array.from(stateMap.keys()).some(s => s.toLowerCase().includes(stateKey.toLowerCase().split(' ')[0]));
      if (!exists) {
        const slug = slugify(stateKey);
        const resState = await client.query('INSERT INTO states(name, slug) VALUES($1,$2) RETURNING id', [stateKey, slug]);
        const stateId = resState.rows[0].id as number;
        stateMap.set(stateKey, stateId);
      }
    }

    // Done
    await client.query('COMMIT');
    console.log('Seeding completed.');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Seeding error:', err);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
