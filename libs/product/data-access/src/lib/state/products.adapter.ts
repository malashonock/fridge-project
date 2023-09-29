import { createEntityAdapter } from '@ngrx/entity';

import { Product } from 'product-domain';

export const productAdapter = createEntityAdapter<Product>();
