import { mockFridge1, mockFridge2 } from 'mocks/fridge.mocks';
import { FridgesState } from './fridges.feature';
import { selectAllFridges } from './fridges.selectors';

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
});
