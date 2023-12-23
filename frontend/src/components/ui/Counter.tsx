'use client';

import { cn } from '@/lib';
import Svg from './Svg';

export default function Counter({
  onInc,
  onDec,
  count,
  className,
}: {
  onDec: () => any;
  onInc: () => any;
  count: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'text-base-content bg-base-200 flex h-9 w-full max-w-[96px] items-center justify-between rounded-2xl px-2',
        className,
      )}
    >
      <a className={cn('link')} onClick={onDec}>
        <Svg id="minus" width={24} height={24} />
      </a>

      <span className="">{count}</span>

      <a className={cn('link')} onClick={onInc}>
        <Svg id="plus" width={24} height={24} />
      </a>
    </div>
  );
}
