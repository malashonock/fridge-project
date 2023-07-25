import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import {
  MatErrorHarness,
  MatFormFieldHarness,
} from '@angular/material/form-field/testing';

import { SelectFieldComponent, SelectOption } from './select-field.component';
import { SharedModule } from 'app/shared/shared.module';
import { FormBaseComponent } from '../form-base/form-base.component';
import { SentenceCasePipe } from 'app/shared/pipes/sentence-case/sentence-case.pipe';
import { SplitCamelCasePipe } from 'app/shared/pipes/split-camel-case/split-camel-case.pipe';
import { MatSelectHarness } from '@angular/material/select/testing';

describe('SelectFieldComponent', () => {
  let loader: HarnessLoader;

  describe('in isolation', () => {
    let component: SelectFieldComponent;
    let fixture: ComponentFixture<SelectFieldComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [SelectFieldComponent],
        imports: [SharedModule, NoopAnimationsModule, ReactiveFormsModule],
      }).compileComponents();

      fixture = TestBed.createComponent(SelectFieldComponent);
      loader = TestbedHarnessEnvironment.loader(fixture);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('in form context', () => {
    const option1 = { value: 'user', label: 'User' };
    const option2 = { value: 'admin', label: 'Admin' };

    @Component({
      template: `
        <form [formGroup]="form">
          <app-select-field
            name="role"
            label="Role"
            [options]="options"
            [error]="getFieldErrorMessage('role')"
          ></app-select-field>
        </form>
      `,
    })
    class TestHostComponent extends FormBaseComponent {
      options: SelectOption[] = [option1, option2];

      constructor(
        formBuilder: FormBuilder,
        sentenceCasePipe: SentenceCasePipe,
        splitCamelCasePipe: SplitCamelCasePipe
      ) {
        // Instantiate base class
        super(
          {
            role: [null, [Validators.required]],
          },
          undefined,
          () => undefined,
          formBuilder,
          sentenceCasePipe,
          splitCamelCasePipe
        );
      }
    }

    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TestHostComponent],
        imports: [SharedModule, NoopAnimationsModule, ReactiveFormsModule],
        providers: [SentenceCasePipe, SplitCamelCasePipe],
      }).compileComponents();

      fixture = TestBed.createComponent(TestHostComponent);
      loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it('should render empty select with a label on startup', async () => {
      const select = await loader.getHarness(MatSelectHarness);

      const value = await select.getValueText();
      expect(value).toBe('Role');

      const field = await loader.getHarness(MatFormFieldHarness);
      const label = await field.getLabel();
      expect(label).toBe('Role');
    });

    it('should change options', async () => {
      const select = await loader.getHarness(MatSelectHarness);

      await select.open();
      await select.clickOptions({ text: 'User' });
      let value = await select.getValueText();
      expect(value).toBe('User');

      await select.open();
      await select.clickOptions({ text: 'Admin' });
      value = await select.getValueText();
      expect(value).toBe('Admin');
    });

    it('should display error messages properly', async () => {
      const select = await loader.getHarness(MatSelectHarness);

      expect(async () => await loader.getHarness(MatErrorHarness)).rejects;

      await select.focus();
      await select.blur();

      const errorContainer = await loader.getHarness(MatErrorHarness);
      expect(errorContainer).toBeTruthy();

      const errorMessage = await errorContainer.getText();
      expect(errorMessage).toBe('Role is required');

      await select.open();
      await select.clickOptions({ text: option1.label });
      expect(async () => await loader.getHarness(MatErrorHarness)).rejects;
    });
  });
});
