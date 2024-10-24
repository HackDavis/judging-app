'use server';

import { Register } from '@datalib/auth/register';
import { HttpError, NotAuthenticatedError } from '@utils/response/Errors';
import FormToJSON from '@utils/form/FormToJSON';
import type JudgeInt from '@typeDefs/judges';

export default async function RegisterAction(
  prevState: any,
  formData: FormData
): Promise<{
  ok: boolean;
  body?: null;
  error?: string | null;
}> {
  try {
    const body = FormToJSON(formData) as JudgeInt;

    const res = await Register(body);
    const data = await res.json();

    if (!data.ok) {
      throw new NotAuthenticatedError(data.error);
    }

    return { ok: true, body: null, error: null };
  } catch (e) {
    const error = e as HttpError;
    return { ok: false, body: null, error: error.message };
  }
}
