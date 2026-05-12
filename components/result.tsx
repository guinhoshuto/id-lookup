import { useEffect, useState } from 'react';

import { formatCompactNumber, type LookupData } from '../lib/lookup';

interface ResultProps {
  status: 'idle' | 'loading' | 'success' | 'error';
  result: LookupData | null;
  error: string | null;
  accentColor: string;
  availabilityNote: string;
  profileLabel: string;
}

export default function Result({
  status,
  result,
  error,
  accentColor,
  availabilityNote,
  profileLabel,
}: ResultProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [result?.id]);

  async function handleCopy() {
    if (!result) {
      return;
    }

    try {
      await navigator.clipboard.writeText(result.id);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (status === 'loading') {
    return (
      <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Looking up
        </p>
        <div className="mt-4 space-y-3">
          <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
          <div className="h-10 w-full animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-slate-200" />
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
          Lookup unavailable
        </p>
        <p className="mt-3 text-sm leading-6 text-red-800">
          {error ?? 'Something went wrong while resolving this username.'}
        </p>
      </div>
    );
  }

  if (status === 'success' && result) {
    const followers = formatCompactNumber(result.followersCount);
    const media = formatCompactNumber(result.mediaCount);

    return (
      <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-5">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              ID found
            </p>
            <p className="font-display mt-2 break-all text-3xl font-semibold text-slate-950 sm:text-4xl">
              {result.id}
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
              <span>@{result.username}</span>
              {result.displayName ? <span>{result.displayName}</span> : null}
            </div>
          </div>

          {result.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={result.avatarUrl}
              alt={result.displayName ?? result.username}
              className="h-16 w-16 rounded-lg border border-slate-200 object-cover"
            />
          ) : null}
        </div>

        {result.description ? (
          <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-600">
            {result.description}
          </p>
        ) : null}

        {followers || media ? (
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            {followers ? (
              <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700">
                Followers {followers}
              </span>
            ) : null}
            {media ? (
              <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700">
                Media {media}
              </span>
            ) : null}
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-lg px-4 py-3 text-sm font-semibold text-white transition hover:brightness-95"
            style={{ backgroundColor: accentColor }}
          >
            {copied ? 'Copied' : 'Copy ID'}
          </button>
          <a
            href={result.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
          >
            {profileLabel}
          </a>
        </div>

        {result.note ? (
          <p className="mt-5 text-sm leading-6 text-slate-500">{result.note}</p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-slate-600">
      Enter a username to look up the platform ID. {availabilityNote}
    </div>
  );
}
