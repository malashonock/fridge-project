import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsInputComponent } from './products-input.component';

describe('ProductsInputComponent', () => {
  let component: ProductsInputComponent;
  let fixture: ComponentFixture<ProductsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
