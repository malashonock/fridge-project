import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NumericInputDirective } from './numeric-input.directive';

@Component({
  template: '<input type="text" appNumericInput />',
})
class TestHostComponent {}

describe('NumericInputDirective', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let directive: NumericInputDirective;
  let nativeInput: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [NumericInputDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    directive = fixture.debugElement
      .query(By.directive(NumericInputDirective))
      .injector.get(NumericInputDirective);
    nativeInput = fixture.debugElement
      .query(By.css('input'))
      .injector.get(ElementRef).nativeElement;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
    expect(nativeInput).toBeTruthy();
  });

  describe('form control to native input value conversion', () => {
    it.todo('should toString() non-null values');

    it.todo('given a null, should set input value to empty string');
  });

  describe('native input to form control value conversion', () => {
    it.todo('should convert valid numeric strings to numbers');

    it.todo('should convert emtpy string to null');

    it.todo('should pass other strings unchanged');
  });

  it.todo('should fire the registered onChange callback on native input event');
  it.todo('should fire the registered onTouched callback on native blur event');
});
