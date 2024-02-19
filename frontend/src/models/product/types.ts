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
    | 'a) Понедельник'
    | 'b) Вторник'
    | 'c) Среда'
    | 'd) Четверг'
    | 'e) Пятница'
    | 'f) Суббота'
    | 'd) Воскресенье';
  order: number;
};
