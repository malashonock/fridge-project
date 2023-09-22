import { createEntityAdapter } from '@ngrx/entity';

import { Fridge } from '../../../../models/fridge/fridge.interface';

export const fridgeAdapter = createEntityAdapter<Fridge>();
