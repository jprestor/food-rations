import { api, ApiError } from '@/lib';
import Cookies from 'js-cookie';
import type { Address } from '@/models/commonTypes';
import type { Order, OrderPrices, OrderDeliveryData } from './types';

const ORDERS_ROUTE = '/orders';
const CALCULATE_ORDER_PRICES_ROUTE = '/orders/calculate-prices';

export interface ICreateOrderData {
  phone: string;
  name: string;
  address: Omit<Address, 'id'>;
  comment?: string;
}

export async function createOrder(data: ICreateOrderData) {
  const res = await api(ORDERS_ROUTE, undefined, {
    method: 'POST',
    body: JSON.stringify({ data }),
  });
  if (!res.ok) {
    throw new ApiError(createOrder.name, await res.json(), res.status);
  }
  const resData: { data: Order } = await res.json();
  return resData.data;
}

export async function getOrderPrices(deliveryAddressCoords: number[]) {
  const res = await api(
    `${CALCULATE_ORDER_PRICES_ROUTE}?deliveryAddressCoords=${deliveryAddressCoords}`,
  );
  if (!res.ok) {
    throw new ApiError(getOrderPrices.name, await res.json(), res.status);
  }
  const resData: { data: OrderPrices } = await res.json();
  return resData.data;
}

export async function fetchOrderDetail(id: number) {
  const res = await api(`${ORDERS_ROUTE}/${id}`);
  if (!res.ok) {
    throw new ApiError(fetchOrderDetail.name, await res.json(), res.status);
  }
  const resData: { data: Order } = await res.json();
  return resData.data;
}

export async function getOrderDeliveryData() {
  const cookie = Cookies.get('deliveryData');
  return cookie ? (JSON.parse(cookie) as OrderDeliveryData) : null;
}

export async function setOrderDeliveryData(data: OrderDeliveryData) {
  Cookies.set('deliveryData', JSON.stringify(data));
  return data;
}
