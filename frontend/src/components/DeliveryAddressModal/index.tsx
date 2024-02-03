'use client';

import ModalToggle from './ModalToggle';
import { MapChooseAddress } from '@/components/Maps';
import { Modal } from '@/ui';
import { useDeliveryAddressString } from '@/models/order';

export default function DeliveryAddressModal() {
  const addressString = useDeliveryAddressString();

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
          <MapChooseAddress />
        </>
      )}
    </Modal>
  );
}
