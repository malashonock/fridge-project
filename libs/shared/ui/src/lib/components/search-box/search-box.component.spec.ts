import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { skip } from 'rxjs';
import '@angular/localize/init';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchBoxComponent } from './search-box.component';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SearchBoxComponent,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatIconModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should debounce user input', (done) => {
    const start = Date.now();

    component.searchQueryChange.pipe(skip(1)).subscribe(() => {
      const lag = Date.now() - start;
      expect(lag).toBeGreaterThan(500);
      done();
    });

    component.searchControl.setValue('test');
  });

  it('should clear input on Escape', (done) => {
    const input = fixture.debugElement.query(By.css('input'))
      .nativeElement as HTMLInputElement;

    const sub1 = component.searchControl.valueChanges.subscribe((value) => {
      expect(value).toBe('a');
      sub1.unsubscribe();
    });

    input.dispatchEvent(
      new KeyboardEvent('keyup', {
        code: 'a',
      })
    );

    const sub2 = component.searchControl.valueChanges.subscribe((value) => {
      expect(value).toBe('');
      sub2.unsubscribe();
      done();
    });

    input.dispatchEvent(
      new KeyboardEvent('keyup', {
        code: 'Escape',
      })
    );
  });
});
