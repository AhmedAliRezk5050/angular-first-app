import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of} from 'rxjs';
import User from './user.model';
import {Router} from '@angular/router';
import {Store} from "@ngrx/store";
import {authFeatureKey, AuthFeatureState} from "./store/auth.reducer";
import * as AuthActions from "./store/auth.actions";

export interface SignUpResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

enum ResponseErrorMessage {
  EmailNotFound = 'EMAIL_NOT_FOUND',
  WrongPassword = 'INVALID_PASSWORD',
  EmailExists = 'EMAIL_EXISTS',
}

export interface LoginResponse extends SignUpResponse {
  registered: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logoutTimer: any;

  private key = 'AIzaSyBqIwnjLvSM3QKHrXWtakQlyWFFrwsaXCk';

  constructor(private http: HttpClient, private router: Router, private store: Store<{ [authFeatureKey]: AuthFeatureState }>) {
  }

  signUp(email: string, password: string) {
    return this.http.post<SignUpResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp',
      {email, password, returnSecureToken: true},
      {
        params: {key: this.key},
      },
    );
  }

  signIn(email: string, password: string) {
    return this.http.post<LoginResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
      {email, password, returnSecureToken: true},
      {
        params: {key: this.key},
      },
    );
  }

  getUserFromLocalStorage() : Observable<User | null> {
    const userData = localStorage.getItem('userData');

    if (!userData) return of(null);

    const {id, email, _token, _tokenExpirationDate} = JSON.parse(
      userData,
    ) as { [key: string]: string };

    const user = new User(email, id, _token, new Date(_tokenExpirationDate));

    if (!user.token) return of(null);

    return of(user)

  }

  autoLogout(expiryDuration: number) {
    console.log(expiryDuration)
    this.logoutTimer = setTimeout(() => {
      this.store.dispatch(AuthActions.logout())
    }, expiryDuration);
  }

  resetAutoLogout() {
    clearTimeout(this.logoutTimer);
    this.logoutTimer = null;
  }

  handleError = (errorResponse: any) => {
    let errorMessage = 'Unknown error occurred';

    const serverErrorMessage: ResponseErrorMessage | undefined =
      errorResponse.error?.error?.message;

    if (!serverErrorMessage) return of(errorMessage);

    switch (serverErrorMessage) {
      case ResponseErrorMessage.EmailNotFound:
        errorMessage = 'No user found with the provided email';
        break;
      case ResponseErrorMessage.WrongPassword:
        errorMessage = 'Wrong Password';
        break;
      case ResponseErrorMessage.EmailExists:
        errorMessage = 'Email already exists';
    }

    return of(errorMessage);
  };

  storeUserData = (
    email: string,
    id: string,
    expiresIn: string,
    token: string,
  ) => {
    const user = new User(
      email,
      id,
      token,
      new Date(Date.now() + +expiresIn * 1000),
    );
    localStorage.setItem('userData', JSON.stringify(user));
  };
}
