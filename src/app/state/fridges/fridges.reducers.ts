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

const createFridgeSuccessReducer: OnReducer<
  FridgesState,
  [typeof FridgesActions.createFridgeSuccess]
> = (state, { fridge }) => {
  return fridgeAdapter.addOne(fridge, state);
};

const updateFridgeSuccessReducer: OnReducer<
  FridgesState,
  [typeof FridgesActions.updateFridgeSuccess]
> = (state, { fridge }) => {
  const { id, ...changes } = fridge;
  return fridgeAdapter.updateOne({ id, changes }, state);
};

const deleteFridgeSuccessReducer: OnReducer<
  FridgesState,
  [typeof FridgesActions.deleteFridgeSuccess]
> = (state, { id }) => {
  return fridgeAdapter.removeOne(id, state);
};

const submitReducer: OnReducer<FridgesState, [typeof FridgesActions.submit]> = (
  state,
  { id }
) => {
  return {
    ...state,
    submitting: [
      ...state.submitting.filter((submittingId: string | null): boolean => {
        return submittingId !== id;
      }),
      id,
    ],
  };
};

const submitFinishReducer: OnReducer<
  FridgesState,
  [typeof FridgesActions.submitSuccess, typeof FridgesActions.submitFailure]
> = (state, { id }) => {
  return {
    ...state,
    submitting: state.submitting.filter(
      (submittingId: string | null): boolean => {
        return submittingId !== id;
      }
    ),
  };
};

export const FridgesActionReducers = {
  fetchFridgesSuccessReducer,
  createFridgeSuccessReducer,
  updateFridgeSuccessReducer,
  deleteFridgeSuccessReducer,
  submitReducer,
  submitFinishReducer,
};
