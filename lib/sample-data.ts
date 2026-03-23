import { Industry, Material, Process, Resource, Service } from '@/lib/types';

export const processes: Process[] = [
  {
    slug: 'injection-molding',
    title: 'Injection Molding',
    description:
      'High-throughput thermoplastic manufacturing for complex polymer parts with tight tolerances and repeatability.',
    featuredImage:
      'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1200&q=80',
    materials: [
      { slug: 'abs', title: 'ABS' },
      { slug: 'peek', title: 'PEEK' }
    ],
    industries: [
      { slug: 'medical-devices', title: 'Medical Devices' },
      { slug: 'consumer-electronics', title: 'Consumer Electronics' }
    ],
    services: [
      { slug: 'design-for-manufacturing', title: 'Design for Manufacturing' },
      { slug: 'tooling-optimization', title: 'Tooling Optimization' }
    ],
    advantages: ['Repeatable quality at scale', 'Excellent cosmetic finishes', 'Supports insert overmolding'],
    limitations: ['Requires upfront tooling', 'Geometry must support draft and parting lines']
  },
  {
    slug: 'cnc-machining',
    title: 'CNC Machining',
    description:
      'Precision subtractive manufacturing for low-volume, high-performance polymer prototypes and production runs.',
    featuredImage:
      'https://images.unsplash.com/photo-1565434291717-cb52d0d7f8df?auto=format&fit=crop&w=1200&q=80',
    materials: [
      { slug: 'peek', title: 'PEEK' },
      { slug: 'acetal', title: 'Acetal' }
    ],
    industries: [
      { slug: 'aerospace', title: 'Aerospace' },
      { slug: 'industrial-equipment', title: 'Industrial Equipment' }
    ],
    services: [
      { slug: 'rapid-prototyping', title: 'Rapid Prototyping' }],
    advantages: ['Excellent precision', 'Fast iteration without tooling', 'Wide polymer compatibility'],
    limitations: ['Higher cost per unit at volume', 'Material waste from subtractive process']
  }
];

export const materials: Material[] = [
  {
    slug: 'abs',
    name: 'ABS',
    density: '1.04 g/cm³',
    temperatureResistance: 95,
    strength: 60,
    costRange: 'Low',
    applications: ['Housings', 'Consumer products'],
    relatedProcesses: [{ slug: 'injection-molding', title: 'Injection Molding' }],
    summary: 'Balanced toughness and economics for enclosures, fixtures, and general purpose molded parts.'
  },
  {
    slug: 'peek',
    name: 'PEEK',
    density: '1.30 g/cm³',
    temperatureResistance: 260,
    strength: 92,
    costRange: 'High',
    applications: ['Medical implants', 'Aerospace components'],
    relatedProcesses: [
      { slug: 'injection-molding', title: 'Injection Molding' },
      { slug: 'cnc-machining', title: 'CNC Machining' }
    ],
    summary: 'Premium high-temperature engineering thermoplastic for chemically aggressive or highly loaded environments.'
  },
  {
    slug: 'acetal',
    name: 'Acetal',
    density: '1.41 g/cm³',
    temperatureResistance: 120,
    strength: 72,
    costRange: 'Medium',
    applications: ['Gears', 'Wear components'],
    relatedProcesses: [{ slug: 'cnc-machining', title: 'CNC Machining' }],
    summary: 'Low-friction, dimensionally stable polymer used for precision parts and motion components.'
  }
];

