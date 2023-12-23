'use client';

import { Image, Svg } from '@/ui';
import CartItemCounter from '@/components/CartItemCounter';
import { useRemoveFromCart, type CartItem } from '@/models/cart';

export default function CartItem({
  product: { id, name, image, weight },
  count,
  cartItemPrice,
}: CartItem) {
  const removeFromCart = useRemoveFromCart();

  const onRemoveFromCart = () => {
    removeFromCart.mutateAsync(id);
  };

  return (
    <div className="border-b-base-300 border-b py-3 last:border-none">
      <div className="mb-2 flex items-center gap-2">
        <div className="border-base-200 flex h-15 max-w-[4rem] aspect-square items-center justify-center rounded-lg overflow-hidden border">
          <Image data={image} format="thumbnail" />
        </div>
        <div className="text-sm mr-2 grow">
          <p className="mb-2">{name}</p>
          <p className="text-gray_3">{weight && `${weight} г`}</p>
        </div>
        <a
          className="link text-base-400 ml-auto mt-2 self-start"
          onClick={onRemoveFromCart}
        >
          <Svg id="cross" width={10} height={10} />
        </a>
      </div>

      <div className="flex items-center justify-between">
        <CartItemCounter id={id} count={count} />
        <div>{cartItemPrice} ₽</div>
      </div>
    </div>
  );
}
