import type { ProductCategory } from '@/models/product-category';
import { ImageType } from '@/constants';

export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: ImageType | null;
  price: number;
  weight: number | null;
  categories: ProductCategory[];
  nutritionalValue: {
    energy: string | null;
    proteins: string | null;
    fats: string | null;
    carbohydrates: string | null;
  } | null;
  weekday:
    | 'Понедельник:1'
    | 'Вторник:2'
    | 'Среда:3'
    | 'Четверг:4'
    | 'Пятница:5'
    | 'Суббота:6'
    | 'Воскресенье:7';
};
