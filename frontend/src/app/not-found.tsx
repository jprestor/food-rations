import type { Metadata } from 'next';

import Link from 'next/link';
import { NAV } from '@/constants';

export const metadata: Metadata = {
  title: 'Страница не найдена | 404',
};

export default function NotFound() {
  return (
    <div className="my-14 text-center">
      <h1 className="mb-4 text-[122px] font-bold leading-[120%] tracking-wide">
        404
      </h1>
      <p className="mb-4 text-lg">
        Страница, которую вы ищите <br />
        не найдена
      </p>

      <Link className="text-basic link block text-center" href={NAV.home}>
        Вернуться на главную
      </Link>
    </div>
  );
}
