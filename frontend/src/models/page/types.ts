import { MetaComponent, DynamicZone } from '@/constants';

export type Page = {
  id: number;
  name: string;
  slug: string;
  title: string | null;
  shortDescription: string | null;
  description: string | null;
  meta: MetaComponent;
  dynamicZone: DynamicZone;
};
