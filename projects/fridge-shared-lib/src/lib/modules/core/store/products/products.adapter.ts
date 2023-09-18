import { createEntityAdapter } from '@ngrx/entity';

import { Product } from '../../../../models/product/product.interface';

export const productAdapter = createEntityAdapter<Product>();
