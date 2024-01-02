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
  cartPrice: number;
  deliveryPrice: number;
  deliveryDiscount: number;
  totalPrice: number;
  executionStatus: { id: number; name: string }[];
  paymentStatus: { id: number; name: string }[];
  createdAt: Date;
  updatedAt: Date;
};

export type OrderPrices = {
  cartPrice: number | null;
  deliveryPrice: number | null;
  deliveryDiscount: number | null;
  totalPrice: number | null;
};

export type OrderDeliveryData = {
  address: { street: string; house: string };
  coords: number[];
};
