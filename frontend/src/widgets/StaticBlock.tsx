'use client';

import { Image, Gallery } from '@/ui';
import { ImageType } from '@/constants';

export default function StaticBlock({
  title,
  content,
  gallery,
}: {
  title: string;
  content: string;
  gallery: ImageType[] | null;
}) {
  return (
    <div className="md:my-19.5 my-25 container flex flex-col gap-12 overflow-hidden md:gap-9">
      <div className="ml-auto mr-[14.375rem] w-full max-w-[42.625rem] lg:mr-0">
        <h2 className="Desktop/H4 mb-7.5 md:mb-6">{title}</h2>
        <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      {gallery && (
        <Gallery className="grid grid-cols-3 justify-center gap-4 sm:grid-cols-1 md:gap-2">
          {gallery.map((image, idx, arr) => (
            <Gallery.Item
              className="aspect-[448/304] rounded-[2rem] sm:aspect-[343/232]"
              image={image}
              index={idx}
              totalCount={arr.length}
              toShow={3}
              key={image.id}
            >
              <Image data={image} />
            </Gallery.Item>
          ))}
        </Gallery>
      )}
    </div>
  );
}
