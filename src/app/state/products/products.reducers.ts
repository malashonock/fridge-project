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

const createProductSuccessReducer: OnReducer<
  ProductsState,
  [typeof ProductsActions.createProductSuccess]
> = (state, { product }) => {
  return productAdapter.addOne(product, state);
};

const updateProductSuccessReducer: OnReducer<
  ProductsState,
  [typeof ProductsActions.updateProductSuccess]
> = (state, { product }) => {
  const { id, ...changes } = product;
  return productAdapter.updateOne({ id, changes }, state);
};

const deleteProductSuccessReducer: OnReducer<
  ProductsState,
  [typeof ProductsActions.deleteProductSuccess]
> = (state, { id }) => {
  return productAdapter.removeOne(id, state);
};

const submitReducer: OnReducer<
  ProductsState,
  [typeof ProductsActions.submit]
> = (state, { id }) => {
  return {
    ...state,
    submitting: [
      ...state.submitting.filter((submittingId: string | null): boolean => {
        return submittingId !== id;
      }),
      id,
    ],
  };
};

const submitFinishReducer: OnReducer<
  ProductsState,
  [typeof ProductsActions.submitSuccess, typeof ProductsActions.submitFailure]
> = (state, { id }) => {
  return {
    ...state,
    submitting: state.submitting.filter(
      (submittingId: string | null): boolean => {
        return submittingId !== id;
      }
    ),
  };
};

export const ProductsActionReducers = {
  fetchProductsSuccessReducer,
  createProductSuccessReducer,
  updateProductSuccessReducer,
  deleteProductSuccessReducer,
  submitReducer,
  submitFinishReducer,
};
