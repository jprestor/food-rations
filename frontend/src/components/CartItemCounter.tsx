'use client';

import { Counter } from '@/ui';
import { useAddToCart } from '@/models/cart';

export default function CartItemCounter({
  id,
  count,
  className,
}: {
  id: number;
  count: number;
  className?: string;
}) {
  const { mutate } = useAddToCart();
  const onDec = () => mutate({ id, count: count - 1 });
  const onInc = () => mutate({ id, count: count + 1 });

  return (
    <Counter className={className} count={count} onDec={onDec} onInc={onInc} />
  );
}
