import { createSelector } from '@ngrx/store';

import { Fridge, ProductQuantity, ProductQuantityDto } from 'fridge-domain';
import { Product } from 'product-domain';
import { selectAllProducts } from 'product-data-access';

import { FridgesState, fridgesFeature } from './fridges.feature';

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

export const selectFridgeSubmitting = (id: string | null) =>
  createSelector(selectFridgesState, (state: FridgesState): boolean => {
    return state.submitting.includes(id);
  });
