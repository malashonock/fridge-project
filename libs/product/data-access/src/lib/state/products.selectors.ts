import { createSelector } from '@ngrx/store';

import { Product } from 'product-domain';

import { ProductsState, productsFeature } from './products.feature';

export const { selectProductsState } = productsFeature;

export const selectAllProducts = createSelector(
  selectProductsState,
  (state: ProductsState): Product[] => {
    return Object.values(state.entities) as Product[];
  }
);

export const selectProductSubmitting = (id: string | null) =>
  createSelector(selectProductsState, (state: ProductsState): boolean => {
    return state.submitting.includes(id);
  });
