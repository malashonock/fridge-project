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

import { Product } from 'core/models';
import { selectAllProducts } from 'app/state/products';
import { MatTableDataSource } from '@angular/material/table';

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
    'price',
    'weight',
    'shelfLife',
    'actions',
  ];
  public expandedProduct: Product | null = null;
  private destroy$ = new Subject();

  @ViewChild('searchInput') searchInput!: ElementRef;

  public constructor(
    formBuilder: FormBuilder,
    private store: Store,
    private cdRef: ChangeDetectorRef
  ) {
    this.searchControl = formBuilder.control('');
  }

  public ngOnInit(): void {
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

    this.store
      .select(selectAllProducts)
      .pipe(takeUntil(this.destroy$))
      .subscribe((products: Product[]) => {
        this.products.data = products;
      });

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

  public ngAfterViewInit(): void {
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

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public toggleExpandProduct(product: Product): void {
    this.expandedProduct =
      product.id === this.expandedProduct?.id ? null : product;
  }
}
