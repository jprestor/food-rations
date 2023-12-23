import Image from 'next/image';

import { BACKEND_URL } from '@/constants';
import { cn } from '@/lib';

export default function UiImage({
  data,
  format = 'small',
  fill,
  priority,
  className,
}: {
  data: any;
  format?: 'full' | 'large' | 'medium' | 'small' | 'thumbnail';
  fill?: boolean;
  priority?: boolean;
  className?: string;
}) {
  if (!data) {
    return null;
  }

  const { url, width, height } = data.formats?.[format] || data;

  return (
    <Image
      className={cn(fill && 'object-cover object-center', className)}
      src={`${BACKEND_URL}${url}`}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      fill={fill}
      priority={priority}
      alt={data.alternativeText || ''}
    />
  );
}
