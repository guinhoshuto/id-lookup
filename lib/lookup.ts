export type PlatformKey = 'twitch' | 'instagram';

export interface LookupData {
  id: string;
  username: string;
  displayName?: string | null;
  description?: string | null;
  avatarUrl?: string | null;
  followersCount?: number | null;
  mediaCount?: number | null;
  profileUrl: string;
  note?: string | null;
}

export interface LookupApiSuccess {
  ok: true;
  platform: PlatformKey;
  data: LookupData;
}

export interface LookupApiError {
  ok: false;
  error: {
    code: string;
    message: string;
    details?: string;
  };
}

export type LookupApiResponse = LookupApiSuccess | LookupApiError;

interface FaqItem {
  question: string;
  answer: string;
}

export interface PlatformConfig {
  key: PlatformKey;
  name: string;
  headline: string;
  heroLabel: string;
  description: string;
  shortDescription: string;
  searchPlaceholder: string;
  helperText: string;
  availabilityNote: string;
  resultNote: string;
  accentColor: string;
  chip: string;
  profileLabel: string;
  faq: FaqItem[];
}

export const platformConfigs: Record<PlatformKey, PlatformConfig> = {
  twitch: {
    key: 'twitch',
    name: 'Twitch',
    headline: 'Twitch ID Lookup',
    heroLabel: 'Twitch',
    description:
      'Enter a Twitch username to look up the numeric account ID.',
    shortDescription: 'Look up a Twitch ID by username.',
    searchPlaceholder: 'twitchdev',
    helperText:
      'Use a Twitch login with letters, numbers, or underscores.',
    availabilityNote:
      'This lookup depends on valid credentials for the official Twitch API.',
    resultNote:
      'The result shows the account ID, the username returned by the platform, and a profile link.',
    accentColor: '#4f46e5',
    chip: 'Twitch API',
    profileLabel: 'Open Twitch',
    faq: [
      {
        question: 'What is a Twitch ID?',
        answer:
          'It is the numeric account identifier used by APIs, bots, overlays, and external tools.',
      },
      {
        question: 'Does it work after a channel rename?',
        answer:
          'Yes. The lookup uses the current login and returns the matching account ID.',
      },
      {
        question: 'Why can a lookup fail?',
        answer:
          'The most common causes are an expired token or an incorrect Client ID in the API configuration.',
      },
    ],
  },
  instagram: {
    key: 'instagram',
    name: 'Instagram',
    headline: 'Instagram ID Lookup',
    heroLabel: 'Instagram',
    description:
      'Enter an Instagram username to look up the ID when the account is supported by the Meta API.',
    shortDescription: 'Look up IDs for Instagram accounts supported by Meta.',
    searchPlaceholder: 'instagram',
    helperText:
      'Use a username with letters, numbers, periods, or underscores.',
    availabilityNote:
      'Instagram lookup depends on Meta Business Discovery and may not work for personal profiles.',
    resultNote:
      'When Meta returns the account, the result shows the ID, username, profile link, and available metrics.',
    accentColor: '#0f766e',
    chip: 'Meta API',
    profileLabel: 'Open Instagram',
    faq: [
      {
        question: 'Does it work for every Instagram account?',
        answer:
          'Not necessarily. The official API used here depends on Meta permissions and the account type.',
      },
      {
        question: 'Why might a lookup return no ID?',
        answer:
          'Meta may block the request because of an expired token, missing permission, or unsupported account.',
      },
      {
        question: 'What appears when it works?',
        answer:
          'The account ID, username, profile link, and any public data allowed by the current permission.',
      },
    ],
  },
};

export const platformList = Object.values(platformConfigs);

const usernamePatterns: Record<PlatformKey, RegExp> = {
  twitch: /^[a-zA-Z0-9_]{4,25}$/,
  instagram: /^(?!.*\.\.)[a-zA-Z0-9._]{1,30}$/,
};

export function sanitizeUsername(value: string | string[] | undefined) {
  const input = Array.isArray(value) ? value[0] : value;
  return (input ?? '').trim().replace(/^@+/, '');
}

export function validateUsername(platform: PlatformKey, username: string) {
  if (!username) {
    return 'Enter a username before searching.';
  }

  if (!usernamePatterns[platform].test(username)) {
    if (platform === 'twitch') {
      return 'Twitch usernames must be 4 to 25 characters and use letters, numbers, or underscores.';
    }

    return 'Instagram usernames can use letters, numbers, periods, and underscores.';
  }

  return null;
}

export function normalizeSecret(value?: string) {
  return (value ?? '').trim().replace(/^['"]|['"]$/g, '');
}

export function formatCompactNumber(value?: number | null) {
  if (typeof value !== 'number') {
    return null;
  }

  return new Intl.NumberFormat('en', {
    maximumFractionDigits: 1,
    notation: 'compact',
  }).format(value);
}
