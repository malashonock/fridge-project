import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import '@angular/localize/init';

import { ProductUiModule } from 'product-ui';
import {
  nutrientsProvider,
  periodsProvider,
  productCategoriesProvider,
  weightUnitsProvider,
} from 'product-data-access';
import {
  ImageUploaderComponent,
  MaterialModule,
  NumericInputDirective,
} from 'shared-ui';
import { SharedUtilFormsModule } from 'shared-util-forms';
import 'jest-global-mocks';

import { ProductFormComponent } from './product-form.component';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        SharedUtilFormsModule,
        NumericInputDirective,
        ProductUiModule,
        ImageUploaderComponent,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: undefined },
        productCategoriesProvider,
        weightUnitsProvider,
        nutrientsProvider,
        periodsProvider,
        provideMockStore(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
