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
    <div className={cn('grid grid-cols-4 gap-2', className)}>
      <TextInput
        className="col-span-3"
        label="Улица"
        error={errors?.address?.street?.message}
        {...register('address.street')}
      />
      <TextInput
        label="Дом"
        error={errors?.address?.house?.message}
        {...register('address.house')}
      />
      <TextInput
        label="Квартира"
        error={errors?.address?.apartment?.message}
        {...register('address.apartment')}
      />
      <TextInput
        label="Подъезд"
        error={errors?.address?.entrance?.message}
        {...register('address.entrance')}
      />
      <TextInput
        label="Домофон"
        error={errors?.address?.intercom?.message}
        {...register('address.intercom')}
      />
      <TextInput
        label="Этаж"
        error={errors?.address?.floor?.message}
        {...register('address.floor')}
      />
      <TextInput
        className="col-span-4"
        label="Название адреса (например Дом или Работа)"
        error={errors?.address?.addressName?.message}
        {...register('address.addressName')}
      />
    </div>
  );
}
