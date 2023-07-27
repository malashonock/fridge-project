import { OnReducer } from '@ngrx/store/src/reducer_creator';
import { ProductsState } from './products.feature';
import { ProductsActions } from './products.actions';
import { productAdapter } from './products.adapter';

const fetchProductsSuccessReducer: OnReducer<
  ProductsState,
  [typeof ProductsActions.fetchProductsSuccess]
> = (state, { products }) => {
  return productAdapter.setAll(products, state);
};

export const ProductsActionReducers = {
  fetchProductsSuccessReducer,
};
