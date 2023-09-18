import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { FridgeFields } from '../../../../models/fridge/fridge-fields.interface';
import { Fridge } from '../../../../models/fridge/fridge.interface';

export const FridgesActions = createActionGroup({
  source: 'Fridges',
  events: {
    'Fetch Fridges': emptyProps(),
    'Fetch Fridges Success': props<{ fridges: Fridge[] }>(),
    'Fetch Fridges Failure': props<{ error: string }>(),
    'Create Fridge': props<{ fridgeData: FridgeFields }>(),
    'Create Fridge Success': props<{ fridge: Fridge }>(),
    'Create Fridge Failure': props<{ error: string }>(),
    'Update Fridge': props<{ id: string; fridgeData: FridgeFields }>(),
    'Update Fridge Success': props<{ fridge: Fridge }>(),
    'Update Fridge Failure': props<{ id: string; error: string }>(),
    'Delete Fridge': props<{ id: string }>(),
    'Delete Fridge Success': props<{ id: string }>(),
    'Delete Fridge Failure': props<{ id: string; error: string }>(),
    Submit: props<{ id: string | null }>(),
    'Submit Success': props<{ id: string | null }>(),
    'Submit Failure': props<{ id: string | null; error: string }>(),
  },
});
