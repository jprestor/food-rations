'use client';

import { useEffect, useState } from 'react';

import { Svg, Link } from '@/ui';
import { cookies, cn } from '@/lib';

export default function CookieConsentPrompt() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isCookiesConsentAccepted = cookies.get('isCookiesConsentAccepted');

    if (!isCookiesConsentAccepted) {
      setIsVisible(true);
    }
  }, []);

  const onClose = () => {
    setIsVisible(false);
    cookies.set('isCookiesConsentAccepted', 'true');
  };

  return (
    <div
      className={cn(
        'fixed left-0 w-full transition bottom-0 translate-y-full bg-primary/90 opacity-0',
        isVisible && 'opacity-100 -translate-y-0',
      )}
    >
      <div className="container flex gap-5 min-h-14 py-2 text-base text-primary-content font-normal justify-between items-center xl:text-sm">
        <p>
          Мы используем cookies для быстрой и удобной работы сайта. Продолжая
          пользоваться сайтом, вы принимаете{' '}
          <Link
            className="text-neutral-content underline hover:opacity-85"
            target="__blank"
          >
            условия обработки персональных данных
          </Link>
        </p>
        <button className="hover:opacity-85 flex-none" onClick={onClose}>
          <Svg id="cross" width={12} height={12} />
        </button>
      </div>
    </div>
  );
}
