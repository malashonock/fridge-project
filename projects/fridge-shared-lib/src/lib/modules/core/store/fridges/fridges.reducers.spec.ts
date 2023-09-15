import { mockFridge1, mockFridges1 } from '@shared/mocks/fridge.mocks';
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

  describe('createFridgeSuccessReducer', () => {
    it('should add the created fridge to store', () => {
      const originalState: FridgesState = {
        ids: [],
        entities: {},
        submitting: [],
      };

      const action = FridgesActions.createFridgeSuccess({
        fridge: mockFridge1,
      });

      const derivedState: FridgesState =
        FridgesActionReducers.createFridgeSuccessReducer(originalState, action);

      expect(derivedState).toEqual({
        ids: [mockFridge1.id],
        entities: {
          [mockFridge1.id]: mockFridge1,
        },
        submitting: [],
      });
    });
  });

  describe('updateFridgeSuccessReducer', () => {
    it('should update the fridge in store', () => {
      const originalState: FridgesState = {
        ids: [mockFridge1.id],
        entities: {
          [mockFridge1.id]: mockFridge1,
        },
        submitting: [],
      };

      const action = FridgesActions.updateFridgeSuccess({
        fridge: {
          ...mockFridge1,
          model: 'Some other model',
        },
      });

      const derivedState: FridgesState =
        FridgesActionReducers.updateFridgeSuccessReducer(originalState, action);

      expect(derivedState).toEqual({
        ids: [mockFridge1.id],
        entities: {
          [mockFridge1.id]: {
            ...mockFridge1,
            model: 'Some other model',
          },
        },
        submitting: [],
      });
    });
  });

  describe('deleteFridgeSuccessReducer', () => {
    it('should delete the fridge from store', () => {
      const originalState: FridgesState = {
        ids: [mockFridge1.id],
        entities: {
          [mockFridge1.id]: mockFridge1,
        },
        submitting: [],
      };

      const action = FridgesActions.deleteFridgeSuccess({
        id: mockFridge1.id,
      });

      const derivedState: FridgesState =
        FridgesActionReducers.deleteFridgeSuccessReducer(originalState, action);

      expect(derivedState).toEqual({
        ids: [],
        entities: {},
        submitting: [],
      });
    });
  });

  describe('submitReducer', () => {
    it('should add the id being submitted to submitting array', () => {
      const originalState: FridgesState = {
        ids: [],
        entities: {},
        submitting: [],
      };

      const action = FridgesActions.submit({
        id: mockFridge1.id,
      });

      const derivedState: FridgesState = FridgesActionReducers.submitReducer(
        originalState,
        action
      );

      expect(derivedState).toEqual({
        ids: [],
        entities: {},
        submitting: [mockFridge1.id],
      });
    });

    it('should not create duplicates', () => {
      const originalState: FridgesState = {
        ids: [],
        entities: {},
        submitting: [mockFridge1.id],
      };

      const action = FridgesActions.submit({
        id: mockFridge1.id,
      });

      const derivedState: FridgesState = FridgesActionReducers.submitReducer(
        originalState,
        action
      );

      expect(derivedState).toEqual({
        ids: [],
        entities: {},
        submitting: [mockFridge1.id],
      });
    });
  });

  describe('submitFinishReducer', () => {
    it('should remove the submitted id from submitting array', () => {
      const originalState: FridgesState = {
        ids: [],
        entities: {},
        submitting: [mockFridge1.id],
      };

      const action = FridgesActions.submitSuccess({
        id: mockFridge1.id,
      });

      const derivedState: FridgesState =
        FridgesActionReducers.submitFinishReducer(originalState, action);

      expect(derivedState).toEqual({
        ids: [],
        entities: {},
        submitting: [],
      });
    });
  });
});
