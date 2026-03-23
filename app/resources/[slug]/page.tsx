import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getResourceBySlug, getResources } from '@/lib/wordpress';

export const revalidate = 300;

export async function generateStaticParams() {
  const { resources } = await getResources();
  return resources.map((resource) => ({ slug: resource.slug }));
}

export default async function ResourceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { resource } = await getResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  return (
    <section className="container-shell grid gap-10 py-12 lg:grid-cols-[1fr_0.8fr]">
      <article className="prose-content rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">{resource.type}</p>
        <h1 className="mt-4 text-4xl font-bold text-slate-950">{resource.title}</h1>
        <p className="mt-6 text-lg text-slate-600">{resource.content}</p>
      </article>
      <aside className="space-y-6 rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white shadow-card">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Related processes</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {resource.relatedProcesses.map((process) => (
              <li key={process.slug}>
                <Link href={`/process/${process.slug}`}>{process.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Related materials</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {resource.relatedMaterials.map((material) => (
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
