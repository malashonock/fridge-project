import { Address } from './address.interface';
import { GeolocationCoords } from './geolocation-coords.interface';
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
