import type { Product } from './types';
import { api, ApiError } from '@/lib';
import type { ApiMeta } from '@/constants';

export const PRODUCT_LIST_ROUTE = '/products';
export const PRODUCT_DETAIL_ROUTE = '/products';

export async function fetchProductList(args?: { category?: string }) {
  const params = {
    populate: ['image', 'categories'],
    // filters: {
    //   categories: { slug: category },
    // },
    pagination: { pageSize: 50 },
    sort: 'order:desc',
  };
  const res = await api(PRODUCT_LIST_ROUTE, params);
  if (!res.ok) {
    const info = await res.json();
    throw new ApiError(fetchProductList.name, info, res.status);
  }
  const resData: { data: Product[]; meta: ApiMeta } = await res.json();
  return resData;
}

export async function fetchProductDetail(slug: string) {
  const params = {
    populate: ['image', 'category', 'categories', 'nutritionalValue'],
    filters: { slug: { $eq: slug } },
  };
  const res = await api(PRODUCT_DETAIL_ROUTE, params);
  if (!res.ok) {
    throw new ApiError(fetchProductDetail.name, await res.json(), res.status);
  }
  const resData: { data: Product[] } = await res.json();
  return resData.data[0];
}
