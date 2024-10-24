'use server';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
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

    const judge = data.body[0];

    const isPasswordValid = await bcrypt.compare(
      password as string,
      judge.password
    );

    if (!isPasswordValid) {
      throw new NotAuthenticatedError('Email or Password do not match');
    }

    const response = await signIn('credentials', {
      email: judge.email,
      password: judge.password,
      redirect: false,
    });

    if (!response?.ok) {
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
