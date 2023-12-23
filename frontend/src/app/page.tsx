import { notFound } from 'next/navigation';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import Catalog from '@/components/Catalog';
import BannerSlider from '@/components/BannerSlider';
import { pageQueries, fetchPageDetail } from '@/models/page';

import { generateMeta } from '@/lib';

export const generateMetadata = generateMeta(fetchPageDetail, 'index');

export default async function MainPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(pageQueries.detail('index'));

  if (!queryClient.getQueryData(pageQueries.detail('index').queryKey)) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BannerSlider />
      <Catalog />
    </HydrationBoundary>
  );
}
