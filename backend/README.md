# Send Help backend (minimal)

This folder contains a minimal Node.js + Express + TypeScript backend to power the Send Help frontend.

Features implemented (MVP):
- GET /api/v1/states
- GET /api/v1/states/:state_id/lgas
- GET /api/v1/contacts?state=:state_id&lga=:lga_id
- GET /api/v1/quicknumbers
- POST /api/v1/reports
- GET /api/v1/health

It also includes migration and seed scripts that import the existing frontend data (src/data.ts) into PostgreSQL.

Setup

1. From the repo root, go to the backend folder:
   cd backend

2. Copy .env.example to .env and set DATABASE_URL to your Postgres / Supabase connection string.

3. Install dependencies:
   npm install

4. Run migrations:
   npm run migrate

5. Seed the database (this imports data from ../src/data.ts):
   npm run seed

6. Run the dev server:
   npm run dev

Testing endpoints (examples)

Assuming the server is running on http://localhost:4000

- Health
  curl http://localhost:4000/api/v1/health

- States
  curl http://localhost:4000/api/v1/states

- LGAs for a state (by id or slug)
  curl http://localhost:4000/api/v1/states/1/lgas
  curl http://localhost:4000/api/v1/states/lagos/lgas

- Contacts for an LGA
  curl "http://localhost:4000/api/v1/contacts?state=lagos&lga=ikeja"

- Quick numbers
  curl http://localhost:4000/api/v1/quicknumbers

- Report (POST)
  curl -X POST http://localhost:4000/api/v1/reports -H "Content-Type: application/json" -d '{"state_id":1,"lga_id":1,"service_name":"Police","reported_number":"08031234567","notes":"Not reachable"}'

Notes

- The seed script imports data by requiring the frontend file ../../src/data.ts. It expects you to run it with ts-node (the provided npm script does this).
- This backend intentionally avoids authentication and admin features per instructions.
