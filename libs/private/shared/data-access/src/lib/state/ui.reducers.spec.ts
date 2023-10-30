import { UiActions } from './ui.actions';
import { UiState } from './ui.feature';
import { UiActionReducers } from './ui.reducers';

describe('UI action reducers', () => {
  describe('toggleMobileModeReducer', () => {
    it('given a payload, should set mobile mode flag to given value', () => {
      const originalState: UiState = {
        mobileMode: false,
        showSideMenu: true,
      };

      const action = UiActions.toggleMobileMode({ mobileMode: true });

      const derivedState: UiState = UiActionReducers.toggleMobileModeReducer(
        originalState,
        action
      );

      expect(derivedState).toEqual({
        mobileMode: true,
        showSideMenu: true,
      });
    });

    it('given no payload, should invert mobile mode flag', () => {
      const originalState: UiState = {
        mobileMode: true,
        showSideMenu: false,
      };

      const action = UiActions.toggleMobileMode();

      const derivedState: UiState = UiActionReducers.toggleMobileModeReducer(
        originalState,
        action
      );

      expect(derivedState).toEqual({
        mobileMode: false,
        showSideMenu: false,
      });
    });
  });

  describe('toggleSideMenuReducer', () => {
    it('given a payload, should set show side menu flag to given value', () => {
      const originalState: UiState = {
        mobileMode: true,
        showSideMenu: false,
      };

      const action = UiActions.toggleSideMenu({ showSideMenu: true });

      const derivedState: UiState = UiActionReducers.toggleSideMenuReducer(
        originalState,
        action
      );

      expect(derivedState).toEqual({
        mobileMode: true,
        showSideMenu: true,
      });
    });

    it('given no payload, should invert show side menu flag', () => {
      const originalState: UiState = {
        mobileMode: true,
        showSideMenu: true,
      };

      const action = UiActions.toggleSideMenu();

      const derivedState: UiState = UiActionReducers.toggleSideMenuReducer(
        originalState,
        action
      );

      expect(derivedState).toEqual({
        mobileMode: true,
        showSideMenu: false,
      });
    });
  });
});
