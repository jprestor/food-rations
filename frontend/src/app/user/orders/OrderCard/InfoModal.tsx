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
      <h4 className="mb-7 text-3xl font-medium">Заказ № {id}</h4>

      <div className="flex flex-col gap-3 sm:divide-y sm:divide-base-300 sm:gap-0">
        {cart.map((i) => (
          <div
            className="flex items-center sm:flex-col sm:py-5 sm:items-start"
            key={i.product.id}
          >
            <div className="bg-base-200 mr-4 flex h-20 aspect-square flex-none items-center justify-center overflow-hidden rounded-lg sm:mb-3">
              <Image
                className="mix-blend-darken"
                data={i.product.image}
                format="thumbnail"
              />
            </div>

            <div className="mr-2.5 grow sm:mb-5 sm:mr-0">
              <p className="mb-1">{i.product.name}</p>
              <p className="text-base-content text-sm">
                {i.product.weight && `${i.product.weight} г`}
              </p>
            </div>

            <div className="flex items-center">
              <div className="ml-auto mr-5 w-12 flex-none text-right">
                x{i.count}
              </div>

              <div className="mr-5 w-16 flex-none text-right sm:mr-0 sm:text-lg">
                {i.cartItemPrice} ₽
              </div>

              <Button
                className="btn-primary flex-none sm:-order-1 sm:grow"
                onClick={() => onAddToCart(i.product.id, i.count)}
              >
                В корзину
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
