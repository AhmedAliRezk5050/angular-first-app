import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.authService.isAuthenticated().then((isLoggedIn) => {
      if (isLoggedIn) {
        return true;
      } else {
        this.router.navigate(['not-allowed']);
        return false;
      }
    });

    // if (isLoggedIn) {
    //   return true;
    // } else {
    //   this.router.navigate(['not-allowed']);
    //   return false;
    // }
  }
}
