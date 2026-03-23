import { RFQForm } from '@/components/RFQForm';
import { getMaterials } from '@/lib/wordpress';

export const revalidate = 300;

export default async function RFQPage() {
  const { materials } = await getMaterials();

  return (
    <section className="container-shell grid gap-10 py-12 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">RFQ + DFM intake</p>
        <h1 className="text-4xl font-bold text-slate-950">Capture structured project requirements and send qualified opportunities straight to Monday.com.</h1>
        <p className="text-lg text-slate-600">This multi-step intake flow is built for manufacturing teams that need project details, material preferences, and design files before launching an engineering review.</p>
      </div>
      <RFQForm materials={materials} />
    </section>
  );
}
