import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import '@angular/localize/init';

import { AuthFacade } from 'user-data-access';

import { UserButtonComponent } from './user-button.component';

@Pipe({
  name: 'toInitials',
})
class TestInitialsPipe implements PipeTransform {
  public transform(input: string): string {
    return input;
  }
}

describe('UserButtonComponent', () => {
  let component: UserButtonComponent;
  let fixture: ComponentFixture<UserButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserButtonComponent, TestInitialsPipe],
      imports: [MatMenuModule, MatIconModule],
      providers: [
        {
          provide: AuthFacade,
          useValue: {
            getLoggedUser$: () => of(undefined),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
