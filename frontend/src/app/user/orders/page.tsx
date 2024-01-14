import { type Metadata } from 'next';
import { QueryClient } from '@tanstack/react-query';

import OrderCard from './OrderCard';
import { Alert } from '@/ui';
import { userQueries, type User, type UserOrder } from '@/models/user';

const title = 'История заказов | Кабинет';

export const metadata: Metadata = {
  title,
};

export default async function UserOrdersPage() {
  const qc = new QueryClient();
  await qc.prefetchQuery(userQueries.getUser());
  const user = qc.getQueryData<User>(userQueries.getUser().queryKey)!;
  await qc.prefetchQuery(userQueries.orderList(user.id));

  const userOrders = qc.getQueryData<UserOrder[]>(
    userQueries.orderList(user.id).queryKey,
  );

  return (
    <>
      {userOrders && userOrders.length > 0 ? (
        <div className="grid gap-5">
          {userOrders.map((order) => (
            <OrderCard data={order} key={order.id} />
          ))}
        </div>
      ) : (
        <Alert>Пока нет заказов</Alert>
      )}
    </>
  );
}
