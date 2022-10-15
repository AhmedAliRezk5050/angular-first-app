import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as RecipesActions from './recipes.actions';
import { exhaustMap } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { map } from 'rxjs/operators';

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

  constructor(
    private actions$: Actions,
    private recipesService: RecipeService,
  ) {}
}
