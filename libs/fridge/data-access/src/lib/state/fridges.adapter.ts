import { createEntityAdapter } from '@ngrx/entity';

import { Fridge } from 'fridge-domain';

export const fridgeAdapter = createEntityAdapter<Fridge>();
