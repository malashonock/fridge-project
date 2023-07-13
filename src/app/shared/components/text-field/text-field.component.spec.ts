import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { MatInputHarness } from '@angular/material/input/testing';
import {
  MatErrorHarness,
  MatFormFieldHarness,
} from '@angular/material/form-field/testing';

import { TextFieldComponent } from './text-field.component';
import { SharedModule } from 'app/shared/shared.module';
import { FormBaseComponent } from '../form-base/form-base.component';
import { SentenceCasePipe } from 'app/shared/pipes/sentence-case/sentence-case.pipe';
import { SplitCamelCasePipe } from 'app/shared/pipes/split-camel-case/split-camel-case.pipe';
import { EmailValidator } from 'app/shared/validators/email/email.validator';

describe('TextFieldComponent', () => {
  let loader: HarnessLoader;

  describe('in isolation', () => {
    let component: TextFieldComponent;
    let fixture: ComponentFixture<TextFieldComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TextFieldComponent],
        imports: [SharedModule, NoopAnimationsModule, ReactiveFormsModule],
      }).compileComponents();

      fixture = TestBed.createComponent(TextFieldComponent);
      loader = TestbedHarnessEnvironment.loader(fixture);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('in form context', () => {
    describe('as plain text field', () => {
      @Component({
        template: `
          <form [formGroup]="form">
            <app-text-field
              name="userName"
              label="User name"
              [error]="getFieldErrorMessage('userName')"
            ></app-text-field>
          </form>
        `,
      })
      class TestHostTextComponent extends FormBaseComponent {
        constructor(
          formBuilder: FormBuilder,
          sentenceCasePipe: SentenceCasePipe,
          splitCamelCasePipe: SplitCamelCasePipe
        ) {
          // Instantiate base class
          super(
            {
              userName: [
                'Test user name',
                [Validators.required, Validators.minLength(2)],
              ],
            },
            undefined,
            () => undefined,
            formBuilder,
            sentenceCasePipe,
            splitCamelCasePipe
          );
        }
      }

      let fixture: ComponentFixture<TestHostTextComponent>;

      beforeEach(async () => {
        await TestBed.configureTestingModule({
          declarations: [TestHostTextComponent],
          imports: [SharedModule, NoopAnimationsModule, ReactiveFormsModule],
          providers: [SentenceCasePipe, SplitCamelCasePipe],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostTextComponent);
        loader = TestbedHarnessEnvironment.loader(fixture);
      });

      it('should be of text type by default', async () => {
        const input = await loader.getHarness(MatInputHarness);
        const type = await input.getType();
        expect(type).toBe('text');
      });

      it('should render empty input with a label on startup', async () => {
        const input = await loader.getHarness(MatInputHarness);

        const placeholder = await input.getPlaceholder();
        expect(placeholder).toBe('User name');

        const value = await input.getValue();
        expect(value).toBe('Test user name');

        const field = await loader.getHarness(MatFormFieldHarness);
        const label = await field.getLabel();
        expect(label).toBe('User name');
      });

      it('should display error messages properly', async () => {
        const input = await loader.getHarness(MatInputHarness);

        expect(async () => await loader.getHarness(MatErrorHarness)).rejects;

        await input.focus();
        await input.setValue('');
        await input.blur();

        let errorContainer = await loader.getHarness(MatErrorHarness);
        expect(errorContainer).toBeTruthy();

        let errorMessage = await errorContainer.getText();
        expect(errorMessage).toBe('User name is required');

        await input.setValue('A');

        errorContainer = await loader.getHarness(MatErrorHarness);
        expect(errorContainer).toBeTruthy();

        errorMessage = await errorContainer.getText();
        expect(errorMessage).toBe(
          'User name should be no shorter than 2 symbols'
        );

        await input.setValue('user');

        expect(async () => await loader.getHarness(MatErrorHarness)).rejects;
      });
    });

    describe('as email field', () => {
      @Component({
        template: `
          <form [formGroup]="form">
            <app-text-field
              name="email"
              label="Email"
              type="email"
              [error]="getFieldErrorMessage('email')"
            ></app-text-field>
          </form>
        `,
      })
      class TestHostTextComponent extends FormBaseComponent {
        constructor(
          formBuilder: FormBuilder,
          sentenceCasePipe: SentenceCasePipe,
          splitCamelCasePipe: SplitCamelCasePipe
        ) {
          // Instantiate base class
          super(
            {
              email: ['', [EmailValidator.valid]],
            },
            undefined,
            () => undefined,
            formBuilder,
            sentenceCasePipe,
            splitCamelCasePipe
          );
        }
      }

      let fixture: ComponentFixture<TestHostTextComponent>;

      beforeEach(async () => {
        await TestBed.configureTestingModule({
          declarations: [TestHostTextComponent],
          imports: [SharedModule, NoopAnimationsModule, ReactiveFormsModule],
          providers: [SentenceCasePipe, SplitCamelCasePipe],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostTextComponent);
        loader = TestbedHarnessEnvironment.loader(fixture);
      });

      it('should be of email type', async () => {
        const input = await loader.getHarness(MatInputHarness);
        const type = await input.getType();
        expect(type).toBe('email');
      });
    });

    describe('as password field', () => {
      @Component({
        template: `
          <form [formGroup]="form">
            <app-text-field
              name="password"
              label="Password"
              type="password"
              [error]="getFieldErrorMessage('password')"
            ></app-text-field>
          </form>
        `,
      })
      class TestHostTextComponent extends FormBaseComponent {
        constructor(
          formBuilder: FormBuilder,
          sentenceCasePipe: SentenceCasePipe,
          splitCamelCasePipe: SplitCamelCasePipe
        ) {
          // Instantiate base class
          super(
            {
              password: ['', [Validators.required]],
            },
            undefined,
            () => undefined,
            formBuilder,
            sentenceCasePipe,
            splitCamelCasePipe
          );
        }
      }

      let fixture: ComponentFixture<TestHostTextComponent>;

      beforeEach(async () => {
        await TestBed.configureTestingModule({
          declarations: [TestHostTextComponent],
          imports: [SharedModule, NoopAnimationsModule, ReactiveFormsModule],
          providers: [SentenceCasePipe, SplitCamelCasePipe],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostTextComponent);
        loader = TestbedHarnessEnvironment.loader(fixture);
      });

      it('should be of password type', async () => {
        const input = await loader.getHarness(MatInputHarness);
        const type = await input.getType();
        expect(type).toBe('password');
      });
    });
  });
});
