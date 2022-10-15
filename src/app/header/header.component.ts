import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { authFeatureKey, AuthFeatureState } from '../auth/store/auth.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import {
  recipesFeatureKey,
  RecipesFeatureState,
} from '../recipes/store/recipes.reducer';
import { fetchRecipesStart } from '../recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  authFeatureSubscription?: Subscription;

  constructor(
    private store: Store<{
      [authFeatureKey]: AuthFeatureState;
      [recipesFeatureKey]: RecipesFeatureState;
    }>,
  ) {}

  ngOnInit(): void {
    this.authFeatureSubscription = this.store
      .select(authFeatureKey)
      .subscribe(({ user }) => {
        this.isAuthenticated = !!user;
      });
  }

  saveRecipes() {}

  fetchRecipes() {
    this.store.dispatch(fetchRecipesStart());
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  ngOnDestroy(): void {
    this.authFeatureSubscription?.unsubscribe();
  }
}
