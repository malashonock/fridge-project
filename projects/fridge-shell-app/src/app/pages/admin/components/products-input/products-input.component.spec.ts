import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import '@angular/localize/init';

import { ProductsInputComponent } from './products-input.component';
import { SharedModule } from '@shell/shared/shared.module';
import { ProductAutocompleteComponent } from '../product-autocomplete/product-autocomplete.component';

describe('ProductsInputComponent', () => {
  let component: ProductsInputComponent;
  let fixture: ComponentFixture<ProductsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsInputComponent, ProductAutocompleteComponent],
      imports: [SharedModule, NoopAnimationsModule],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
