'use client';

import CartItem from './CartItem';
import EmptyCart from '@/components/EmptyCart';
import { Alert } from '@/ui';
import { useCart } from '@/models/cart';
import { useOrderPrices } from '@/models/order';

export default function OrderCart() {
  const cart = useCart();
  const orderPrices = useOrderPrices();
  const { deliveryDiscount, deliveryPrice, totalPrice } =
    orderPrices.data || {};
  const isEmptyCart =
    cart.data === null || (!!cart.data && cart.data.items.length < 1);

  if (cart.isPending) {
    return <Alert type="warning">Пока нет данных</Alert>;
  }
  if (cart.isError) {
    return <Alert type="error">Ошибка</Alert>;
  }

  return (
    <div className="sticky top-12 rounded-lg bg-white p-7">
      <p className="H4 mb-5 sm:mb-7">Состав заказа</p>

      {!isEmptyCart ? (
        <>
          <div className="border-b border-b-base-300 pb-6">
            {cart.data!.items.map((cartItem) => (
              <CartItem {...cartItem} key={cartItem.product.id} />
            ))}
          </div>

          {/* Total */}
          <div className="pt-4">
            <div className="grid gap-4 border-b border-b-base-200 pb-4">
              <div className="flex justify-between">
                <div>{cart.data?.totalPrice} товара</div>
                <div>{cart.data?.totalPrice} ₽</div>
              </div>
              {deliveryDiscount && (
                <div className="text-primary flex justify-between">
                  <div>Скидка</div>
                  <div>{deliveryDiscount} ₽</div>
                </div>
              )}
              <div className="flex justify-between">
                <div className="mr-8">Доставка</div>
                <div>{deliveryPrice} ₽</div>
              </div>
            </div>

            <div className="P_b flex justify-between pt-5">
              <div>Сумма заказа</div>
              <div>{totalPrice} ₽</div>
            </div>
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
