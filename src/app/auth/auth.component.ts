import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  logInMode = false;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSwitchAuthModes() {
    this.logInMode = !this.logInMode
  }

  onSubmit(authForm: NgForm) {
    const {email, password} = authForm.value
    if(this.logInMode) {
      this.authService.signIn(email, password).subscribe(res => {
        console.log(res);
        authForm.reset();
      })
    } else {
      this.authService.signUp(email, password).subscribe(res => {
        console.log(res);
        authForm.reset();
      })
    }
  }
}
