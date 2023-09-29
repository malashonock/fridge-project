import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Component, Input } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import '@angular/localize/init';

import { Product } from 'product-domain';
import { MaterialModule, OrPipe, SearchBoxComponent } from 'shared-ui';

import { ProductsComponent } from './products.component';

@Component({
  selector: 'lib-products-table',
})
class ProductsTableStubComponent {
  @Input() public products: Product[];
  @Input() public searchQuery: string;
}

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent, ProductsTableStubComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        SearchBoxComponent,
        OrPipe,
      ],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});