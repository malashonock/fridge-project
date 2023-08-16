import { OnReducer } from '@ngrx/store/src/reducer_creator';

import { FridgesState } from './fridges.feature';
import { FridgesActions } from './fridges.actions';
import { fridgeAdapter } from './fridges.adapter';

const fetchFridgesSuccessReducer: OnReducer<
  FridgesState,
  [typeof FridgesActions.fetchFridgesSuccess]
> = (state, { fridges }) => {
  return fridgeAdapter.setAll(fridges, state);
};

export const FridgesActionReducers = {
  fetchFridgesSuccessReducer,
};
