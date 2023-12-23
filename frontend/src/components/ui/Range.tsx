'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib';

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex w-full touch-none select-none items-center',
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="bg-Secondary/Grey5 relative h-px w-full grow overflow-hidden rounded-full">
      <SliderPrimitive.Range className="bg-Primary/Blue absolute h-full" />
    </SliderPrimitive.Track>

    <SliderPrimitive.Thumb className="bg-Primary/Blue block h-[13px] w-[13px] rounded-full disabled:pointer-events-none disabled:opacity-50" />

    <SliderPrimitive.Thumb className="bg-Primary/Blue block h-[13px] w-[13px] rounded-full disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));

Slider.displayName = SliderPrimitive.Root.displayName;

export default Slider;
