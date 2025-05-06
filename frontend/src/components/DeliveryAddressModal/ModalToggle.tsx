'use client';

import { Svg } from '@/ui';
import { useDeliveryAddressString } from '@/models/order';
import { cn } from '@/lib';

export default function ModalToggle({ className }: { className?: string }) {
  const addressString = useDeliveryAddressString();

  return (
    <a
      className={cn(
        'text-base-content link flex h-10 items-center justify-center rounded-2xl bg-base-100 px-4 sm:hidden',
        className,
      )}
    >
      {addressString.data ? (
        <span className="mr-2.5 flex items-center gap-2">
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
