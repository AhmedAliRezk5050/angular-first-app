import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

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


  private key = 'AIzaSyBqIwnjLvSM3QKHrXWtakQlyWFFrwsaXCk'

  constructor(private http: HttpClient) {
  }

  signUp(email: string, password: string) {
    return this.http.post<SignUpResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp',
      {email, password, returnSecureToken: true},
      {
        params: {key: this.key}
      }
    ).pipe(catchError(this.handleError))
  }

  signIn(email: string, password: string) {
    return this.http.post<LoginResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
      {email, password, returnSecureToken: true},
      {
        params: {key: this.key}
      }
    ).pipe(catchError(this.handleError))
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
}

