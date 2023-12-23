import { useEffect } from 'react';
import {
  usePathname,
  useSearchParams,
  type ReadonlyURLSearchParams,
} from 'next/navigation';

type Callback = ({
  pathname,
  searchParams,
  url,
}: {
  pathname: string;
  searchParams: ReadonlyURLSearchParams;
  url: string;
}) => void;

const useRouteChange = (callback: Callback) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;

    if (callback) {
      callback({ pathname, searchParams, url });
    }
  }, [pathname, searchParams, callback]);
};

export default useRouteChange;
