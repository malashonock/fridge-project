import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';

import { ProductsActions } from 'product-data-access';
import { NotificationService } from '../services/notification/notification.service';
import { NotificationSeverity } from '../types/notification-severity.enum';

@Injectable()
export class ProductsNotificationEffects {
  public constructor(
    private actions$: Actions,
    private notificationService: NotificationService
  ) {}

  public fetchProductsFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductsActions.fetchProductsFailure),
        tap(() => {
          this.notificationService.broadcastMessage(
            'Failed to fetch products data',
            NotificationSeverity.Error
          );
        })
      );
    },
    { dispatch: false }
  );

  public createProductSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductsActions.createProductSuccess),
        tap(() => {
          this.notificationService.broadcastMessage(
            'New product created successfully',
            NotificationSeverity.Success
          );
        })
      );
    },
    { dispatch: false }
  );

  public createProductFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductsActions.createProductFailure),
        tap(() => {
          this.notificationService.broadcastMessage(
            'Failed to create a new product',
            NotificationSeverity.Error
          );
        })
      );
    },
    { dispatch: false }
  );

  public updateProductSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductsActions.updateProductSuccess),
        tap(() => {
          this.notificationService.broadcastMessage(
            'Product data updated successfully',
            NotificationSeverity.Success
          );
        })
      );
    },
    { dispatch: false }
  );

  public updateProductFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductsActions.updateProductFailure),
        tap(() => {
          this.notificationService.broadcastMessage(
            'Failed to update the product data',
            NotificationSeverity.Error
          );
        })
      );
    },
    { dispatch: false }
  );

  public deleteProductSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductsActions.deleteProductSuccess),
        tap(() => {
          this.notificationService.broadcastMessage(
            'Product deleted successfully',
            NotificationSeverity.Success
          );
        })
      );
    },
    { dispatch: false }
  );

  public deleteProductFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductsActions.deleteProductFailure),
        tap(() => {
          this.notificationService.broadcastMessage(
            'Failed to delete the product',
            NotificationSeverity.Error
          );
        })
      );
    },
    { dispatch: false }
  );
}
