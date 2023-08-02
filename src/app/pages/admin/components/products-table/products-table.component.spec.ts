import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatRowHarness } from '@angular/material/table/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';

import { ProductsTableComponent } from './products-table.component';
import { SharedModule } from 'shared/shared.module';
import { Product, ProductCategory } from 'core/models';
import {
  mockProduct1,
  mockProducts1,
  mockProducts2,
} from 'mocks/product.mocks';
import { ShelfLifePipe } from '../../pipes';

@Component({
  selector: 'app-product-details',
})
class ProductDetailsStubComponent {
  @Input() public product!: Product;
}

describe('ProductsTableComponent', () => {
  let component: ProductsTableComponent;
  let fixture: ComponentFixture<ProductsTableComponent>;
  let loader: HarnessLoader;

  const getMainRows = async (): Promise<MatRowHarness[]> => {
    return await loader.getAllHarnesses(
      MatRowHarness.with({ selector: '.main-row' })
    );
  };

  const getNoDataRow = (): DebugElement => {
    return fixture.debugElement.query(By.css('.mat-mdc-no-data-row'));
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProductsTableComponent,
        ProductDetailsStubComponent,
        ShelfLifePipe,
      ],
      imports: [SharedModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsTableComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mirror changes made to input products observable', () => {
    const products$ = new Subject<Product[]>();
    component.products$ = products$;
    fixture.detectChanges();

    products$.next(mockProducts1);
    expect(component.dataSource.data).toEqual(mockProducts1);

    products$.next(mockProducts2);
    expect(component.dataSource.data).toEqual(mockProducts2);
  });

  it('should mirror changes made to search query observable', () => {
    const searchQuery$ = new Subject<string>();
    component.searchQuery$ = searchQuery$;
    fixture.detectChanges();

    searchQuery$.next('chick');
    expect(component.dataSource.filter).toEqual('chick');

    searchQuery$.next('');
    expect(component.dataSource.filter).toEqual('');
  });

  it('should filter products only by name & ingredients', async () => {
    const products$ = new Subject<Product[]>();
    const searchQuery$ = new Subject<string>();
    component.products$ = products$;
    component.searchQuery$ = searchQuery$;
    fixture.detectChanges();

    products$.next(mockProducts2);
    expect((await getMainRows()).length).toBe(2);

    searchQuery$.next('sandwich');
    expect((await getMainRows()).length).toBe(1);

    searchQuery$.next('cherry tomatoes');
    expect((await getMainRows()).length).toBe(1);

    searchQuery$.next(ProductCategory.Salads);
    expect((await getMainRows()).length).toBe(0);
    expect(getNoDataRow()).not.toBeNull();
  });

  describe('sorting data accessor', () => {
    let sortingDataAccessor: (
      data: Product,
      sortHeaderId: string
    ) => string | number;

    beforeEach(() => {
      fixture.detectChanges();
      ({ sortingDataAccessor } = component.dataSource);
    });

    it('should recognize name, price and category fields', () => {
      expect(sortingDataAccessor(mockProduct1, 'name')).toBe(mockProduct1.name);
      expect(sortingDataAccessor(mockProduct1, 'price')).toBe(
        mockProduct1.price
      );
      expect(sortingDataAccessor(mockProduct1, 'category')).toBe(
        mockProduct1.category
      );
    });

    it('should throw an exception for other fields', () => {
      expect(() => sortingDataAccessor(mockProduct1, 'shelfLife')).toThrowError(
        'Sorting data accessor not implemented for "shelfLife" column'
      );
    });
  });

  it('should keep reference of the currently expanded row', async () => {
    const products$ = new Subject<Product[]>();
    component.products$ = products$;
    fixture.detectChanges();
    expect(component.expandedProduct).toBeNull();

    products$.next(mockProducts1);
    expect(component.expandedProduct).toBeNull();

    // Test via click on the main row
    fixture.debugElement
      .query(By.css('.main-row'))
      .triggerEventHandler('click');

    expect(component.expandedProduct).toBe(mockProduct1);

    // Test via component public API
    component.toggleExpandProduct(mockProduct1);
    expect(component.expandedProduct).toBeNull();

    component.toggleExpandProduct(mockProduct1);
    expect(component.expandedProduct).toBe(mockProduct1);
  });
});
