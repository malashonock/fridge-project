import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
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
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, catchError, of, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

import { Product } from 'product-domain';
import { ProductsActions } from 'product-data-access';
import { StaticAssetService } from 'shared-data-access';
import { ConfirmDeleteComponent } from 'shared-ui';
import { FileWithUrl } from 'shared-util-forms';

import { ProductFormComponent } from 'product-feature-form';

@Component({
  selector: 'lib-products-table',
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsTableComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() public products: Product[] = [];
  @Input() public searchQuery = '';

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

  public constructor(
    private dialog: MatDialog,
    private staticAssetService: StaticAssetService,
    private store: Store
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (Object.hasOwn(changes, 'products')) {
      this.dataSource.data = this.products;
    }

    if (Object.hasOwn(changes, 'searchQuery')) {
      this.dataSource.filter = this.searchQuery;
    }
  }

  public ngOnInit(): void {
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

  private fetchProductImage({
    imageUrl,
  }: Product): Observable<FileWithUrl | null> {
    return imageUrl
      ? this.staticAssetService.fetchAsset(imageUrl).pipe(
          catchError(() => of(null)),
          takeUntil(this.destroy$)
        )
      : of(null);
  }

  public openEditProductDialog(product: Product, event?: MouseEvent): void {
    event?.stopPropagation();

    this.fetchProductImage(product).subscribe(
      (image: FileWithUrl | null): void => {
        this.dialog.open(ProductFormComponent, {
          data: { product, image },
        });
      }
    );
  }

  public openDeleteProductDialog({ id }: Product, event?: MouseEvent): void {
    event?.stopPropagation();

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        itemType: $localize`:@@product:product`,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((deleteConfirmed: boolean) => {
        if (deleteConfirmed) {
          this.store.dispatch(ProductsActions.deleteProduct({ id }));
        }
      });
  }
}
