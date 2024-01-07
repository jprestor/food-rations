'use client';

import { usePathname } from 'next/navigation';

import { Link } from '@/ui';
import { NAV } from '@/constants';
import { cn } from '@/lib';

export default function AccountNav() {
  const pathname = usePathname();

  return (
    <nav className="text-3xl font-medium mb-16 flex gap-8 sm:gap-4 sm:mb-9 sm:justify-center sm:text-lg">
      {[
        { name: 'Личные данные', link: NAV.userInfo },
        { name: 'История заказов', link: NAV.userOrders },
      ].map(({ link, name }) => {
        const isActive = pathname === link;

        return (
          <Link
            className={cn(isActive ? 'link-underline' : 'hover:text-primary')}
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
