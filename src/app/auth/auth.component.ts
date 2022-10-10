import { Store } from '@ngrx/store';
import { authFeatureKey, AuthFeatureState } from './store/auth.reducer';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertComponent } from '../shared/alert/alert.component';
import { AlertHostDirective } from '../shared/directives/alert-host.directive';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  logInMode = true;

  loading = false;

  error: string | null = null;

  @ViewChild(AlertHostDirective, { static: false })
  appAlertHost!: AlertHostDirective;

  alertSubscription?: Subscription;

  authFeatureSubscription?: Subscription;

  constructor(private store: Store<{ [authFeatureKey]: AuthFeatureState }>) {}

  ngOnInit(): void {
    this.authFeatureSubscription = this.store
      .select(authFeatureKey)
      .subscribe(({ loading, error }) => {
        this.loading = loading;
        this.error = error;
        if (error) {
          this.showErrorAlert(error);
        }
      });
  }

  onSwitchAuthModes() {
    this.logInMode = !this.logInMode;
  }

  onSubmit(authForm: NgForm) {
    const { email, password } = authForm.value;

    if (this.logInMode) {
      this.store.dispatch(
        AuthActions.loginStart({ credentials: { email, password } }),
      );
    }
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
    this.authFeatureSubscription?.unsubscribe();
  }
}
