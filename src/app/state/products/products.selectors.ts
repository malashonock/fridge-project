import { createSelector } from '@ngrx/store';

import { ProductsState, productsFeature } from './products.feature';
import { Product } from 'core/models';

export const { selectProductsState } = productsFeature;

export const selectAllProducts = createSelector(
  selectProductsState,
  (state: ProductsState): Product[] => {
    return Object.values(state.entities) as Product[];
  }
);
