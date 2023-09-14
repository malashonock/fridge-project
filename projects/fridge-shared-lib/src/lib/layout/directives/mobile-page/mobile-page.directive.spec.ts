import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import * as uiFeature from '@shared/store/ui/ui.feature';
import { MobilePageDirective } from './mobile-page.directive';

@Component({
  imports: [MobilePageDirective],
  hostDirectives: [MobilePageDirective],
})
class HostComponent {}

describe('MobilePageDirective', () => {
  let directive: MobilePageDirective;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent],
      imports: [MobilePageDirective],
      providers: [
        provideMockStore({
          initialState: {
            ui: uiFeature.initialState,
          },
        }),
        MobilePageDirective,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    directive = fixture.debugElement.injector.get(MobilePageDirective);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
