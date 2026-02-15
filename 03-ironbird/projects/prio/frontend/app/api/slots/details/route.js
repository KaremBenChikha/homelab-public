import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import pool from '../../../../lib/db';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const res = await pool.query("SELECT * FROM appointments WHERE id = $1", [id]);
  return NextResponse.json(res.rows[0]);
}