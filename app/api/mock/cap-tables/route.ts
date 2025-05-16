import { NextRequest, NextResponse } from 'next/server';
import { apiClient } from '@/lib/api-client';

// GET /api/mock/cap-tables
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('companyId');
    
    const response = await apiClient.listCapTables({ companyId: companyId || undefined });
    
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch cap tables' },
      { status: error.status || 500 }
    );
  }
}

// POST /api/mock/cap-tables
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await apiClient.createCapTable(body);
    
    return NextResponse.json(response.data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create cap table' },
      { status: error.status || 500 }
    );
  }
}