'use client';

import { useState } from 'react';
import ModalToggle from './ModalToggle';
import { MapChooseAddress } from '@/components/Maps';
import { Modal } from '@/ui';
import {
  useSelectDeliveryAddress,
  useDeliveryAddressString,
} from '@/models/order';

export default function DeliveryAddressModal() {
  const [error, setError] = useState<string | null>(null);
  const setDeliveryData = useSelectDeliveryAddress();
  const addressString = useDeliveryAddressString();

  const onSelectAddressOnMap = ({
    street,
    house,
    coords,
    isInsideDeliveryZone,
  }: {
    street: string;
    house: string;
    coords: number[];
    isInsideDeliveryZone: boolean;
  }) => {
    if (!isInsideDeliveryZone) {
      setError('К сожалению адрес находится вне зоны нашей доставки');
    } else {
      setError(null);
      setDeliveryData.mutateAsync({ address: { street, house }, coords });
    }
  };

  return (
    <Modal toggle={<ModalToggle />} size="lg">
      {({ setIsOpen }: any) => (
        <>
          <p className="text-3xl mb-6 text-center">Выберите адрес доставки</p>
          <div className="flex gap-2">
            <input
              className="input input-bordered input-primary mb-4 w-full"
              type="text"
              id="suggest"
              defaultValue={addressString.data}
              placeholder="Улица, дом"
            />
            <button
              className="btn w-32 btn-primary"
              onClick={() => setIsOpen(false)}
            >
              Готово
            </button>
          </div>
          <MapChooseAddress
            callback={onSelectAddressOnMap}
            initialAddress={addressString.data}
          />
          {error && <div className="text-alert pt-[5px] text-sm">{error}</div>}
        </>
      )}
    </Modal>
  );
}
