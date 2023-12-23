'use client';

import { cn } from '@/lib';

import FormUserAddressEdit from '@/components/FormUserAddressEdit';
import type { Address } from '@/models/commonTypes';
import { Modal, Svg } from '@/ui';

export default function AddressCard({
  isActive,
  address,
  onClick,
}: {
  isActive: boolean;
  address: Address;
  onClick?: (address: Address) => void;
}) {
  const { addressName, street, house, entrance, floor, apartment } = address;

  return (
    <div
      className={cn(
        'relative cursor-pointer rounded-lg border-2 border-white bg-white p-4',
        isActive && '!border-primary ',
      )}
      onClick={() => onClick?.(address)}
    >
      {addressName && <p className="font-bold mb-[8px]">{addressName}</p>}

      <p>
        {street && `${street}`}
        {house && `, ${house}`}
        {entrance && `, ${entrance} подъезд`}
        {floor && `, ${floor} этаж`}
        {apartment && `, кв. ${apartment}`}
      </p>

      <Modal
        toggle={
          <a
            className="link text-base-300 absolute right-5 top-5"
            onClick={() => onClick?.(address)}
          >
            <Svg id="pencil" width="23" height="23" />
          </a>
        }
        innerStyle="!max-w-[650px]"
      >
        {({ setIsOpen }) => (
          <FormUserAddressEdit address={address} callback={setIsOpen} />
        )}
      </Modal>
    </div>
  );
}
