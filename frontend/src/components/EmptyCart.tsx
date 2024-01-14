'use client';

import Image from 'next/image';
import { Link } from '@/ui';
import { scrollTo } from '@/lib';
import { NAV } from '@/constants';

export default function EmptyCart() {
  return (
    <div className="mb-5 flex grow flex-col items-center justify-center text-center">
      <Image
        className="mb-4"
        src="/icons/logo.svg"
        width={64}
        height={61}
        alt="logo"
      />
      <div className="text-2xl mb-2.5 max-w-[218px]">
        В вашей корзине пока пусто
      </div>
      <Link className="text-sm text-pumpkin" to={NAV.catalog}>
        Давайте это исправим
      </Link>
    </div>
  );
}
