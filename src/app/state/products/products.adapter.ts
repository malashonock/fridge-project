import { createEntityAdapter } from '@ngrx/entity';

import { Product } from 'core/models/product/product.interface';

export const productAdapter = createEntityAdapter<Product>();
