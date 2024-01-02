'use client';

import CartItem from './CartItem';
import EmptyCart from '@/components/EmptyCart';
import { Link, Alert } from '@/ui';
import { useCart } from '@/models/cart';
import { useOrderPrices } from '@/models/order';
import { cn } from '@/lib';

export default function StickyCart({ className }: { className?: string }) {
  const cart = useCart();
  const isEmptyCart =
    cart.data === null || (!!cart.data && cart.data.items.length < 1);
  const orderPrices = useOrderPrices();

  if (cart.isPending) {
    return <Alert type="warning">Пока нет данных</Alert>;
  }
  if (cart.isError) {
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
      {!isEmptyCart ? (
        <>
          <div className="mb-6 h-[calc(100%-150px)] overflow-y-auto">
            <div className="pr-3">
              {cart.data!.items.map((cartItem) => (
                <CartItem {...cartItem} key={cartItem.product.id} />
              ))}
            </div>
          </div>

          <div className="text-sm mt-auto">
            <div className="mb-2 flex items-center gap-2">
              {(orderPrices.data || orderPrices.isLoading) && (
                <>
                  <p>Доставка</p>
                  <span>·</span>
                </>
              )}
              {orderPrices.isLoading ? (
                <span className="loading loading-spinner text-primary loading-sm" />
              ) : (
                <span>{orderPrices.data?.deliveryPrice} ₽</span>
              )}
            </div>

            <Link className="mt-4 btn btn-primary" to="/checkout">
              Оформить за {cart.data!.totalPrice} ₽
            </Link>
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
