import {
  mockFridge1,
  mockFridge1Data,
  mockFridges1,
} from '@shell/mocks/fridge.mocks';
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

  describe('createFridge action creator', () => {
    it('pass the payload in the namesake action property', () => {
      const action = FridgesActions.createFridge({
        fridgeData: mockFridge1Data,
      });

      expect(action.fridgeData).toEqual(mockFridge1Data);
    });
  });

  describe('createFridgeSuccess action creator', () => {
    it('pass the payload in the namesake action property', () => {
      const action = FridgesActions.createFridgeSuccess({
        fridge: mockFridge1,
      });

      expect(action.fridge).toEqual(mockFridge1);
    });
  });

  describe('createFridgeFailure action creator', () => {
    it('pass the error in the namesake action property', () => {
      const action = FridgesActions.createFridgeFailure({
        error: 'Server error',
      });

      expect(action.error).toEqual('Server error');
    });
  });

  describe('updateFridge action creator', () => {
    it('pass the payload in the namesake action property', () => {
      const action = FridgesActions.updateFridge({
        id: mockFridge1.id,
        fridgeData: mockFridge1Data,
      });

      expect(action.id).toBe(mockFridge1.id);
      expect(action.fridgeData).toEqual(mockFridge1Data);
    });
  });

  describe('updateFridgeSuccess action creator', () => {
    it('pass the payload in the namesake action property', () => {
      const action = FridgesActions.updateFridgeSuccess({
        fridge: mockFridge1,
      });

      expect(action.fridge).toEqual(mockFridge1);
    });
  });

  describe('updateFridgeFailure action creator', () => {
    it('pass the error in the namesake action property', () => {
      const action = FridgesActions.updateFridgeFailure({
        id: mockFridge1.id,
        error: 'Server error',
      });

      expect(action.id).toBe(mockFridge1.id);
      expect(action.error).toEqual('Server error');
    });
  });

  describe('deleteFridge action creator', () => {
    it('pass the payload in the namesake action property', () => {
      const action = FridgesActions.deleteFridge({
        id: mockFridge1.id,
      });

      expect(action.id).toBe(mockFridge1.id);
    });
  });

  describe('deleteFridgeSuccess action creator', () => {
    it('pass the payload in the namesake action property', () => {
      const action = FridgesActions.deleteFridgeSuccess({
        id: mockFridge1.id,
      });

      expect(action.id).toEqual(mockFridge1.id);
    });
  });

  describe('deleteFridgeFailure action creator', () => {
    it('pass the error in the namesake action property', () => {
      const action = FridgesActions.deleteFridgeFailure({
        id: mockFridge1.id,
        error: 'Server error',
      });

      expect(action.id).toBe(mockFridge1.id);
      expect(action.error).toEqual('Server error');
    });
  });

  describe('submit action creator', () => {
    it('pass the payload in the namesake action property', () => {
      const action = FridgesActions.submit({
        id: mockFridge1.id,
      });

      expect(action.id).toBe(mockFridge1.id);
    });
  });

  describe('submitSuccess action creator', () => {
    it('pass the payload in the namesake action property', () => {
      const action = FridgesActions.submitSuccess({
        id: mockFridge1.id,
      });

      expect(action.id).toEqual(mockFridge1.id);
    });
  });

  describe('submitFailure action creator', () => {
    it('pass the payload in the namesake action property', () => {
      const action = FridgesActions.submitFailure({
        id: mockFridge1.id,
        error: 'Server error',
      });

      expect(action.id).toEqual(mockFridge1.id);
      expect(action.error).toEqual('Server error');
    });
  });
});
