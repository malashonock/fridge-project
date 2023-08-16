import { mockFridges1 } from 'mocks/fridge.mocks';
import { FridgesActions } from './fridges.actions';

describe('UI action creators', () => {
  describe('fetchFridges action creator', () => {
    it('should create an action without payload', () => {
      const action = FridgesActions.fetchFridges();
      expect(action).toBeTruthy();
    });
  });

  describe('fetchFridgesSuccess action creator', () => {
    it('pass the payload in the namesake action property', () => {
      const action = FridgesActions.fetchFridgesSuccess({
        fridges: mockFridges1,
      });

      expect(action.fridges).toEqual(mockFridges1);
    });
  });

  describe('fetchFridgesFailure action creator', () => {
    it('pass the error in the namesake action property', () => {
      const action = FridgesActions.fetchFridgesFailure({
        error: 'Server error',
      });

      expect(action.error).toEqual('Server error');
    });
  });
});
