import { EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { ProductsActions } from './products.actions';

import { Product } from 'core/models';
import { ProductsActionReducers } from './products.reducers';

export type ProductsState = EntityState<Product>;

export const initialState: ProductsState = {
  ids: [],
  entities: {},
};

export const productsFeature = createFeature({
  name: 'products',
  reducer: createReducer(
    initialState,
    on(
      ProductsActions.fetchProductsSuccess,
      ProductsActionReducers.fetchProductsSuccessReducer
    )
  ),
});
