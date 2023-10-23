import { GeolocationCoords } from 'shared-feature-map';

import { Address } from './address.interface';
import { ProductQuantityDto } from './product-quantity-dto.interface';

export interface FridgeFields {
  model: string;
  description: string | null;
  address: Address;
  geolocation: GeolocationCoords;
  products: ProductQuantityDto[];
  imageUrl: string | null;
  image?: File | null;
}
