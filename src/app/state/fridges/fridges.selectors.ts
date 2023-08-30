import { createSelector } from '@ngrx/store';

import { FridgesState, fridgesFeature } from './fridges.feature';
import { Fridge } from 'core/models/fridge/fridge.interface';
import { selectAllProducts } from '../products/products.selectors';
import { Product } from 'core/models/product/product.interface';
import { ProductQuantityDto } from 'core/models/fridge/product-quantity-dto.interface';
import { ProductQuantity } from 'core/models/fridge/product-quantity.interface';

export const { selectFridgesState } = fridgesFeature;

export const selectAllFridges = createSelector(
  selectFridgesState,
  (state: FridgesState): Fridge[] => {
    return Object.values(state.entities) as Fridge[];
  }
);

export const selectFridge = (id: string) =>
  createSelector(selectAllFridges, (fridges: Fridge[]): Fridge | undefined => {
    return fridges.find((fridge: Fridge): boolean => {
      return fridge.id === id;
    });
  });

export const selectFridgeProducts = (id: string) =>
  createSelector(
    selectFridge(id),
    selectAllProducts,
    (
      fridge: Fridge | undefined,
      products: Product[]
    ): ProductQuantity[] | undefined => {
      if (!fridge) {
        return undefined;
      }

      return fridge.products.map(
        ({ productId, quantity }: ProductQuantityDto): ProductQuantity => {
          const product = products.find((product: Product): boolean => {
            return product.id === productId;
          });

          return {
            product,
            quantity,
          };
        }
      );
    }
  );
