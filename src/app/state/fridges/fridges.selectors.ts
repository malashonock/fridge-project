import { createSelector } from '@ngrx/store';

import { FridgesState, fridgesFeature } from './fridges.feature';
import { Fridge } from 'core/models/fridge/fridge.interface';

export const { selectFridgesState } = fridgesFeature;

export const selectAllFridges = createSelector(
  selectFridgesState,
  (state: FridgesState): Fridge[] => {
    return Object.values(state.entities) as Fridge[];
  }
);
