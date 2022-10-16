import { AppRoutes } from './../shared/AppRoutes';
import { take, filter } from 'rxjs/operators';
import { fetchRecipesStart } from './store/recipes.actions';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from './recipe.model';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
    private router: Router,
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
      filter((recipes) => {
        if (!recipes) throw new Error('Failed to fetch recipes');

        return !!recipes && recipes.length > 0;
      }),
      catchError((err) => {
        this.router.navigate([`/${AppRoutes.NotFound}`]);
        return EMPTY;
      }),
      take(1),
    );
  }
}
