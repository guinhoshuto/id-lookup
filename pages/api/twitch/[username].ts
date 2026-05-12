import type { NextApiRequest, NextApiResponse } from 'next';

import { readJsonSafely, sendApiError, sendApiSuccess } from '../../../lib/api';
import {
  normalizeSecret,
  sanitizeUsername,
  validateUsername,
} from '../../../lib/lookup';

const TWITCH_URL = 'https://api.twitch.tv/helix/users?login=';

interface TwitchUser {
  id: string;
  login: string;
  display_name: string;
  description?: string;
  profile_image_url?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return sendApiError(res, 405, 'method_not_allowed', 'Use GET for this endpoint.');
  }

  const username = sanitizeUsername(req.query.username);
  const validationError = validateUsername('twitch', username);

  if (validationError) {
    return sendApiError(res, 400, 'invalid_username', validationError);
  }

  const clientId = normalizeSecret(process.env.TWITCH_CLIENT_ID);
  const token = normalizeSecret(process.env.TWITCH_TOKEN);

  if (!clientId || !token) {
    return sendApiError(
      res,
      503,
      'config_missing',
      'Twitch credentials are missing. Set TWITCH_CLIENT_ID and TWITCH_TOKEN.'
    );
  }

  const authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`;

  try {
    const response = await fetch(
      `${TWITCH_URL}${encodeURIComponent(username.toLowerCase())}`,
      {
        headers: {
          Authorization: authorization,
          'Client-Id': clientId,
        },
        cache: 'no-store',
      }
    );

    if (response.status === 401 || response.status === 403) {
      return sendApiError(
        res,
        502,
        'auth_failed',
        'Twitch rejected the current credentials. Refresh the token and verify the Client ID.'
      );
    }

    if (response.status === 429) {
      return sendApiError(
        res,
        429,
        'rate_limited',
        'Twitch rate-limited lookups for now. Try again in a moment.'
      );
    }

    if (!response.ok) {
      const payload = await readJsonSafely(response);

      return sendApiError(
        res,
        502,
        'upstream_error',
        'Twitch could not complete the lookup right now.',
        payload ? JSON.stringify(payload) : undefined
      );
    }

    const payload = (await response.json()) as { data?: TwitchUser[] };
    const user = payload.data?.[0];

    if (!user) {
      return sendApiError(
        res,
        404,
        'not_found',
        'No Twitch user was found with that username.'
      );
    }

    return sendApiSuccess(res, 'twitch', {
      id: user.id,
      username: user.login,
      displayName: user.display_name,
      description: user.description || null,
      avatarUrl: user.profile_image_url || null,
      profileUrl: `https://www.twitch.tv/${user.login}`,
      note: 'Result returned by the official Twitch API.',
    });
  } catch {
    return sendApiError(
      res,
      502,
      'network_error',
      'The Twitch lookup failed before receiving a response.'
    );
  }
}
