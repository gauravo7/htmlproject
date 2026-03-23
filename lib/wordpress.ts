import { cache } from 'react';
import { industries, materials, processes, resources, services } from '@/lib/sample-data';
import { Industry, Material, Process, Resource, Service } from '@/lib/types';

const WPGRAPHQL_URL = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL || process.env.WORDPRESS_GRAPHQL_URL;

async function graphqlRequest<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!WPGRAPHQL_URL) {
    return mockGraphqlResponse<T>(query, variables);
  }

  const response = await fetch(WPGRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 300 }
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.status}`);
  }

  const payload = (await response.json()) as { data?: T; errors?: Array<{ message: string }> };

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join(', '));
  }

  if (!payload.data) {
    throw new Error('No GraphQL data returned.');
  }

  return payload.data;
}

function mockGraphqlResponse<T>(query: string, variables?: Record<string, unknown>): T {
  if (query.includes('GetHomePage')) {
    return {
      processes,
      materials,
      resources,
      industries,
      services
    } as T;
  }

  if (query.includes('GetProcesses')) {
    return { processes } as T;
  }

  if (query.includes('GetProcessBySlug')) {
    return {
      process: processes.find((item) => item.slug === variables?.slug)
    } as T;
  }

  if (query.includes('GetMaterials')) {
    return { materials } as T;
  }

  if (query.includes('GetMaterialBySlug')) {
    return {
      material: materials.find((item) => item.slug === variables?.slug)
    } as T;
  }

  if (query.includes('GetIndustries')) {
    return { industries } as T;
  }

  if (query.includes('GetIndustryBySlug')) {
    return {
      industry: industries.find((item) => item.slug === variables?.slug)
    } as T;
  }

  if (query.includes('GetResources')) {
    return { resources } as T;
  }

  if (query.includes('GetResourceBySlug')) {
    return {
      resource: resources.find((item) => item.slug === variables?.slug)
    } as T;
  }

  if (query.includes('GetServices')) {
    return { services } as T;
  }

  throw new Error('Unknown mock GraphQL operation.');
}

export const queries = {
  home: `query GetHomePage { processes materials resources industries services }`,
  processes: `query GetProcesses { processes }`,
  processBySlug: `query GetProcessBySlug($slug: String!) { process(slug: $slug) }`,
  materials: `query GetMaterials { materials }`,
  materialBySlug: `query GetMaterialBySlug($slug: String!) { material(slug: $slug) }`,
  industries: `query GetIndustries { industries }`,
  industryBySlug: `query GetIndustryBySlug($slug: String!) { industry(slug: $slug) }`,
  resources: `query GetResources { resources }`,
  resourceBySlug: `query GetResourceBySlug($slug: String!) { resource(slug: $slug) }`,
  services: `query GetServices { services }`
};

export const getHomePageData = cache(async () =>
  graphqlRequest<{
    processes: Process[];
    materials: Material[];
    resources: Resource[];
    industries: Industry[];
    services: Service[];
  }>(queries.home)
);

export const getProcesses = cache(async () => graphqlRequest<{ processes: Process[] }>(queries.processes));
export const getProcessBySlug = cache(async (slug: string) =>
  graphqlRequest<{ process?: Process }>(queries.processBySlug, { slug })
);
export const getMaterials = cache(async () => graphqlRequest<{ materials: Material[] }>(queries.materials));
export const getMaterialBySlug = cache(async (slug: string) =>
  graphqlRequest<{ material?: Material }>(queries.materialBySlug, { slug })
);
export const getIndustries = cache(async () => graphqlRequest<{ industries: Industry[] }>(queries.industries));
export const getIndustryBySlug = cache(async (slug: string) =>
  graphqlRequest<{ industry?: Industry }>(queries.industryBySlug, { slug })
);
export const getResources = cache(async () => graphqlRequest<{ resources: Resource[] }>(queries.resources));
export const getResourceBySlug = cache(async (slug: string) =>
  graphqlRequest<{ resource?: Resource }>(queries.resourceBySlug, { slug })
);
export const getServices = cache(async () => graphqlRequest<{ services: Service[] }>(queries.services));
