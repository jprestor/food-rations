import { type Order } from '@/models/order';
import type { Address } from '@/models/commonTypes';

export type UserOrder = Order;

export type User = {
  id: number;
  username: string;
  phone: string;
  email: string;
  birthdate: string | null;
  receiveMailing: boolean;
  addresses: Address[];
  orders: UserOrder[];
};
