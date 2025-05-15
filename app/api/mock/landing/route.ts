import { NextResponse } from 'next/server'
import landingData from '@/mock/landing.json'

export async function GET() {
  return NextResponse.json(landingData)
}