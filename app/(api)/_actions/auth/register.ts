'use server';

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { Register } from '@datalib/auth/register';
import { HttpError, NotAuthenticatedError } from '@utils/response/Errors';
import FormToJSON from '@utils/form/FormToJSON';

import type AuthTokenInt from 'app/_types/authToken';
import type JudgeInt from 'app/_types/judges';

export default async function RegisterAction(
  prevState: any,
  formData: FormData
): Promise<{
  ok: boolean;
  body?: AuthTokenInt | null;
  error?: string | null;
}> {
  try {
    const body = FormToJSON(formData) as JudgeInt;

    const res = await Register(body);
    const data = await res.json();

    if (!data.ok) {
      throw new NotAuthenticatedError(data.error);
    }

    const payload = jwt.decode(data.body) as AuthTokenInt;

    cookies().set({
      name: 'auth_token',
      value: data.body,
      expires: payload.exp * 1000,
      secure: true,
      httpOnly: true,
    });

    return { ok: true, body: payload, error: null };
  } catch (e) {
    const error = e as HttpError;
    return { ok: false, body: null, error: error.message };
  }
}
