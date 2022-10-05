import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  logInMode = true;
  isLoading = false;
  error: string | null = null;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onSwitchAuthModes() {
    this.logInMode = !this.logInMode
  }

  onSubmit(authForm: NgForm) {
    const {email, password} = authForm.value
    this.isLoading = true
    if (this.logInMode) {
      this.authService.signIn(email, password).subscribe({
        next: res => {
          authForm.reset();
          this.isLoading = false
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.error = 'Auth failed'
          this.isLoading = false
        }
      })
    } else {
      this.authService.signUp(email, password).subscribe({
        next: res => {
          authForm.reset();
          this.isLoading = false
        },
        error: errorMessage => {
          this.error = errorMessage;
          this.isLoading = false
        }
      })
    }
  }
}
