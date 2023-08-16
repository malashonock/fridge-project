import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Fridge } from 'core/models/fridge/fridge.interface';

export const FridgesActions = createActionGroup({
  source: 'Fridges',
  events: {
    'Fetch Fridges': emptyProps(),
    'Fetch Fridges Success': props<{ fridges: Fridge[] }>(),
    'Fetch Fridges Failure': props<{ error: string }>(),
  },
});
