import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { Layout } from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Polymer Connection',
  description: 'Headless polymer manufacturing platform powered by Next.js, WordPress, WPGraphQL, and ACF.'
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
