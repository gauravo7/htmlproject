import { Material } from '@/lib/types';

export type MaterialFilters = {
  maxCost?: Material['costRange'] | 'Any';
  minStrength?: number;
  minTemperature?: number;
};

const costRank: Record<Material['costRange'], number> = {
  Low: 1,
  Medium: 2,
  High: 3
};

export function filterMaterials(items: Material[], filters: MaterialFilters) {
  return items.filter((material) => {
    const matchesTemperature = (filters.minTemperature ?? 0) <= material.temperatureResistance;
    const matchesStrength = (filters.minStrength ?? 0) <= material.strength;
    const matchesCost =
      !filters.maxCost ||
      filters.maxCost === 'Any' ||
      costRank[material.costRange] <= costRank[filters.maxCost as Material['costRange']];

    return matchesTemperature && matchesStrength && matchesCost;
  });
}
