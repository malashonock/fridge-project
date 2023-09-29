import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MenuLayoutComponent } from './menu-layout.component';

describe('MenuLayoutComponent', () => {
  let component: MenuLayoutComponent;
  let fixture: ComponentFixture<MenuLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuLayoutComponent],
      imports: [NoopAnimationsModule, MatSidenavModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
