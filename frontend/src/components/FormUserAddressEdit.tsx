'use client';

import { values, isEmpty, omit } from 'lodash';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import AddressFields from '@/components/AddressFields';
import { Button } from '@/ui';
import { useUser, useUpdateUser } from '@/models/user';
import type { Address } from '@/models/commonTypes';

export default function FormUserAddressEdit({
  address,
  callback,
}: {
  address: Address;
  callback?: Function;
}) {
  const { data: user } = useUser();
  const updateUser = useUpdateUser();
  const addressName = address?.addressName;
  const defaultValues = omit(address, 'id');
  const methods = useForm({ defaultValues });

  if (!user) {
    return 'Нет пользователя';
  }

  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (formData: typeof defaultValues) => {
    try {
      const restAddresses = user.addresses
        .filter((restItem) => restItem.id !== address.id)
        .map((restItem) => omit(restItem, 'id'));

      await updateUser.mutateAsync({
        id: user.id,
        data: { addresses: [formData, ...restAddresses] },
      });

      toast.success('Изменения успешно сохранены');
      callback?.();
    } catch (error) {
      setError('root', { message: 'Ошибка на сервере' });
      console.log('Form error:', error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        id="user-address-edit"
        className="pb-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="H3 mb-9">
          Редактировать адрес {addressName && `«${addressName}»`}
        </h3>

        <AddressFields className="mb-9" />

        <Button
          form="user-address-edit"
          loading={isSubmitting}
          disabled={isSubmitting}
          type="submit"
        >
          Изменить адрес
        </Button>

        {isEmpty(errors) && (
          <div className="text-alert pt-7 text-lg">
            {values(errors as any)?.[0]?.message}
          </div>
        )}
      </form>
    </FormProvider>
  );
}
