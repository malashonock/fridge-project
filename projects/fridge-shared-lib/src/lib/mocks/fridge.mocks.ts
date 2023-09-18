import { FridgeFields } from '../models/fridge/fridge-fields.interface';
import { Fridge } from '../models/fridge/fridge.interface';

export const mockFridge1: Fridge = {
  id: '1',
  model: 'Briskly M5',
  imageUrl: '/images/briskly-m5.png',
  description: 'Business center "Krasavik", 3rd floor, kitchen',
  address: {
    country: 'Belarus',
    city: 'Minsk',
    street: 'Zhukava Ave.',
    buildingNo: '29',
    floorNo: 3,
    roomNo: '321',
  },
  geolocation: {
    latitude: 53.88488,
    longitude: 27.50476,
  },
  products: [
    {
      productId: '1',
      quantity: 5,
    },
    {
      productId: '2',
      quantity: 5,
    },
    {
      productId: '3',
      quantity: 5,
    },
  ],
};

export const mockFridge2: Fridge = {
  id: '2',
  model: 'Briskly M7',
  imageUrl: '/images/briskly-m7.png',
  description: 'Trade center "Globo", 1st floor, food court',
  address: {
    country: 'Belarus',
    city: 'Minsk',
    street: 'Umanskaya St.',
    buildingNo: '54',
    floorNo: 1,
    roomNo: null,
  },
  geolocation: {
    latitude: 53.87529,
    longitude: 27.49829,
  },
  products: [
    {
      productId: '4',
      quantity: 7,
    },
    {
      productId: '5',
      quantity: 7,
    },
    {
      productId: '6',
      quantity: 7,
    },
  ],
};

export const mockFridges1: Fridge[] = [mockFridge1];
export const mockFridges2: Fridge[] = [mockFridge1, mockFridge2];

export const mockFridge1Data: FridgeFields = {
  model: mockFridge1.model,
  description: mockFridge1.description,
  address: mockFridge1.address,
  geolocation: mockFridge1.geolocation,
  products: mockFridge1.products,
  imageUrl: 'blob:https://localhost:4200/abc-def',
  image: new File(['test'], 'test.png'),
};
