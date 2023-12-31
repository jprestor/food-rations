'use client';

import {
  useState,
  useEffect,
  useCallback,
  memo,
  type Dispatch,
  type SetStateAction,
} from 'react';
import Portal from '@/components/Portal';
import { cn } from '@/lib';

import Svg from './Svg';

const Modal = memo(
  ({
    toggle,
    toggleStyle,
    onOpen,
    onClose,
    externalIsOpen,
    size = 'md',
    innerStyle,
    crossStyle,
    children,
    className,
  }: {
    toggle?: React.ReactNode;
    toggleStyle?: string;
    onOpen?: any;
    onClose?: any;
    externalIsOpen?: boolean;
    size?: 'sm' | 'md' | 'lg';
    innerStyle?: string;
    crossStyle?: string;
    children?:
      | React.ReactNode
      | React.FC<{
          isOpen: boolean;
          setIsOpen: Dispatch<SetStateAction<boolean>>;
        }>;
    className?: string;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const duration = 250;

    const openModal = () => {
      setIsOpen(true);
      setTimeout(() => setIsVisible(true));
      if (onOpen) onOpen();
    };

    const closeModal = useCallback(() => {
      setIsVisible(false);
      setTimeout(() => setIsOpen(false), duration);
      if (onClose) onClose();
    }, [onClose]);

    const closeOnOuterClick = (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).classList.contains('ui-modal')) {
        closeModal();
      }
    };

    const closeOnEscPress = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeModal();
        }
      },
      [closeModal],
    );

    useEffect(() => {
      document.addEventListener('keydown', closeOnEscPress, false);
      return () =>
        document.removeEventListener('keydown', closeOnEscPress, false);
    }, [closeOnEscPress]);

    useEffect(() => {
      if (typeof externalIsOpen !== 'undefined') {
        externalIsOpen ? openModal() : closeModal();
      }
    }, [externalIsOpen]);

    return (
      <>
        <div className={cn('fit', toggleStyle)} onClick={openModal}>
          {toggle}
        </div>

        {isOpen ? (
          <Portal>
            <div
              onClick={closeOnOuterClick}
              className={cn(
                'ui-modal fixed inset-0 z-[150] flex h-screen overflow-y-auto bg-[rgba(27,27,27,.40)] px-4 py-10 backdrop-blur-sm transition-all md:px-0 md:py-0',
                isVisible ? '' : 'opacity-0',
                className,
              )}
              style={{ transitionDuration: `${duration}ms` }}
            >
              <div
                className={cn(
                  'bg-base-200 relative m-auto w-full max-w-[502px] px-6 py-10 shadow-xl sm:px-4 md:min-h-full rounded-lg md:max-w-full',
                  size === 'sm' && 'max-w-[464px]',
                  size === 'lg' && 'max-w-[774px]',
                  innerStyle,
                )}
              >
                {typeof children === 'function'
                  ? children({ isOpen, setIsOpen })
                  : children}
                <a
                  className={cn(
                    'transiton hover:text-primary md:top-6 absolute -right-12 top-0 hover:rotate-180 md:right-6',
                    crossStyle,
                  )}
                  onClick={closeModal}
                >
                  <Svg className="md:w-4" id="cross" width={32} height={32} />
                </a>
              </div>
            </div>
          </Portal>
        ) : null}
      </>
    );
  },
);

Modal.displayName = 'Modal';

export default Modal;
