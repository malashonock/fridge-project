import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { Product } from 'product-domain';
import { ProductFacade } from 'product-data-access';

import { ProductFormComponent } from 'product-feature-form';

@Component({
  selector: 'lib-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnDestroy {
  public searchQuery: string;
  private destroy$ = new Subject();

  public constructor(
    private productFacade: ProductFacade,
    private dialog: MatDialog
  ) {}

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public get products$(): Observable<Product[]> {
    return this.productFacade.getAllProducts$();
  }

  public onSearchQueryChange(searchQuery: string): void {
    this.searchQuery = searchQuery;
  }

  public openAddProductDialog(): void {
    this.dialog.open(ProductFormComponent);
  }
}
