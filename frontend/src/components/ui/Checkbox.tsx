import { forwardRef } from 'react';
import Svg from './Svg';
import { cn } from '@/lib';

const Checkbox: React.FC<any> = forwardRef(function Checkbox(
  { checkboxStyle, labelStyle, children, className, ...props },
  ref,
) {
  return (
    <label className={cn('flex cursor-pointer items-start gap-3', className)}>
      <input className="peer hidden" {...props} ref={ref} type="checkbox" />

      {/* Icon */}
      <span
        className={cn(
          'peer-checked:bg-primary peer-checked:border-primary flex-center child-svg:opacity-0 peer-checked:child-svg:opacity-100 h-5 w-5 relative flex-none rounded border mt-px bg-transparent border-base-content',
          checkboxStyle,
        )}
      >
        <Svg className="text-primary" id="check" width={16} height={16} />
      </span>

      {/* Label */}
      {children && <span className={cn(labelStyle)}>{children}</span>}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
