'use client';

/*
  - Компонент отображает карточки с сохраненными адресами (AddressCard)
    и поля для ввода данных нового адреса (AddressFields).
  - В итоге пользователь или выбирает готовую карточку (если передан колбек onAddressCardSelect) или вводит новый адрес.

  - Компонент универсальный и используется как в форме чекаута так и в кабинете пользователя
*/

import { useState } from 'react';

import AddressCard from './AddressCard';
import AddressFields from '@/components/AddressFields';
import type { Address } from '@/models/commonTypes';
import { useUser } from '@/models/user';

export default function UserAddresses({
  onAddressCardSelect,
  defaultShowAddressFields = false, // По умолчанию показать поля для ввода нового адреса
  className,
}: {
  onAddressCardSelect?: (address: Address | null) => void;
  defaultShowAddressFields?: boolean;
  className?: string;
}) {
  const user = useUser();
  const hasAddresses = !!user.data && user.data?.addresses?.length > 0;
  const [showAddresFields, setShowAddressFields] = useState(
    defaultShowAddressFields,
  );
  const [activeCardID, setActiveCardID] = useState<number | null>(null);

  const onAddressCardClick = (address: Address) => {
    setActiveCardID(address.id);
    setShowAddressFields(false);
    onAddressCardSelect!(address);
  };

  const onAddNewAddress = () => {
    setShowAddressFields(true);
    onAddressCardSelect?.(null);
  };

  return (
    <div className={className}>
      <p className="text-lg font-bold mb-4">
        {hasAddresses ? 'Мои адреса' : 'Мой адрес'}
      </p>

      {hasAddresses && (
        <div className="mb-8 grid gap-3">
          {user.data?.addresses?.map((address: Address) => (
            <AddressCard
              address={address}
              isActive={address.id === activeCardID}
              onClick={onAddressCardSelect && onAddressCardClick}
              key={address.id}
            />
          ))}
        </div>
      )}

      {showAddresFields ? (
        <AddressFields />
      ) : (
        <button className="btn btn-primary" onClick={onAddNewAddress}>
          Добавить новый адрес
        </button>
      )}
    </div>
  );
}
