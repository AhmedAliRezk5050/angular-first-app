import { createReducer, on } from '@ngrx/store';
import {
  addIngredient,
  updateIngredient,
  deleteIngredient,
} from './shopping-list.actions';

import { Ingredient } from '../../shared/ingredient.model';

export const shoppingListFeatureKey = 'shoppingList';

export type ShoppingListFeatureState = { ingredients: Ingredient[] };

export const initialState: ShoppingListFeatureState = {
  ingredients: [{ name: 'dsd', amount: 5 }],
};

export const shoppingListReducer = createReducer(
  initialState,
  on(addIngredient, (state, { ingredient }) => ({
    ...state,
    ingredients: [...state.ingredients, ingredient],
  })),
  on(updateIngredient, (state, { index, ingredient }) => {
    const ingredients = [...state.ingredients];
    ingredients[index] = ingredient;
    return {
      ...state,
      ingredients,
    };
  }),
  on(deleteIngredient, (state, { index }) => ({
    ...state,
    ingredients: state.ingredients
      .slice(0, index)
      .concat(state.ingredients.slice(index + 1, state.ingredients.length)),
  })),
);
