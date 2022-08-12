import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pract',
  templateUrl: './pract.component.html',
  styleUrls: ['./pract.component.css'],
})
export class PractComponent implements OnInit {
  message: string = 'ali';

  authStatus = 'Guest';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  login() {
    this.authService.login();
    this.authStatus = 'Member';
  }

  logout() {
    this.authService.logout();
    this.authStatus = 'Guest';
  }
}
