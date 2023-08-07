import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Product, ProductFields } from 'core/models';

export const ProductsActions = createActionGroup({
  source: 'Products',
  events: {
    'Fetch Products': emptyProps(),
    'Fetch Products Success': props<{ products: Product[] }>(),
    'Fetch Products Failure': props<{ error: string }>(),
    'Create Product': props<{ productData: ProductFields }>(),
    'Create Product Success': props<{ product: Product }>(),
    'Create Product Failure': props<{ error: string }>(),
    'Update Product': props<{ id: string; productData: ProductFields }>(),
    'Update Product Success': props<{ product: Product }>(),
    'Update Product Failure': props<{ error: string }>(),
    'Delete Product': props<{ id: string }>(),
    'Delete Product Success': props<{ id: string }>(),
    'Delete Product Failure': props<{ error: string }>(),
  },
});
