import type { FormEvent } from 'react';
import { useState } from 'react';

import { pushAnalyticsEvent } from '../lib/analytics';
import {
  platformConfigs,
  platformList,
  sanitizeUsername,
  type LookupApiResponse,
  type LookupData,
  type PlatformKey,
  validateUsername,
} from '../lib/lookup';
import Result from './result';
import SearchInput from './searchInput';

type LookupStatus = 'idle' | 'loading' | 'success' | 'error';

interface LookupToolProps {
  initialPlatform?: PlatformKey;
  allowPlatformSwitch?: boolean;
}

function getErrorMessage(payload: LookupApiResponse | null, status: number) {
  if (payload && !payload.ok) {
    return payload.error.message;
  }

  return `The lookup failed with status ${status}.`;
}

export default function LookupTool({
  initialPlatform = 'twitch',
  allowPlatformSwitch = false,
}: LookupToolProps) {
  const [platform, setPlatform] = useState<PlatformKey>(initialPlatform);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<LookupStatus>('idle');
  const [result, setResult] = useState<LookupData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const config = platformConfigs[platform];

  function handlePlatformChange(nextPlatform: PlatformKey) {
    setPlatform(nextPlatform);
    setQuery('');
    setStatus('idle');
    setResult(null);
    setError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const username = sanitizeUsername(query);
    const validationError = validateUsername(platform, username);

    setQuery(username);

    if (validationError) {
      setStatus('error');
      setResult(null);
      setError(validationError);
      return;
    }

    setStatus('loading');
    setResult(null);
    setError(null);

    pushAnalyticsEvent('lookup_submit', {
      platform,
      username,
    });

    try {
      const response = await fetch(
        `/api/${platform}/${encodeURIComponent(username.toLowerCase())}`
      );
      const payload = (await response.json()) as LookupApiResponse;

      if (!response.ok || !payload.ok) {
        const message = getErrorMessage(payload, response.status);

        setStatus('error');
        setError(message);
        pushAnalyticsEvent('lookup_error', {
          platform,
          username,
          status: response.status,
        });
        return;
      }

      setStatus('success');
      setResult(payload.data);
      setError(null);
      setQuery(payload.data.username);

      pushAnalyticsEvent('lookup_success', {
        platform,
        username: payload.data.username,
        result_id: payload.data.id,
      });
    } catch {
      setStatus('error');
      setError('The lookup could not be completed right now. Try again in a moment.');
    }
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            ID Lookup
          </p>
          <h1 className="font-display mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">
            {allowPlatformSwitch ? 'Find an ID' : `${config.name} ID Lookup`}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            {allowPlatformSwitch
              ? 'Choose a platform, enter a username, and copy the returned ID.'
              : config.description}
          </p>
        </div>

        {allowPlatformSwitch ? (
          <div className="grid grid-cols-2 rounded-lg border border-slate-200 bg-slate-50 p-1 text-sm font-medium">
            {platformList.map((item) => {
              const isActive = item.key === platform;

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handlePlatformChange(item.key)}
                  className={`rounded-md px-4 py-2 transition ${
                    isActive
                      ? 'bg-slate-950 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-white hover:text-slate-950'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="mt-6 border-t border-slate-200 pt-6">
        <SearchInput
          value={query}
          onChange={setQuery}
          onSubmit={handleSubmit}
          placeholder={config.searchPlaceholder}
          helperText={config.helperText}
          platformLabel={config.name}
          accentColor={config.accentColor}
          isLoading={status === 'loading'}
        />
        <Result
          status={status}
          result={result}
          error={error}
          accentColor={config.accentColor}
          availabilityNote={config.availabilityNote}
          profileLabel={config.profileLabel}
        />
      </div>
    </section>
  );
}
