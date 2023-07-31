import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Store } from '@ngrx/store';
import { Subject, debounceTime, fromEvent, map, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { Product } from 'core/models';
import { selectAllProducts } from 'app/state/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  public searchControl: FormControl;
  public products = new MatTableDataSource<Product>([]);
  public tableColumns: string[] = [
    'name',
    'category',
    'price',
    'weight',
    'shelfLife',
    'actions',
  ];
  public expandedProduct: Product | null = null;
  private destroy$ = new Subject();

  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild(MatSort) sort!: MatSort;

  public constructor(
    formBuilder: FormBuilder,
    private store: Store,
    private cdRef: ChangeDetectorRef
  ) {
    this.searchControl = formBuilder.control('');
  }

  public ngOnInit(): void {
    this.subscribeToSearchQueryChanges();
    this.subscribeToStoreProductsChanges();
    this.setupFilter();
  }

  public ngAfterViewInit(): void {
    this.subscribeToSearchKeyboardEvents();
    this.setupSort();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  private subscribeToSearchQueryChanges(): void {
    this.searchControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(500),
        map((rawQuery: string) => {
          return rawQuery?.trim().toLowerCase();
        })
      )
      .subscribe((query: string): void => {
        this.products.filter = query;
        this.cdRef.detectChanges();
      });
  }

  private subscribeToSearchKeyboardEvents(): void {
    fromEvent<KeyboardEvent>(this.searchInput.nativeElement, 'keyup')
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: KeyboardEvent) => {
        switch (event.code) {
          case 'Escape':
            this.searchControl.reset();
            break;
          default:
            break;
        }
      });
  }

  private subscribeToStoreProductsChanges(): void {
    this.store
      .select(selectAllProducts)
      .pipe(takeUntil(this.destroy$))
      .subscribe((products: Product[]) => {
        this.products.data = products;
      });
  }

  private setupFilter(): void {
    this.products.filterPredicate = (
      product: Product,
      filter: string
    ): boolean => {
      return (
        product.name.toLowerCase().includes(filter) ||
        product.ingredients.toLowerCase().includes(filter)
      );
    };
  }

  private setupSort(): void {
    this.products.sort = this.sort;

    this.products.sortingDataAccessor = (
      item: Product,
      name: string
    ): string | number => {
      switch (name) {
        case 'name':
        case 'category':
        case 'price':
          return item[name];
        case 'weight':
          return item.weight.value;
        default:
          throw new Error(
            `Sorting data accessor not implemented for "${name}" column`
          );
      }
    };
  }

  public toggleExpandProduct(product: Product): void {
    this.expandedProduct =
      product.id === this.expandedProduct?.id ? null : product;
  }
}
