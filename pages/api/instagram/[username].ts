import type { NextApiRequest, NextApiResponse } from 'next';

import { readJsonSafely, sendApiError, sendApiSuccess } from '../../../lib/api';
import {
  normalizeSecret,
  sanitizeUsername,
  validateUsername,
} from '../../../lib/lookup';

interface InstagramBusinessDiscovery {
  id: string;
  username: string;
  name?: string;
  profile_picture_url?: string;
  followers_count?: number;
  media_count?: number;
  website?: string;
}

interface MetaErrorPayload {
  error?: {
    code?: number;
    message?: string;
    type?: string;
  };
  business_discovery?: InstagramBusinessDiscovery;
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
  const validationError = validateUsername('instagram', username);

  if (validationError) {
    return sendApiError(res, 400, 'invalid_username', validationError);
  }

  const facebookId = normalizeSecret(process.env.FACEBOOK_ID);
  const token = normalizeSecret(process.env.FACEBOOK_TOKEN);
  const graphVersion = normalizeSecret(process.env.FACEBOOK_GRAPH_VERSION) || 'v23.0';

  if (!facebookId || !token) {
    return sendApiError(
      res,
      503,
      'config_missing',
      'Meta credentials are missing. Set FACEBOOK_ID and FACEBOOK_TOKEN.'
    );
  }

  const fields = `business_discovery.username(${username.toLowerCase()}){id,username,name,profile_picture_url,followers_count,media_count,website}`;
  const requestUrl = `https://graph.facebook.com/${graphVersion}/${facebookId}?fields=${encodeURIComponent(
    fields
  )}&access_token=${encodeURIComponent(token)}`;

  try {
    const response = await fetch(requestUrl, {
      cache: 'no-store',
    });
    const payload = (await readJsonSafely(response)) as MetaErrorPayload | null;

    if (response.status === 401 || response.status === 403) {
      return sendApiError(
        res,
        502,
        'auth_failed',
        'Meta rejected the current credentials. Refresh the token or review the app permissions.'
      );
    }

    if (response.status === 429) {
      return sendApiError(
        res,
        429,
        'rate_limited',
        'Instagram rate-limited lookups for now. Try again in a moment.'
      );
    }

    if (!response.ok) {
      const upstreamMessage = payload?.error?.message?.toLowerCase() ?? '';

      if (
        upstreamMessage.includes('validating access token') ||
        upstreamMessage.includes('session has been invalidated') ||
        upstreamMessage.includes('invalid oauth access token')
      ) {
        return sendApiError(
          res,
          502,
          'auth_failed',
          'Meta rejected the current credentials. Refresh the token or review the app permissions.'
        );
      }

      if (
        upstreamMessage.includes('cannot find user') ||
        upstreamMessage.includes('does not exist')
      ) {
        return sendApiError(
          res,
          404,
          'not_found',
          'Instagram did not return a compatible professional account for that username.'
        );
      }

      if (payload?.error?.code === 10 || payload?.error?.code === 100) {
        return sendApiError(
          res,
          502,
          'unsupported_account',
          'Meta Business Discovery could not resolve that username with the current permissions or account type.'
        );
      }

      return sendApiError(
        res,
        502,
        'upstream_error',
        'Instagram could not complete the lookup right now.',
        payload?.error?.message
      );
    }

    const profile = payload?.business_discovery;

    if (!profile) {
      return sendApiError(
        res,
        404,
        'not_found',
        'Instagram did not return a supported account for that username.'
      );
    }

    return sendApiSuccess(res, 'instagram', {
      id: profile.id,
      username: profile.username,
      displayName: profile.name || profile.username,
      avatarUrl: profile.profile_picture_url || null,
      followersCount: profile.followers_count ?? null,
      mediaCount: profile.media_count ?? null,
      profileUrl: `https://www.instagram.com/${profile.username}/`,
      note:
        'Result returned by Meta Business Discovery. Coverage depends on the account type and app permissions.',
    });
  } catch {
    return sendApiError(
      res,
      502,
      'network_error',
      'The Instagram lookup failed before receiving a response.'
    );
  }
}
