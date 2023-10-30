import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatIconHarness } from '@angular/material/icon/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';
import '@angular/localize/init';

import { UiFacade } from 'private-shared-data-access';

import { BurgerButtonComponent } from './burger-button.component';

describe('BurgerButtonComponent', () => {
  let component: BurgerButtonComponent;
  let fixture: ComponentFixture<BurgerButtonComponent>;
  let loader: HarnessLoader;
  const testShowSideMenu = new Subject();
  const spyOnUiStoreToggleSideMenu = jest.fn();

  beforeEach(async () => {
    jest.resetAllMocks();

    await TestBed.configureTestingModule({
      declarations: [BurgerButtonComponent],
      imports: [MatIconModule],
      providers: [
        {
          provide: UiFacade,
          useValue: {
            getShowSideMenu$: () => testShowSideMenu.asObservable(),
            toggleSideMenu: spyOnUiStoreToggleSideMenu,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BurgerButtonComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change its appearance depending on show mobile menu flag value', async () => {
    testShowSideMenu.next(true);
    let icon = await loader.getHarness(MatIconHarness);
    expect(await icon.getName()).toBe('close');

    // Get icon again - this time it should be a different instance
    testShowSideMenu.next(false);
    icon = await loader.getHarness(MatIconHarness);
    expect(await icon.getName()).toBe('menu');
  });

  it('should dispatch a Toggle Side Menu action on click', async () => {
    const button = await loader.getHarness(MatButtonHarness);

    await button.click();
    expect(spyOnUiStoreToggleSideMenu).toHaveBeenCalledTimes(1);

    // And once again
    await button.click();
    expect(spyOnUiStoreToggleSideMenu).toHaveBeenCalledTimes(2);
  });
});
