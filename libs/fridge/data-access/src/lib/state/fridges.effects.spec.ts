import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jest-marbles';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import {
  mockFridge1,
  mockFridge1Data,
  mockFridges1,
} from 'fridge-util-testing';
import { FormDataService } from 'shared-util-forms';

import { FridgeRepository } from '../repository/fridge.repository';
import { FridgesActions } from './fridges.actions';
import { FridgesEffects } from './fridges.effects';

describe('Fridges feature effects', () => {
  let actions$ = new Observable<Action>();
  let fridgeEffects: FridgesEffects;
  let fridgeRepository: FridgeRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FridgesEffects,
        FridgeRepository,
        FormDataService,
        provideMockActions(() => actions$),
      ],
    });

    fridgeRepository = TestBed.inject(FridgeRepository);
    fridgeEffects = TestBed.inject(FridgesEffects);
  });

  describe('fetchFridges$ effect', () => {
    it('should react only to fetchFridges action', () => {
      actions$ = hot('-a-', {
        a: FridgesActions.fetchFridgesSuccess({ fridges: mockFridges1 }),
      });

      const expected = hot('---', {});

      expect(fridgeEffects.fetchFridges$).toBeObservable(expected);
    });

    it('given fridges service returns a valid payload, should trigger a fetchFridgesSuccess action', () => {
      actions$ = hot('-a-', {
        a: FridgesActions.fetchFridges(),
      });

      jest.spyOn(fridgeRepository, 'getFridges').mockReturnValue(
        cold('--b|', {
          b: mockFridges1,
        })
      );

      const expected = hot('---c', {
        c: FridgesActions.fetchFridgesSuccess({ fridges: mockFridges1 }),
      });

      expect(fridgeEffects.fetchFridges$).toBeObservable(expected);
    });

    it('given fridges service returns an error, should trigger a fetchFridgesFailure action', () => {
      actions$ = hot('-a-', {
        a: FridgesActions.fetchFridges(),
      });

      jest
        .spyOn(fridgeRepository, 'getFridges')
        .mockReturnValue(cold('--#|', {}, new Error('Server error')));

      const expected = hot('---c', {
        c: FridgesActions.fetchFridgesFailure({ error: 'Server error' }),
      });

      expect(fridgeEffects.fetchFridges$).toBeObservable(expected);
    });
  });

  describe('createFridge$ effect', () => {
    it('should react only to createFridge action', () => {
      actions$ = hot('-a-', {
        a: FridgesActions.fetchFridges(),
      });

      const expected = hot('---', {});

      expect(fridgeEffects.createFridge$).toBeObservable(expected);
    });

    it('given fridges service returns a valid payload, should trigger a createFridgeSuccess action', () => {
      actions$ = hot('-a-', {
        a: FridgesActions.createFridge({ fridgeData: mockFridge1Data }),
      });

      jest.spyOn(fridgeRepository, 'createFridge').mockReturnValue(
        cold('--b|', {
          b: mockFridge1,
        })
      );

      const expected = hot('---c', {
        c: FridgesActions.createFridgeSuccess({ fridge: mockFridge1 }),
      });

      expect(fridgeEffects.createFridge$).toBeObservable(expected);
    });

    it('given fridges service returns an error, should trigger a createFridgeFailure action', () => {
      actions$ = hot('-a-', {
        a: FridgesActions.createFridge({ fridgeData: mockFridge1Data }),
      });

      jest
        .spyOn(fridgeRepository, 'createFridge')
        .mockReturnValue(cold('--#|', {}, new Error('Server error')));

      const expected = hot('---c', {
        c: FridgesActions.createFridgeFailure({ error: 'Server error' }),
      });

      expect(fridgeEffects.createFridge$).toBeObservable(expected);
    });
  });

  describe('updateFridge$ effect', () => {
    it('should react only to updateFridge action', () => {
      actions$ = hot('-a-', {
        a: FridgesActions.fetchFridges(),
      });

      const expected = hot('---', {});

      expect(fridgeEffects.updateFridge$).toBeObservable(expected);
    });

    it('given fridges service returns a valid payload, should trigger a updateFridgeSuccess action', () => {
      actions$ = hot('-a-', {
        a: FridgesActions.updateFridge({
          id: mockFridge1.id,
          fridgeData: mockFridge1Data,
        }),
      });

      jest.spyOn(fridgeRepository, 'updateFridge').mockReturnValue(
        cold('--b|', {
          b: mockFridge1,
        })
      );

      const expected = hot('---c', {
        c: FridgesActions.updateFridgeSuccess({ fridge: mockFridge1 }),
      });

      expect(fridgeEffects.updateFridge$).toBeObservable(expected);
    });

    it('given fridges service returns an error, should trigger a updateFridgeFailure action', () => {
      actions$ = hot('-a-', {
        a: FridgesActions.updateFridge({
          id: mockFridge1.id,
          fridgeData: mockFridge1Data,
        }),
      });

      jest
        .spyOn(fridgeRepository, 'updateFridge')
        .mockReturnValue(cold('--#|', {}, new Error('Server error')));

      const expected = hot('---c', {
        c: FridgesActions.updateFridgeFailure({
          id: mockFridge1.id,
          error: 'Server error',
        }),
      });

      expect(fridgeEffects.updateFridge$).toBeObservable(expected);
    });
  });

  describe('deleteFridge$ effect', () => {
    it('should react only to deleteFridge action', () => {
      actions$ = hot('-a-', {
        a: FridgesActions.fetchFridges(),
      });

      const expected = hot('---', {});

      expect(fridgeEffects.deleteFridge$).toBeObservable(expected);
    });

    it('given fridges service returns a valid payload, should trigger a deleteFridgeSuccess action', () => {
      actions$ = hot('-a-', {
        a: FridgesActions.deleteFridge({
          id: mockFridge1.id,
        }),
      });

      jest.spyOn(fridgeRepository, 'deleteFridge').mockReturnValue(
        cold('--b|', {
          b: mockFridge1,
        })
      );

      const expected = hot('---c', {
        c: FridgesActions.deleteFridgeSuccess({ id: mockFridge1.id }),
      });

      expect(fridgeEffects.deleteFridge$).toBeObservable(expected);
    });

    it('given fridges service returns an error, should trigger a deleteFridgeFailure action', () => {
      actions$ = hot('-a-', {
        a: FridgesActions.deleteFridge({
          id: mockFridge1.id,
        }),
      });

      jest
        .spyOn(fridgeRepository, 'deleteFridge')
        .mockReturnValue(cold('--#|', {}, new Error('Server error')));

      const expected = hot('---c', {
        c: FridgesActions.deleteFridgeFailure({
          id: mockFridge1.id,
          error: 'Server error',
        }),
      });

      expect(fridgeEffects.deleteFridge$).toBeObservable(expected);
    });
  });

  describe('submit effects', () => {
    it('should dispatch submit action on createFridge', () => {
      actions$ = hot('-a-', {
        a: FridgesActions.createFridge({
          fridgeData: mockFridge1Data,
        }),
      });

      const expected = hot('-b-', {
        b: FridgesActions.submit({
          id: null,
        }),
      });

      expect(fridgeEffects.submitCreateFridge$).toBeObservable(expected);
    });

    it('should dispatch submit action on updateFridge', () => {
      actions$ = hot('-a-', {
        a: FridgesActions.updateFridge({
          id: mockFridge1.id,
          fridgeData: mockFridge1Data,
        }),
      });

      const expected = hot('-b-', {
        b: FridgesActions.submit({
          id: mockFridge1.id,
        }),
      });

      expect(fridgeEffects.submitUpdateFridge$).toBeObservable(expected);
    });

    it('should dispatch submit action on deleteFridge', () => {
      actions$ = hot('-a-', {
        a: FridgesActions.deleteFridge({
          id: mockFridge1.id,
        }),
      });

      const expected = hot('-b-', {
        b: FridgesActions.submit({
          id: mockFridge1.id,
        }),
      });

      expect(fridgeEffects.submitDeleteFridge$).toBeObservable(expected);
    });

    it('should dispatch submitSuccess action on createFridgeSuccess', () => {
      actions$ = hot('-a-', {
        a: FridgesActions.createFridgeSuccess({
          fridge: mockFridge1,
        }),
      });

      const expected = hot('-b-', {
        b: FridgesActions.submitSuccess({
          id: null,
        }),
      });

      expect(fridgeEffects.submitCreateFridgeSuccess$).toBeObservable(expected);
    });

    it('should dispatch submitSuccess action on updateFridgeSuccess', () => {
      actions$ = hot('-a-', {
        a: FridgesActions.updateFridgeSuccess({
          fridge: mockFridge1,
        }),
      });

      const expected = hot('-b-', {
        b: FridgesActions.submitSuccess({
          id: mockFridge1.id,
        }),
      });

      expect(fridgeEffects.submitUpdateFridgeSuccess$).toBeObservable(expected);
    });

    it('should dispatch submitSuccess action on deleteFridgeSuccess', () => {
      actions$ = hot('-a-', {
        a: FridgesActions.deleteFridgeSuccess({
          id: mockFridge1.id,
        }),
      });

      const expected = hot('-b-', {
        b: FridgesActions.submitSuccess({
          id: mockFridge1.id,
        }),
      });

      expect(fridgeEffects.submitDeleteFridgeSuccess$).toBeObservable(expected);
    });

    it('should dispatch submitFailure action on createFridgeFailure', () => {
      actions$ = hot('-a-', {
        a: FridgesActions.createFridgeFailure({
          error: 'Server error',
        }),
      });

      const expected = hot('-b-', {
        b: FridgesActions.submitFailure({
          id: null,
          error: 'Server error',
        }),
      });

      expect(fridgeEffects.submitCreateFridgeFailure$).toBeObservable(expected);
    });

    it('should dispatch submitFailure action on updateFridgeFailure', () => {
      actions$ = hot('-a-', {
        a: FridgesActions.updateFridgeFailure({
          id: mockFridge1.id,
          error: 'Server error',
        }),
      });

      const expected = hot('-b-', {
        b: FridgesActions.submitFailure({
          id: mockFridge1.id,
          error: 'Server error',
        }),
      });

      expect(fridgeEffects.submitUpdateFridgeFailure$).toBeObservable(expected);
    });

    it('should dispatch submitFailure action on deleteFridgeFailure', () => {
      actions$ = hot('-a-', {
        a: FridgesActions.deleteFridgeFailure({
          id: mockFridge1.id,
          error: 'Server error',
        }),
      });

      const expected = hot('-b-', {
        b: FridgesActions.submitFailure({
          id: mockFridge1.id,
          error: 'Server error',
        }),
      });

      expect(fridgeEffects.submitDeleteFridgeFailure$).toBeObservable(expected);
    });
  });
});
