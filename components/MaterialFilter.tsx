'use client';

import { useMemo, useState } from 'react';
import { filterMaterials } from '@/lib/material-selector';
import { Material } from '@/lib/types';
import { MaterialCard } from '@/components/MaterialCard';

export function MaterialFilter({ materials }: { materials: Material[] }) {
  const [minTemperature, setMinTemperature] = useState(80);
  const [minStrength, setMinStrength] = useState(50);
  const [maxCost, setMaxCost] = useState<'Any' | 'Low' | 'Medium' | 'High'>('Any');

  const filtered = useMemo(
    () => filterMaterials(materials, { minTemperature, minStrength, maxCost }),
    [materials, minTemperature, minStrength, maxCost]
  );

  return (
    <div className="space-y-8">
      <div className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card md:grid-cols-3">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Minimum temperature (°C)</span>
          <input type="range" min="50" max="300" step="10" value={minTemperature} onChange={(event) => setMinTemperature(Number(event.target.value))} className="w-full" />
          <p className="text-sm text-slate-500">{minTemperature}°C</p>
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Minimum strength</span>
          <input type="range" min="40" max="100" step="2" value={minStrength} onChange={(event) => setMinStrength(Number(event.target.value))} className="w-full" />
          <p className="text-sm text-slate-500">{minStrength}/100</p>
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Maximum cost tier</span>
          <select value={maxCost} onChange={(event) => setMaxCost(event.target.value as 'Any' | 'Low' | 'Medium' | 'High')} className="w-full rounded-2xl border border-slate-300 px-4 py-3">
            <option value="Any">Any</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {filtered.map((material) => (
          <MaterialCard key={material.slug} material={material} />
        ))}
      </div>
      {!filtered.length && <p className="text-sm text-slate-500">No materials match the current filter combination.</p>}
    </div>
  );
}
