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
import { userQueries } from '@/models/user';
import { miscQueries, fetchMisc } from '@/models/misc';
import { cartQueries } from '@/models/cart';
import { orderQueries, type SelectedDeliveryAddress } from '@/models/order';
import { productQueries } from '@/models/product';
import { productCategoryQueries } from '@/models/product-category';
import { SITE_URL, FALLBACK_SEO } from '@/constants';

import 'photoswipe/dist/photoswipe.css';
import 'react-modern-drawer/dist/index.css';
import 'react-datepicker/dist/react-datepicker.css';
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
  const qc = new QueryClient();
  await Promise.all([
    qc.prefetchQuery(userQueries.getUser()),
    qc.prefetchQuery(orderQueries.selectedDeliveryAddress()),
    qc.prefetchQuery(cartQueries.get()),
    qc.prefetchQuery(miscQueries.get()),
    qc.prefetchQuery(productQueries.list()),
    qc.prefetchQuery(productCategoryQueries.list()),
  ]);
  const selectedAddress = qc.getQueryData<SelectedDeliveryAddress>(
    orderQueries.selectedDeliveryAddress().queryKey,
  );
  await qc.prefetchQuery(orderQueries.prices(selectedAddress?.coords));

  return (
    <html lang="ru" className={mainFont.className}>
      <body>
        <Providers>
          <HydrationBoundary state={dehydrate(qc)}>
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
