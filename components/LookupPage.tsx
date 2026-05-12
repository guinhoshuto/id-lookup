import { useMemo } from 'react';

import { platformConfigs, type PlatformKey } from '../lib/lookup';
import AdSlot from './AdSlot';
import LookupTool from './LookupTool';
import PageShell from './PageShell';

interface LookupPageProps {
  platform: PlatformKey;
}

export default function LookupPage({ platform }: LookupPageProps) {
  const config = platformConfigs[platform];

  const slotId = useMemo(() => {
    if (platform === 'twitch') {
      return process.env.NEXT_PUBLIC_ADSENSE_TWITCH_SLOT;
    }

    return process.env.NEXT_PUBLIC_ADSENSE_INSTAGRAM_SLOT;
  }, [platform]);

  return (
    <PageShell
      title={`${config.name} ID Lookup`}
      description={config.description}
      path={`/${platform}`}
    >
      <section className="px-4 pb-10 pt-4 sm:px-6">
        <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <LookupTool initialPlatform={platform} />
          <AdSlot label="sidebar" slotId={slotId} minHeight={300} />
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6">
        <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-600 shadow-sm">
            <p className="font-display text-xl font-semibold text-slate-950">
              About this lookup
            </p>
            <p className="mt-3">{config.resultNote}</p>
            <p className="mt-3">{config.availabilityNote}</p>
          </div>
          <AdSlot
            label="horizontal"
            slotId={process.env.NEXT_PUBLIC_ADSENSE_HORIZONTAL_SLOT}
            minHeight={120}
            format="horizontal"
          />
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6">
        <div className="mx-auto grid w-full max-w-6xl gap-4 md:grid-cols-3">
          {config.faq.map((item) => (
            <div
              key={item.question}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="font-display text-lg font-semibold text-slate-950">
                {item.question}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
