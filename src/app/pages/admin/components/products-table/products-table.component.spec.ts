import { Component, DebugElement, Input, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatRowHarness } from '@angular/material/table/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import '@angular/localize/init';

import { ProductsTableComponent } from './products-table.component';
import { SharedModule } from 'shared/shared.module';
import { Product } from 'core/models/product/product.interface';
import { ProductCategory } from 'core/models/product/product-category.enum';
import {
  mockProduct1,
  mockProducts1,
  mockProducts2,
} from 'mocks/product.mocks';
import { ShelfLifeLabelPipe } from 'shared/pipes/label/shelf-life/shelf-life-label.pipe';

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
        ShelfLifeLabelPipe,
      ],
      imports: [SharedModule, NoopAnimationsModule, HttpClientTestingModule],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsTableComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter products only by name & ingredients', async () => {
    component.products = mockProducts2;
    component.searchQuery = '';
    component.ngOnChanges({
      products: new SimpleChange(undefined, mockProducts2, true),
      searchQuery: new SimpleChange(undefined, '', true),
    });
    expect((await getMainRows()).length).toBe(2);

    component.searchQuery = 'sandwich';
    component.ngOnChanges({
      searchQuery: new SimpleChange('', 'sandwich', false),
    });
    expect((await getMainRows()).length).toBe(1);

    component.searchQuery = 'cherry tomatoes';
    component.ngOnChanges({
      searchQuery: new SimpleChange('sandwich', 'cherry tomatoes', false),
    });
    expect((await getMainRows()).length).toBe(1);

    component.searchQuery = ProductCategory.Salads;
    component.ngOnChanges({
      searchQuery: new SimpleChange(
        'cherry tomatoes',
        ProductCategory.Salads,
        false
      ),
    });
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
    expect(component.expandedProduct).toBeNull();

    component.products = mockProducts1;
    component.ngOnChanges({
      products: new SimpleChange(undefined, mockProducts1, true),
    });
    expect(component.expandedProduct).toBeNull();

    // Test via click on the main row
    fixture.detectChanges();
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
