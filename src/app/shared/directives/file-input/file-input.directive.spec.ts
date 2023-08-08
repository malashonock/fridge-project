import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileInputDirective } from './file-input.directive';
import { SharedModule } from 'shared/shared.module';
import { By } from '@angular/platform-browser';
import { FileWithUrl } from 'core/classes';

@Component({
  template: '<input type="file" />',
})
class TestHostComponent {}

describe('FileInputDirective', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let directive: FileInputDirective;
  let nativeInput: HTMLInputElement;
  const mockFile = new FileWithUrl(new File(['test'], 'test.txt'));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    directive = fixture.debugElement
      .query(By.directive(FileInputDirective))
      .injector.get(FileInputDirective);
    nativeInput = fixture.debugElement
      .query(By.css('input'))
      .injector.get(ElementRef).nativeElement;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
    expect(nativeInput).toBeTruthy();
  });

  it.todo('should update input.files property via writeValue() method');

  it.todo(
    'should fire the registered onChange callback on file selection change'
  );
  it.todo(
    'should fire the registered onTouched callback on FIRST file selection change'
  );
});
