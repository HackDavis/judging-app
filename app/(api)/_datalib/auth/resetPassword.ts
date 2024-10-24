'use server';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import { GetManyJudges } from '@datalib/judges/getJudge';
import { UpdateJudge } from '@datalib/judges/updateJudge';
import { HttpError } from '@utils/response/Errors';
import { signOut } from 'auth';

export async function ResetPassword(body: { email: string; password: string }) {
  try {
    const { email, password } = body;
    const hashedPassword = await bcrypt.hash(password as string, 10);

    // Find Judge
    const judge_res = await GetManyJudges({ email });
    const judge_data = await judge_res.json();
    if (!judge_data.ok || judge_data.body.length === 0) {
      throw new HttpError('Judge not found');
    }

    // UpdateJudge
    const updateRes = await UpdateJudge(judge_data.body[0]._id, {
      $set: {
        password: hashedPassword,
      },
    });

    const updateData = await updateRes.json();

    await signOut();

    return NextResponse.json(
      { ok: true, body: updateData, error: null },
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
