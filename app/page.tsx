import Link from 'next/link';
import { ProcessCard } from '@/components/ProcessCard';
import { ResourceCard } from '@/components/ResourceCard';
import { getHomePageData } from '@/lib/wordpress';

export const revalidate = 300;

export default async function HomePage() {
  const data = await getHomePageData();

  return (
    <div className="space-y-20 py-12">
      <section className="container-shell grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">Technical knowledge hub + RFQ workflow</span>
          <h1 className="mt-6 text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl">
            Connect polymer expertise, structured CMS content, and CRM-ready quoting.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600">
            Polymer Connection is a production-ready headless platform for surfacing manufacturing knowledge, matching materials to requirements, and routing qualified RFQs into Monday.com.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/rfq" className="rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white">
              Start an RFQ
            </Link>
            <Link href="/resources" className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700">
              Explore resources
            </Link>
          </div>
        </div>
        <div className="grid gap-4 rounded-[2rem] bg-slate-950 p-8 text-white shadow-card">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Connected data model</p>
            <p className="mt-3 text-2xl font-semibold">Processes, materials, industries, services, and resources all cross-linked via GraphQL.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white/5 p-4">
              <p className="text-3xl font-bold">{data.processes.length}</p>
              <p className="text-sm text-slate-400">Manufacturing processes</p>
            </div>
            <div className="rounded-3xl bg-white/5 p-4">
              <p className="text-3xl font-bold">{data.materials.length}</p>
              <p className="text-sm text-slate-400">Engineered materials</p>
            </div>
            <div className="rounded-3xl bg-white/5 p-4">
              <p className="text-3xl font-bold">{data.industries.length}</p>
              <p className="text-sm text-slate-400">Industry pathways</p>
            </div>
            <div className="rounded-3xl bg-white/5 p-4">
              <p className="text-3xl font-bold">{data.resources.length}</p>
              <p className="text-sm text-slate-400">Resource hub articles</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Processes</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">Popular manufacturing workflows</h2>
          </div>
          <Link href="/process" className="text-sm font-semibold text-brand-700">View all →</Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {data.processes.map((process) => (
            <ProcessCard key={process.slug} process={process} />
          ))}
        </div>
      </section>

      <section className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Resource Hub</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-950">DFM and material content that supports quoting conversations.</h2>
          <p className="mt-4 text-slate-600">Build topical clusters that tie every article back to processes, materials, and industries so buyers can self-educate before submitting an RFQ.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {data.resources.map((resource) => (
            <ResourceCard key={resource.slug} resource={resource} />
          ))}
        </div>
      </section>
    </div>
  );
}
