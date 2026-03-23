import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getIndustries, getIndustryBySlug } from '@/lib/wordpress';

export const revalidate = 300;

export async function generateStaticParams() {
  const { industries } = await getIndustries();
  return industries.map((industry) => ({ slug: industry.slug }));
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { industry } = await getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  return (
    <section className="container-shell grid gap-10 py-12 lg:grid-cols-[1fr_0.9fr]">
      <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Industry detail</p>
        <h1 className="text-4xl font-bold text-slate-950">{industry.name}</h1>
        <p className="text-lg text-slate-600">{industry.summary}</p>
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Use cases</h2>
          <ul className="mt-4 space-y-2 text-slate-600">
            {industry.useCases.map((useCase) => (
              <li key={useCase}>• {useCase}</li>
            ))}
          </ul>
        </div>
      </div>
      <aside className="space-y-6 rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white shadow-card">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Related processes</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {industry.relatedProcesses.map((process) => (
              <li key={process.slug}>
                <Link href={`/process/${process.slug}`}>{process.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Related materials</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {industry.relatedMaterials.map((material) => (
              <li key={material.slug}>
                <Link href={`/materials/${material.slug}`}>{material.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </section>
  );
}
