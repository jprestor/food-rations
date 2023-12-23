import type { Cart } from './types';
import { api, ApiError } from '@/lib';

export const GET_CART_ROUTE = '/cart/getCart';
export const ADD_TO_CART_ROUTE = '/cart/addToCart';
export const ADD_TO_CART_MULTIPLE_ROUTE = '/cart/addToCartMultiple';
export const REMOVE_FROM_CART_ROUTE = '/cart/removeFromCart';
export const REMOVE_FROM_DELETED_ROUTE = '/cart/restoreFromDeleted';

export async function fetchCart() {
  const res = await api(GET_CART_ROUTE);
  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
    throw new ApiError(fetchCart.name, await res.json(), res.status);
  }
  const resData: Cart | null = await res.json();
  return resData;
}

export async function addToCart({ id, count }: { id: number; count: number }) {
  const res = await api(ADD_TO_CART_ROUTE, undefined, {
    method: 'POST',
    body: JSON.stringify({ id, count }),
  });
  if (!res.ok) {
    throw new ApiError(addToCart.name, await res.json(), res.status);
  }
  const resData: Cart = await res.json();
  return resData;
}

export async function addToCartMultiple(
  items: { id: number; count: number }[],
) {
  const res = await api(ADD_TO_CART_MULTIPLE_ROUTE, undefined, {
    method: 'POST',
    body: JSON.stringify({ items }),
  });
  if (!res.ok) {
    throw new ApiError(addToCartMultiple.name, await res.json(), res.status);
  }
  const resData: Cart = await res.json();
  return resData;
}

export async function removeFromCart(id: number) {
  const res = await api(REMOVE_FROM_CART_ROUTE, undefined, {
    method: 'POST',
    body: JSON.stringify({ id }),
  });
  if (!res.ok) {
    throw new ApiError(removeFromCart.name, await res.json(), res.status);
  }
  const resData: Cart = await res.json();
  return resData;
}

export async function restoreFromDeleted(id: number) {
  const res = await api(REMOVE_FROM_DELETED_ROUTE, undefined, {
    method: 'POST',
    body: JSON.stringify({ id }),
  });
  if (!res.ok) {
    throw new ApiError(restoreFromDeleted.name, await res.json(), res.status);
  }
  const resData: Cart = await res.json();
  return resData;
}
