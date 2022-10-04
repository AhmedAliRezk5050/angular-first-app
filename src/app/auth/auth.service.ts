import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface SignUpResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}


interface LoginResponse extends SignUpResponse{
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
    )
  }

  signIn(email: string, password: string) {
    return this.http.post<LoginResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
      {email, password, returnSecureToken: true},
      {
        params: {key: this.key}
      }
    )
  }
}
