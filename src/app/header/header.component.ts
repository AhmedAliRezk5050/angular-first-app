import { Component, OnInit, OnDestroy } from '@angular/core';
import DataStorageService from '../shared/services/data-storage.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { authFeatureKey, AuthFeatureState } from '../auth/store/auth.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  authFeatureSubscription?: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private store: Store<{ [authFeatureKey]: AuthFeatureState }>,
  ) {}

  ngOnInit(): void {
    this.authFeatureSubscription = this.store
      .select(authFeatureKey)
      .subscribe(({ user }) => {
        this.isAuthenticated = !!user;
      });
  }

  saveRecipes() {
    this.dataStorageService.storeRecipes();
  }

  fetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  ngOnDestroy(): void {
    this.authFeatureSubscription?.unsubscribe();
  }
}
