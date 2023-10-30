import { OnReducer } from '@ngrx/store/src/reducer_creator';

import { UiState } from './ui.feature';
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

const startLoadingReducer: OnReducer<
  UiState,
  [typeof UiActions.startLoading]
> = (state: UiState) => {
  return {
    ...state,
    loadingCount: state.loadingCount + 1,
  };
};

const finishLoadingReducer: OnReducer<
  UiState,
  [typeof UiActions.finishLoading]
> = (state: UiState) => {
  return {
    ...state,
    loadingCount: state.loadingCount - 1,
  };
};

export const UiActionReducers = {
  toggleMobileModeReducer,
  toggleSideMenuReducer,
  startLoadingReducer,
  finishLoadingReducer,
};
