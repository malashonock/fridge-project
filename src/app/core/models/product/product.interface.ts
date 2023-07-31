import { Nutrients } from './nutrients.interface';
import { ProductCategory } from './product-category.enum';
import { ProductWeight } from './product-weight.interface';
import { ShelfLife } from './shelf-life.interface';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  ingredients: string;
  price: number;
  weight: ProductWeight;
  nutrients: Nutrients;
  kiloCalories: number;
  shelfLife: ShelfLife;
  imageUrl: string;
}
