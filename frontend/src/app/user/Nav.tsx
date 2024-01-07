'use client';

import { usePathname } from 'next/navigation';

import { Link } from '@/ui';
import { NAV } from '@/constants';
import { cn } from '@/lib';

export default function AccountNav() {
  const pathname = usePathname();

  return (
    <nav className="text-4xl -mx-5 mb-12 flex sm:mx-4 sm:mb-9 sm:text-center sm:text-2xl">
      {[
        { name: 'Личные данные', link: NAV.userInfo },
        { name: 'История заказов', link: NAV.userOrders },
      ].map(({ link, name }) => {
        const isActive = pathname === link;

        return (
          <Link
            className={cn(
              'mx-5 border-b-2 py-2.5',
              isActive ? 'border-black' : 'text-base-300 border-transparent',
            )}
            to={link}
            key={link}
          >
            {name}
          </Link>
        );
      })}
    </nav>
  );
}
