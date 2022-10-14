import { pipe } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { exhaustMap, map, switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Observable, firstValueFrom } from 'rxjs';
import User from './user.model';
import { Store } from '@ngrx/store';
import { authFeatureKey, AuthFeatureState } from './store/auth.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<{ [authFeatureKey]: AuthFeatureState }>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return this.store.select(authFeatureKey).pipe(
      take(1),
      switchMap(({ user }) => {
        if (!user) return next.handle(req);

        const modifiedRequest = req.clone({
          params: req.params.set('auth', user.token ?? ''),
        });

        return next.handle(modifiedRequest);
      }),
    );
  }
}
