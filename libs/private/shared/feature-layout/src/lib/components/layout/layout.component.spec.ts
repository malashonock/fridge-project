import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { of } from 'rxjs';
import '@angular/localize/init';

import { OrPipe } from 'shared-ui';
import { UiFacade } from 'private-shared-data-access';

import { LayoutComponent } from './layout.component';

@Component({
  selector: 'lib-header',
})
class TestHeaderComponent {}

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutComponent, TestHeaderComponent],
      imports: [
        NoopAnimationsModule,
        MatSidenavModule,
        RouterTestingModule,
        OrPipe,
      ],
      providers: [
        {
          provide: UiFacade,
          useValue: {
            getLoadingCount$: () => of(0),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
