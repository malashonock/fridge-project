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
  shelfLife: {
    days: 3,
  },
  imageUrl: '/images/sandwich-with-ham.png',
};

export const mockProduct2: Product = {
  id: '6',
  name: 'Chicken Caesar',
  category: ProductCategory.Salads,
  ingredients:
    'Cherry tomatoes, fried chicken fillet, Caesar sauce (mayonnaise, mustard, soy sauce, garlic), chicken eggs, romaine lettuce, mozzarella cheese, spinach, croutons',
  price: 9.9,
  weight: {
    value: 190,
    unit: UnitOfWeight.Grams,
  },
  nutrients: {
    protein: 19.2,
    fat: 15.9,
    carbs: 10.8,
  },
  kiloCalories: 256,
  shelfLife: {
    hours: 12,
  },
  imageUrl: '/images/chicken-caesar.png',
};

export const mockProducts1: Product[] = [mockProduct1];
export const mockProducts2: Product[] = [mockProduct1, mockProduct2];
