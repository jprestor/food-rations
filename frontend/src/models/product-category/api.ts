import type { ProductCategory } from './types';
import { api, ApiError } from '@/lib';
import type { ApiMeta } from '@/constants';

export const PRODUCT_CATEGORY_LIST_ROUTE = '/product-categories';
export const PRODUCT_CATEGORY_DETAIL_ROUTE = '/product-categories';

export async function fetchProductCategoryList(args?: {
  filters: { [key: string]: any };
}) {
  const params = {
    pagination: { pageSize: 50 },
    filters: { ...args?.filters },
    sort: 'order:desc',
  };
  const res = await api(PRODUCT_CATEGORY_LIST_ROUTE, params);
  if (!res.ok) {
    const info = await res.json();
    throw new ApiError(fetchProductCategoryList.name, info, res.status);
  }
  const resData: { data: ProductCategory[]; meta: ApiMeta } = await res.json();
  return resData;
}

export async function fetchProductCategoryDetail(slug: string) {
  const params = {
    filters: { slug: slug },
  };
  const res = await api(PRODUCT_CATEGORY_DETAIL_ROUTE, params);
  if (!res.ok) {
    const info = await res.json();
    throw new ApiError(fetchProductCategoryDetail.name, info, res.status);
  }
  const resData: { data: ProductCategory[] } = await res.json();
  return resData.data[0];
}
