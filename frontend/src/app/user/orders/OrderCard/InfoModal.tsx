'use client';

import toast from 'react-hot-toast';

import { Modal, Image, Button } from '@/ui';
import { UserOrder } from '@/models/user';
import { useAddToCart } from '@/models/cart';

export default function InfoModal({
  data,
  toggle,
}: {
  data: UserOrder;
  toggle: React.ReactNode;
}) {
  const addToCart = useAddToCart();
  const { id, cart } = data;

  const onAddToCart = async (id: number, count: number) => {
    await addToCart.mutateAsync({ id, count });
    toast.success('Товар добавлен в корзину');
  };

  return (
    <Modal toggle={toggle} innerStyle="px-8 !max-w-[719px] bg-white sm:px-5">
      <h4 className="mb-5">Заказ № {id}</h4>

      {cart.map((i) => (
        <div
          className="flex items-center py-2.5 sm:flex-col sm:items-stretch sm:border-t sm:border-t-[#E3E3E9] sm:py-5"
          key={i.product.id}
        >
          <div className="bg-gray mr-4 flex h-20 aspect-square flex-none items-center justify-center overflow-hidden rounded-lg sm:mr-5">
            <Image data={i.product.image} format="thumbnail" />
          </div>

          <div className="mr-2.5 grow sm:mb-5 sm:mr-0">
            <p className="mb-1">{i.product.name}</p>
            <p className="text-gray_3">
              {i.product.weight && `${i.product.weight} г`}
            </p>
          </div>

          <div className="flex items-center">
            <div className="ml-auto mr-5 w-12 flex-none text-right">
              x{i.count}
            </div>

            <div className="mr-5 w-[69px] flex-none text-right sm:mr-0 sm:text-lg">
              {i.cartItemPrice} ₽
            </div>

            <Button
              className="!w-[140px] flex-none sm:-order-1 sm:grow"
              variant="green"
              onClick={() => onAddToCart(i.product.id, i.count)}
            >
              В корзину
            </Button>
          </div>
        </div>
      ))}
    </Modal>
  );
}
