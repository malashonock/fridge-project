import { mockFridge1, mockFridge2 } from '@shell/mocks/fridge.mocks';
import { FridgesState } from './fridges.feature';
import {
  selectAllFridges,
  selectFridge,
  selectFridgeProducts,
  selectFridgeSubmitting,
} from './fridges.selectors';
import { mockProduct1, mockProduct2 } from '@shell/mocks/product.mocks';

describe('Fridges feature selectors', () => {
  describe('selectAllFridges', () => {
    it('should return the flattened array of fridges', () => {
      const mockFridgesState: FridgesState = {
        ids: [mockFridge1.id, mockFridge2.id],
        entities: {
          [mockFridge1.id]: mockFridge1,
          [mockFridge2.id]: mockFridge2,
        },
        submitting: [],
      };

      expect(selectAllFridges.projector(mockFridgesState)).toEqual([
        mockFridge1,
        mockFridge2,
      ]);
    });
  });

  describe('selectFridge', () => {
    it('should return the fridge from store by its id', () => {
      expect(selectFridge(mockFridge1.id).projector([mockFridge1])).toEqual(
        mockFridge1
      );
    });
  });

  describe('selectFridgeProducts', () => {
    it('given no fridge with the given id is found, should return undefined', () => {
      expect(
        selectFridgeProducts('invalid-id').projector(undefined, [
          mockProduct1,
          mockProduct2,
        ])
      ).toBeUndefined();
    });

    it('given a fridge with the given id is found, should return the products within', () => {
      const mockFridge = {
        ...mockFridge1,
        products: [
          {
            productId: mockProduct1.id,
            quantity: 1,
          },
        ],
      };

      expect(
        selectFridgeProducts(mockFridge.id).projector(mockFridge, [
          mockProduct1,
        ])
      ).toEqual([
        {
          product: mockProduct1,
          quantity: 1,
        },
      ]);
    });
  });

  describe('selectFridgeSubmitting', () => {
    it('for a given id, should return a boolean showing if it is submitting', () => {
      let mockFridgesState: FridgesState = {
        ids: [],
        entities: {},
        submitting: [mockFridge1.id],
      };
      expect(
        selectFridgeSubmitting(mockFridge1.id).projector(mockFridgesState)
      ).toBe(true);
      expect(selectFridgeSubmitting(null).projector(mockFridgesState)).toBe(
        false
      );
      expect(
        selectFridgeSubmitting(mockFridge2.id).projector(mockFridgesState)
      ).toBe(false);

      mockFridgesState = {
        ids: [],
        entities: {},
        submitting: [null],
      };
      expect(selectFridgeSubmitting(null).projector(mockFridgesState)).toBe(
        true
      );
      expect(
        selectFridgeSubmitting(mockFridge1.id).projector(mockFridgesState)
      ).toBe(false);
      expect(
        selectFridgeSubmitting(mockFridge2.id).projector(mockFridgesState)
      ).toBe(false);
    });
  });
});
