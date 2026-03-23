import Image from 'next/image';
import Link from 'next/link';
import { Process } from '@/lib/types';

export function ProcessCard({ process }: { process: Process }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
      <div className="relative h-52">
        <Image src={process.featuredImage} alt={process.title} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
      </div>
      <div className="space-y-4 p-6">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">{process.title}</h3>
          <p className="mt-2 text-sm text-slate-600">{process.description}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-slate-500">
          {process.materials.map((material) => (
            <span key={material.slug} className="rounded-full bg-slate-100 px-3 py-1">
              {material.title}
            </span>
          ))}
        </div>
        <Link href={`/process/${process.slug}`} className="inline-flex text-sm font-semibold text-brand-700">
          View process details →
        </Link>
      </div>
    </article>
  );
}
