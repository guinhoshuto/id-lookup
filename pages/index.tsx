import AdSlot from '../components/AdSlot';
import LookupTool from '../components/LookupTool';
import PageShell from '../components/PageShell';
import { platformList } from '../lib/lookup';

export default function Home() {
  return (
    <PageShell
      title="ID Lookup"
      description="Look up Twitch and Instagram IDs by username."
      path="/"
    >
      <section className="px-4 pb-10 pt-4 sm:px-6">
        <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <LookupTool allowPlatformSwitch />

          <div className="space-y-4">
            <AdSlot
              label="sidebar"
              slotId={process.env.NEXT_PUBLIC_ADSENSE_HOME_SLOT}
              minHeight={280}
            />
            <AdSlot
              label="rectangle"
              slotId={process.env.NEXT_PUBLIC_ADSENSE_RECTANGLE_SLOT}
              minHeight={250}
              format="rectangle"
            />
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6">
        <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="grid gap-4 md:grid-cols-3">
            {platformList.map((platform) => (
              <a
                key={platform.key}
                href={`/${platform.key}`}
                className="rounded-lg border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600 shadow-sm transition hover:border-slate-300 hover:shadow-md"
              >
                <p className="font-display text-lg font-semibold text-slate-950">
                  {platform.name}
                </p>
                <p className="mt-2">{platform.shortDescription}</p>
              </a>
            ))}
            <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600 shadow-sm">
              <p className="font-display text-lg font-semibold text-slate-950">
                Result
              </p>
              <p className="mt-2">
                The ID appears on screen with a copy button and a direct link to
                the matched profile.
              </p>
            </div>
          </div>
          <AdSlot
            label="horizontal"
            slotId={process.env.NEXT_PUBLIC_ADSENSE_HORIZONTAL_SLOT}
            minHeight={120}
            format="horizontal"
          />
        </div>
      </section>
    </PageShell>
  );
}
