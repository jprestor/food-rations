import { forwardRef } from 'react';
import { cn } from '@/lib';

const Radio: React.FC<any> = forwardRef(
  ({ checkboxStyle, labelStyle, children, className, ...props }, ref) => {
    return (
      <label className="flex cursor-pointer items-center gap-2">
        <input
          className="radio checked:border-Primary/Blue !bg-Primary/White border-Secondary/Grey5 peer mt-0.5 h-5 w-5 border !shadow-none checked:border-[6px]"
          {...props}
          ref={ref}
          type="radio"
        />

        {/* Label */}
        {children && (
          <span className={cn('peer-checked:text-Primary/Blue', labelStyle)}>
            {children}
          </span>
        )}
      </label>
    );
  },
);

Radio.displayName = 'Checkbox';

export default Radio;
