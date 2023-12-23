'use client';

import { Gallery, Item } from 'react-photoswipe-gallery';
import { cn, decl } from '@/lib';
import { type ImageType, BACKEND_URL } from '@/constants';

interface WrapProps {
  children: React.ReactNode;
  toShow?: number;
  className?: string;
}

interface ItemProps {
  image: Partial<ImageType> | null | undefined;
  id?: string;
  toShow?: number;
  index?: number;
  totalCount?: number;
  children?: React.ReactNode;
  className?: string;
}

function GalleryWrap({
  children,
  toShow,
  className,
}: WrapProps & { Item?: React.FC }) {
  return (
    <div className={cn(className, toShow)}>
      <Gallery>{children}</Gallery>
    </div>
  );
}

GalleryWrap.Item = function GalleryItem({
  image,
  id,
  toShow,
  index,
  totalCount,
  children,
  className,
}: ItemProps) {
  if (!image) {
    return null;
  }

  let isItemHidden: boolean;
  let isLastOfVisible: boolean;
  let hiddenCount: number;

  if (toShow && index && totalCount) {
    isItemHidden = index + 1 > toShow;
    isLastOfVisible = index + 1 === toShow;
    hiddenCount = totalCount - toShow;
  }

  return (
    <Item
      original={`${BACKEND_URL}${image.url}`}
      width={image.width}
      height={image.height}
    >
      {({ ref, open }) => {
        return (
          <a
            id={id}
            className={cn(
              'relative block overflow-hidden',
              className,
              isItemHidden && 'hidden',
            )}
            ref={ref as any}
            onClick={open}
          >
            {children}
            {isLastOfVisible && (
              <div className="bg-Secondary/Grey2/50 flex-center text-Primary/White Desktop/H4 absolute inset-0 px-4 text-center">
                Eще {hiddenCount}{' '}
                {decl(hiddenCount, [
                  'изображение',
                  'изображения',
                  'изображений',
                ])}
              </div>
            )}
          </a>
        );
      }}
    </Item>
  );
};

export default GalleryWrap;
