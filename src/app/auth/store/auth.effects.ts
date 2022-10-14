import {take, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, ofType, createEffect} from '@ngrx/effects';
import {of, Observable, EMPTY} from 'rxjs';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {AuthService, LoginResponse, SignUpResponse} from '../auth.service';
import User from '../user.model';
import * as AuthActions from './auth.actions';

@Injectable()
export default class AuthEffects {
  authStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginStart, AuthActions.signUpStart),
      exhaustMap((action) => {
        let authFn: Observable<LoginResponse | SignUpResponse>;

        if (action.type === '[Auth] LoginStart') {
          authFn = this.authService.signIn(
            action.credentials.email,
            action.credentials.password,
          );
        } else {
          authFn = this.authService.signUp(
            action.credentials.email,
            action.credentials.password,
          );
        }

        return authFn.pipe(
          map(({email, expiresIn, idToken, localId}) => {
            this.authService.storeUserData(email, localId, expiresIn, idToken);


            return AuthActions.authSuccess({
              user: new User(
                email,
                localId,
                idToken,
                new Date(Date.now() + +expiresIn * 1000),
              ),
            });
          }),
          catchError((error) =>
            this.authService
              .handleError(error)
              .pipe(map((message) => AuthActions.authFail({error: message}))),
          ),
        );
      }),
    ),
  );

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authSuccess),
        tap(({user}) => {
          this.authService.autoLogout(user.tokenExpiryDuration)
          this.router.navigate(['/']);
        }),
      ),
    {dispatch: false},
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.router.navigate(['/auth']);
          localStorage.removeItem('userData');
          this.authService.resetAutoLogout()
        }),
      ),
    {dispatch: false},
  );

  autoLogin$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      exhaustMap((action) => {
        let user: User | null = null;

        this.authService.getUserFromLocalStorage()
          .pipe(take(1)).subscribe(u => user = u);

        if (user) {
          return of(AuthActions.authSuccess({user: user}))
        } else {
          return EMPTY
        }
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {
  }
}
