# Polymer Connection

Polymer Connection is a production-ready headless manufacturing platform built with **Next.js App Router**, **Tailwind CSS**, and a **WordPress + WPGraphQL + ACF** backend. It ships with a structured RFQ workflow, cross-linked technical knowledge pages, a client-side material selector, and a Monday.com integration point.

## Features

- Headless CMS architecture with WordPress custom post types, taxonomies, and ACF field groups.
- Dynamic App Router pages for processes, materials, industries, resources, and RFQ intake.
- GraphQL-powered data layer with mock fallbacks for local development before WordPress is connected.
- ISR-enabled route generation using `generateStaticParams()` and `revalidate`.
- Multi-step RFQ / DFM intake form with file upload simulation and Monday.com API integration.
- Reusable UI components: `Header`, `Footer`, `Layout`, `ProcessCard`, `MaterialCard`, `ResourceCard`, `RFQForm`.

## Project Structure

```text
app/
  api/
    rfq/route.ts
    upload/route.ts
  industries/[slug]/page.tsx
  industries/page.tsx
  materials/[slug]/page.tsx
  materials/page.tsx
  process/[slug]/page.tsx
  process/page.tsx
  resources/[slug]/page.tsx
  resources/page.tsx
  rfq/page.tsx
  layout.tsx
  page.tsx
components/
  Footer.tsx
  Header.tsx
  Layout.tsx
  MaterialCard.tsx
  MaterialFilter.tsx
  ProcessCard.tsx
  ResourceCard.tsx
  RFQForm.tsx
lib/
  material-selector.ts
  sample-data.ts
  types.ts
  wordpress.ts
wordpress/
  polymer-connection-cms.php
```

## Environment Variables

Create `.env.local` with the following values:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL=https://your-wordpress-site.com/graphql
WORDPRESS_GRAPHQL_URL=https://your-wordpress-site.com/graphql
MONDAY_API_TOKEN=your-monday-token
MONDAY_BOARD_ID=your-board-id
```

If WordPress is not configured yet, the app automatically falls back to local sample data so every page still renders.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000`.
4. To use the WordPress backend, install the plugin in `wordpress/polymer-connection-cms.php`, then activate:
   - Advanced Custom Fields
   - WPGraphQL
   - WPGraphQL for ACF
5. Set your WordPress GraphQL endpoint in `.env.local`.

## WordPress Data Model

The plugin registers these custom post types:

- Processes
- Materials
- Industries
- Services
- Resources

The plugin also registers these taxonomies:

- Material Types
- Applications
- Manufacturing Methods
- Performance Requirements

Relationships are configured through ACF relationship fields and exposed to GraphQL.

## Sample GraphQL Queries

### List processes with related entities

```graphql
query GetProcesses {
  processes {
    nodes {
      slug
      title
      processFields {
        description
        advantages {
          item
        }
        limitations {
          item
        }
        materials {
          nodes {
            slug
            title
          }
        }
        industries {
          nodes {
            slug
            title
          }
        }
        services {
          nodes {
            slug
            title
          }
        }
      }
    }
  }
}
```

### Material detail lookup

```graphql
query GetMaterialBySlug($slug: ID!) {
  material(id: $slug, idType: SLUG) {
    title
    slug
    materialFields {
      density
      temperatureResistance
      strength
      costRange
      relatedProcesses {
        nodes {
          slug
          title
        }
      }
    }
  }
}
```

### Resource hub query

```graphql
query GetResources {
  resources {
    nodes {
      slug
      title
      resourceFields {
        type
        relatedProcesses {
          nodes {
            slug
            title
          }
        }
        relatedMaterials {
          nodes {
            slug
            title
          }
        }
      }
    }
  }
}
```

## API Routes

### `POST /api/upload`

Accepts multipart uploads and returns mock file references that can later be replaced with S3, Cloudinary, or direct Monday asset uploads.

### `POST /api/rfq`

Accepts RFQ form submissions, forwards attachments through `/api/upload`, and creates an item in Monday.com if `MONDAY_API_TOKEN` and `MONDAY_BOARD_ID` are configured. Otherwise it safely simulates CRM sync so local development is uninterrupted.

## Production Notes

- Use Vercel or a Node host that supports Next.js App Router route handlers.
- Replace mock upload logic with cloud object storage before launch.
- Map Monday column IDs in `app/api/rfq/route.ts` to your production board schema.
- Configure WordPress webhooks or periodic revalidation if editors require faster-than-ISR updates.
