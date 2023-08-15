import { Nutrients } from './nutrients.type';
import { ProductCategory } from './product-category.enum';
import { ProductWeight } from './product-weight.interface';
import { ShelfLife } from './shelf-life.interface';

export interface ProductFields {
  name: string;
  category: ProductCategory;
  price: number;
  ingredients: string | null;
  weight: ProductWeight | null;
  nutrients: Nutrients | null;
  kiloCalories: number | null;
  shelfLife: ShelfLife | null;
  imageUrl: string | null;
  image?: File | null;
}
