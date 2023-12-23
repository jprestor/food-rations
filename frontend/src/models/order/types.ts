import type { CartItem } from '@/models/cart';
import type { User } from '@/models/user';
import type { Address } from '@/models/commonTypes';

export type Order = {
  id: number;
  name: string;
  phone: string;
  comment: string;
  user: User;
  userId: number;
  address: Address;
  cart: CartItem[];
  productsPrice: number;
  deliveryPrice: number;
  discount: number;
  totalPrice: number;
  executionStatus: { id: number; name: string }[];
  paymentStatus: { id: number; name: string }[];
  createdAt: Date;
  updatedAt: Date;
};

export type OrderPrices = {
  deliveryCost: number;
  discount: number;
  totalPrice: number;
};

export type OrderDeliveryData = {
  address: { street: string; house: string };
  coords: number[];
};
