import { createAction, props } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const fetchRecipesStart = createAction('[Recipes] FetchRecipesStart');

export const fetchRecipesSuccess = createAction(
  '[Recipes] FetchRecipesSuccess',
  props<{ recipes: Recipe[] | null }>(),
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

export const createRecipe = createAction(
  '[Recipes] CreateRecipe',
  props<{ recipe: Recipe }>(),
);

export const saveRecipesStart = createAction(
  '[Recipes] SaveRecipesStart',
  props<{ recipes: Recipe[] }>(),
);

export const saveRecipesSuccess = createAction('[Recipes] SaveRecipesSuccess');

export const saveRecipesFail = createAction(
  '[Recipes] SaveRecipesFail',
  props<{ error: string }>(),
);
