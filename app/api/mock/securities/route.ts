import { NextRequest, NextResponse } from 'next/server';
import { apiClient } from '@/lib/api-client';

// GET /api/mock/securities
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('companyId');
    const type = searchParams.get('type');
    
    const response = await apiClient.listSecurities({ 
      companyId: companyId || undefined,
      type: type as any || undefined
    });
    
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch securities' },
      { status: error.status || 500 }
    );
  }
}

// POST /api/mock/securities
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await apiClient.createSecurity(body);
    
    return NextResponse.json(response.data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create security' },
      { status: error.status || 500 }
    );
  }
}