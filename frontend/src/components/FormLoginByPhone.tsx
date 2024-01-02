'use client';

import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import SendCodeModal from '@/components/SendCodeModal';
import { Button, Link, TextInput } from '@/ui';
import { PHONE_REGEXP } from '@/constants';

export default function FormLoginByPhone() {
  const defaultValues = {
    phone: '',
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
      }),
    ),
  });

  const {
    register,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const userPhone = watch('phone');

  return (
    <form>
      <h2 className="mb-5 text-3xl font-semibold">Войти</h2>
      <p className="text-lg mb-5">
        Введите номер телефона, чтобы войти в свой аккаунт
      </p>
      <TextInput
        label="Телефон"
        error={errors?.phone?.message}
        {...register('phone')}
      />
      <Button
        className="mt-9 btn-primary w-full"
        loading={isSubmitting}
        disabled={isSubmitting}
        type="submit"
      >
        Выслать код
      </Button>

      {!_.isEmpty(errors) && (
        <div className="text-alert mt-5">
          {_.values(errors as any)?.[0]?.message}
        </div>
      )}

      <p className="text-xs text-base-300 mt-4">
        Продолжая, вы соглашаетесь со сбором и обработкой{' '}
        <Link
          className="underline"
          to="/privacy-policy#personal-data-processing"
          target="_blank"
        >
          персональных данных
        </Link>{' '}
        и{' '}
        <Link className="underline" to="/privacy-policy" target="_blank">
          пользовательским соглашением
        </Link>
      </p>

      <SendCodeModal isModalOpen={isSubmitSuccessful} phone={userPhone} />
    </form>
  );
}