export const industries: Industry[] = [
  {
    slug: 'medical-devices',
    name: 'Medical Devices',
    useCases: ['Disposable diagnostics', 'Sterilizable housings', 'Instrument handles'],
    relatedProcesses: [{ slug: 'injection-molding', title: 'Injection Molding' }],
    relatedMaterials: [{ slug: 'peek', title: 'PEEK' }, { slug: 'abs', title: 'ABS' }],
    summary: 'Validated polymer pathways for regulated devices, clean manufacturing, and accelerated supplier qualification.'
  },
  {
    slug: 'consumer-electronics',
    name: 'Consumer Electronics',
    useCases: ['Wearables', 'Smart home enclosures'],
    relatedProcesses: [{ slug: 'injection-molding', title: 'Injection Molding' }],
    relatedMaterials: [{ slug: 'abs', title: 'ABS' }],
    summary: 'Scaled polymer production with cosmetic surface standards, assembly-ready tolerances, and supply planning.'
  },
  {
    slug: 'aerospace',
    name: 'Aerospace',
    useCases: ['Lightweight brackets', 'Thermal insulators'],
    relatedProcesses: [{ slug: 'cnc-machining', title: 'CNC Machining' }],
    relatedMaterials: [{ slug: 'peek', title: 'PEEK' }],
    summary: 'Engineering content and sourcing paths for lightweight, high-temperature components in demanding duty cycles.'
  },
  {
    slug: 'industrial-equipment',
    name: 'Industrial Equipment',
    useCases: ['Bushings', 'Guide rails', 'Wear pads'],
    relatedProcesses: [{ slug: 'cnc-machining', title: 'CNC Machining' }],
    relatedMaterials: [{ slug: 'acetal', title: 'Acetal' }],
    summary: 'Operationally focused polymer recommendations for uptime, abrasion resistance, and easy replacement cycles.'
  }
];

export const services: Service[] = [
  {
    slug: 'design-for-manufacturing',
    name: 'Design for Manufacturing',
    description: 'Early-stage design reviews to eliminate sink, warp, difficult shutoffs, and avoidable tolerance stack-ups.',
    relatedProcesses: [{ slug: 'injection-molding', title: 'Injection Molding' }]
  },
  {
    slug: 'tooling-optimization',
    name: 'Tooling Optimization',
    description: 'Gate, vent, and steel-safe tooling recommendations to improve fill balance and long-term mold performance.',
    relatedProcesses: [{ slug: 'injection-molding', title: 'Injection Molding' }]
  },
  {
    slug: 'rapid-prototyping',
    name: 'Rapid Prototyping',
    description: 'Fast-turn polymer prototypes for fit, function, and risk reduction before locking production methods.',
    relatedProcesses: [{ slug: 'cnc-machining', title: 'CNC Machining' }]
  }
];

export const resources: Resource[] = [
  {
    slug: 'dfm-checklist-for-molded-parts',
    title: 'DFM Checklist for Molded Parts',
    type: 'dfm',
    excerpt: 'A production-focused checklist covering draft, rib ratios, gate placement, and tolerance risk before tooling release.',
    content:
      'Use this checklist to align wall sections, draft strategy, shutoffs, venting, and cosmetic expectations before final design review.',
    relatedProcesses: [{ slug: 'injection-molding', title: 'Injection Molding' }],
    relatedMaterials: [{ slug: 'abs', title: 'ABS' }, { slug: 'peek', title: 'PEEK' }]
  },
  {
    slug: 'peek-vs-acetal-comparison',
    title: 'PEEK vs Acetal for Wear Components',
    type: 'comparison',
    excerpt: 'Performance trade-offs for temperature, friction, and cost when specifying polymer wear parts.',
    content:
      'Compare continuous-use temperature, dimensional stability, moisture response, and lifecycle cost for high-demand wear applications.',
    relatedProcesses: [{ slug: 'cnc-machining', title: 'CNC Machining' }],
    relatedMaterials: [{ slug: 'peek', title: 'PEEK' }, { slug: 'acetal', title: 'Acetal' }]
  },
  {
    slug: 'polymer-process-selection-guide',
    title: 'Polymer Process Selection Guide',
    type: 'guide',
    excerpt: 'A quick framework to choose between molding, machining, and downstream service packages.',
    content:
      'Evaluate annual volume, lead time, tolerance, finish expectations, and change frequency to select the right production route.',
    relatedProcesses: [
      { slug: 'injection-molding', title: 'Injection Molding' },
      { slug: 'cnc-machining', title: 'CNC Machining' }
    ],
    relatedMaterials: [{ slug: 'abs', title: 'ABS' }, { slug: 'peek', title: 'PEEK' }, { slug: 'acetal', title: 'Acetal' }]
  }
];
