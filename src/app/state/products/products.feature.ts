import { EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { ProductsActions } from './products.actions';

import { Product } from 'core/models';
import { ProductsActionReducers } from './products.reducers';

export interface SubmitStatus {
  id: string | null;
  error?: string;
}

export type ProductsState = EntityState<Product> & {
  submitting: SubmitStatus[];
};

export const initialState: ProductsState = {
  ids: [],
  entities: {},
  submitting: [],
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
    ),
    on(ProductsActions.submit, ProductsActionReducers.submitReducer),
    on(
      ProductsActions.submitSuccess,
      ProductsActionReducers.submitSuccessReducer
    ),
    on(
      ProductsActions.submitFailure,
      ProductsActionReducers.submitFailureReducer
    )
  ),
});
