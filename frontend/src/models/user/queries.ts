import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { NAV } from '@/constants';

import {
  loginByCode,
  logoutUser,
  checkAuth,
  updateUser,
  fetchUserOrderList,
} from './api';

type FetchUserOrdersListArgs = Parameters<typeof fetchUserOrderList>[0];
const BASE_KEY = ['user'];

export const userQueries = {
  baseKey: BASE_KEY,
  getUser: () => ({
    queryKey: [...BASE_KEY, 'checkAuth'],
    queryFn: () => checkAuth(),
  }),
  orderList: (args: FetchUserOrdersListArgs) => ({
    queryKey: [...BASE_KEY, 'orderList', args],
    queryFn: () => fetchUserOrderList(args),
  }),
};

export function useUser() {
  return useQuery(userQueries.getUser());
}

export function useIsAuthenticated() {
  const query = useQuery(userQueries.getUser());
  return query.data ? true : false;
}

export function useUserOrders(arg: FetchUserOrdersListArgs) {
  return useQuery(userQueries.orderList(arg));
}

// Mutations
export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [...BASE_KEY, 'login'],
    mutationFn: loginByCode,
    onSuccess: (data) => {
      queryClient.setQueryData(userQueries.getUser().queryKey, data);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: [...BASE_KEY, 'logout'],
    mutationFn: logoutUser,
    onSuccess: (data) => {
      queryClient.setQueryData(userQueries.getUser().queryKey, null);
      router.push(NAV.login);
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [...BASE_KEY, 'update'],
    mutationFn: updateUser,
    onSuccess: (data) => {
      queryClient.setQueryData(userQueries.getUser().queryKey, data);
    },
  });
}
