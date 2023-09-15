import { createEntityAdapter } from '@ngrx/entity';

import { Product } from '@shared/models/product/product.interface';

export const productAdapter = createEntityAdapter<Product>();
