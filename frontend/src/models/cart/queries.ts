import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  fetchCart,
  addToCart,
  addToCartMultiple,
  removeFromCart,
  restoreFromDeleted,
} from './api';
import { orderQueries } from '@/models/order';

export const cartQueries = {
  baseKey: ['cart'],
  get: () => ({
    queryKey: cartQueries.baseKey,
    queryFn: fetchCart,
  }),
};

export function useCart() {
  return useQuery(cartQueries.get());
}

export const useProductInCart = (productId: number) => {
  const cart = useCart();
  const product = useMemo(
    () => cart?.data?.items.find((i) => i.product.id === productId),
    [productId, cart.data],
  );
  if (cart.isError || cart.isPending || cart.data === null) {
    return { isInCart: false, count: 0 };
  }
  return { isInCart: product !== undefined, count: product?.count || 0 };
};

export function useAddToCart() {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: [...cartQueries.baseKey, 'addItem'],
    mutationFn: addToCart,
    onSuccess: (data, variables, context) => {
      qc.setQueryData(cartQueries.get().queryKey, data);
      qc.invalidateQueries(orderQueries.prices());
    },
  });
}

export function useAddToCartMultiple() {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: [...cartQueries.baseKey, 'addMultiple'],
    mutationFn: addToCartMultiple,
    onSuccess: (data, variables, context) => {
      qc.setQueryData(cartQueries.get().queryKey, data);
      qc.invalidateQueries(orderQueries.prices());
    },
  });
}

export function useRemoveFromCart() {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: [...cartQueries.baseKey, 'removeItem'],
    mutationFn: removeFromCart,
    onSuccess: (data, variables, context) => {
      qc.setQueryData(cartQueries.get().queryKey, data);
      qc.invalidateQueries(orderQueries.prices());
    },
  });
}

export function useRestoreFromDeleted() {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: [...cartQueries.baseKey, 'restoreItem'],
    mutationFn: restoreFromDeleted,
    onSuccess: (data, variables, context) => {
      qc.setQueryData(cartQueries.get().queryKey, data);
      qc.invalidateQueries(orderQueries.prices());
    },
  });
}
