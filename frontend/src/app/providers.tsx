'use client';

import { useState } from 'react';
import { YMaps } from '@pbe/react-yandex-maps';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { YMAPS_API_KEY, SUGGEST_API_KEY } from '@/constants';

export default function Providers(props: React.PropsWithChildren) {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <YMaps
        query={{
          apikey: YMAPS_API_KEY,
          suggest_apikey: SUGGEST_API_KEY,
        }}
      >
        {props.children}
      </YMaps>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
