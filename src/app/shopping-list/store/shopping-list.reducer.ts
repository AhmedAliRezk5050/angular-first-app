import { createReducer, on } from '@ngrx/store';
import {
  addIngredient,
  updateIngredient,
  deleteIngredient,
  addIngredients,
} from './shopping-list.actions';

import { Ingredient } from '../../shared/ingredient.model';

export const shoppingListFeatureKey = 'shoppingList';

export type ShoppingListFeatureState = Ingredient[];

export const initialState: ShoppingListFeatureState = [
  { name: 'dsd', amount: 5 },
];

export const shoppingListReducer = createReducer(
  initialState,
  on(addIngredient, (state, { ingredient }) => [...state, { ...ingredient }]),
  on(addIngredients, (state, { ingredients }) => {
    return [...state, ...ingredients];
  }),
  on(updateIngredient, (state, { index, ingredient }) => {
    const ingredients = [...state];
    ingredients[index] = { ...ingredient };
    return ingredients;
  }),
  on(deleteIngredient, (state, { index }) =>
    state.filter((_, i) => index != i),
  ),
);
