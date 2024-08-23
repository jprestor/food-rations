'use client';

import { useState } from 'react';
import { isEmpty, values } from 'lodash';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import SendCodeModal from '@/components/SendCodeModal';
import { Button, TextInput, Link } from '@/ui';
import { useIsAuthenticated } from '@/models/user';
import { PHONE_REGEXP, NAV } from '@/constants';
import { cn } from '@/lib';

function FormLogin({ className }: { className?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const methods = useForm({
    defaultValues: {
      phone: '',
      name: '',
    },
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

  const onFormSubmit = handleSubmit(() => {
    setIsModalOpen(true);
  });

  const userPhone = watch('phone');
  const userName = watch('name');

  return (
    <form className={cn(className)} onSubmit={onFormSubmit}>
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

      <p className="text-xs text-center max-w-sm mx-auto text-base-content mt-4">
        Продолжая, вы соглашаетесь со сбором и обработкой{' '}
        <Link className="underline link" to={NAV.publicOffer} target="_blank">
          персональных данных
        </Link>{' '}
        и{' '}
        <Link className="underline link" to={NAV.privacyPolicy} target="_blank">
          пользовательским соглашением
        </Link>
      </p>

      {!isEmpty(errors) && (
        <div className="text-error pt-5 md:pt-3">
          {values(errors as any)?.[0]?.message}
        </div>
      )}

      {isSubmitSuccessful && (
        <SendCodeModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          phone={userPhone}
          name={userName}
        />
      )}
    </form>
  );
}

export default function FormWrapper({ className }: { className?: string }) {
  const isAuthenticated = useIsAuthenticated();
  return !isAuthenticated ? <FormLogin className={className} /> : null;
}
