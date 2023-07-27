import { mockProduct1, mockProducts } from 'mocks/product.mocks';
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
        products: mockProducts,
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
});
