import { createReducer, on } from '@ngrx/store';
import {
  addIngredient,
  updateIngredient,
  deleteIngredient,
} from './shopping-list.actions';

import { Ingredient } from '../../shared/ingredient.model';

export const shoppingListFeatureKey = 'shoppingList';

export type ShoppingListFeatureState = Ingredient[];

export const initialState: ShoppingListFeatureState = [
  { name: 'dsd', amount: 5 },
];

export const shoppingListReducer = createReducer(
  initialState,
  on(addIngredient, (state, { ingredient }) => [...state, ingredient]),
  on(updateIngredient, (state, { index, ingredient }) => {
    const ingredients = [...state];
    ingredients[index] = ingredient;
    return ingredients;
  }),
  on(deleteIngredient, (state, { index }) =>
    state.slice(0, index).concat(state.slice(index + 1, state.length)),
  ),
);
