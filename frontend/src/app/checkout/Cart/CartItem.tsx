'use client';

import { Image } from '@/ui';
import CartItemCounter from '@/components/CartItemCounter';
import { type Product } from '@/models/product';

export default function CartItem({
  product: { id, name, image, weight },
  count,
  cartItemPrice,
  staticCounter = false,
}: {
  product: Product;
  count: number;
  cartItemPrice: number;
  staticCounter?: boolean;
}) {
  return (
    <div className="flex items-center py-2.5 sm:flex-col sm:items-start sm:border-t sm:border-t-[#E3E3E9] sm:py-5">
      <div className="flex max-w-[287px] items-center sm:mb-5">
        <div className="outline-gray_4 mr-4 flex h-[70px] w-[70px] flex-none items-center justify-center rounded-2.5 outline sm:mr-5">
          <Image data={image} format="thumbnail" />
        </div>

        <div className="mr-5 min-w-20 sm:text-[18px]">
          <p className="mb-[4px]">{name}</p>
          <p className="text-gray_3">{weight && `${weight} г`}</p>
        </div>
      </div>

      <div className="ml-auto flex items-center justify-between sm:ml-0">
        {staticCounter ? (
          <span>×{count}</span>
        ) : (
          <CartItemCounter
            className="mr-[5px] !w-24 sm:mr-4"
            id={id}
            count={count}
          />
        )}

        <div className="w-[69px] flex-none text-right sm:text-[18px]">
          {cartItemPrice} ₽
        </div>
      </div>
    </div>
  );
}
