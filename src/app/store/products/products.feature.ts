import { EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { ProductsActions } from './products.actions';
import { Product } from 'core/models/product/product.interface';
import { ProductsActionReducers } from './products.reducers';

export type ProductsState = EntityState<Product> & {
  submitting: (string | null)[];
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
      ProductsActions.submitFailure,
      ProductsActionReducers.submitFinishReducer
    )
  ),
});
