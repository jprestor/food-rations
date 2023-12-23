'use client';

import { useFormContext } from 'react-hook-form';

import { cn } from '@/lib';
import { TextInput } from '@/ui';
import { type ICreateOrderData } from '@/models/order';

export default function AddressFields({ className }: { className?: string }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<ICreateOrderData>();

  return (
    <div className={cn('address-fields-grid', className)}>
      <TextInput
        label="Улица"
        style={{ gridArea: 'field0' }}
        error={errors?.address?.street?.message}
        {...register('address.street')}
      />
      <TextInput
        label="Дом"
        style={{ gridArea: 'field1' }}
        error={errors?.address?.house?.message}
        {...register('address.house')}
      />
      <TextInput
        label="Квартира"
        style={{ gridArea: 'field2' }}
        error={errors?.address?.apartment?.message}
        {...register('address.apartment')}
      />
      <TextInput
        label="Подъезд"
        style={{ gridArea: 'field3' }}
        error={errors?.address?.entrance?.message}
        {...register('address.entrance')}
      />
      <TextInput
        label="Домофон"
        style={{ gridArea: 'field4' }}
        error={errors?.address?.intercom?.message}
        {...register('address.intercom')}
      />
      <TextInput
        label="Этаж"
        style={{ gridArea: 'field5' }}
        error={errors?.address?.floor?.message}
        {...register('address.floor')}
      />
      <TextInput
        label="Название адреса (например Дом или Работа)"
        style={{ gridArea: 'field6' }}
        error={errors?.address?.addressName?.message}
        {...register('address.addressName')}
      />
    </div>
  );
}
