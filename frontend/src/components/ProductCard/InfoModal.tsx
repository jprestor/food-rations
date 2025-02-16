'use client';

import ReactDOMServer from 'react-dom/server';
import toast from 'react-hot-toast';
import { Tooltip } from 'react-tooltip';
import { cn } from '@/lib';

import { type Product } from '@/models/product';
import { useCart, useAddToCart, useProductInCart } from '@/models/cart';
import { Button, Svg, Image } from '@/ui';

export default function InfoModal({
  data: { id, name, description, image, price, weight, nutritionalValue },
  setIsOpen,
}: {
  data: Product;
  setIsOpen: any;
}) {
  const cart = useCart();
  const addToCart = useAddToCart();
  const productInCart = useProductInCart(id);

  const onAddToCart = async () => {
    await addToCart.mutateAsync({ id, count: 1 });
    toast.success('Товар добавлен в корзину');
    setIsOpen(false);
  };

  return (
    <div className="flex md:flex-col md:items-center">
      {/* Image */}
      <div className="flex max-w-[33.75rem] grow items-center justify-center">
        <Image
          className="rounded-bl-2xl rounded-tl-2xl md:rounded-t-2xl"
          data={image}
          format="large"
        />
      </div>

      {/* Info */}
      <div
        className={cn(
          'bg-gray flex max-w-sm grow flex-col rounded-br-2xl rounded-tr-2xl p-6 md:max-w-[33.75rem] md:rounded-b-2xl',
        )}
      >
        <div className="mb-3 flex items-center justify-between">
          <p className="H4">{name}</p>
          {nutritionalValue && (
            <a
              data-tooltip-id="my-tooltip"
              data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                <div className="text-xs text-white">
                  <p className="mb-3 w-64 font-bold">
                    Пищевая ценность на 100 г
                  </p>
                  <div className="grid gap-1.5 opacity-80">
                    <p className="flex justify-between">
                      <span>Энергетическая ценность</span>
                      {nutritionalValue.energy} ккал
                    </p>
                    <p className="flex justify-between">
                      <span>Белки</span>
                      {nutritionalValue.proteins} г
                    </p>
                    <p className="flex justify-between">
                      <span>Жиры</span>
                      {nutritionalValue.fats} г
                    </p>
                    <p className="flex justify-between">
                      <span>Углеводы</span>
                      {nutritionalValue.carbohydrates} г
                    </p>
                  </div>
                </div>,
              )}
            >
              <Svg className="text-gray_3" id="info" width={24} height={24} />
            </a>
          )}
        </div>
        <p className="text-sm text-gray_3 mb-3">{weight && <>{weight} г</>}</p>
        {description && (
          <p
            className="text-sm mb-3"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
        <div className="mt-auto">
          {productInCart.isInCart ? (
            <Button
              className="mt-9"
              to="/checkout"
              loading={cart.isFetching}
              disabled={cart.isFetching}
            >
              В корзину
            </Button>
          ) : (
            <Button
              className="mt-9"
              onClick={onAddToCart}
              loading={cart.isFetching}
              disabled={cart.isFetching}
            >
              Добавить в корзину за {price} ₽
            </Button>
          )}
        </div>
      </div>

      <Tooltip id="my-tooltip" />
    </div>
  );
}
