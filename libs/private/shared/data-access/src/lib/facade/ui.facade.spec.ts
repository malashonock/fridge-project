import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { UiFacade } from './ui.facade';

describe('UiFacade', () => {
  let service: UiFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
    });
    service = TestBed.inject(UiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
