import { Product, ProductCategory, UnitOfWeight } from 'core/models';

export const mockProduct1: Product = {
  id: '5',
  name: 'Cold sandwich with ham',
  category: ProductCategory.Snacks,
  ingredients:
    'Harris bread wheat-bran, ham, mozzarella cheese, tomatoes, Chinese cabbage, parsley, mayonnaise',
  price: 6.9,
  weight: {
    value: 180,
    unit: UnitOfWeight.Grams,
  },
  nutrients: {
    protein: 14.4,
    fat: 21.6,
    carbs: 36.7,
  },
  kiloCalories: 396,
  shelfLife: '3d',
  imageUrl: '/images/sandwich-with-ham.png',
};

export const mockProducts: Product[] = [mockProduct1];
