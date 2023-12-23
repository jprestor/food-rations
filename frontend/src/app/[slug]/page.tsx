import { notFound } from 'next/navigation';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { Breadcrumbs } from '@/ui';
import DynamicZone from '@/components/DynamicZone';
import { fetchPageDetail, pageQueries, type Page } from '@/models/page';
import { generateMeta } from '@/lib';

export const generateMetadata = generateMeta(fetchPageDetail);

export default async function StaticPage({
  params,
}: {
  params: { slug: string };
}) {
  if (params.slug === 'index') {
    return null;
  }

  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(pageQueries.detail(params.slug)),
  ]);

  const data = queryClient.getQueryData<Page>(
    pageQueries.detail(params.slug).queryKey,
  );

  if (!data) {
    notFound();
  }

  const { name, title, description, dynamicZone } = data;
  const caption = title || name;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Breadcrumbs className="mb-10" segments={[{ name: title || name }]} />

      <div className="container">
        {title && (
          <h1 className="Desktop/H1 mb-15 max-w-[65rem] lg:mb-14">{caption}</h1>
        )}

        {description && (
          <div
            className="prose mb-12"
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        )}
      </div>

      <DynamicZone dynamicZone={dynamicZone} />
    </HydrationBoundary>
  );
}
