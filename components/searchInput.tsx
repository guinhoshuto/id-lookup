import type { FormEvent } from 'react';

interface InputProps {
  value: string;
  onChange: (query: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  placeholder: string;
  helperText: string;
  platformLabel: string;
  accentColor: string;
  isLoading: boolean;
}

export default function SearchInput({
  value,
  onChange,
  onSubmit,
  placeholder,
  helperText,
  platformLabel,
  accentColor,
  isLoading,
}: InputProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {platformLabel}
          </p>
          <h2 className="font-display mt-1 text-xl font-semibold text-slate-950">
            Username
          </h2>
        </div>
        <div
          className="hidden h-2.5 w-2.5 rounded-full md:block"
          style={{ backgroundColor: accentColor }}
        />
      </div>

      <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">{helperText}</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <label className="flex h-14 flex-1 items-center rounded-lg border border-slate-300 bg-white px-4 text-slate-700 transition focus-within:border-slate-950 focus-within:ring-4 focus-within:ring-slate-200">
          <span className="mr-3 text-base font-semibold" style={{ color: accentColor }}>
            @
          </span>
          <input
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            className="h-full w-full bg-transparent text-base text-slate-950 outline-none placeholder:text-slate-400"
          />
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="h-14 rounded-lg px-7 text-sm font-semibold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
          style={{
            backgroundColor: accentColor,
          }}
        >
          {isLoading ? 'Looking up...' : 'Find ID'}
        </button>
      </div>
    </form>
  );
}
