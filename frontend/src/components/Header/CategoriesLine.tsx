'use client';

import { useState, useEffect } from 'react';
import { useProductCategoryList } from '@/models/product-category';
import { cn, scrollTo } from '@/lib';

export default function CategoriesLine() {
  const categories = useProductCategoryList();
  const [isFixedNav, setIsFixedNav] = useState(false);

  const onLinkClick = (targetID: string) => {
    const isMobile = window.matchMedia('(max-width: 1023px)').matches;
    const headerOffset = isMobile ? 135 : 85;
    scrollTo(targetID, { offset: headerOffset });
  };

  useEffect(() => {
    const onPageScroll = (e: Event) => {
      if (window.scrollY > 68) {
        setIsFixedNav(true);
      } else {
        setIsFixedNav(false);
      }
    };

    window.addEventListener('scroll', onPageScroll);
    return () => window.removeEventListener('scroll', onPageScroll);
  }, []);

  return (
    <>
      <div
        className={cn(
          'h-16 bg-gray flex items-center w-full',
          isFixedNav && 'fixed left-0 z-[100] top-0 shadow-sm',
        )}
      >
        <div className="container hidden-scrollbar">
          <ul className="gap-2 flex ">
            {categories.data?.map((i) => (
              <li key={i.id}>
                <a
                  className="link block rounded-lg px-5 py-3 whitespace-nowrap bg-white xl:py-2 xl:px-3 xl:text-sm"
                  onClick={() => onLinkClick(i.slug)}
                  data-to-scrollspy-id={i.slug}
                >
                  {i.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isFixedNav && <div className="pt-[60px]" />}
    </>
  );
}
