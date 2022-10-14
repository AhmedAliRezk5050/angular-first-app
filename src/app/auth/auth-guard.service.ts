import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, tap, pipe, map, firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { authFeatureKey, AuthFeatureState } from './store/auth.reducer';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  constructor(
    private store: Store<{ [authFeatureKey]: AuthFeatureState }>,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean | UrlTree> {
    return firstValueFrom(this.store.select(authFeatureKey)).then(
      ({ user }) => {
        if (user) return true;

        return this.router.createUrlTree(['/auth']);
      },
    );
  }
}
