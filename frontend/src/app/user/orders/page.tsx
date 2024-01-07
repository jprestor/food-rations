import { type Metadata } from 'next';
import { QueryClient } from '@tanstack/react-query';

import OrderCard from './OrderCard';
import { userQueries, type User } from '@/models/user';

const title = 'Личные данные';

export const metadata: Metadata = {
  title,
};

export default function UserPage() {
  const queryClient = new QueryClient();
  const user = queryClient.getQueryData<User>(userQueries.getUser().queryKey)!;

  return (
    <>
      {user.orders.length > 0 ? (
        <div className="grid gap-5">
          {user.orders.map((order) => (
            <OrderCard data={order} key={order.id} />
          ))}
        </div>
      ) : (
        <p>Последние 90 дней заказов не было</p>
      )}
    </>
  );
}
