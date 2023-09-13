import { createEntityAdapter } from '@ngrx/entity';

import { Fridge } from '@shell/core/models/fridge/fridge.interface';

export const fridgeAdapter = createEntityAdapter<Fridge>();
