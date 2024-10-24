'use server';
import { NextRequest, NextResponse } from 'next/server';

import { Login } from '@datalib/auth/login';
import { HttpError, NotAuthenticatedError } from '@utils/response/Errors';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await Login(body);
    const data = await res.json();

    if (!data.ok) {
      throw new NotAuthenticatedError(data.error);
    }

    return NextResponse.json(
      { ok: true, body: null, error: null },
      { status: 200 }
    );
  } catch (e) {
    const error = e as HttpError;
    return NextResponse.json(
      { ok: false, body: null, error: error.message },
      { status: error.status || 400 }
    );
  }
}
