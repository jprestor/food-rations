import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import Nav from './Nav';
import { userQueries, type User } from '@/models/user';
import { NAV } from '@/constants';

export const metadata: Metadata = {
  title: 'Личный кабинет',
};

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  await Promise.all([queryClient.prefetchQuery(userQueries.getUser())]);

  const user = queryClient.getQueryData<User>(userQueries.getUser().queryKey);

  if (!user) {
    redirect(NAV.login);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="container">
        <Nav />
        {children}
      </div>
    </HydrationBoundary>
  );
}
