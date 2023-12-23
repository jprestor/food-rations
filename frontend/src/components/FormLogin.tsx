'use client';

import { useRouter } from 'next/navigation';
import { isEmpty, values } from 'lodash';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

import { Button, TextInput, FieldPassword } from '@/ui';
import { useLogin } from '@/models/user';
import { NAV } from '@/constants';
import { cn } from '@/lib';

export default function FormLogin({
  callback,
  className,
}: {
  callback?: () => void;
  className?: string;
}) {
  const login = useLogin();
  const router = useRouter();

  const defaultValues = {
    identifier: '',
    password: '',
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(
      Yup.object({
        identifier: Yup.string().required('Это поле обязательное'),
        password: Yup.string().required('Это поле обязательное'),
      }),
    ),
  });

  const {
    handleSubmit,
    register,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async ({ identifier, password }: typeof defaultValues) => {
    try {
      await login.mutateAsync({ identifier, password });
      toast.success('Вы вошли в личный кабинет');
      router.push(NAV.account);
      reset();
      callback?.();
    } catch (error: any) {
      if (error.info?.error?.message === 'Invalid identifier or password') {
        setError('root', { message: 'Неправильный логин или пароль' });
      } else {
        setError('root', { message: 'Ошибка на сервере' });
      }
      console.log('Form error:', error);
    }
  };

  return (
    <form className={cn(className)} onSubmit={handleSubmit(onSubmit as any)}>
      <h3 className="text-xl mb-10">Войти в личный кабинет</h3>
      <div className="mb-9 grid gap-6 sm:gap-2 md:mb-6">
        <TextInput
          label="Логин"
          error={errors?.password?.message}
          {...register('identifier')}
        />
        <FieldPassword
          label="Пароль"
          error={errors?.password?.message}
          {...register('password')}
        />
      </div>
      <Button
        className="flex w-full"
        loading={isSubmitting}
        disabled={isSubmitting}
        type="submit"
      >
        Войти
      </Button>
      {!isEmpty(errors) && (
        <div className="text-error pt-5 md:pt-3">
          {values(errors as any)?.[0]?.message}
        </div>
      )}
    </form>
  );
}
