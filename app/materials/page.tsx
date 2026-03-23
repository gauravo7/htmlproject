import { MaterialFilter } from '@/components/MaterialFilter';
import { getMaterials } from '@/lib/wordpress';

export const revalidate = 300;

export default async function MaterialListingPage() {
  const { materials } = await getMaterials();

  return (
    <section className="container-shell space-y-8 py-12">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Material selector</p>
        <h1 className="text-4xl font-bold text-slate-950">Filter materials by performance, cost, and thermal requirements.</h1>
        <p className="text-lg text-slate-600">The selector runs client-side for instant feedback and can be seeded with CMS-managed material records fetched via GraphQL.</p>
      </div>
      <MaterialFilter materials={materials} />
    </section>
  );
}
