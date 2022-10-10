import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import User from '../user.model';
import * as AuthActions from './auth.actions';

@Injectable()
export default class AuthEffects {
  loginStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginStart),
      exhaustMap((action) =>
        this.authService
          .signIn(action.credentials.email, action.credentials.password)
          .pipe(
            map(({ email, expiresIn, idToken, localId }) =>
              AuthActions.authSuccess({
                user: new User(
                  email,
                  localId,
                  idToken,
                  new Date(Date.now() + +expiresIn * 1000),
                ),
              }),
            ),
            catchError((error) =>
              this.authService
                .handleError(error)
                .pipe(
                  map((message) => AuthActions.authFail({ error: message })),
                ),
            ),
          ),
      ),
    ),
  );

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authSuccess),
        tap(() => {
          this.router.navigate(['/']);
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}
}
