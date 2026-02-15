import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import pool from '../../../lib/db';

export async function GET() {
  const res = await pool.query('SELECT * FROM slots ORDER BY id ASC');
  return NextResponse.json(res.rows);
}