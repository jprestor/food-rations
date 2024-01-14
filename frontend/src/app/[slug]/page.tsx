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

  const qc = new QueryClient();
  await Promise.all([qc.prefetchQuery(pageQueries.detail(params.slug))]);

  const data = qc.getQueryData<Page>(pageQueries.detail(params.slug).queryKey);

  if (!data) {
    notFound();
  }

  const { name, title, description, dynamicZone } = data;
  const caption = title || name;

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <Breadcrumbs className="mb-10" segments={[{ name: caption }]} />

      <div className="container">
        {title && (
          <h1 className="text-4xl font-medium mb-12 md:mb-7 md:text-3xl">
            {title}
          </h1>
        )}

        {description && (
          <div
            className="prose mb-28 md:mb-16"
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
