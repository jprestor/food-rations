'use client';

import dayjs from 'dayjs';
import localeRu from 'dayjs/locale/ru';
import toast from 'react-hot-toast';

import InfoModal from './InfoModal';
import { Button, Image } from '@/ui';
import { UserOrder } from '@/models/user';
import { useAddToCartMultiple } from '@/models/cart';
import { cn } from '@/lib';

export default function OrderCard({
  data,
  className,
}: {
  data: UserOrder;
  className?: string;
}) {
  const addToCartMultiple = useAddToCartMultiple();
  const { id, createdAt, address, cart, totalPrice } = data;
  const { street, house, entrance, floor, apartment } = address || {};
  const dateCreated = dayjs(createdAt).locale(localeRu).format('D MMMM YYYY');

  const onRepeatOrder = async (e: React.MouseEvent) => {
    try {
      e.stopPropagation();
      await addToCartMultiple.mutateAsync(
        cart.map((item) => ({ id: item.product.id, count: item.count })),
      );
      toast.success('Товары добавлены в корзину');
    } catch (error) {
      console.log('onRepeatOrder error:', error);
      toast.error('Ошибка');
    }
  };

  return (
    <InfoModal
      data={data}
      toggle={
        <div
          className={cn(
            'grid cursor-pointer grid-cols-[3.5fr_6fr_2.5fr] gap-5 rounded-lg bg-white p-8 xl:grid-cols-1 xl:gap-6',
            className,
          )}
        >
          <div className="">
            <div className="text-sm text-base-content mb-2">№ {id}</div>
            <div className="text-xl mb-3">{dateCreated} г.</div>
            <div className="text-sm text-base-content mb-2">Доставка</div>
            <div className="mb-5">
              <p>
                {street && `${street} `}
                {house && `${house}, `}
                {entrance && `${entrance} подъезд, `}
                {floor && `${floor} этаж, `}
                {apartment && `кв. ${apartment}`}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-5 items-center gap-2 sm:grid-cols-2">
            {cart.slice(0, 4).map((i) => (
              <div
                className="outline-gray_4 flex h-[113px] items-center justify-center overflow-hidden rounded-md outline sm:h-32"
                key={i.product.id}
              >
                <Image data={i.product.image} format="thumbnail" />
              </div>
            ))}

            {cart.length > 4 && (
              <div className="relative flex h-[113px] items-center justify-center overflow-hidden rounded-lg sm:h-32">
                <Image data={cart[4].product.image} format="thumbnail" />
                <div className="H3 absolute inset-0 flex items-center justify-center bg-[rgba(32,32,39,.5)] text-white">
                  +{cart.slice(0, 4).length}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col items-end">
            <div className="text-xl mb-5">{totalPrice} ₽</div>
            <Button
              className="btn-primary mt-auto !w-44 sm:!w-full"
              onClick={onRepeatOrder}
            >
              Повторить заказ
            </Button>
          </div>
        </div>
      }
    />
  );
}
