import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createOrder,
  getOrderPrices,
  getOrderDeliveryData,
  setOrderDeliveryData,
} from './api';
import type { OrderDeliveryData } from './types';

type OrderPricesArgs = Parameters<typeof getOrderPrices>[0];

export const orderQueries = {
  baseKey: ['order'],
  pricesKey: ['order', 'prices'],
  deliveryData: (args?: OrderPricesArgs) => ({
    queryKey: ['order', 'deliveryData'],
    queryFn: () => getOrderDeliveryData(),
  }),
  prices: (args?: OrderPricesArgs) => ({
    queryKey: [...orderQueries.pricesKey, args],
    queryFn: () => args && getOrderPrices(args),
    enabled: !!args,
  }),
};

export function useOrderPrices(args?: OrderPricesArgs) {
  return useQuery(orderQueries.prices(args));
}

export function useOrderDeliveryData() {
  return useQuery(orderQueries.deliveryData());
}

export function useDeliveryAddressString() {
  return useQuery({
    queryKey: ['order', 'deliveryData'],
    queryFn: () => getOrderDeliveryData(),
    select: useCallback(
      (data: OrderDeliveryData | null) =>
        data
          ? [data.address.street, data.address.house].filter(Boolean).join(', ')
          : '',
      [],
    ),
  });
}

// Mutations
export function useCreateOrder() {
  return useMutation({
    mutationKey: [...orderQueries.baseKey, 'create'],
    mutationFn: createOrder,
  });
}

export function useSetOrderDeliveryData() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delivery', 'set'],
    mutationFn: setOrderDeliveryData,
    onSuccess: (data) => {
      queryClient.setQueryData(orderQueries.deliveryData().queryKey, data);
      queryClient.invalidateQueries(orderQueries.prices(data.coords));
    },
  });
}
