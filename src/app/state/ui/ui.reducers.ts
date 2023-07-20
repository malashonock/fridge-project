import { OnReducer } from '@ngrx/store/src/reducer_creator';

import { UiState } from './ui.slice';
import { UiActions } from './ui.actions';

const enterMobileModeReducer: OnReducer<
  UiState,
  [typeof UiActions.enterMobileMode]
> = (state: UiState) => {
  return {
    ...state,
    mobileMode: true,
  };
};

const leaveMobileModeReducer: OnReducer<
  UiState,
  [typeof UiActions.leaveMobileMode]
> = (state: UiState) => {
  return {
    ...state,
    mobileMode: false,
  };
};

const openSideMenuReducer: OnReducer<
  UiState,
  [typeof UiActions.openSideMenu]
> = (state: UiState) => {
  return {
    ...state,
    showSideMenu: true,
  };
};

const closeSideMenuReducer: OnReducer<
  UiState,
  [typeof UiActions.closeSideMenu]
> = (state: UiState) => {
  return {
    ...state,
    showSideMenu: false,
  };
};

export const UiActionReducers = {
  enterMobileModeReducer,
  leaveMobileModeReducer,
  openSideMenuReducer,
  closeSideMenuReducer,
};
