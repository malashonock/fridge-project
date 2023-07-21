import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { BurgerButtonComponent } from './burger-button.component';
import * as uiFeature from 'app/state/ui/ui.feature';
import { SharedModule } from 'app/shared/shared.module';

describe('BurgerButtonComponent', () => {
  let component: BurgerButtonComponent;
  let fixture: ComponentFixture<BurgerButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BurgerButtonComponent],
      imports: [SharedModule],
      providers: [
        provideMockStore({
          initialState: {
            ui: uiFeature.initialState,
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BurgerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
