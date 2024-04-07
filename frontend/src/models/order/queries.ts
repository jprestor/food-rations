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
  selectedDeliveryAddress: () => ({
    queryKey: ['order', 'deliveryData'],
    queryFn: () => getSelectedDeliveryAddress(),
  }),
  prices: (args?: OrderPricesArgs) => ({
    queryKey: ['order', 'prices'],
    queryFn: () => getOrderPrices(args),
  }),
};

export function useSelectedDeliveryAddress() {
  return useQuery(orderQueries.selectedDeliveryAddress()).data;
}

export function useOrderPrices() {
  const query = useSelectedDeliveryAddress();
  return useQuery(orderQueries.prices(query?.coords)).data;
}

export function useDeliveryAddressString() {
  return useQuery({
    ...orderQueries.selectedDeliveryAddress(),
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
      queryClient.setQueryData(
        orderQueries.selectedDeliveryAddress().queryKey,
        data,
      );
      queryClient.invalidateQueries(orderQueries.prices(data.coords));
    },
  });
}
