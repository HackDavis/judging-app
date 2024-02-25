import { NextRequest } from 'next/server';
import { GetManyJudges } from '@datalib/judges/getJudge';
import getQueries from '@utils/request/getQueries';

export async function GET(request: NextRequest) {
  const queries = getQueries(request);
  return GetManyJudges(queries);
}
