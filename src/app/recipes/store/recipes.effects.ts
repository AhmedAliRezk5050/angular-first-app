import { selectRecipes } from './recipes.selectors';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as RecipesActions from './recipes.actions';
import { exhaustMap } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { map, withLatestFrom } from 'rxjs/operators';
import { recipesFeatureKey, RecipesFeatureState } from './recipes.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export default class RecipesEffects {
  fetchRecipesStart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipesActions.fetchRecipesStart),
        exhaustMap(
          (action) => {
            return this.recipesService.fetchRecipes().pipe(
              map((recipes) => {
                return RecipesActions.fetchRecipesSuccess({ recipes });
              }), // fetchRecipes => map
            ); // fetchRecipes => pipe
          }, // action
        ), // exhaustMap
      ), // pipe
  ); // createEffect

  saveRecipesStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.saveRecipesStart),
      withLatestFrom(this.store.select(selectRecipes)),
      exhaustMap(([_, recipes]) => {
        debugger;
        return this.recipesService.storeRecipes(recipes ?? []).pipe(
          map(() => {
            return RecipesActions.saveRecipesSuccess();
          }),
        );
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private recipesService: RecipeService,
    private store: Store<{ [recipesFeatureKey]: RecipesFeatureState }>,
  ) {}
}
