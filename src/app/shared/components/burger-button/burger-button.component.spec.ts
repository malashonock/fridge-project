import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatIconHarness } from '@angular/material/icon/testing';
import { MatButtonHarness } from '@angular/material/button/testing';

import { BurgerButtonComponent } from './burger-button.component';
import { SharedModule } from 'app/shared/shared.module';
import { selectShowSideMenu } from 'app/state/ui/ui.selectors';
import { MemoizedSelector } from '@ngrx/store';
import { UiActions } from 'app/state/ui/ui.actions';

describe('BurgerButtonComponent', () => {
  let component: BurgerButtonComponent;
  let fixture: ComponentFixture<BurgerButtonComponent>;
  let loader: HarnessLoader;
  let mockStore: MockStore;
  let mockSelector: MemoizedSelector<unknown, boolean>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BurgerButtonComponent],
      imports: [SharedModule],
      providers: [
        provideMockStore({
          selectors: [{ selector: selectShowSideMenu, value: true }],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BurgerButtonComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    mockStore = TestBed.inject(MockStore);
    mockSelector = mockStore.overrideSelector(selectShowSideMenu, true);

    fixture.detectChanges();
  });

  afterEach(() => {
    mockStore.resetSelectors();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change its appearance depending on show mobile menu flag value', async () => {
    let icon = await loader.getHarness(MatIconHarness);
    expect(await icon.getName()).toBe('close');

    mockSelector.setResult(false);
    mockStore.refreshState();

    // Get icon again - this time it should be a different instance
    icon = await loader.getHarness(MatIconHarness);
    expect(await icon.getName()).toBe('menu');
  });

  it('should dispatch a Toggle Side Menu action on click', async () => {
    const button = await loader.getHarness(MatButtonHarness);
    const spyOnStoreDispatch = jest.spyOn(mockStore, 'dispatch');

    await button.click();
    expect(spyOnStoreDispatch).toHaveBeenCalledTimes(1);
    expect(spyOnStoreDispatch).toHaveBeenCalledWith(UiActions.toggleSideMenu());

    // And once again
    await button.click();
    expect(spyOnStoreDispatch).toHaveBeenCalledTimes(2);
    expect(spyOnStoreDispatch).toHaveBeenCalledWith(UiActions.toggleSideMenu());
  });
});
