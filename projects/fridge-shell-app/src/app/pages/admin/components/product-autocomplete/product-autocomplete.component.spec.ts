import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';

import { MaterialModule } from 'fridge-shared-lib';

import { ProductAutocompleteComponent } from './product-autocomplete.component';

describe('ProductAutocompleteComponent', () => {
  let component: ProductAutocompleteComponent;
  let fixture: ComponentFixture<ProductAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductAutocompleteComponent],
      imports: [MaterialModule, NoopAnimationsModule],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
