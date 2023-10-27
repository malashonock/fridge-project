import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, combineLatest, map, startWith, takeUntil } from 'rxjs';
import { MatAutocomplete } from '@angular/material/autocomplete';

import { Product } from 'product-domain';
import { selectAllProducts } from 'product-data-access';
import { SearchBoxComponent } from 'shared-ui';

@Component({
  selector: 'lib-product-autocomplete',
  templateUrl: './product-autocomplete.component.html',
  styleUrls: ['./product-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAutocompleteComponent implements AfterViewInit, OnDestroy {
  @Output() public selectProduct = new EventEmitter<Product>();
  @Output() public autocompleteClosed = new EventEmitter<void>();

  private productQuery$ = new Subject<Product | string | null>();

  private destroy$ = new Subject();

  @ViewChild(MatAutocomplete) private autocomplete: MatAutocomplete;
  @ViewChild(SearchBoxComponent) private searchBox: SearchBoxComponent;

  public filteredProducts$ = combineLatest([
    this.store.select(selectAllProducts),
    this.productQuery$.asObservable().pipe(startWith('')),
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

  public constructor(private store: Store) {}

  public ngAfterViewInit(): void {
    this.autocomplete.optionSelected
      .pipe(takeUntil(this.destroy$))
      .subscribe(($event): void => {
        const product = $event.option.value as Product;
        this.selectProduct.emit(product);
      });

    this.autocomplete.closed
      .pipe(takeUntil(this.destroy$))
      .subscribe((): void => {
        this.autocompleteClosed.emit();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public productDisplayFn(product: Product | null): string {
    return product?.name ?? '';
  }

  public reset(): void {
    this.searchBox?.reset();
  }

  public onSearchQueryChange(productQuery: Product | string | null): void {
    this.productQuery$.next(productQuery);
  }
}
