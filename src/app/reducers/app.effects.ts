import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';

import * as AuthActions from '../auth/store/auth.actions';
import { User } from '../auth/store/auth.models';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private router: Router) {}

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      map(() => {
        const userData: {
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
          return AuthActions.logout();
        }

        const loadedUser = new User(
          userData._token,
          new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
          return AuthActions.authSuccess({
            user: loadedUser,
            redirect: false,
          });
        }

        return AuthActions.logout();
      })
    )
  );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.router.navigate(['/', 'auth']);
          localStorage.removeItem('userData');
        })
      );
    },
    { dispatch: false }
  );
}
