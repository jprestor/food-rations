'use client';

import { Image, Gallery } from '@/ui';
import { ImageType } from '@/constants';

export default function GalleryWidget({
  images,
}: {
  images: ImageType[] | null;
}) {
  if (!images?.length) {
    return null;
  }

  return (
    <div className="container my-20 md:my-14" data-name="GalleryWidget">
      <Gallery className="grid grid-cols-3 justify-center gap-4 sm:grid-cols-1 md:gap-2">
        {images.map((image, idx, arr) => (
          <Gallery.Item
            className="aspect-[448/304] rounded-[2rem] sm:aspect-[343/232]"
            image={image}
            index={idx}
            totalCount={arr.length}
            toShow={3}
            key={image.id}
          >
            <Image data={image} fill />
          </Gallery.Item>
        ))}
      </Gallery>
    </div>
  );
}
