import {
  mockProduct1,
  mockProduct1Data,
  mockProducts1,
} from 'mocks/product.mocks';
import { ProductsActions } from './products.actions';

describe('UI action creators', () => {
  describe('fetchProducts action creator', () => {
    it('should create an action without payload', () => {
      const action = ProductsActions.fetchProducts();
      expect(action).toBeTruthy();
    });
  });

  describe('fetchProductsSuccess action creator', () => {
    it('pass the payload in the namesake action property', () => {
      const action = ProductsActions.fetchProductsSuccess({
        products: mockProducts1,
      });

      expect(action.products).toEqual(mockProducts1);
    });
  });

  describe('fetchProductsFailure action creator', () => {
    it('pass the error in the namesake action property', () => {
      const action = ProductsActions.fetchProductsFailure({
        error: 'Server error',
      });

      expect(action.error).toEqual('Server error');
    });
  });

  describe('createProduct action creator', () => {
    it('pass the payload in the namesake action property', () => {
      const action = ProductsActions.createProduct({
        productData: mockProduct1Data,
      });

      expect(action.productData).toEqual(mockProduct1Data);
    });
  });

  describe('createProductSuccess action creator', () => {
    it('pass the payload in the namesake action property', () => {
      const action = ProductsActions.createProductSuccess({
        product: mockProduct1,
      });

      expect(action.product).toEqual(mockProduct1);
    });
  });

  describe('createProductFailure action creator', () => {
    it('pass the error in the namesake action property', () => {
      const action = ProductsActions.createProductFailure({
        error: 'Server error',
      });

      expect(action.error).toEqual('Server error');
    });
  });

  describe('updateProduct action creator', () => {
    it('pass the payload in the namesake action property', () => {
      const action = ProductsActions.updateProduct({
        id: mockProduct1.id,
        productData: mockProduct1Data,
      });

      expect(action.id).toBe(mockProduct1.id);
      expect(action.productData).toEqual(mockProduct1Data);
    });
  });

  describe('updateProductSuccess action creator', () => {
    it('pass the payload in the namesake action property', () => {
      const action = ProductsActions.updateProductSuccess({
        product: mockProduct1,
      });

      expect(action.product).toEqual(mockProduct1);
    });
  });

  describe('updateProductFailure action creator', () => {
    it('pass the error in the namesake action property', () => {
      const action = ProductsActions.updateProductFailure({
        error: 'Server error',
      });

      expect(action.error).toEqual('Server error');
    });
  });

  describe('deleteProduct action creator', () => {
    it('pass the payload in the namesake action property', () => {
      const action = ProductsActions.deleteProduct({
        id: mockProduct1.id,
      });

      expect(action.id).toBe(mockProduct1.id);
    });
  });

  describe('deleteProductSuccess action creator', () => {
    it('pass the payload in the namesake action property', () => {
      const action = ProductsActions.deleteProductSuccess({
        id: mockProduct1.id,
      });

      expect(action.id).toEqual(mockProduct1.id);
    });
  });

  describe('deleteProductFailure action creator', () => {
    it('pass the error in the namesake action property', () => {
      const action = ProductsActions.deleteProductFailure({
        error: 'Server error',
      });

      expect(action.error).toEqual('Server error');
    });
  });
});
