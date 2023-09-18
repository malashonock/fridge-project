import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import '@angular/localize/init';

import { MaterialModule } from 'fridge-shared-lib';

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
      imports: [MaterialModule, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: undefined },
        provideMockStore(),
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
