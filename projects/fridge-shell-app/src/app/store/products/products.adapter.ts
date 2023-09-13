import { createEntityAdapter } from '@ngrx/entity';

import { Product } from '@shell/core/models/product/product.interface';

export const productAdapter = createEntityAdapter<Product>();
