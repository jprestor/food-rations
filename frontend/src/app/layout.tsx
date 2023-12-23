import type { Metadata, Viewport } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Providers from './providers';
import { mainFont } from './fonts';
import Toaster from '@/components/Toaster';
import Metrics from '@/components/Metrics';
import { fetchMisc, miscQueries } from '@/models/misc';
import { cartQueries } from '@/models/cart';
import { productQueries } from '@/models/product';
import { productCategoryQueries } from '@/models/product-category';
import { SITE_URL, FALLBACK_SEO } from '@/constants';

import 'photoswipe/dist/photoswipe.css';
import 'react-modern-drawer/dist/index.css';
import '@/styles/index.css';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  let misc;

  try {
    misc = await fetchMisc();
  } catch {
    console.log('Fail to fetchMisc in root generateMetadata');
  }

  const { siteName, favicon } = misc?.settings || {};

  return {
    metadataBase: new URL(SITE_URL),
    title: siteName || FALLBACK_SEO.title,
    icons: {
      icon: favicon?.url || FALLBACK_SEO.icon,
    },
    openGraph: {
      siteName: siteName || FALLBACK_SEO.title,
      type: 'website',
      locale: 'ru_RU',
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#3A58F8',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(miscQueries.get()),
    queryClient.prefetchQuery(cartQueries.get()),
    queryClient.prefetchQuery(productQueries.list()),
    queryClient.prefetchQuery(productCategoryQueries.list()),
  ]);

  return (
    <html lang="ru" className={mainFont.className}>
      <body>
        <Providers>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Metrics />
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <div id="portal-root" />
            <Toaster />
          </HydrationBoundary>
        </Providers>
      </body>
    </html>
  );
}
