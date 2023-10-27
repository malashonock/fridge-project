import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import '@angular/localize/init';

import {
  ImageUploaderComponent,
  MaterialModule,
  NumericInputDirective,
  OrPipe,
  SearchBoxComponent,
} from 'shared-ui';
import { SharedFeatureMapModule } from 'shared-feature-map';
import { FridgeFacade } from 'fridge-data-access';
import 'jest-global-mocks';

import { FridgeFormComponent } from './fridge-form.component';
import { ProductsInputComponent } from '../products-input/products-input.component';
import { ProductAutocompleteComponent } from '../product-autocomplete/product-autocomplete.component';

describe('FridgeFormComponent', () => {
  let component: FridgeFormComponent;
  let fixture: ComponentFixture<FridgeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FridgeFormComponent,
        ProductsInputComponent,
        ProductAutocompleteComponent,
      ],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        NoopAnimationsModule,
        ImageUploaderComponent,
        NumericInputDirective,
        SharedFeatureMapModule,
        SearchBoxComponent,
        OrPipe,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: undefined },
        {
          provide: FridgeFacade,
          useValue: {
            getFridgeSubmitting$: () => of(false),
            createFridge: jest.fn(),
            updateFridge: jest.fn(),
          },
        },
        provideMockStore(), // TODO: remove after refactoring ProductAutoCompleteComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FridgeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
