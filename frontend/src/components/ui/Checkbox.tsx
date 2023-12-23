import { forwardRef } from 'react';
import Svg from './Svg';
import { cn } from '@/lib';

const Checkbox: React.FC<any> = forwardRef(function Checkbox(
  { checkboxStyle, labelStyle, children, className, ...props },
  ref,
) {
  return (
    <label
      className={cn('flex cursor-pointer items-start gap-[11px]', className)}
    >
      <input className="peer hidden" {...props} ref={ref} type="checkbox" />

      {/* Icon */}
      <span
        className={cn(
          'border-Secondary/Grey5 peer-checked:bg-Background/Grey peer-checked:border-Background/Grey flex-center child-svg:opacity-0 peer-checked:child-svg:opacity-100 h-4.5 w-4.5 group relative flex-none rounded border bg-transparent',
          checkboxStyle,
        )}
      >
        <Svg className="text-Primary/White" id="check" width={12} height={9} />
      </span>

      {/* Label */}
      {children && (
        <span className={cn('mt-0.5 md:mt-1', labelStyle)}>{children}</span>
      )}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
