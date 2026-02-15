import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import pool from '../../../lib/db';

export async function GET() {
  // 1. Reset Table
  await pool.query(`DROP TABLE IF EXISTS appointments;`);
  
  // 2. Create Table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS appointments (
      id SERIAL PRIMARY KEY,
      patient_name VARCHAR(100),
      start_time TIMESTAMP NOT NULL,
      duration_minutes INT DEFAULT 60,
      status VARCHAR(20) DEFAULT 'BOOKED'
    );
  `);

  // 3. Inject "Nsibti Laaziza" Cast
  // We calculate dates relative to the start of the CURRENT week (Monday)
  const query = `
    INSERT INTO appointments (patient_name, start_time, status)
    VALUES 
    -- Monday
    ('Hjayer', DATE_TRUNC('week', CURRENT_DATE) + TIME '09:00:00', 'BOOKED'),
    ('Barisa', DATE_TRUNC('week', CURRENT_DATE) + TIME '11:00:00', 'BOOKED'),
    ('Babboucha', DATE_TRUNC('week', CURRENT_DATE) + TIME '14:00:00', 'BOOKED'),

    -- Tuesday
    ('Mongi', DATE_TRUNC('week', CURRENT_DATE) + INTERVAL '1 day' + TIME '08:00:00', 'BOOKED'),
    ('Fahima', DATE_TRUNC('week', CURRENT_DATE) + INTERVAL '1 day' + TIME '10:00:00', 'BOOKED'),
    
    -- Wednesday
    ('Khamisa', DATE_TRUNC('week', CURRENT_DATE) + INTERVAL '2 days' + TIME '09:00:00', 'BOOKED'),
    ('Fatma', DATE_TRUNC('week', CURRENT_DATE) + INTERVAL '2 days' + TIME '13:00:00', 'BOOKED'),
    ('Moncef', DATE_TRUNC('week', CURRENT_DATE) + INTERVAL '2 days' + TIME '15:00:00', 'BOOKED'),

    -- Thursday
    ('Azaiez', DATE_TRUNC('week', CURRENT_DATE) + INTERVAL '3 days' + TIME '10:00:00', 'BOOKED'),
    ('Sofiene', DATE_TRUNC('week', CURRENT_DATE) + INTERVAL '3 days' + TIME '14:00:00', 'BOOKED'),

    -- Friday
    ('Si Lamine', DATE_TRUNC('week', CURRENT_DATE) + INTERVAL '4 days' + TIME '09:00:00', 'BOOKED'),
    ('Jamila', DATE_TRUNC('week', CURRENT_DATE) + INTERVAL '4 days' + TIME '11:00:00', 'BOOKED');
  `;

  await pool.query(query);
  
// 4. Create Waitlist Table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS waitlist (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      phone VARCHAR(20),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  return NextResponse.json({ message: "System Loaded: Clinique El Aouina is open." });
}