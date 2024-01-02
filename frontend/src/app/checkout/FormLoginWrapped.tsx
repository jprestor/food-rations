'use client';

import { useRouter } from 'next/navigation';

import FormLogin from '@/components/FormLogin';
import { useIsAuthenticated } from '@/models/user';

export default function FormLoginWrapped() {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
    return null;
  }

  return (
    <section className="mb-14">
      <h3 className="text-xl font-semibold mb-5">Войти в личный кабинет</h3>
      <FormLogin /* callback={router.refresh} */ />
    </section>
  );
}
