import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import User from "./user.model";
import {Router} from "@angular/router";

interface SignUpResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

enum ResponseErrorMessage {
  EmailNotFound = 'EMAIL_NOT_FOUND',
  WrongPassword = 'INVALID_PASSWORD',
  EmailExists = 'EMAIL_EXISTS'
}

interface LoginResponse extends SignUpResponse {
  registered: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject holds the prev value in addition to upcoming values,
  // so we use it to get user value on demand
  userSubject = new BehaviorSubject<User | null>(null)

  logoutTimer: any

  private key = 'AIzaSyBqIwnjLvSM3QKHrXWtakQlyWFFrwsaXCk'

  constructor(private http: HttpClient) {
  }

  signUp(email: string, password: string) {
    return this.http.post<SignUpResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp',
      {email, password, returnSecureToken: true},
      {
        params: {key: this.key}
      }
    ).pipe(tap(({email, idToken, localId, expiresIn}) =>
        this.storeUserData(email, localId, expiresIn, idToken)),
      catchError(this.handleError))
  }

  signIn(email: string, password: string) {
    return this.http.post<LoginResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
      {email, password, returnSecureToken: true},
      {
        params: {key: this.key}
      }
    ).pipe(tap(({email, idToken, localId, expiresIn}) =>
        this.storeUserData(email, localId, expiresIn, idToken)),
      catchError(this.handleError))
  }

  logout() {
    this.userSubject.next(null);
    localStorage.removeItem('userData');
  }

  autoLogin() {
    const userData = localStorage.getItem('userData');

    if (!userData) return;

    const {id, email, _token, _tokenExpirationDate} = JSON.parse(userData) as { [key: string]: string };

    const user = new User(email, id, _token, new Date(_tokenExpirationDate))

    if (!user.token) return;

    this.userSubject.next(user);
  }

  autoLogout(expiryDuration: number) {
    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, expiryDuration)
  }

  resetAutoLogout() {
    clearTimeout(this.logoutTimer);
    this.logoutTimer = null;
  }

  private handleError = (errorResponse: any, caught: Observable<SignUpResponse | LoginResponse>) => {
    let errorMessage = 'Unknown error occurred'

    const serverErrorMessage: ResponseErrorMessage | undefined = errorResponse.error?.error?.message;

    if (!serverErrorMessage) throw new Error(errorMessage);

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

    throw new Error(errorMessage);
  }

  private storeUserData = (email: string, id: string, expiresIn: string, token: string) => {
    const user = new User(email, id, token, new Date(Date.now() + (+expiresIn * 1000)));
    this.userSubject.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

}
