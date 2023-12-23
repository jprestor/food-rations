'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { NAV } from '@/constants';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="my-14 text-center">
      <h1 className="mb-5 text-[80px] font-bold tracking-wide md:text-[55px]">
        Что-то пошло не так
      </h1>

      <Link className="text-basic link block text-center" href={NAV.home}>
        Вернуться на главную
      </Link>
    </div>
  );
}
