import Link from 'next/link';
import { Resource } from '@/lib/types';

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
        {resource.type}
      </span>
      <h3 className="mt-4 text-xl font-semibold text-slate-900">{resource.title}</h3>
      <p className="mt-3 text-sm text-slate-600">{resource.excerpt}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {resource.relatedMaterials.map((material) => (
          <span key={material.slug} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
            {material.title}
          </span>
        ))}
      </div>
      <Link href={`/resources/${resource.slug}`} className="mt-6 inline-flex text-sm font-semibold text-brand-700">
        Read resource →
      </Link>
    </article>
  );
}
