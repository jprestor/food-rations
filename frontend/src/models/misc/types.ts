import { ImageType } from '@/constants';

export type MenuItem = {
  id: number;
  name: string;
  url: string;
  icon: ImageType | null;
  isInHeader: boolean;
  isInFooter: boolean;
};

export type Social = {
  id: number;
  name: string;
  link: string;
  image: ImageType;
};

export type Settings = {
  siteName: string | null;
  themeColor: string | null;
  favicon: ImageType | null;
  logo: ImageType | null;
} | null;

export type Ref = {
  id: number;
  name: string | null;
  slug: string;
  json: string | null;
  fields: { id: number; value: string | null }[];
};

export type Metrics = {
  yandexId: string | null;
  googleId: string | null;
  jsCode: string | null;
} | null;

export type DeliveryData = {
  zonePrices: {
    id: number;
    name: string;
    polygon: number[];
    cost: number;
    color: string;
  }[];
  cartAmountForDeliveryDiscount: number;
  deliveryDiscount: number;
  mapCenter: string;
} | null;

export type Misc = {
  menu: MenuItem[];
  socials: Social[];
  refs: Ref[];
  settings: Settings;
  deliveryData: DeliveryData;
  metrics: Metrics;
};
