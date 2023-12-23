import { useQuery } from '@tanstack/react-query';

import { fetchProductCategoryList, fetchProductCategoryDetail } from './api';

type ListArgs = Parameters<typeof fetchProductCategoryList>[0];
type DetailArgs = Parameters<typeof fetchProductCategoryDetail>[0];

export const productCategoryQueries = {
  baseKey: ['product-category'],
  list: (args?: ListArgs) => ({
    queryKey: [...productCategoryQueries.baseKey, 'list'],
    queryFn: () => fetchProductCategoryList(args),
  }),
  detail: (args: DetailArgs) => ({
    queryKey: [...productCategoryQueries.baseKey, 'detail', args],
    queryFn: () => fetchProductCategoryDetail(args),
  }),
};

export function useProductCategoryList(args?: ListArgs) {
  return useQuery({
    ...productCategoryQueries.list(args),
    select: (data) => data.data,
  });
}
export function useProductCategoryDetail(args: DetailArgs) {
  return useQuery(productCategoryQueries.detail(args));
}
