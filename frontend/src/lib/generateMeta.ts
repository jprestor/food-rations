import { Metadata, ResolvingMetadata } from 'next';

import type { Params, SearchParams } from '@/constants';

export function generateMeta<T extends Function>(
  fetchRecord: T,
  slug?: string | null,
  dynamicParamKey: string = 'slug',
) {
  return async (
    { params, searchParams }: { params: Params; searchParams: SearchParams },
    parent: ResolvingMetadata,
  ): Promise<Metadata> => {
    const recordId = slug || params[dynamicParamKey] || params.slug;
    const recordData = await fetchRecord(recordId);

    if (!recordData) {
      console.log(
        `Metadata fetchRecord returns undefined, recordId: ${recordId}`,
      );
      return {};
    }

    const { meta, name, title, image, description } = recordData;
    const defaultMeta = { title: title || name, description, image };
    const metaData = meta || defaultMeta;
    // optionally access and extend (rather than replace) parent metadata
    const parentMeta = await parent;
    const parentOpenGraph = parentMeta.openGraph || {};
    const previousImages = parentMeta.openGraph?.images || [];

    return {
      title: metaData.title,
      description: metaData.description,
      openGraph: {
        ...parentOpenGraph,
        title: metaData.title,
        description: metaData.description,
        images: [metaData.image || '', ...previousImages],
        // url: '',
      },
    };
  };
}
