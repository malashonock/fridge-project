import { UiActions } from './ui.actions';

describe('UI action creators', () => {
  describe('toggleMobileMode action creator', () => {
    it('given a valid payload, should create an action with the given mobile mode flag', () => {
      const action = UiActions.toggleMobileMode({
        mobileMode: true,
      });

      expect(action.mobileMode).toBe(true);
    });

    it('given NO payload, should create an action with the undefined mobile mode flag', () => {
      const action = UiActions.toggleMobileMode();

      expect(action.mobileMode).toBe(undefined);
    });
  });

  describe('toggleSideMenu action creator', () => {
    it('given a valid payload, should create an action with the given show side menu flag', () => {
      const action = UiActions.toggleSideMenu({
        showSideMenu: true,
      });

      expect(action.showSideMenu).toBe(true);
    });

    it('given NO payload, should create an action with the undefined show side menu flag', () => {
      const action = UiActions.toggleSideMenu();

      expect(action.showSideMenu).toBe(undefined);
    });
  });
});
