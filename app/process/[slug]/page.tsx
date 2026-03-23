import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProcessBySlug, getProcesses } from '@/lib/wordpress';

export const revalidate = 300;

export async function generateStaticParams() {
  const { processes } = await getProcesses();
  return processes.map((process) => ({ slug: process.slug }));
}

export default async function ProcessDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { process } = await getProcessBySlug(slug);

  if (!process) {
    notFound();
  }

  return (
    <section className="container-shell space-y-10 py-12">
      <div className="max-w-4xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Process detail</p>
        <h1 className="text-4xl font-bold text-slate-950">{process.title}</h1>
        <p className="text-lg text-slate-600">{process.description}</p>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <div className="space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Advantages</h2>
            <ul className="mt-4 space-y-3 text-slate-600">
              {process.advantages.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Limitations</h2>
            <ul className="mt-4 space-y-3 text-slate-600">
              {process.limitations.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
        <aside className="space-y-6 rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white shadow-card">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Compatible materials</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {process.materials.map((material) => (
                <Link key={material.slug} href={`/materials/${material.slug}`} className="rounded-full bg-white/10 px-3 py-1 text-sm">
                  {material.title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Industries</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {process.industries.map((industry) => (
                <Link key={industry.slug} href={`/industries/${industry.slug}`} className="rounded-full bg-white/10 px-3 py-1 text-sm">
                  {industry.title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Related services</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {process.services.map((service) => (
                <li key={service.slug}>{service.title}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
