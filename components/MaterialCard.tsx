import Link from 'next/link';
import { Material } from '@/lib/types';

export function MaterialCard({ material }: { material: Material }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">{material.name}</h3>
          <p className="mt-2 text-sm text-slate-600">{material.summary}</p>
        </div>
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">{material.costRange}</span>
      </div>
      <dl className="mt-6 grid grid-cols-2 gap-4 text-sm text-slate-600">
        <div>
          <dt className="font-medium text-slate-900">Temp</dt>
          <dd>{material.temperatureResistance}°C</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-900">Strength</dt>
          <dd>{material.strength}/100</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-900">Density</dt>
          <dd>{material.density}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-900">Applications</dt>
          <dd>{material.applications.join(', ')}</dd>
        </div>
      </dl>
      <Link href={`/materials/${material.slug}`} className="mt-6 inline-flex text-sm font-semibold text-brand-700">
        Explore material →
      </Link>
    </article>
  );
}
