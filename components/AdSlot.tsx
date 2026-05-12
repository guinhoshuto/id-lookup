import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdSlotProps {
  label: string;
  slotId?: string;
  minHeight?: number;
  format?: 'auto' | 'horizontal' | 'rectangle' | 'vertical';
  className?: string;
}

export default function AdSlot({
  label,
  slotId,
  minHeight = 280,
  format = 'auto',
  className = '',
}: AdSlotProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const isLiveSlot = Boolean(clientId && slotId);
  const showPlaceholder = process.env.NODE_ENV !== 'production';

  useEffect(() => {
    if (!isLiveSlot || typeof window === 'undefined') {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ignore duplicate slot pushes while keeping the layout stable.
    }
  }, [isLiveSlot, slotId]);

  if (!isLiveSlot && !showPlaceholder) {
    return null;
  }

  return (
    <aside
      className={`rounded-lg border border-slate-200 bg-white p-4 shadow-sm ${className}`}
      style={{ minHeight }}
    >
      <div className="mb-3 flex items-center justify-between text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
        <span>Advertisement</span>
        <span>{label}</span>
      </div>

      {isLiveSlot ? (
        <ins
          className="adsbygoogle block w-full overflow-hidden rounded-md"
          style={{ display: 'block', minHeight }}
          data-ad-client={clientId}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex min-h-[120px] items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50 px-4 text-center text-sm leading-6 text-slate-500">
          Ad space reserved
        </div>
      )}
    </aside>
  );
}
