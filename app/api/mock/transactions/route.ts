import { NextRequest, NextResponse } from 'next/server';
import { apiClient } from '@/lib/api-client';

// GET /api/mock/transactions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('companyId');
    const type = searchParams.get('type');
    const stakeholderId = searchParams.get('stakeholderId');
    
    const response = await apiClient.listTransactions({ 
      companyId: companyId || undefined,
      type: type as any || undefined,
      stakeholderId: stakeholderId || undefined
    });
    
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch transactions' },
      { status: error.status || 500 }
    );
  }
}

// POST /api/mock/transactions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await apiClient.createTransaction(body);
    
    return NextResponse.json(response.data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create transaction' },
      { status: error.status || 500 }
    );
  }
}