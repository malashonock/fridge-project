import { createSelector } from '@ngrx/store';

import {
  ProductsState,
  SubmitStatus,
  productsFeature,
} from './products.feature';
import { Product } from 'core/models';

export const { selectProductsState } = productsFeature;

export const selectAllProducts = createSelector(
  selectProductsState,
  (state: ProductsState): Product[] => {
    return Object.values(state.entities) as Product[];
  }
);

export const selectProductSubmitStatus = (id: string | null) =>
  createSelector(
    selectProductsState,
    (state: ProductsState): SubmitStatus | undefined => {
      return state.submitting.find((status: SubmitStatus): boolean => {
        return status.id === id;
      });
    }
  );
