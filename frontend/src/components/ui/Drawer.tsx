import { useEffect, useState } from 'react';
import ReactModernDrawer from 'react-modern-drawer';
import { usePathname } from 'next/navigation';

import Svg from './Svg';
import { cn } from '@/lib';

interface IDrawer {
  toggle: React.ReactNode;
  toggleStyle?: string;
  isNav?: boolean;
  onToggle?: any;
  defaultOpen?: boolean;
  closeOnRouteChange?: boolean;
  crossStyle?: string;
  customIdSuffix?: string;
  direction?: 'left' | 'right';
  children?: React.ReactNode | React.FC<any>;
  className?: string;
  props?: any;
}

function Drawer({
  toggle,
  toggleStyle,
  isNav,
  onToggle,
  defaultOpen = false,
  closeOnRouteChange,
  crossStyle,
  customIdSuffix,
  direction = 'right',
  children,
  className,
  ...props
}: IDrawer) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const pathname = usePathname();

  const toggleDrawer = () => {
    setIsOpen((prevState: boolean) => {
      const newState = !prevState;
      if (onToggle) {
        onToggle(newState);
      }
      return newState;
    });
  };

  const closeWhenRouteChange = () => setIsOpen(false);

  useEffect(() => {
    closeWhenRouteChange();
  }, [pathname]);

  return (
    <>
      <div
        className={cn('fit', isOpen && 'is-open', toggleStyle)}
        onClick={toggleDrawer}
      >
        {toggle}
      </div>

      <ReactModernDrawer
        open={isOpen}
        onClose={toggleDrawer}
        direction={direction}
        className={cn(
          'md:pt-17.5 z-50 flex !w-full max-w-[60rem] flex-col px-[135px] pt-20 md:max-w-full md:px-6',
          className,
        )}
        customIdSuffix={customIdSuffix}
        {...props}
      >
        <a
          className={cn(
            'transition link top-18 -right-12 absolute hover:rotate-180 lg:left-auto lg:right-5 lg:top-5 lg:text-black',
            crossStyle,
          )}
          onClick={toggleDrawer}
        >
          <Svg id="cross" width="32" height="32" className="md:h-5 md:w-5" />
        </a>

        <div className="pb-12.5 pr-15 md:pr-5">
          {typeof children === 'function'
            ? children({ toggleDrawer })
            : children}
        </div>
      </ReactModernDrawer>
    </>
  );
}

export default Drawer;
