import { cn } from '@/lib';

import Link from './Link';

type Variant = 'primary' | 'secondary' | 'accent' | 'info' | 'success';

interface IProps {
  variant?: Variant | false;
  size?: 'sm' | 'big';
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  href?: string | undefined;
  to?: string | undefined;
  target?: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
  form?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Button({
  variant,
  size,
  loading,
  disabled,
  type = 'button',
  href,
  to,
  target,
  onClick,
  form,
  children,
  className,
}: IProps) {
  const isLink = href !== undefined;
  const isNextLink = to !== undefined;

  const style = cn('btn relative', disabled && 'btn-disabled', className);

  return (
    <>
      {!isLink && !isNextLink && (
        <button className={style} type={type} onClick={onClick} form={form}>
          {children}
          {loading && <span className="loading loading-spinner" />}
        </button>
      )}

      {isNextLink && (
        <Link className={style} to={to} target={target} onClick={onClick}>
          {children}
        </Link>
      )}

      {isLink && (
        <a className={style} href={href} target={target} onClick={onClick}>
          {children}
        </a>
      )}
    </>
  );
}
