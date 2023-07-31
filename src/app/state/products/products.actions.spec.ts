import { mockProducts1 } from 'mocks/product.mocks';
import { ProductsActions } from './products.actions';

describe('UI action creators', () => {
  describe('fetchProducts action creator', () => {
    it('should create an action without payload', () => {
      const action = ProductsActions.fetchProducts();
      expect(action).toBeTruthy();
    });
  });

  describe('fetchProductsSuccess action creator', () => {
    it('given a valid payload, should create an action with the given show side menu flag', () => {
      const action = ProductsActions.fetchProductsSuccess({
        products: mockProducts1,
      });

      expect(action.products).toEqual(mockProducts1);
    });
  });
});
