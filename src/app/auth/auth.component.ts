import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  logInMode = true;
  isLoading = false;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSwitchAuthModes() {
    this.logInMode = !this.logInMode
  }

  onSubmit(authForm: NgForm) {
    const {email, password} = authForm.value
    this.isLoading = true

    const authObs = this.logInMode ?
      this.authService.signIn(email, password)
      : this.authService.signUp(email, password)

    authObs.subscribe({
      next: () => {
        authForm.reset();
        this.error = null;
        this.isLoading = false;
        this.router.navigate(['/recipes'])
      },
      error: err => {
        this.error = err.message;
        this.isLoading = false
      }
    })


  }
}
