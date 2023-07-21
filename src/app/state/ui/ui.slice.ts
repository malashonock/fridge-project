import { createFeature, createReducer, on } from '@ngrx/store';

import { UiActions } from './ui.actions';
import { UiActionReducers } from './ui.reducers';

export interface UiState {
  mobileMode: boolean;
  showSideMenu: boolean;
}

const initialState: UiState = {
  mobileMode: false,
  showSideMenu: true,
};

export const uiSlice = createFeature({
  name: 'ui',
  reducer: createReducer(
    initialState,
    on(UiActions.toggleMobileMode, UiActionReducers.toggleMobileModeReducer),
    on(UiActions.toggleSideMenu, UiActionReducers.toggleSideMenuReducer)
  ),
});
