import { mockFridge1, mockFridge2 } from 'mocks/fridge.mocks';
import { FridgesState } from './fridges.feature';
import { selectAllFridges, selectFridgeSubmitting } from './fridges.selectors';

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
