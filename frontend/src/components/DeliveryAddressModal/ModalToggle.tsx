'use client';

import { Svg } from '@/ui';
import { useDeliveryAddressString } from '@/models/order';

export default function ModalToggle() {
  const addressString = useDeliveryAddressString();

  return (
    <a className="text-gray_3 link flex h-10 items-center justify-center rounded-2xl bg-white px-4 sm:hidden">
      {addressString.data ? (
        <span className="mr-2.5 flex items-center gap-[8px]">
          <span className="font-semibold">Доставка</span>
          <span className="text-sm">{addressString.data}</span>
        </span>
      ) : (
        <span className="mr-2.5 font-semibold">Выбрать адрес доставки</span>
      )}

      <Svg className="flex-none" id="arrow" width="12" height="6" />
    </a>
  );
}
