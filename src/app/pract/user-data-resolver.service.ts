import { Injectable } from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class UserDataResolver implements Resolve<data.UserData> {

  constructor(private authService: AuthService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<data.UserData> | Promise<data.UserData> | data.UserData {
    return this.authService.fetchUserData()
  }
}
