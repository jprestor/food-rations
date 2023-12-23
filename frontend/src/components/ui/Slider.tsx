'use client';

import { CSSProperties, forwardRef } from 'react';
import Slick, { type CustomArrowProps, type Settings } from 'react-slick';

import { Svg } from '@/ui';
import { cn } from '@/lib';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CustomArrow: React.FC<
  CustomArrowProps & {
    customCommonClassName?: string;
    customArrowClassName?: string;
  }
> = ({
  style,
  onClick,
  className,
  customCommonClassName,
  customArrowClassName,
}) => {
  return (
    <a
      className={cn(className, customCommonClassName, customArrowClassName)}
      style={style}
      onClick={onClick}
    >
      <Svg id="arrow-next" width="8" height="14" />
    </a>
  );
};

interface ISlider {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  options?: Settings;
  style?: CSSProperties;
  className?: string;
  arrowsClassName?: string;
  prevArrowClassName?: string;
  nextArrowClassName?: string;
  dotsClassName?: string;
  children: React.ReactNode;
}

const Slider: React.FC<ISlider> = forwardRef(
  (
    {
      children,
      options,
      className,
      arrowsClassName,
      prevArrowClassName,
      nextArrowClassName,
      dotsClassName,
    },
    ref: any,
  ) => {
    const defaultOptions = {
      prevArrow: (
        <CustomArrow
          customCommonClassName={arrowsClassName}
          customArrowClassName={prevArrowClassName}
        />
      ),
      nextArrow: (
        <CustomArrow
          customCommonClassName={arrowsClassName}
          customArrowClassName={nextArrowClassName}
        />
      ),
      customPaging: (i: number) => {
        return (
          <a className={dotsClassName}>
            <span />
          </a>
        );
      },
    };

    return (
      <Slick
        ref={ref}
        {...defaultOptions}
        {...options}
        className={cn('carousel', className)}
      >
        {children}
      </Slick>
    );
  },
);

Slider.displayName = 'SliderSlick';

export default Slider;
