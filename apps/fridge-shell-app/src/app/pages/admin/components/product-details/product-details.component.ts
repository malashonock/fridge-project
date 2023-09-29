import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Product } from 'fridge-shared-lib';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent {
  @Input() public product: Product;
}