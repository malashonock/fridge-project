import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { skip } from 'rxjs';

import { SearchBoxComponent } from './search-box.component';
import { SharedModule } from '@shell/shared/shared.module';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBoxComponent],
      imports: [SharedModule, NoopAnimationsModule],
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
      expect(value).toBeNull();
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