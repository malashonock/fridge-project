import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, combineLatest, map, startWith, takeUntil } from 'rxjs';

import { selectAllProducts } from 'app/state/products/products.selectors';
import { Product } from 'core/models/product/product.interface';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { SearchBoxComponent } from 'shared/components/search-box/search-box.component';

@Component({
  selector: 'app-product-autocomplete',
  templateUrl: './product-autocomplete.component.html',
  styleUrls: ['./product-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAutocompleteComponent implements AfterViewInit, OnDestroy {
  @Output() public selectProduct = new Subject<Product>();
  @Output() public autocompleteClosed = new Subject();

  public productQuery$ = new Subject<Product | string | null>();

  private destroy$ = new Subject();

  @ViewChild(MatAutocomplete) private autocomplete: MatAutocomplete;
  @ViewChild(SearchBoxComponent) private searchBox: SearchBoxComponent;

  public constructor(private store: Store) {}

  public ngAfterViewInit(): void {
    this.autocomplete.optionSelected
      .pipe(takeUntil(this.destroy$))
      .subscribe(($event): void => {
        const product = $event.option.value as Product;
        this.selectProduct.next(product);
      });

    this.autocomplete.closed
      .pipe(takeUntil(this.destroy$))
      .subscribe((): void => {
        this.autocompleteClosed.next(null);
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public filteredProducts$ = combineLatest([
    this.store.select(selectAllProducts),
    this.productQuery$.pipe(startWith('')),
  ]).pipe(
    map(([products, query]): Product[] => {
      const sanitizedQuery: string =
        typeof query === 'string'
          ? query.toLowerCase().trim()
          : query?.name ?? '';

      return products.filter((product: Product): boolean => {
        const sanitizedProductName = product.name.toLowerCase().trim();
        return sanitizedProductName.includes(sanitizedQuery);
      });
    })
  );

  public productDisplayFn(product: Product | null): string {
    return product?.name ?? '';
  }

  public reset(): void {
    this.searchBox?.reset();
  }
}