import { createEntityAdapter } from '@ngrx/entity';

import { Fridge } from '@shared/models/fridge/fridge.interface';

export const fridgeAdapter = createEntityAdapter<Fridge>();
