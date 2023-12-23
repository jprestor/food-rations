import { Image, Slider } from '@/ui';
import { type ImageType } from '@/constants';
import { api, cn } from '@/lib';

export const fetchSlider = async () => {
  const res = await api(`/banner-slider-items?populate=*&sort:rank:desc`);

  if (!res.ok) {
    throw new Error('Failed to fetch banner slider');
  }

  const resData: { data: { image: ImageType; link: string | null }[] } =
    await res.json();
  return resData.data;
};

async function BannerSlider() {
  const slides = await fetchSlider();

  return (
    <div className="overflow-hidden">
      <div className="container mb-20 sm:mb-12">
        <Slider
          className="carousel-overflow -mx-2.5"
          options={{ autoplay: true }}
        >
          {slides.map((i: any) => {
            return (
              <a
                className={cn(
                  '!block !px-[10px]',
                  i.link ? 'hover:opacity-80' : 'cursor-auto',
                )}
                href={i.link}
                key={i.id}
              >
                <div className="relative aspect-[3/1] sm:pb-[100%]">
                  <Image
                    className="rounded-2xl md:!hidden"
                    data={i.image}
                    format="full"
                    fill
                    priority
                  />
                  <Image
                    className="!hidden rounded-2xl md:!block"
                    data={i.imageMobile ? i.imageMobile : i.image}
                    fill
                    priority
                  />
                </div>
              </a>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

export default BannerSlider;
