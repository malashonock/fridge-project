import { createEntityAdapter } from '@ngrx/entity';

import { Product } from 'core/models';

export const productAdapter = createEntityAdapter<Product>();
