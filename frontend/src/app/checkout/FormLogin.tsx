'use client';

import { isEmpty, values } from 'lodash';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import SendCodeModal from '@/components/SendCodeModal';
import { Button, TextInput } from '@/ui';
import { useIsAuthenticated } from '@/models/user';
import { PHONE_REGEXP } from '@/constants';
import { cn } from '@/lib';

export default function FormLogin({ className }: { className?: string }) {
  const isAuthenticated = useIsAuthenticated();

  const defaultValues = {
    phone: '',
    name: '',
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(
      Yup.object({
        phone: Yup.string()
          .required('Введите ваш телефон')
          .matches(PHONE_REGEXP, 'Введите корректный номер')
          .min(11, 'Введите корректный номер')
          .max(12, 'Введите корректный номер'),
        name: Yup.string().required('Введите ваше имя'),
      }),
    ),
  });

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const userPhone = watch('phone');
  const userName = watch('name');

  if (isAuthenticated) {
    return null;
  }

  return (
    <form className={cn(className)} onSubmit={handleSubmit(() => {})}>
      <h3 className="text-xl font-semibold mb-5">Войти в личный кабинет</h3>

      <div className="mb-9 grid gap-5 sm:gap-2 md:mb-6">
        <TextInput
          label="Телефон"
          error={errors?.phone?.message}
          {...register('phone')}
        />
        <TextInput
          label="Имя"
          error={errors?.name?.message}
          {...register('name')}
        />
      </div>
      <Button
        className="flex w-full btn-primary"
        loading={isSubmitting}
        disabled={isSubmitting}
        type="submit"
      >
        Далее
      </Button>

      {!isEmpty(errors) && (
        <div className="text-error pt-5 md:pt-3">
          {values(errors as any)?.[0]?.message}
        </div>
      )}

      {isSubmitSuccessful && (
        <SendCodeModal
          isModalOpen={isSubmitSuccessful}
          phone={userPhone}
          name={userName}
        />
      )}
    </form>
  );
}
