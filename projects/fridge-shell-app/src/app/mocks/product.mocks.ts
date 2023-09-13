import { Product } from '@shell/core/models/product/product.interface';
import { ProductCategory } from '@shell/core/models/product/product-category.enum';
import { ProductFields } from '@shell/core/models/product/product-fields.interface';
import { UnitOfWeight } from '@shell/core/models/product/unit-of-weight.enum';

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
    proteins: 14.4,
    fats: 21.6,
    carbs: 36.7,
  },
  kiloCalories: 396,
  shelfLife: {
    months: null,
    weeks: null,
    days: 3,
    hours: null,
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
    proteins: 19.2,
    fats: 15.9,
    carbs: 10.8,
  },
  kiloCalories: 256,
  shelfLife: {
    months: null,
    weeks: null,
    days: null,
    hours: 12,
  },
  imageUrl: '/images/chicken-caesar.png',
};

export const mockProducts1: Product[] = [mockProduct1];
export const mockProducts2: Product[] = [mockProduct1, mockProduct2];

export const mockProduct1Data: ProductFields = {
  name: mockProduct1.name,
  category: mockProduct1.category,
  price: mockProduct1.price,
  ingredients: mockProduct1.ingredients,
  nutrients: mockProduct1.nutrients,
  weight: mockProduct1.weight,
  kiloCalories: mockProduct1.kiloCalories,
  shelfLife: mockProduct1.shelfLife,
  imageUrl: 'blob:https://localhost:4200/abc-def',
  image: new File(['test'], 'test.txt'),
};
