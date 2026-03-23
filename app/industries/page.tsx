import Link from 'next/link';
import { getIndustries } from '@/lib/wordpress';

export const revalidate = 300;

export default async function IndustryListingPage() {
  const { industries } = await getIndustries();

  return (
    <section className="container-shell space-y-8 py-12">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Industry pathways</p>
        <h1 className="text-4xl font-bold text-slate-950">Vertical landing pages that tie application context back to manufacturability.</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {industries.map((industry) => (
          <article key={industry.slug} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
            <h2 className="text-2xl font-semibold text-slate-900">{industry.name}</h2>
            <p className="mt-3 text-slate-600">{industry.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {industry.useCases.map((useCase) => (
                <span key={useCase} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">{useCase}</span>
              ))}
            </div>
            <Link href={`/industries/${industry.slug}`} className="mt-6 inline-flex text-sm font-semibold text-brand-700">
              View industry page →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
