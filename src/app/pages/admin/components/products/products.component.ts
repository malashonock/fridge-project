import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { Product } from 'core/models';
import { selectAllProducts } from 'app/state/products';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnDestroy {
  public searchQuery$ = new Subject<string>();
  private destroy$ = new Subject();

  @ViewChild('searchInput') private searchInput!: ElementRef;

  public constructor(private store: Store, private dialog: MatDialog) {}

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public get products$(): Observable<Product[]> {
    return this.store.select(selectAllProducts);
  }

  public onSearchQueryChange(query: string): void {
    this.searchQuery$.next(query);
  }

  public openProductDialog(product?: Product): void {
    this.dialog.open(ProductFormComponent, {
      data: { product },
    });
  }
}
