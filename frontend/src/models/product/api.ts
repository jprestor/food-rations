import dayjs from 'dayjs';

import type { Product } from './types';
import { api, ApiError } from '@/lib';
import type { ApiMeta } from '@/constants';

export const PRODUCT_LIST_ROUTE = '/products';
export const PRODUCT_DETAIL_ROUTE = '/products';

const weekdayLabelByDayNumber = {
  1: 'a) Понедельник',
  2: 'b) Вторник',
  3: 'c) Среда',
  4: 'd) Четверг',
  5: 'e) Пятница',
  6: 'f) Суббота',
  0: 'g) Воскресенье',
};

export async function fetchProductList(args?: { category?: string }) {
  const weekday = dayjs().day() as 0 | 1 | 2 | 3 | 4 | 5 | 6;

  const params = {
    populate: ['image', 'categories'],
    filters: {
      categories: {
        slug: args?.category,
      },
      $or: [
        { weekday: weekdayLabelByDayNumber[weekday] },
        { weekday: { $null: true } },
      ],
    },
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
