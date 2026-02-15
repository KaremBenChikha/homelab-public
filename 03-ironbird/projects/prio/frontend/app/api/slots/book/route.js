import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import pool from '../../../../lib/db';

export async function POST(req) {
  const { id, patientName } = await req.json();

  // THE RACE CONDITION FIX:
  // Only update IF the status is currently 'FREE'
  const res = await pool.query(
    "UPDATE appointments SET status = 'BOOKED', patient_name = $2 WHERE id = $1 AND status = 'FREE'", 
    [id, patientName]
  );

  if (res.rowCount === 0) {
    // 0 rows affected means someone else took it (or id is wrong)
    return NextResponse.json({ success: false });
  }

  return NextResponse.json({ success: true });
}