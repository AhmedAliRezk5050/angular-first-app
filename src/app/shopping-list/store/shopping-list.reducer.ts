import { createReducer } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import {
  addIngredient,
  updateIngredient,
  deleteIngredient,
  addIngredients,
  setPendingEditIngredientIndex,
} from './shopping-list.actions';

import { Ingredient } from '../../shared/ingredient.model';

export const shoppingListFeatureKey = 'shoppingList';

export type ShoppingListFeatureState = {
  ingredients: Ingredient[];
  pendingEditIngredientIndex: number | null;
};

export const initialState: ShoppingListFeatureState = {
  ingredients: [{ name: 'dsd', amount: 5 }],
  pendingEditIngredientIndex: null,
};

export const shoppingListReducer = createReducer(
  initialState,
  immerOn(addIngredient, (state, { ingredient }) => {
    state.ingredients.push(ingredient);
  }),
  immerOn(addIngredients, (state, { ingredients }) => {
    state.ingredients.push(...ingredients);
  }),
  immerOn(updateIngredient, (state, { index, ingredient }) => {
    state.ingredients[index] = ingredient;
  }),
  immerOn(deleteIngredient, (state, { index }) => {
    state.ingredients.splice(index, 1);
  }),
  immerOn(setPendingEditIngredientIndex, (state, { index }) => {
    state.pendingEditIngredientIndex = index;
  }),
);
