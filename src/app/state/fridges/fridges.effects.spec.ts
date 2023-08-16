import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jest-marbles';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FridgesEffects } from './fridges.effects';
import { CoreModule } from 'core/core.module';
import { FridgeService } from 'core/services/fridge/fridge.service';
import { FridgesActions } from './fridges.actions';
import { mockFridges1 } from 'mocks/fridge.mocks';

describe('Fridges feature effects', () => {
  let actions$ = new Observable<Action>();
  let fridgeEffects: FridgesEffects;
  let fridgeService: FridgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, HttpClientTestingModule],
      providers: [FridgesEffects, provideMockActions(() => actions$)],
    });

    fridgeService = TestBed.inject(FridgeService);
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

      jest.spyOn(fridgeService, 'getFridges').mockReturnValue(
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
        .spyOn(fridgeService, 'getFridges')
        .mockReturnValue(cold('--#|', {}, new Error('Server error')));

      const expected = hot('---c', {
        c: FridgesActions.fetchFridgesFailure({ error: 'Server error' }),
      });

      expect(fridgeEffects.fetchFridges$).toBeObservable(expected);
    });
  });
});
