import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import '@angular/localize/init';

import { MaterialModule, OrPipe, SearchBoxComponent } from 'shared-ui';
import { ProductFacade } from 'product-data-access';

import { ProductAutocompleteComponent } from './product-autocomplete.component';

describe('ProductAutocompleteComponent', () => {
  let component: ProductAutocompleteComponent;
  let fixture: ComponentFixture<ProductAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductAutocompleteComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        SearchBoxComponent,
        OrPipe,
      ],
      providers: [
        {
          provide: ProductFacade,
          useValue: {
            getAllProducts$: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
