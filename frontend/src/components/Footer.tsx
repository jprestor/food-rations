import { Image, Link } from '@/ui';
import { fetchMisc } from '@/models/misc';
import { NAV } from '@/constants';

export default async function Footer() {
  const misc = await fetchMisc();
  const { menu, socials, settings } = misc;
  const { logo } = settings || {};

  return (
    <footer className="py-4 bg-primary text-primary-content md:py-7">
      <div className="container flex items-center gap-6 md:flex-col md:text-center">
        <div className="flex items-center gap-3">
          <Image className="w-10" data={logo} format="thumbnail" />
          <p>© {new Date().getFullYear()} Такие-Тыквы</p>
        </div>
        <div className="text-sm ml-auto flex gap-5 md:ml-0 md:flex-col">
          <Link className="opacity-90 hover:opacity-100" to={NAV.privacyPolicy}>
            Политика конфиденциальности
          </Link>
          <Link className="opacity-90 hover:opacity-100" to={NAV.publicOffer}>
            Публичная оферта
          </Link>
        </div>
        {socials && socials.length > 0 && (
          <nav className="flex gap-4">
            {socials.map((i) => (
              <Link to={i.link} target="_blank" key={i.id}>
                <Image data={i.image} format="thumbnail" />
              </Link>
            ))}
          </nav>
        )}
      </div>
    </footer>
  );
}
