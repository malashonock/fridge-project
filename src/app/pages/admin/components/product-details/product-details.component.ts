import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Product } from 'core/models/product/product.interface';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent {
  @Input() public product: Product;
  public imageServerUrl = environment.STATIC_ASSETS_BASE_URL;
}
