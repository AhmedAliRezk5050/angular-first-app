import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.authService.userSubject.subscribe(user => {
      if (user) {
        console.log(user.tokenExpiryDuration)
        this.authService.autoLogout(user.tokenExpiryDuration)
      } else {
        this.authService.resetAutoLogout()
        this.router.navigate(['/auth'])
      }
    })
  }
}

