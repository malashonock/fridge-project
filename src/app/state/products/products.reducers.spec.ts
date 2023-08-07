import { mockProduct1, mockProducts1 } from 'mocks/product.mocks';
import { ProductsActions } from './products.actions';
import { ProductsState } from './products.feature';
import { ProductsActionReducers } from './products.reducers';

describe('Products action reducers', () => {
  describe('fetchProductsSuccessReducer', () => {
    it('should return the products in payload', () => {
      const originalState: ProductsState = {
        ids: [],
        entities: {},
      };

      const action = ProductsActions.fetchProductsSuccess({
        products: mockProducts1,
      });

      const derivedState: ProductsState =
        ProductsActionReducers.fetchProductsSuccessReducer(
          originalState,
          action
        );

      expect(derivedState).toEqual({
        ids: [mockProduct1.id],
        entities: {
          [mockProduct1.id]: mockProduct1,
        },
      });
    });
  });

  describe('createProductSuccessReducer', () => {
    it('should add the created product to store', () => {
      const originalState: ProductsState = {
        ids: [],
        entities: {},
      };

      const action = ProductsActions.createProductSuccess({
        product: mockProduct1,
      });

      const derivedState: ProductsState =
        ProductsActionReducers.createProductSuccessReducer(
          originalState,
          action
        );

      expect(derivedState).toEqual({
        ids: [mockProduct1.id],
        entities: {
          [mockProduct1.id]: mockProduct1,
        },
      });
    });
  });

  describe('updateProductSuccessReducer', () => {
    it('should update the product in store', () => {
      const originalState: ProductsState = {
        ids: [mockProduct1.id],
        entities: {
          [mockProduct1.id]: mockProduct1,
        },
      };

      const action = ProductsActions.updateProductSuccess({
        product: {
          ...mockProduct1,
          name: 'Some other name',
        },
      });

      const derivedState: ProductsState =
        ProductsActionReducers.updateProductSuccessReducer(
          originalState,
          action
        );

      expect(derivedState).toEqual({
        ids: [mockProduct1.id],
        entities: {
          [mockProduct1.id]: {
            ...mockProduct1,
            name: 'Some other name',
          },
        },
      });
    });
  });

  describe('deleteProductSuccessReducer', () => {
    it('should delete the product from store', () => {
      const originalState: ProductsState = {
        ids: [mockProduct1.id],
        entities: {
          [mockProduct1.id]: mockProduct1,
        },
      };

      const action = ProductsActions.deleteProductSuccess({
        id: mockProduct1.id,
      });

      const derivedState: ProductsState =
        ProductsActionReducers.deleteProductSuccessReducer(
          originalState,
          action
        );

      expect(derivedState).toEqual({
        ids: [],
        entities: {},
      });
    });
  });
});
