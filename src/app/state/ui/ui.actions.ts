import { createActionGroup, emptyProps } from '@ngrx/store';

export const UiActions = createActionGroup({
  source: 'UI',
  events: {
    'Enter Mobile Mode': emptyProps(),
    'Leave Mobile Mode': emptyProps(),
    'Open Side Menu': emptyProps(),
    'Close Side Menu': emptyProps(),
  },
});
