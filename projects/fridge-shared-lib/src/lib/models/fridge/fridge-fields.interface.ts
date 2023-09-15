import { GeolocationCoords } from '@shared/models/location/geolocation-coords.interface';
import { Address } from '@shared/models/location/address.interface';
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
