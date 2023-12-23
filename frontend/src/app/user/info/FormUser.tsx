'use client';

import { values, isEmpty } from 'lodash';
import DatePicker from 'react-datepicker';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';

import UserAddresses from '@/components/UserAddresses';
import { TextInput, Button, Checkbox } from '@/ui';
import { useUser, useUpdateUser, type IUpdateUser } from '@/models/user';
import type { Address } from '@/models/commonTypes';

type FormValues = IUpdateUser['data'] & { address: Address | null };

export default function FormUser() {
  const user = useUser().data!;
  const updateUser = useUpdateUser();

  const methods = useForm<FormValues>({
    defaultValues: {
      username: user?.username,
      email: user?.email,
      phone: user?.phone,
      birthdate: user?.birthdate,
      receiveMailing: user?.receiveMailing,
      address: null,
    },
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
    } catch (error) {
      console.log('Form error:', error);
      setError('root', { message: 'Ошибка на сервере' });
    }
  };

  return (
    <div className="mr-8 w-full max-w-[650px] lg:order-1 lg:mr-0 lg:mt-12">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-14">
            <div className="grid gap-2.5">
              <TextInput label="Телефон" {...register('phone')} />
              <TextInput label="Имя" {...register('username')} />
              <TextInput label="Email" {...register('email')} />
            </div>

            <div className="max-w-[427px]">
              <p className="P_L_b mb-8">День рождения</p>
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
                defaultValue=""
              />
            </div>

            <UserAddresses />

            <div>
              <p className="H2 mb-8">Подписки</p>
              <Checkbox {...register('receiveMailing')}>
                Получать персональные предложения и акции
              </Checkbox>
            </div>

            <Button
              className="!max-w-[158px]"
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
    </div>
  );
}
