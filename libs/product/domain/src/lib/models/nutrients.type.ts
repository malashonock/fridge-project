import { Nutrient } from './nutrient.enum';

export type Nutrients = {
  [nutrient in Nutrient]: number | null;
};
