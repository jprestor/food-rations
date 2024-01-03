import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createOrder,
  getOrderPrices,
  getSelectedDeliveryAddress,
  setSelectedDeliveryAddress,
} from './api';
import type { SelectedDeliveryAddress } from './types';

type OrderPricesArgs = Parameters<typeof getOrderPrices>[0];

export const orderQueries = {
  baseKey: ['order'],
  deliveryData: () => ({
    queryKey: ['order', 'deliveryData'],
    queryFn: () => getSelectedDeliveryAddress(),
  }),
  prices: (args?: OrderPricesArgs) => ({
    queryKey: ['order', 'prices'],
    queryFn: () => args && getOrderPrices(args),
  }),
};

export function useSelectedDeliveryAddress() {
  return useQuery(orderQueries.deliveryData());
}

export function useOrderPrices() {
  const query = useSelectedDeliveryAddress();
  return useQuery(orderQueries.prices(query.data?.coords));
}

export function useDeliveryAddressString() {
  return useQuery({
    ...orderQueries.deliveryData(),
    select: useCallback(
      (data: SelectedDeliveryAddress | null) =>
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

export function useSelectDeliveryAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delivery', 'set'],
    mutationFn: setSelectedDeliveryAddress,
    onSuccess: (data) => {
      queryClient.setQueryData(orderQueries.deliveryData().queryKey, data);
      queryClient.invalidateQueries(orderQueries.prices(data.coords));
    },
  });
}
