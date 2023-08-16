import { mockFridge1, mockFridges1 } from 'mocks/fridge.mocks';
import { FridgesActions } from './fridges.actions';
import { FridgesState } from './fridges.feature';
import { FridgesActionReducers } from './fridges.reducers';

describe('Fridges action reducers', () => {
  describe('fetchFridgesSuccessReducer', () => {
    it('should return the fridges in payload', () => {
      const originalState: FridgesState = {
        ids: [],
        entities: {},
        submitting: [],
      };

      const action = FridgesActions.fetchFridgesSuccess({
        fridges: mockFridges1,
      });

      const derivedState: FridgesState =
        FridgesActionReducers.fetchFridgesSuccessReducer(originalState, action);

      expect(derivedState).toEqual({
        ids: [mockFridge1.id],
        entities: {
          [mockFridge1.id]: mockFridge1,
        },
        submitting: [],
      });
    });
  });
});
