import { NextRequest } from 'next/server';
import { UpdateJudge } from '@datalib/judges/updateJudge';
import { revalidatePath } from 'next/cache';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = request.json();
  revalidatePath('/judges');
  return UpdateJudge(params.id, body);
}
