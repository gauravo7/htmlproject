import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMaterialBySlug, getMaterials } from '@/lib/wordpress';

export const revalidate = 300;

export async function generateStaticParams() {
  const { materials } = await getMaterials();
  return materials.map((material) => ({ slug: material.slug }));
}

export default async function MaterialDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { material } = await getMaterialBySlug(slug);

  if (!material) {
    notFound();
  }

  return (
    <section className="container-shell grid gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Material detail</p>
        <h1 className="text-4xl font-bold text-slate-950">{material.name}</h1>
        <p className="text-lg text-slate-600">{material.summary}</p>
        <dl className="grid grid-cols-2 gap-6 text-sm text-slate-600">
          <div>
            <dt className="font-semibold text-slate-900">Density</dt>
            <dd>{material.density}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900">Temperature resistance</dt>
            <dd>{material.temperatureResistance}°C</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900">Strength</dt>
            <dd>{material.strength}/100</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900">Cost range</dt>
            <dd>{material.costRange}</dd>
          </div>
        </dl>
      </div>
      <aside className="space-y-6 rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white shadow-card">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Applications</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {material.applications.map((application) => (
              <span key={application} className="rounded-full bg-white/10 px-3 py-1 text-sm">{application}</span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Supported processes</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {material.relatedProcesses.map((process) => (
              <li key={process.slug}>
                <Link href={`/process/${process.slug}`}>{process.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </section>
  );
}
