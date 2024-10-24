'use server';

import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { signIn } from 'auth';

import { CreateJudge } from '@datalib/judges/createJudge';
import {
  DuplicateError,
  HttpError,
  NotAuthenticatedError,
} from '@utils/response/Errors';
import { GetManyJudges } from '@datalib/judges/getJudge';
import JudgeInt from '@typeDefs/judges';

export async function Register(body: JudgeInt) {
  try {
    const { email, password, ...rest } = body;
    const hashedPassword = await hash(password as string, 10);

    // Find Judge
    const judgeRes = await GetManyJudges({ email });
    const judgeData = await judgeRes.json();
    if (!judgeData.ok || judgeData.body.length !== 0) {
      throw new DuplicateError('Judge already exists');
    }

    // Create Judge
    const res = await CreateJudge({ email, password: hashedPassword, ...rest });
    const data = await res.json();

    if (!data.ok) {
      throw new HttpError('Failed to create judge');
    }

    const judge = data.body;

    // Sign In
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
