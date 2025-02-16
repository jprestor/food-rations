'use client';

import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';

import CartItemCounter from '@/components/CartItemCounter';
import { Button, Image, Modal } from '@/ui';
import { type Product } from '@/models/product';
import { useProductInCart, useAddToCart } from '@/models/cart';
import { cn } from '@/lib';

const InfoModal = dynamic(() => import('./InfoModal'), { ssr: false });

export default function ProductCard({
  data,
  className,
}: {
  data: Product;
  className?: string;
}) {
  const { id, name, description, price, image } = data;
  const addToCart = useAddToCart();
  const productInCart = useProductInCart(id);

  const onAddToCart = async () => {
    await addToCart.mutateAsync({ id, count: 1 });
    toast.success('Товар добавлен в корзину');
  };

  return (
    <div className={cn('flex flex-col rounded-lg bg-white', className)}>
      <div className="group relative mx-auto flex w-full items-center justify-center overflow-hidden rounded-t-lg aspect-square">
        {image && (
          <a className="absolute inset-0 flex items-center justify-center">
            <Image
              className="transition group-hover:scale-110"
              data={image}
              format="small"
            />
          </a>
        )}
        <Modal
          innerStyle="!p-0 !bg-white"
          size="lg"
          toggle={
            <div className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-t-lg bg-[#545467)]/20 opacity-0 transition group-hover:opacity-100">
              <button className="max-w-[12.5rem] btn rounded-full">
                Быстрый просмотр
              </button>
            </div>
          }
        >
          {({ setIsOpen }: any) => (
            <InfoModal data={data} setIsOpen={setIsOpen} />
          )}
        </Modal>
      </div>

      <div className="flex grow flex-col p-5">
        <div className="text-lg mb-2.5">{name}</div>
        {description && (
          <div
            className="text-sm mb-5 min-h-[3.5rem] grow"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold mr-3 flex-none">{price} ₽</div>
          {productInCart.isInCart ? (
            <CartItemCounter
              className="bg-secondary fond-bold text-secondary-content h-12 max-w-[7rem] px-4 sm:h-10"
              count={productInCart.count}
              id={id}
            />
          ) : (
            <button
              className="max-w-[8.75rem] btn btn-secondary"
              onClick={onAddToCart}
            >
              В корзину
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
