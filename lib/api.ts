import type { NextApiResponse } from 'next';

import type { LookupData, PlatformKey } from './lookup';

export function sendApiError(
  res: NextApiResponse,
  status: number,
  code: string,
  message: string,
  details?: string
) {
  return res.status(status).json({
    ok: false,
    error: {
      code,
      message,
      ...(details ? { details } : {}),
    },
  });
}

export function sendApiSuccess(
  res: NextApiResponse,
  platform: PlatformKey,
  data: LookupData
) {
  return res.status(200).json({
    ok: true,
    platform,
    data,
  });
}

export async function readJsonSafely(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}
