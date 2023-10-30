// Modules
export * from './lib/product-data-access.module';

// Configs
export * from './lib/configs/nutrient.config';
export * from './lib/configs/periods.config';
export * from './lib/configs/product-categories.config';
export * from './lib/configs/weight-units.config';

// Store facade
export * from './lib/facade/product.facade';

// Shared store selectors
export { selectAllProducts } from './lib/state/products.selectors';
