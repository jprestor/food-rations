'use client';

import DrawerMenu from './DrawerMenu';
import CabinetLink from './CabinetLink';
import DeliveryAddressModal from '@/components/DeliveryAddressModal';
import { Link, Svg, Image } from '@/ui';
import { useCart } from '@/models/cart';
import { useOrderPrices } from '@/models/order';
import { useMisc, useMiscRef } from '@/models/misc';
import { cn } from '@/lib';
import { NAV } from '@/constants';

export default function TopLine() {
  const prices = useOrderPrices();
  const cart = useCart();
  const emptyCart = !cart.data?.items?.length;
  const [phone] = useMiscRef('phone');
  const misc = useMisc();
  const { settings } = misc?.data || {};

  return (
    <div className="container flex items-center pt-5 pb-2">
      <Link className="mr-5 w-10" to="/">
        <Image data={settings?.logo} />
      </Link>

      <div className="ml-auto flex items-center">
        <a
          className="link text-xl font-semibold mr-7 lg:hidden"
          href={`tel:${phone}`}
        >
          {phone}
        </a>

        <div className="flex items-center gap-3 mr-7">
          <DeliveryAddressModal />
          <CabinetLink />
          <Link
            to={NAV.checkout}
            className={cn(
              'bg-primary flex h-10 gap-1.5 items-center justify-center rounded-2xl px-2.5 text-base-100 hover:bg-primary',
              emptyCart && 'px-2',
            )}
          >
            <Svg id="cart" width="24" height="24" />
            {prices?.totalPrice && (
              <span className="sm:hidden">{prices.totalPrice} ₽</span>
            )}
          </Link>
        </div>

        <DrawerMenu
          toggle={
            <a className="link" id="menu-drawer-toggle">
              <Svg id="burger" width="22" height="13" />
            </a>
          }
        />
      </div>
    </div>
  );
}
