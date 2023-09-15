import { mockProduct1, mockProduct2 } from '@shared/mocks/product.mocks';
import { ProductsState } from './products.feature';
import {
  selectAllProducts,
  selectProductSubmitting,
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

  describe('selectProductSubmitting', () => {
    it('for a given id, should return a boolean showing if it is submitting', () => {
      let mockProductsState: ProductsState = {
        ids: [],
        entities: {},
        submitting: [mockProduct1.id],
      };
      expect(
        selectProductSubmitting(mockProduct1.id).projector(mockProductsState)
      ).toBe(true);
      expect(selectProductSubmitting(null).projector(mockProductsState)).toBe(
        false
      );
      expect(
        selectProductSubmitting(mockProduct2.id).projector(mockProductsState)
      ).toBe(false);

      mockProductsState = {
        ids: [],
        entities: {},
        submitting: [null],
      };
      expect(selectProductSubmitting(null).projector(mockProductsState)).toBe(
        true
      );
      expect(
        selectProductSubmitting(mockProduct1.id).projector(mockProductsState)
      ).toBe(false);
      expect(
        selectProductSubmitting(mockProduct2.id).projector(mockProductsState)
      ).toBe(false);
    });
  });
});
