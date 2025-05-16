import { NextRequest, NextResponse } from 'next/server';
import { apiClient } from '@/lib/api-client';

// GET /api/mock/cap-tables/:id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await apiClient.getCapTable(params.id);
    
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch cap table' },
      { status: error.status || 500 }
    );
  }
}

// PUT /api/mock/cap-tables/:id
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const response = await apiClient.updateCapTable(params.id, body);
    
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update cap table' },
      { status: error.status || 500 }
    );
  }
}

// DELETE /api/mock/cap-tables/:id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await apiClient.deleteCapTable(params.id);
    
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete cap table' },
      { status: error.status || 500 }
    );
  }
}