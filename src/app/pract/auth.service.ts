import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private _isLoggedIn = false;

  constructor() {}

  login() {
    this._isLoggedIn = true;
  }

  logout() {
    this._isLoggedIn = false;
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this._isLoggedIn);
      }, 2000);
    });
  }
}
