import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import pool from '../../../lib/db';

// GET: Fetch appointments for the calendar
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  // In a real app, we would filter by start_date/end_date here
  const res = await pool.query("SELECT * FROM appointments ORDER BY start_time ASC");
  return NextResponse.json(res.rows);
}

// POST: Create a NEW appointment
export async function POST(req) {
  const body = await req.json();
  const { patient_name, start_time, duration } = body;
  
  await pool.query(
    "INSERT INTO appointments (patient_name, start_time, duration_minutes, status) VALUES ($1, $2, $3, 'BOOKED')",
    [patient_name, start_time, duration || 60]
  );
  
  return NextResponse.json({ success: true });
}

// DELETE: Cancel & Trigger n8n
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  // 1. Get details before deleting (for the SMS)
  const appt = await pool.query("SELECT * FROM appointments WHERE id = $1", [id]);
  
  if (appt.rows.length > 0) {
    // 2. Trigger n8n
    try {
        await fetch(process.env.N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                message: "Slot Opened", 
                slotId: id,
                rawTime: appt.rows[0].start_time,
                bookingLink: `https://prio.automate.qzz.io/claim/${id}` 
            })
        });
    } catch (e) { console.error(e); }

    // 3. Instead of deleting, we mark it as 'FREE' so people can claim it
    // Or if you want to just delete it: "DELETE FROM appointments..."
    // For Prio logic, we usually update to FREE.
    await pool.query("UPDATE appointments SET status = 'FREE', patient_name = NULL WHERE id = $1", [id]);
  }

  return NextResponse.json({ success: true });
}