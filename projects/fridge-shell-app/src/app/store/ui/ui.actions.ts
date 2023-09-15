import { createActionGroup } from '@ngrx/store';

export const UiActions = createActionGroup({
  source: 'UI',
  events: {
    'Toggle Mobile Mode': (payload?: { mobileMode: boolean }) => ({
      mobileMode: payload?.mobileMode,
    }),
    'Toggle Side Menu': (payload?: { showSideMenu: boolean }) => ({
      showSideMenu: payload?.showSideMenu,
    }),
  },
});