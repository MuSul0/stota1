import { Pool } from 'pg';

// Konfiguration für die direkte Verbindung
const pool = new Pool({
  host: 'db.edcuorkphchuobrfqvyb.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: process.env.SUPABASE_DB_PASSWORD, // Setzen Sie dies in Ihrer .env Datei
  ssl: {
    rejectUnauthorized: false // Nur für Entwicklung empfohlen
  }
});

// Testfunktion für die Verbindung
export async function testConnection() {
  try {
    const client = await pool.connect();
    const res = await client.query('SELECT NOW() as current_time');
    client.release();
    return res.rows[0].current_time;
  } catch (err) {
    console.error('Database connection error:', err);
    throw err;
  }
}

// CRUD Operationen für Mitarbeiter
export async function logWorkHours(employeeId: string, hours: number, date: Date) {
  const query = `
    INSERT INTO work_hours (employee_id, hours, date)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [employeeId, hours, date];

  try {
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (err) {
    console.error('Error logging work hours:', err);
    throw err;
  }
}

// Bild Upload Tracking
export async function trackImageUpload(employeeId: string, imageUrl: string) {
  const query = `
    INSERT INTO employee_images (employee_id, image_url)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [employeeId, imageUrl];

  try {
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (err) {
    console.error('Error tracking image upload:', err);
    throw err;
  }
}

// Empfehlungen speichern
export async function saveRecommendation(employeeId: string, text: string) {
  const query = `
    INSERT INTO recommendations (employee_id, text)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [employeeId, text];

  try {
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (err) {
    console.error('Error saving recommendation:', err);
    throw err;
  }
}

export default pool;