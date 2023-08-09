import { mockProduct1, mockProduct2 } from 'mocks/product.mocks';
import { ProductsState, SubmitStatus } from './products.feature';
import {
  selectAllProducts,
  selectProductSubmitStatus,
} from './products.selectors';

describe('Products feature selectors', () => {
  describe('selectAllProducts', () => {
    it('should return the flattened array of products', () => {
      const mockProductsState: ProductsState = {
        ids: [mockProduct1.id, mockProduct2.id],
        entities: {
          [mockProduct1.id]: mockProduct1,
          [mockProduct2.id]: mockProduct2,
        },
        submitting: [],
      };

      expect(selectAllProducts.projector(mockProductsState)).toEqual([
        mockProduct1,
        mockProduct2,
      ]);
    });
  });

  describe('selectProductSubmitStatus', () => {
    it('for a given id, should return its submit state, if any', () => {
      let mockProductSubmitStatus: SubmitStatus = { id: mockProduct1.id };
      let mockProductsState: ProductsState = {
        ids: [],
        entities: {},
        submitting: [mockProductSubmitStatus],
      };
      expect(
        selectProductSubmitStatus(mockProduct1.id).projector(mockProductsState)
      ).toEqual(mockProductSubmitStatus);
      expect(
        selectProductSubmitStatus(null).projector(mockProductsState)
      ).toBeUndefined();
      expect(
        selectProductSubmitStatus(mockProduct2.id).projector(mockProductsState)
      ).toBeUndefined();

      mockProductSubmitStatus = { id: null, error: 'Server error' };
      mockProductsState = {
        ids: [],
        entities: {},
        submitting: [mockProductSubmitStatus],
      };
      expect(
        selectProductSubmitStatus(null).projector(mockProductsState)
      ).toEqual(mockProductSubmitStatus);
      expect(
        selectProductSubmitStatus(mockProduct1.id).projector(mockProductsState)
      ).toBeUndefined();
      expect(
        selectProductSubmitStatus(mockProduct2.id).projector(mockProductsState)
      ).toBeUndefined();
    });
  });
});
