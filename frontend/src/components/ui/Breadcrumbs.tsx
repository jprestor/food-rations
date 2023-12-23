'use client';

import { Link } from '@/ui';
import { cn } from '@/lib';
import { NAV } from '@/constants';

interface IProps {
  segments: {
    name: string | undefined;
    link?: string | undefined;
  }[];
  className?: string;
}

function Breadcrumbs({ segments, className }: IProps) {
  return (
    <div
      className={cn(
        'sm:h-21 relative z-10 mb-28 mt-4 sm:m-0 sm:opacity-0',
        className,
      )}
    >
      <ul className="Desktop/SmallText container flex items-center gap-2">
        <li>
          <Link className="link" to={NAV.home}>
            Главная
          </Link>
        </li>

        {segments
          .filter((i) => typeof i.name !== 'undefined')
          .map((i, idx, arr) => (
            <li className="flex-center gap-2" key={i.name}>
              <div className="mx-1.5 mb-px h-1 w-1 rounded-full bg-[#D9D9D9]" />

              <Link
                className={cn(
                  'link',
                  idx === arr.length - 1 && 'pointer-events-none opacity-40',
                )}
                to={i.link}
              >
                {i.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Breadcrumbs;
