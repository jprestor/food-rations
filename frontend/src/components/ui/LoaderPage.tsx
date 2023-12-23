'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib';

interface ILoaderPage {
  isLoading?: boolean;
  timeout?: number;
  className?: string;
}

export default function LoaderPage({
  isLoading,
  timeout = 500,
  className,
}: ILoaderPage) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isLoading) {
      setIsVisible(true);
    } else {
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, timeout);
    }

    return () => clearTimeout(timeoutId);
  }, [isLoading, timeout]);

  return (
    <div
      className={cn(
        'absolute inset-0 z-[1000] flex justify-center bg-[rgba(299,299,299,.65)] pt-[9.375rem] transition',
        !isVisible && 'invisible opacity-0',
        className,
      )}
    >
      <span className="loading loading-spinner text-Primary/Blue h-[6.25rem] w-[6.25rem]" />
    </div>
  );
}
