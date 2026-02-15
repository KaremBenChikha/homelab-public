import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import pool from '../../../../lib/db';

export async function POST(req) {
  const { id } = await req.json();
  
  // 1. Mark slot as FREE in DB
  await pool.query("UPDATE slots SET status = 'FREE', patient_name = NULL WHERE id = $1", [id]);

  // 2. Trigger n8n Webhook (The "Blast")
  // We send the Slot ID so n8n knows which link to send
  try {
    await fetch(process.env.N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        message: "Slot Opened", 
        slotId: id,
        bookingLink: `https://prio.yourdomain.com/claim/${id}` 
      })
    });
  } catch (e) {
    console.error("n8n trigger failed", e);
  }

  return NextResponse.json({ success: true });
}