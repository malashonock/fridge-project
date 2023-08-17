import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Component, Input } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, Subject } from 'rxjs';
import '@angular/localize/init';

import { ProductsComponent } from './products.component';
import { SharedModule } from 'shared/shared.module';
import { Product } from 'core/models/product/product.interface';

@Component({
  selector: 'app-products-table',
})
class ProductsTableStubComponent {
  @Input() public products$?: Observable<Product[]>;
  @Input() public searchQuery$?: Observable<string>;
}

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  const searchQuery$ = new Subject<string>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent, ProductsTableStubComponent],
      imports: [SharedModule, NoopAnimationsModule],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    component.searchQuery$ = searchQuery$;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass search query changes via onSearchQueryChange method', (done) => {
    const sub = searchQuery$.subscribe((query: string) => {
      expect(query).toBe('test');
      sub.unsubscribe();
      done();
    });

    component.onSearchQueryChange('test');
  });
});
