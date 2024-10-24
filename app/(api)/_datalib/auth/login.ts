'use server';
import { NextResponse } from 'next/server';
import { signIn } from 'auth';

import { HttpError, NotAuthenticatedError } from '@utils/response/Errors';
import { GetManyJudges } from '@datalib/judges/getJudge';

export async function Login(body: { email: string; password: string }) {
  try {
    const { email, password } = body;

    // Find Judge
    const res = await GetManyJudges({ email });
    const data = await res.json();
    if (!data.ok || data.body.length === 0) {
      throw new NotAuthenticatedError('Judge not found');
    }

    const response = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false,
    });

    if (!response.ok) {
      throw new NotAuthenticatedError('Invalid login credentials');
    }

    return NextResponse.json(
      { ok: true, body: response, error: null },
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
