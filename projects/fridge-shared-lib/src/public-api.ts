/*
 * Public API Surface of fridge-shared-lib
 */

// Modules
export { CoreModule } from './lib/modules/core/core.module';
export { LayoutModule } from './lib/modules/layout/layout.module';
export { GeolocationModule } from './lib/modules/geolocation/geolocation.module';
export { FileUploadModule } from './lib/modules/file-upload/file-upload.module';
export { MaterialModule } from './lib/modules/material/material.module';

// Components
export { LayoutComponent } from './lib/modules/layout/components/layout/layout.component';
export { ConfirmDeleteComponent } from './lib/components/confirm-delete/confirm-delete.component';
export { CounterInputComponent } from './lib/components/counter-input/counter-input.component';
export { MapInputComponent } from './lib/modules/geolocation/components/map-input/map-input.component';
export { GeolocationInputComponent } from './lib/modules/geolocation/components/geolocation-input/geolocation-input.component';
export { ImageUploaderComponent } from './lib/modules/file-upload/components/image-uploader/image-uploader.component';
export { MenuItemComponent } from './lib/components/menu-item/menu-item.component';
export { SearchBoxComponent } from './lib/components/search-box/search-box.component';

// Directives
export { NumericInputDirective } from './lib/directives/numeric-input/numeric-input.directive';
export { FileInputDirective } from './lib/modules/file-upload/directives/file-input/file-input.directive';
export { MobilePageDirective } from './lib/modules/layout/directives/mobile-page/mobile-page.directive';

// Pipes
export { MoneyPipe } from './lib/pipes/money/money.pipe';
export { KeysPipe } from './lib/pipes/keys/keys.pipe';
export { AnyPipe } from './lib/pipes/any/any.pipe';
export { UserRoleLabelPipe } from './lib/pipes/label/user-role/user-role-label.pipe';
export { WeightUnitLabelPipe } from './lib/pipes/label/weight-unit/weight-unit-label.pipe';
export { NutrientLabelPipe } from './lib/pipes/label/nutrient/nutrient-label.pipe';
export { PeriodLabelPipe } from './lib/pipes/label/period/period-label.pipe';
export { ProductCategoryLabelPipe } from './lib/pipes/label/product-category/product-category-label.pipe';
export { ShelfLifeLabelPipe } from './lib/pipes/label/shelf-life/shelf-life-label.pipe';
export { StaticAssetUrlPipe } from './lib/pipes/static-asset-url/static-asset-url.pipe';
export { AddressLabelPipe } from './lib/pipes/label/address/address-label.pipe';
export { OrPipe } from './lib/pipes/or/or.pipe';

// Store - actions
export { AuthActions } from './lib/modules/core/store/auth/auth.actions';
export { FridgesActions } from './lib/modules/core/store/fridges/fridges.actions';
export { ProductsActions } from './lib/modules/core/store/products/products.actions';
export { UiActions } from './lib/modules/core/store/ui/ui.actions';

// Store - selectors
export * from './lib/modules/core/store/auth/auth.selectors';
export * from './lib/modules/core/store/fridges/fridges.selectors';
export * from './lib/modules/core/store/products/products.selectors';
export * from './lib/modules/core/store/ui/ui.selectors';

// Services
export { NavigatorService } from './lib/modules/geolocation/services/navigator/navigator.service';
export { StaticAssetService } from './lib/modules/core/services/static-asset/static-asset.service';

// Guards
export { AuthenticationGuard } from './lib/modules/core/guards/authentication/authentication.guard';
export { AuthorizationGuard } from './lib/modules/core/guards/authorization/authorization.guard';

// Classes
export { ComboErrorStateMatcher } from './lib/classes/combo-error-state-matcher/combo-error-state-matcher.class';
export { EarlyErrorStateMatcher } from './lib/classes/early-error-state-matcher/early-error-state-matcher.class';
export { FileWithUrl } from './lib/modules/file-upload/classes/file-with-url/file-with-url.class';

// Models
export { GeolocationCoords } from './lib/modules/geolocation/models/geolocation-coords.interface';
export { LoginCredentials } from './lib/models/auth/login.interface';
export { SignupCredentials } from './lib/models/auth/signup.interface';
export { FridgeFields } from './lib/models/fridge/fridge-fields.interface';
export { Fridge } from './lib/models/fridge/fridge.interface';
export { ProductQuantityDto } from './lib/models/fridge/product-quantity-dto.interface';
export { ProductQuantity } from './lib/models/fridge/product-quantity.interface';
export { Address } from './lib/models/fridge/address.interface';
export { Nutrient } from './lib/models/product/nutrient.enum';
export { Nutrients } from './lib/models/product/nutrients.type';
export { Period } from './lib/models/product/period.enum';
export { ProductCategory } from './lib/models/product/product-category.enum';
export { ProductFields } from './lib/models/product/product-fields.interface';
export { ProductWeight } from './lib/models/product/product-weight.interface';
export { Product } from './lib/models/product/product.interface';
export { ShelfLife } from './lib/models/product/shelf-life.type';
export { UnitOfWeight } from './lib/models/product/unit-of-weight.enum';
export { FormMode } from './lib/models/ui/form-mode.enum';
export { UserRole } from './lib/models/user/user-role.enum';
export { User } from './lib/models/user/user.interface';

// Validators
export { ComboFieldValidators } from './lib/validators/combo-field/combo-field.validators';
export { EmailValidators } from './lib/validators/email/email.validators';
export { FileValidators } from './lib/validators/file/file.validators';
export { NumberValidators } from './lib/validators/number/number.validators';
export { PasswordValidators } from './lib/validators/password/password.validators';

// Utils
export {
  controlHasError,
  getControlError,
  ChangeEventHandler,
  ControlValueAccessorImplementor,
  ValidatorImplementor,
  ngValidatorsProvider,
  ngValueAccessorProvider,
} from './lib/utils/form/form.utils';
export { menuItemTrackBy } from './lib/utils/menu-item/menu-item.utils';
export { getDecimalSeparator } from './lib/utils/i18n/i18n.utils';
