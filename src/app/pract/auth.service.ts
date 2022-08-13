import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private _isLoggedIn = false;

   private _userData: data.UserData = {
     name: "Ahmed",
     age: 31
   }

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

  get userData() {
     return this._userData
  }

  fetchUserData(): Promise<data.UserData> {
     return new Promise((resolve, reject) => {
       setTimeout(() => {
         resolve(this.userData)
       }, 2000);
     })
  }
}
