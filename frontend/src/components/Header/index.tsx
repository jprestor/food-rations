'use client';

import { usePathname } from 'next/navigation';

import TopLine from './TopLine';
import CategoriesLine from './CategoriesLine';
import { NAV } from '@/constants';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="pb-2">
      <TopLine />
      {pathname === NAV.home && <CategoriesLine />}
    </header>
  );
}
