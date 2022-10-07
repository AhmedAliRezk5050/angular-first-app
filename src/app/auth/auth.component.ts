import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { AlertHostDirective } from '../shared/directives/alert-host.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  logInMode = true;

  isLoading = false;

  error: string | null = null;

  @ViewChild(AlertHostDirective, { static: false })
  appAlertHost!: AlertHostDirective;

  alertSubscription?: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSwitchAuthModes() {
    this.logInMode = !this.logInMode;
  }

  onSubmit(authForm: NgForm) {
    const { email, password } = authForm.value;
    this.isLoading = true;

    const authObs = this.logInMode
      ? this.authService.signIn(email, password)
      : this.authService.signUp(email, password);

    authObs.subscribe({
      next: () => {
        authForm.reset();
        this.error = null;
        this.router.navigate(['/recipes']);
      },
      error: (err) => {
        this.error = err.message;
        this.isLoading = false;
        this.showErrorAlert(err.message);
      },
    });
  }

  private showErrorAlert(errorMessage: string) {
    const viewContainerRef = this.appAlertHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef =
      viewContainerRef.createComponent<AlertComponent>(AlertComponent);
    componentRef.instance.message = errorMessage;
    this.alertSubscription = componentRef.instance.close.subscribe(() => {
      viewContainerRef.clear();
      this.alertSubscription?.unsubscribe();
    });
  }

  ngOnDestroy(): void {
    this.alertSubscription?.unsubscribe();
  }
}
