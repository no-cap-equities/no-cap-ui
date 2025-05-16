import { NextRequest, NextResponse } from 'next/server';
import { apiClient } from '@/lib/api-client';

// GET /api/mock/stakeholders
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('companyId');
    
    const response = await apiClient.listStakeholders({ companyId: companyId || undefined });
    
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch stakeholders' },
      { status: error.status || 500 }
    );
  }
}

// POST /api/mock/stakeholders
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await apiClient.createStakeholder(body);
    
    return NextResponse.json(response.data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create stakeholder' },
      { status: error.status || 500 }
    );
  }
}