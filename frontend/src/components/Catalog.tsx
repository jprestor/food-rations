'use client';

import ScrollSpy from 'react-ui-scrollspy';

import StickyCart from '@/components/StickyCart';
import ProductCard from '@/components/ProductCard';
import { useProductList } from '@/models/product';
import { useProductCategoryList } from '@/models/product-category';

export default function Catalog() {
  const productList = useProductList();
  const productCategoryList = useProductCategoryList();

  if (!productList.data?.length || !productCategoryList.data?.length) {
    return (
      <section className="alert container mt-14 mb-32">
        Сегодня нет товаров
      </section>
    );
  }

  return (
    <section className="container flex gap-5 mb-16" id="catalog">
      <div className="w-full">
        <ScrollSpy updateHistoryStack={false}>
          {productCategoryList.data.map((category) => {
            const productsFiltered = productList.data.filter((product) =>
              product.categories.some(({ id }: any) => id === category.id),
            );

            if (!productsFiltered.length) {
              return null;
            }

            return (
              <div
                className="mb-14 last:mb-0 sm:mb-10"
                id={category.slug}
                key={category.id}
              >
                <h2 className="mb-8 text-4xl font-semibold">{category.name}</h2>
                <div className="grid grid-cols-3 gap-5 sm:grid-cols-1 lg:grid-cols-2 xl:max-w-full">
                  {productsFiltered.map((product) => (
                    <ProductCard data={product} key={product.id} />
                  ))}
                </div>
              </div>
            );
          })}
        </ScrollSpy>
      </div>

      <div className="w-full max-w-xs pt-[4.5rem] xl:hidden">
        <StickyCart />
      </div>
    </section>
  );
}
