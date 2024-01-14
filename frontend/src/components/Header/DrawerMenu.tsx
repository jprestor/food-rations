'use client';

import { Drawer, Image, Link } from '@/ui';
import { useMisc, useMiscRef } from '@/models/misc';

export default function DrawerMenu({
  toggle,
  toggleStyle,
}: {
  toggle: React.ReactNode;
  toggleStyle?: string;
}) {
  const misc = useMisc();
  const { menu, socials, settings } = misc.data!;
  const { logo } = settings || {};
  const [phone] = useMiscRef('phone');

  return (
    <Drawer
      toggle={toggle}
      toggleStyle={toggleStyle}
      direction="left"
      closeOnRouteChange
      customIdSuffix="DrawerMenu"
    >
      <div className="flex flex-col">
        <Link className="mb-14 sm:mb-10 sm:w-36" to="/">
          <Image className="w-20" data={logo} format="thumbnail" />
        </Link>

        <ul className="mb-14 font-medium text-xl grid gap-7">
          {menu.map((i) => (
            <li className="link" key={i.id}>
              <Link to={i.url}>{i.name}</Link>
            </li>
          ))}
        </ul>

        <a
          className="text-lg font-semibold link mb-7 mt-auto"
          href={`tel:${phone}`}
        >
          {phone}
        </a>

        <div className="flex gap-3">
          {socials.map((i) => (
            <a
              className="hover:opacity-75"
              href={i.link}
              target="_blank"
              key={i.id}
            >
              <Image data={i.image} format="thumbnail" />
            </a>
          ))}
        </div>
      </div>
    </Drawer>
  );
}
