import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {
  MAT_PAGINATOR_DEFAULT_OPTIONS,
  MatPaginator,
} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, takeUntil } from 'rxjs';

import { Product } from 'core/models';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> *',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  providers: [
    {
      provide: MAT_PAGINATOR_DEFAULT_OPTIONS,
      useValue: {
        pageSize: 10,
      },
    },
  ],
})
export class ProductsTableComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() public products$?: Observable<Product[]>;
  @Input() public searchQuery$?: Observable<string>;

  public dataSource = new MatTableDataSource<Product>([]);
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

  @ViewChild(MatSort) private sort!: MatSort;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;

  public ngOnInit(): void {
    this.subscribeToProductsChanges();
    this.subscribeToSearchQueryChanges();
    this.setupFilter();
  }

  public ngAfterViewInit(): void {
    this.setupSort();
    this.setupPaginator();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  private subscribeToProductsChanges(): void {
    this.products$
      ?.pipe(takeUntil(this.destroy$))
      .subscribe((products: Product[]) => {
        this.dataSource.data = products;
      });
  }

  private subscribeToSearchQueryChanges(): void {
    this.searchQuery$
      ?.pipe(takeUntil(this.destroy$))
      .subscribe((query: string): void => {
        this.dataSource.filter = query;
      });
  }

  private setupFilter(): void {
    this.dataSource.filterPredicate = (
      product: Product,
      filter: string
    ): boolean => {
      return (
        product.ingredients?.toLowerCase().includes(filter) ||
        product.name.toLowerCase().includes(filter)
      );
    };
  }

  private setupSort(): void {
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (
      item: Product,
      name: string
    ): string | number => {
      switch (name) {
        case 'name':
        case 'category':
        case 'price':
          return item[name];
        default:
          throw new Error(
            `Sorting data accessor not implemented for "${name}" column`
          );
      }
    };
  }

  private setupPaginator(): void {
    this.dataSource.paginator = this.paginator;
  }

  public toggleExpandProduct(product: Product): void {
    this.expandedProduct =
      product.id === this.expandedProduct?.id ? null : product;
  }
}
