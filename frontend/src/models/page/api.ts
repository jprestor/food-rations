import type { Page } from './types';
import { api, ApiError } from '@/lib';
import type { ApiMeta } from '@/constants';

export const PAGES_ROUTE = '/pages';

export async function fetchPageList(args?: {
  page?: number;
  pageSize?: number;
}) {
  const { page = 1, pageSize = 12 } = args || {};
  const params = {
    populate: ['image'],
    pagination: { page, pageSize },
  };
  const res = await api(PAGES_ROUTE, params);
  if (!res.ok) {
    throw new ApiError(fetchPageDetail.name, await res.json(), res.status);
  }
  const resData: { data: Page[]; meta: ApiMeta } = await res.json();
  return resData;
}

export async function fetchPageDetail(slug: string) {
  const params = {
    populate: 'deep',
    filters: { slug: { $eq: slug } },
  };
  const res = await api(PAGES_ROUTE, params);
  if (!res.ok) {
    throw new ApiError(fetchPageDetail.name, await res.json(), res.status);
  }
  const resData: { data: Page[] | undefined[] } = await res.json();
  return resData.data?.[0];
}
