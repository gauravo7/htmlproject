export type EntityLink = {
  slug: string;
  title: string;
};

export type Process = {
  slug: string;
  title: string;
  description: string;
  featuredImage: string;
  materials: EntityLink[];
  industries: EntityLink[];
  services: EntityLink[];
  advantages: string[];
  limitations: string[];
};

export type Material = {
  slug: string;
  name: string;
  density: string;
  temperatureResistance: number;
  strength: number;
  costRange: 'Low' | 'Medium' | 'High';
  applications: string[];
  relatedProcesses: EntityLink[];
  summary: string;
};

export type Industry = {
  slug: string;
  name: string;
  useCases: string[];
  relatedProcesses: EntityLink[];
  relatedMaterials: EntityLink[];
  summary: string;
};

export type Resource = {
  slug: string;
  title: string;
  type: 'guide' | 'comparison' | 'dfm';
  content: string;
  relatedProcesses: EntityLink[];
  relatedMaterials: EntityLink[];
  excerpt: string;
};

export type Service = {
  slug: string;
  name: string;
  description: string;
  relatedProcesses: EntityLink[];
};
