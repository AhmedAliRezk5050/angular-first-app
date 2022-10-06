import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {exhaustMap, take} from "rxjs/operators";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import User from "./user.model";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.userSubject.pipe(take<User | null>(1), exhaustMap((user) => {

      if (!user) return next.handle(req);

      const modifiedRequest = req.clone({
        params: req.params.set('auth', user.token ?? '')
      })
      return next.handle(modifiedRequest);
    }));
  }
}

