import { api, cookies, ApiError } from '@/lib';
import type { Address } from '@/models/commonTypes';
import type { Order, OrderPrices, SelectedDeliveryAddress } from './types';
import { type DeliveryData } from '@/models/misc/types';

const ORDERS_ROUTE = '/orders';
const CALCULATE_ORDER_PRICES_ROUTE = '/orders/prices';
const CHECK_IS_DELIVERY_AVAILABLE_ROUTE = '/orders/check-is-delivery-available';

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
  const resData: { data: { confirmation: { confirmation_url: string } } } =
    await res.json();
  return resData;
}

export async function getOrderPrices(deliveryAddressCoords: number[]) {
  const res = await api(
    `${CALCULATE_ORDER_PRICES_ROUTE}?coords=${JSON.stringify(
      deliveryAddressCoords,
    )}`,
  );
  if (!res.ok) {
    throw new ApiError(getOrderPrices.name, await res.json(), res.status);
  }
  const resData: OrderPrices = await res.json();
  return resData;
}

export async function fetchOrderDetail(id: number) {
  const res = await api(`${ORDERS_ROUTE}/${id}`);
  if (!res.ok) {
    throw new ApiError(fetchOrderDetail.name, await res.json(), res.status);
  }
  const resData: { data: Order } = await res.json();
  return resData.data;
}

export async function getSelectedDeliveryAddress() {
  const cookie = cookies.get('deliveryData');
  return cookie ? (JSON.parse(cookie) as SelectedDeliveryAddress) : null;
}

export async function setSelectedDeliveryAddress(
  data: SelectedDeliveryAddress,
) {
  cookies.set('deliveryData', JSON.stringify(data));
  return data;
}

// Сейчас не используется, может и не нужен вовсе (возможность доставки проверяется в эндпоинтах рассчета цены и оформления заказа)
export async function checkIsDeliveryAvailable({
  street,
  house,
}: {
  street: string;
  house: string;
}) {
  const res = await api(
    `${CHECK_IS_DELIVERY_AVAILABLE_ROUTE}?street=${street}&house=${house}`,
  );
  if (!res.ok) {
    throw new ApiError(
      checkIsDeliveryAvailable.name,
      await res.json(),
      res.status,
    );
  }
  const resData: DeliveryData['zonePrices'][number] = await res.json();
  return resData;
}
