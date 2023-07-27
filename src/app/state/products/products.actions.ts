import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Product } from 'core/models';

export const ProductsActions = createActionGroup({
  source: 'Products',
  events: {
    'Fetch Products': emptyProps(),
    'Fetch Products Success': props<{ products: Product[] }>(),
    'Fetch Products Error': props<{ error: string }>(),
  },
});
