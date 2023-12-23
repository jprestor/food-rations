import { useQuery } from '@tanstack/react-query';

import { Misc } from './types';
import { api, ApiError } from '@/lib';

const MISC_ROUTE = '/misc';

export async function fetchMisc() {
  const params = {
    populate: [
      'menu.icon',
      'refs.fields',
      'socials.image',
      'metrics',
      'settings.favicon',
      'settings.logo',
      'deliveryData.zonePrices',
    ],
  };
  const res = await api(MISC_ROUTE, params);
  if (!res.ok) {
    throw new ApiError(fetchMisc.name, await res.json(), res.status);
  }
  const resData: { data: Misc } = await res.json();
  return resData.data;
}

// Queries
export const miscQueries = {
  baseKey: ['misc'],
  get: () => ({
    queryKey: [...miscQueries.baseKey, 'list'],
    queryFn: () => fetchMisc(),
  }),
};

export function useMisc() {
  return useQuery(miscQueries.get());
}

export function useMiscRef(slug: string) {
  const query = useQuery({
    ...miscQueries.get(),
    select: (data) => {
      const target = data?.refs.find((i) => i.slug === slug);
      return target
        ? target.fields.map((field) => field.value)
        : [`Ref with slug "${slug}" not provided`];
    },
  });

  return query.data ? query.data : [];
}

export function useDeliveryData() {
  const query = useQuery({
    ...miscQueries.get(),
    select: (data) => {
      if (!data.deliveryData) {
        return null;
      }

      return {
        ...data.deliveryData,
        mapCenter:
          data.deliveryData.mapCenter
            .split(', ')
            .map((coord: string) => Number(coord)) || [],
      };
    },
  });
  return query.data;
}
