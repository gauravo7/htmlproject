import { ReactNode } from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
