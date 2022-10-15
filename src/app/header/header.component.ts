import { Recipe } from './../recipes/recipe.model';
import { selectRecipes } from './../recipes/store/recipes.selectors';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { authFeatureKey, AuthFeatureState } from '../auth/store/auth.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import {
  recipesFeatureKey,
  RecipesFeatureState,
} from '../recipes/store/recipes.reducer';
import * as RecipesActions from '../recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  authFeatureSubscription?: Subscription;
  recipesFeatureSubscription?: Subscription;
  recipes: Recipe[] | null = null;

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

    this.recipesFeatureSubscription = this.store
      .select(selectRecipes)
      .subscribe((recipes) => {
        this.recipes = recipes;
      });
  }

  saveRecipes = async () => {
    if (!this.recipes) return;

    this.store.dispatch(
      RecipesActions.saveRecipesStart({
        recipes: this.recipes,
      }),
    );
  };

  fetchRecipes() {
    this.store.dispatch(RecipesActions.fetchRecipesStart());
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  ngOnDestroy(): void {
    this.authFeatureSubscription?.unsubscribe();
    this.recipesFeatureSubscription?.unsubscribe();
  }
}
