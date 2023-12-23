import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { fetchPageList, fetchPageDetail } from './api';
import type { Page } from './types';

type ListArgs = Parameters<typeof fetchPageList>[0];
type DetailArgs = Parameters<typeof fetchPageDetail>[0];

export const pageQueries = {
  baseKey: ['page'],
  list: (args?: ListArgs) => ({
    queryKey: [...pageQueries.baseKey, 'list', args],
    queryFn: () => fetchPageList(args),
  }),
  detail: (args: DetailArgs) => ({
    queryKey: [...pageQueries.baseKey, 'detail', args],
    queryFn: () => fetchPageDetail(args),
  }),
};

export function usePageList(args?: ListArgs) {
  const query = useQuery(pageQueries.list(args));
  return { ...query, data: query.data?.data } as UseQueryResult<Page[]>;
}
export function usePageDetail(args: DetailArgs) {
  return useQuery(pageQueries.detail(args));
}
