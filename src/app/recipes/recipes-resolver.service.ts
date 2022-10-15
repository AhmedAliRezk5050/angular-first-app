import { take, filter } from 'rxjs/operators';
import { fetchRecipesStart } from './store/recipes.actions';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from './recipe.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  recipesFeatureKey,
  RecipesFeatureState,
} from './store/recipes.reducer';
import { selectRecipes } from './store/recipes.selectors';

@Injectable({ providedIn: 'root' })
export default class RecipesResolverService
  implements Resolve<Recipe[] | null>
{
  constructor(
    private store: Store<{ [recipesFeatureKey]: RecipesFeatureState }>,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Recipe[] | null> {
    this.store
      .select(selectRecipes)
      .pipe(take(1))
      .subscribe((recipes) => {
        if (!recipes) {
          this.store.dispatch(fetchRecipesStart());
        }
      });

    return this.store.select(selectRecipes).pipe(
      filter((recipes) => !!recipes),
      take(1),
    );
  }
}
