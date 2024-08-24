'use client';

import { useEffect } from 'react';
import { isEmpty, values } from 'lodash';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import UserAddresses from '@/components/UserAddresses';
import { Button, TextInput, Link } from '@/ui';
import { useUser, useIsAuthenticated } from '@/models/user';
import { useCart } from '@/models/cart';
import {
  useSelectedDeliveryAddress,
  useOrderPrices,
  useCreateOrder,
} from '@/models/order';
import { PHONE_REGEXP, NAV } from '@/constants';
import { cn } from '@/lib';

export default function FormOrder({ className }: { className?: string }) {
  const user = useUser();
  const isAuthenticated = useIsAuthenticated();
  const deliveryData = useSelectedDeliveryAddress();
  const createOrder = useCreateOrder();
  const cart = useCart();
  const isEmptyCart =
    cart.data === null || (!!cart.data && cart.data.items.length < 1);
  const orderPrices = useOrderPrices();
  const router = useRouter();

  const methods = useForm({
    resolver: yupResolver(
      Yup.object({
        phone: Yup.string()
          .required('Введите ваш телефон')
          .matches(PHONE_REGEXP, 'Введите корректный номер')
          .min(11, 'Введите корректный номер')
          .max(12, 'Введите корректный номер'),
        name: Yup.string().required('Введите ваше имя'),
        address: Yup.object({
          street: Yup.string().required('Это поле обязательное'),
          house: Yup.string().required('Это поле обязательное'),
        }),
        comment: Yup.string(),
      }),
    ),
  });

  const {
    handleSubmit,
    setError,
    reset,
    resetField,
    setValue,
    register,
    formState: { errors, isSubmitting },
  } = methods;

  useEffect(() => {
    if (isAuthenticated) {
      reset({
        phone: user?.data?.phone || '',
        name: user?.data?.username || '',
        address: deliveryData?.address,
      });
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (formValues) => {
    try {
      const res = await createOrder.mutateAsync(formValues);
      router.push(res.confirmation.confirmation_url);
      toast.success('Ваш заказ создан');
    } catch (error: any) {
      console.log('onSubmit error', error);
      setError('root', { message: error?.info?.error?.message || 'Ошибка' });
    }
  });

  return (
    <FormProvider {...methods}>
      <form
        className={cn(!isAuthenticated && 'pointer-events-none opacity-50')}
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-12">
          {isAuthenticated && (
            <section>
              <h2 className="text-xl font-semibold mb-5">Ваши данные</h2>
              <div className="grid gap-3">
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
            </section>
          )}

          <UserAddresses
            onAddressCardSelect={(address) =>
              address ? setValue('address', address) : resetField('address')
            }
            defaultShowAddressFields
          />

          <TextInput
            label="Комментарий к заказу"
            error={errors?.comment?.message}
            textarea
            {...register('comment')}
          />
        </div>
        <Button
          className="max-w-xs w-full mt-10 btn-primary"
          loading={isSubmitting}
          disabled={isEmptyCart || isSubmitting}
          type="submit"
        >
          Оплатить заказ
          {orderPrices?.totalPrice && ` на ${orderPrices.totalPrice} ₽`}
        </Button>

        <p className="text-xs max-w-[378px] text-base-content mt-4">
          Нажатием кнопки &quot;Оплатить&quot; я подтверждаю, что ознакомлен с{' '}
          <Link
            className="underline link"
            to={NAV.privacyPolicy}
            target="_blank"
          >
            Политикой конфиденциальности
          </Link>{' '}
          и с{' '}
          <Link className="underline link" to={NAV.publicOffer} target="_blank">
            Публичной офертой
          </Link>{' '}
          и принимаю все условия, изложенные в ней.
        </p>

        {!isEmpty(errors) && (
          <div className="text-alert pt-7 text-lg">
            {values(errors as any)?.[0]?.message}
          </div>
        )}
      </form>
    </FormProvider>
  );
}
