import Cookies from 'js-cookie';

import { api, ApiError } from '@/lib';
import type { User } from './types';
import type { Order } from '@/models/order';
import type { Address } from '@/models/commonTypes';

export const LOGIN_ROUTE = '/auth/local';
export const CHECK_AUTH_ROUTE = '/users/me';
export const UPDATE_USER_ROUTE = '/users';
export const GET_USER_ORDERS_ROUTE = '/orders';

export async function loginUser({
  identifier,
  password,
}: {
  identifier: string;
  password: string;
}) {
  const params = {
    populate: 'deep',
  };
  const res = await api(LOGIN_ROUTE, params, {
    method: 'POST',
    body: JSON.stringify({ identifier, password }),
  });
  if (!res.ok) {
    throw new ApiError(loginUser.name, await res.json(), res.status);
  }
  const resData: { user: User; jwt: string } = await res.json();
  Cookies.set('authToken', resData.jwt, { expires: 30 });
  return resData.user;
}

export async function logoutUser() {
  Cookies.remove('authToken');
}

export async function checkAuth() {
  const params = {
    populate: 'deep',
  };
  const res = await api(CHECK_AUTH_ROUTE, params);
  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      return null;
    }
    throw new ApiError(checkAuth.name, await res.json(), res.status);
  }
  const resData: User = await res.json();
  return resData;
}

export type IUpdateUser = {
  id: number;
  data: Partial<
    Omit<User, 'id' | 'orders' | 'addresses'> & {
      addresses: Omit<Address, 'id'>[];
    }
  >;
};

export async function updateUser({ id, data }: IUpdateUser) {
  const res = await api(`${UPDATE_USER_ROUTE}/${id}`, undefined, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new ApiError(updateUser.name, await res.json(), res.status);
  }
  return checkAuth();
}

export async function fetchUserOrderList(id: number) {
  const params = {
    populate: ['address', 'cart.product.category'],
    filters: { userId: id },
    sort: 'createdAt:desc',
  };
  const res = await api(GET_USER_ORDERS_ROUTE, params);
  if (!res.ok) {
    throw new ApiError(fetchUserOrderList.name, await res.json(), res.status);
  }
  const resData: { data: Order[] } = await res.json();
  return resData.data;
}
