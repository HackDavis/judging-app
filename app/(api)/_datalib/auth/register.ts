'use server';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import { CreateJudge } from '@datalib/judges/createJudge';
import { DuplicateError, HttpError } from '@utils/response/Errors';
import { GetManyJudges } from '@datalib/judges/getJudge';
import { createAuthToken } from './authToken';
import JudgeInt from 'app/_types/judges';

export async function Register(body: JudgeInt) {
  try {
    const { email, password, ...rest } = body;
    const hashedPassword = await bcrypt.hash(password as string, 10);

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

    const token = await createAuthToken(data.body);
    return NextResponse.json({ ok: true, body: token }, { status: 200 });
  } catch (e) {
    const error = e as HttpError;
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: error.status || 400 }
    );
  }
}
