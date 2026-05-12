import type { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';
import Seo from './Seo';

interface PageShellProps {
  title: string;
  description: string;
  path?: string;
  children: ReactNode;
}

export default function PageShell({
  title,
  description,
  path,
  children,
}: PageShellProps) {
  return (
    <>
      <Seo title={title} description={description} path={path} />
      <div className="relative min-h-screen overflow-hidden">
        <Header />
        <main className="relative z-10">{children}</main>
        <Footer />
      </div>
    </>
  );
}
