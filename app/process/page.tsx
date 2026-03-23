import { ProcessCard } from '@/components/ProcessCard';
import { getProcesses } from '@/lib/wordpress';

export const revalidate = 300;

export default async function ProcessListingPage() {
  const { processes } = await getProcesses();

  return (
    <section className="container-shell space-y-8 py-12">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Process library</p>
        <h1 className="text-4xl font-bold text-slate-950">Manufacturing processes connected to materials, services, and industries.</h1>
        <p className="text-lg text-slate-600">Each process page is statically generated with ISR and can be populated directly from WordPress using WPGraphQL.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {processes.map((process) => (
          <ProcessCard key={process.slug} process={process} />
        ))}
      </div>
    </section>
  );
}
