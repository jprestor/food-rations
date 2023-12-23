import { useQuery } from '@tanstack/react-query';

import { fetchProductList, fetchProductDetail } from './api';

type ListArgs = Parameters<typeof fetchProductList>[0];
type DetailArgs = Parameters<typeof fetchProductDetail>[0];

export const productQueries = {
  baseKey: ['product'],
  list: (args?: ListArgs) => ({
    queryKey: [...productQueries.baseKey, 'list', args],
    queryFn: () => fetchProductList(args),
  }),
  detail: (args: DetailArgs) => ({
    queryKey: [...productQueries.baseKey, 'detail', args],
    queryFn: () => fetchProductDetail(args),
  }),
};

export function useProductList(args?: ListArgs) {
  return useQuery({
    ...productQueries.list(args),
    select: (data) => data.data,
  });
}

export function useProductDetail(args: DetailArgs) {
  return useQuery(productQueries.detail(args));
}
