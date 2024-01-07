'use client';

import { values, isEmpty } from 'lodash';
import DatePicker from 'react-datepicker';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import UserAddresses from '@/components/UserAddresses';
import { TextInput, Button, Checkbox } from '@/ui';
import { useUser, useUpdateUser, type IUpdateUser } from '@/models/user';
import type { Address } from '@/models/commonTypes';
import { PHONE_REGEXP } from '@/constants';

type FormValues = IUpdateUser['data'] & { address?: Address | null };

export default function FormUser() {
  const user = useUser().data!;
  const updateUser = useUpdateUser();

  const methods = useForm<FormValues>({
    defaultValues: {
      username: user?.username || '',
      phone: user?.phone || '',
      email: user?.email || '',
      birthdate: user?.birthdate,
      receiveMailing: user?.receiveMailing || false,
      address: null,
    },
    resolver: yupResolver(
      Yup.object({
        username: Yup.string().required('Это поле обязательное'),
        phone: Yup.string()
          .required('Введите ваш телефон')
          .matches(PHONE_REGEXP, 'Введите корректный номер')
          .min(11, 'Введите корректный номер')
          .max(12, 'Введите корректный номер'),
        email: Yup.string().required('Это поле обязательное'),
      }),
    ) as any,
  });

  const {
    handleSubmit,
    setError,
    control,
    register,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async ({ address, ...formValues }: FormValues) => {
    try {
      const isNotEmptyAddress =
        address && values(address).some((val) => !isEmpty(val));
      const newAddress = isNotEmptyAddress ? [address] : [];
      const data = {
        ...formValues,
        addresses: [...newAddress, ...user.addresses],
      };

      await updateUser.mutateAsync({ id: user.id, data });
      toast.success('Изменения успешно сохранены');
    } catch (error: any) {
      console.log('Form error:', error);
      setError('root', {
        message: error?.info?.error?.message || 'Ошибка на сервере',
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="w-full max-w-xl" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-14">
          <div className="grid gap-2.5">
            <TextInput
              label="Телефон"
              error={errors?.phone?.message}
              {...register('phone')}
            />
            <TextInput
              label="Имя"
              error={errors?.username?.message}
              {...register('username')}
            />
            <TextInput
              label="Email"
              error={errors?.email?.message}
              {...register('email')}
            />
          </div>

          <div className="max-w-sm datepicker">
            <p className="font-bold text-lg mb-4">День рождения</p>
            <Controller
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  selected={value ? new Date(value) : undefined}
                  onChange={onChange}
                  showYearDropdown
                  dropdownMode="select"
                  customInput={<input className="field-datepicker" />}
                  placeholderText="Нажмите, чтобы выбрать дату"
                />
              )}
              name="birthdate"
              control={control}
            />
          </div>

          <UserAddresses />

          <div>
            <p className="font-bold text-lg mb-6">Подписки</p>
            <Checkbox {...register('receiveMailing')}>
              Получать персональные предложения и акции
            </Checkbox>
          </div>

          <Button
            className="max-w-40 w-full btn-primary"
            loading={isSubmitting}
            disabled={isSubmitting}
            type="submit"
          >
            Сохранить
          </Button>
        </div>

        {!isEmpty(errors) && (
          <div className="text-alert pt-8 text-lg">
            {values(errors as any)?.[0]?.message}
          </div>
        )}
      </form>
    </FormProvider>
  );
}
