import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { provideMockStore } from '@ngrx/store/testing';

import { LoginFormComponent } from './login-form.component';
import { SentenceCasePipe } from 'app/shared/pipes/sentence-case/sentence-case.pipe';
import { SplitCamelCasePipe } from 'app/shared/pipes/split-camel-case/split-camel-case.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  const initialState = {
    auth: undefined,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        RouterTestingModule,
      ],
      providers: [
        SentenceCasePipe,
        SplitCamelCasePipe,
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
