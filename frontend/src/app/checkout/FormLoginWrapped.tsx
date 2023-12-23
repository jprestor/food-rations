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

  return <FormLogin callback={router.refresh} />;
}
