import { ResourceCard } from '@/components/ResourceCard';
import { getResources } from '@/lib/wordpress';

export const revalidate = 300;

export default async function ResourceHubPage() {
  const { resources } = await getResources();

  return (
    <section className="container-shell space-y-8 py-12">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Resource hub</p>
        <h1 className="text-4xl font-bold text-slate-950">Guides, comparisons, and DFM content tied to the rest of the data model.</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {resources.map((resource) => (
          <ResourceCard key={resource.slug} resource={resource} />
        ))}
      </div>
    </section>
  );
}
