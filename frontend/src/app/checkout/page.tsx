import { type Metadata } from 'next';

import FormLoginWrapped from './FormLoginWrapped';
import FormOrder from './FormOrder';
import Cart from './Cart';

const title = 'Оформление заказа';

export const metadata: Metadata = {
  title,
};

export default function CheckoutPage() {
  return (
    <div className="container pt-10">
      <h1 className="text-4xl font-semibold mb-8 lg:text-center">{title}</h1>

      <div className="flex gap-7 justify-between lg:flex-col lg:items-center">
        <div className="w-full max-w-[650px] lg:order-1 lg:mr-0 lg:mt-12">
          <FormLoginWrapped />
          <FormOrder />
        </div>
        <div className="w-full max-w-[537px]">
          <Cart />
        </div>
      </div>
    </div>
  );
}