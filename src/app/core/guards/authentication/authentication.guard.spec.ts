import { TestBed } from '@angular/core/testing';

import { AuthenticationGuard } from './authentication.guard';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthSessionState } from 'app/state/auth/auth.feature';
import { UserRole } from 'app/core/models/user/user-role.model';
import { Observable } from 'rxjs';

describe('AuthenticationGuard', () => {
  let guard: AuthenticationGuard;

  const setup = (initialAuthState: AuthSessionState) => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            auth: initialAuthState,
          },
        }),
      ],
    });

    guard = TestBed.inject(AuthenticationGuard);
  };

  it('should be created', () => {
    setup(undefined);
    expect(guard).toBeTruthy();
  });

  describe('given there is a logged in user', () => {
    beforeEach(() => {
      setup({
        user: {
          id: '1',
          name: 'John Doe',
          role: UserRole.User,
        },
        token: '001@1234567890',
        expiresAt: new Date(),
      });
    });

    it('should let the route be activated', () => {
      (guard.canActivate() as Observable<boolean>).subscribe({
        next: (result) => expect(result).toBe(true),
      });
    });
  });

  describe('given there is NO logged in user', () => {
    beforeEach(() => {
      setup(undefined);
    });

    it('should NOT let the route be activated', () => {
      (guard.canActivate() as Observable<boolean>).subscribe({
        next: (result) => expect(result).toBe(false),
      });
    });
  });
});
