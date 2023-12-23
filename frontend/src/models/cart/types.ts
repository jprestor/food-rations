import type { Product } from '@/models/product';

export type CartItem = {
  product: Product;
  count: number;
  cartItemPrice: number;
};

export type Cart = {
  uuid: string;
  items: CartItem[];
  removed: CartItem[];
  totalPrice: number;
};
