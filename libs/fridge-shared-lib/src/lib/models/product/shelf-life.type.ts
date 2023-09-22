import { Period } from './period.enum';

export type ShelfLife = {
  [period in Period]: number | null;
};
