import { GeolocationCoords } from 'shared-feature-map';

import { Address } from './address.interface';
import { ProductQuantityDto } from './product-quantity-dto.interface';

export interface Fridge {
  id: string;
  model: string;
  imageUrl: string | null;
  description: string | null;
  address: Address;
  geolocation: GeolocationCoords;
  products: ProductQuantityDto[];
}
