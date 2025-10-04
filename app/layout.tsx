import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import Shell from '@/components/shell';

export const metadata: Metadata = {
  metadataBase: new URL('https://marketplace.web'),
  title: {
    default: 'Marketplace Web — Premium Digital Assets Marketplace',
    template: '%s — Marketplace Web'
  },
  description: 'Discover and launch premium web templates, source code, and digital services tailored for modern teams.',
  keywords: ['digital marketplace', 'web templates', 'source code', 'digital assets', 'SaaS', 'web services'],
  authors: [{ name: 'Marketplace Web Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://marketplace.web',
    siteName: 'Marketplace Web',
    title: 'Marketplace Web — Premium Digital Assets Marketplace',
    description: 'Discover and launch premium web templates, source code, and digital services tailored for modern teams.',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Marketplace Web'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marketplace Web — Premium Digital Assets Marketplace',
    description: 'Discover and launch premium web templates, source code, and digital services tailored for modern teams.',
    images: ['/og-image.jpg'],
    creator: '@marketplaceweb'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
    yandex: 'your-yandex-verification',
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth focus:scroll-auto">
        <body className="bg-slate-950 text-slate-100 antialiased">
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main id="main-content" className="flex-1">
              <Shell className="relative pb-16 pt-12">{children}</Shell>
            </main>
            <SiteFooter />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
