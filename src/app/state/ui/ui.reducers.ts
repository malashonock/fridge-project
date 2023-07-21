import { OnReducer } from '@ngrx/store/src/reducer_creator';

import { UiState } from './ui.slice';
import { UiActions } from './ui.actions';

const toggleMobileModeReducer: OnReducer<
  UiState,
  [typeof UiActions.toggleMobileMode]
> = (state: UiState, { mobileMode }) => {
  return {
    ...state,
    mobileMode: mobileMode ?? !state.mobileMode,
  };
};

const toggleSideMenuReducer: OnReducer<
  UiState,
  [typeof UiActions.toggleSideMenu]
> = (state: UiState, { showSideMenu }) => {
  return {
    ...state,
    showSideMenu: showSideMenu ?? !state.showSideMenu,
  };
};

export const UiActionReducers = {
  toggleMobileModeReducer,
  toggleSideMenuReducer,
};
