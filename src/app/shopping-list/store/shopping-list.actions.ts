import { Ingredient } from '../../shared/ingredient.model';
import { createAction, props } from '@ngrx/store';

export const addIngredient = createAction(
  '[ShoppingList Page] AddIngredient',
  props<{ ingredient: Ingredient }>(),
);

export const addIngredients = createAction(
  '[ShoppingList Page] AddIngredients',
  props<{ ingredients: Ingredient[] }>(),
);

export const updateIngredient = createAction(
  '[ShoppingList Page] UpdateIngredient',
  props<{ index: number; ingredient: Ingredient }>(),
);
export const deleteIngredient = createAction(
  '[ShoppingList Page] DeleteIngredient',
  props<{ index: number }>(),
);
