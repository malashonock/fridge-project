import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { AdminPageComponent } from './admin-page.component';
import * as uiFeature from 'app/state/ui/ui.feature';
import { SharedModule } from 'shared/shared.module';
import { adminPageMenuConfigProvider } from 'core/configs';

describe('AdminPageComponent', () => {
  let component: AdminPageComponent;
  let fixture: ComponentFixture<AdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPageComponent],
      imports: [SharedModule, BrowserAnimationsModule, RouterTestingModule],
      providers: [
        provideMockStore({
          initialState: {
            ui: uiFeature.initialState,
          },
        }),
        adminPageMenuConfigProvider,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
