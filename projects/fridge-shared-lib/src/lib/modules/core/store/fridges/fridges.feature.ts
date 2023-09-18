import { EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { Fridge } from '../../../../models/fridge/fridge.interface';
import { FridgesActions } from './fridges.actions';
import { FridgesActionReducers } from './fridges.reducers';

export type FridgesState = EntityState<Fridge> & {
  submitting: (string | null)[];
};

export const initialState: FridgesState = {
  ids: [],
  entities: {},
  submitting: [],
};

export const fridgesFeature = createFeature({
  name: 'fridges',
  reducer: createReducer(
    initialState,
    on(
      FridgesActions.fetchFridgesSuccess,
      FridgesActionReducers.fetchFridgesSuccessReducer
    ),
    on(
      FridgesActions.createFridgeSuccess,
      FridgesActionReducers.createFridgeSuccessReducer
    ),
    on(
      FridgesActions.updateFridgeSuccess,
      FridgesActionReducers.updateFridgeSuccessReducer
    ),
    on(
      FridgesActions.deleteFridgeSuccess,
      FridgesActionReducers.deleteFridgeSuccessReducer
    ),
    on(FridgesActions.submit, FridgesActionReducers.submitReducer),
    on(
      FridgesActions.submitSuccess,
      FridgesActions.submitFailure,
      FridgesActionReducers.submitFinishReducer
    )
  ),
});
