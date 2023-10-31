import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import '@angular/localize/init';

import { FridgeUiModule } from 'fridge-ui';
import { mockFridge1 } from 'fridge-util-testing';
import { AnyPipe, MaterialModule } from 'shared-ui';
import { StaticAssetUrlPipe } from 'shared-data-access';
import { FridgeFacade } from 'fridge-data-access';

import { FridgeCardComponent } from './fridge-card.component';
import { UiFacade } from 'private-shared-data-access';

describe('FridgeCardComponent', () => {
  let component: FridgeCardComponent;
  let fixture: ComponentFixture<FridgeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FridgeCardComponent],
      imports: [
        MaterialModule,
        HttpClientTestingModule,
        FridgeUiModule,
        StaticAssetUrlPipe,
      ],
      providers: [
        AnyPipe,
        {
          provide: 'ENV',
          useValue: { STATIC_ASSET_BASE_URL: 'http://localhost:3000' },
        },
        {
          provide: FridgeFacade,
          useValue: {
            getFridgeProducts$: () => of([]),
            deleteFridge: jest.fn(),
          },
        },
        {
          provide: UiFacade,
          useValue: {
            startLoading: jest.fn(),
            finishLoading: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FridgeCardComponent);
    component = fixture.componentInstance;
    component.fridge = mockFridge1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
