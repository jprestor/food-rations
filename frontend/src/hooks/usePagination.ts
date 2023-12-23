import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { type ApiMeta } from '@/constants';

type FetcherOptions = {
  page?: number;
  pageSize?: number;
  filters?: { [key: string]: any };
  withMeta?: boolean;
};

function usePagination<T>(
  fetcher: (options: FetcherOptions) => Promise<{ data: T[]; meta: ApiMeta }>,
  initialData: { data: T[]; meta: ApiMeta },
  fetcherOptions?: FetcherOptions,
) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const pagination = data.meta.pagination;
  const isEnd = pagination.page === pagination.pageCount;
  const remain = Math.max(
    pagination.total - pagination.page * pagination.pageSize,
    0,
  );
  const options = { withMeta: true, ...fetcherOptions };

  const setSearchParams = (page: number) => {
    window.history.pushState({}, '', `${pathname}?page=${page}`); // temporary
  };

  const getPrev = async () => {
    setIsLoading(true);
    const page = pagination.page - 1;
    const res = await fetcher({ ...options, page });
    setData(res);
    setSearchParams(page);
    setIsLoading(false);
  };

  const getNext = async () => {
    setIsLoading(true);
    const page = pagination.page - 1;
    const res = await fetcher({ ...options, page });
    setData(res);
    setSearchParams(page);
    setIsLoading(false);
  };

  const getPage = async (page: number) => {
    setIsLoading(true);
    const res = await fetcher({ ...options, page });
    setData(res);
    setSearchParams(page);
    setIsLoading(false);
  };

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return {
    items: data.data,
    isLoading,
    getPrev,
    getNext,
    getPage,
    isEnd,
    remain,
    ...pagination,
  };
}

export default usePagination;
