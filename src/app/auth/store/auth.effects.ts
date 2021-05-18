import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as AuthActions from './auth.actions';
import { AuthService } from '../auth.service';
import { User } from './auth.models';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginStart),
      switchMap((action) => {
        return this.authService.login(action.loginRequest).pipe(
          map(({ accessToken, expiresIn }) => {
            const user = this.handleAuthentication(accessToken, expiresIn);

            return AuthActions.authSuccess({
              user,
              redirect: true,
            });
          }),
          catchError((errors: string[]) => {
            return of(AuthActions.authFail({ errors }));
          })
        );
      })
    );
  });

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signupStart),
      switchMap((action) => {
        return this.authService.signup(action.signupRequest).pipe(
          map(({ accessToken, expiresIn }) => {
            const user = this.handleAuthentication(accessToken, expiresIn);

            return AuthActions.authSuccess({
              user,
              redirect: true,
            });
          }),
          catchError((errors: string[]) => {
            return of(AuthActions.authFail({ errors }));
          })
        );
      })
    );
  });

  authSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.authSuccess),
        tap(({ redirect }) => {
          if (redirect) {
            this.message.success('Successfully authenticated');
            this.router.navigate(['/', 'note']);
          }
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService
  ) {}

  private handleAuthentication(accessToken: string, expiresIn): User {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    const user = new User(accessToken, expirationDate);

    localStorage.setItem('userData', JSON.stringify(user));

    return user;
  }
}
