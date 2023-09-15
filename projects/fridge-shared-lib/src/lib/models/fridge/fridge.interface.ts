import { Address } from '@shared/models/location/address.interface';
import { GeolocationCoords } from '@shared/models/location/geolocation-coords.interface';
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
