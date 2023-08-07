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
    ),
    on(
      ProductsActions.createProductSuccess,
      ProductsActionReducers.createProductSuccessReducer
    ),
    on(
      ProductsActions.updateProductSuccess,
      ProductsActionReducers.updateProductSuccessReducer
    ),
    on(
      ProductsActions.deleteProductSuccess,
      ProductsActionReducers.deleteProductSuccessReducer
    )
  ),
});
