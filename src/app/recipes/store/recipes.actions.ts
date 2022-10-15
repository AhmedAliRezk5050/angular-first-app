import { createAction, props } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const fetchRecipesStart = createAction('[Recipes] FetchRecipesStart');

export const fetchRecipesSuccess = createAction(
  '[Recipes] FetchRecipesSuccess',
  props<{ recipes: Recipe[] }>(),
);

export const fetchRecipesFail = createAction(
  '[Recipes] FetchRecipesFail',
  props<{ error: string }>(),
);

export const deleteRecipe = createAction(
  '[Recipes] DeleteRecipe',
  props<{ id: string }>(),
);

export const editRecipe = createAction(
  '[Recipes] EditRecipe',
  props<{ recipe: Recipe }>(),
);
