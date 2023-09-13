// Source: https://stackblitz.com/edit/angular-autocomplete-dialog-scroll?file=main.ts

import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { Provider } from '@angular/core';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY } from '@angular/material/autocomplete';

type ScrollStrategyFactory = () => ScrollStrategy;

const closeScrollStrategyFactory = (
  overlay: Overlay
): ScrollStrategyFactory => {
  return () => overlay.scrollStrategies.close();
};

export const matAutocompleteScrollStrategyProvider: Provider = {
  provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
  useFactory: closeScrollStrategyFactory,
  deps: [Overlay],
};
