import { createFeature, createReducer, on } from '@ngrx/store';

import { UiActions } from './ui.actions';
import { UiActionReducers } from './ui.reducers';

export interface UiState {
  mobileMode: boolean;
  showSideMenu: boolean;
  loadingCount: number;
}

export const initialState: UiState = {
  mobileMode: false,
  showSideMenu: true,
  loadingCount: 0,
};

export const uiFeature = createFeature({
  name: 'ui',
  reducer: createReducer(
    initialState,
    on(UiActions.toggleMobileMode, UiActionReducers.toggleMobileModeReducer),
    on(UiActions.toggleSideMenu, UiActionReducers.toggleSideMenuReducer),
    on(UiActions.startLoading, UiActionReducers.startLoadingReducer),
    on(UiActions.finishLoading, UiActionReducers.finishLoadingReducer)
  ),
});
