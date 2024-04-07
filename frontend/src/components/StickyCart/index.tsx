'use client';

import CartItem from './CartItem';
import EmptyCart from '@/components/EmptyCart';
import { Link, Alert } from '@/ui';
import { useCart } from '@/models/cart';
import { useOrderPrices } from '@/models/order';
import { NAV } from '@/constants';
import { cn } from '@/lib';

export default function StickyCart({ className }: { className?: string }) {
  const { data: cart, isPending, isError } = useCart();
  const isEmptyCart = cart === null || (!!cart && cart.items.length < 1);
  const { deliveryPrice } = useOrderPrices() || {};
  const { totalPrice } = cart || {};

  if (isPending) {
    return <Alert type="warning">Пока нет данных</Alert>;
  }
  if (isError) {
    return <Alert type="error">Ошибка</Alert>;
  }

  return (
    <div
      className={cn(
        'sticky top-20 flex h-[calc(100vh-80px)] w-full max-w-xs flex-col rounded-t-lg bg-base-100 p-5',
        className,
      )}
    >
      <p className="text-xl mb-3 font-semibold">Корзина</p>
      <div className="flex grow flex-col justify-between">
        {isEmptyCart ? (
          <EmptyCart />
        ) : (
          <div className="h-[calc(100vh-265px)] overflow-y-auto xl:h-auto">
            {cart.items.map((cartItem) => (
              <CartItem {...cartItem} key={cartItem.product.id} />
            ))}
          </div>
        )}

        <div className="flex justify-between items-center gap-5">
          <div className="font-semibold">Доставка</div>
          <span className="text-xs font-medium">
            {deliveryPrice ? `${deliveryPrice}  ₽` : 'Укажите адрес доставки'}
          </span>
        </div>

        {totalPrice ? (
          <Link className="btn btn-primary mt-4 flex" to={NAV.checkout}>
            Оформить за {totalPrice} ₽
          </Link>
        ) : null}
      </div>
    </div>
  );
}
