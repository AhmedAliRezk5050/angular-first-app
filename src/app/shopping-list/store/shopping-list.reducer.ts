import { createReducer, on } from '@ngrx/store';
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
  on(addIngredient, (state, { ingredient }) => ({
    ...state,
    ingredients: [...state.ingredients, { ...ingredient }],
  })),
  on(addIngredients, (state, { ingredients }) => ({
    ...state,
    ingredients: [...state.ingredients, ...ingredients],
  })),
  on(updateIngredient, (state, { index, ingredient }) => {
    const ingredients = [...state.ingredients];
    ingredients[index] = { ...ingredient };
    return {
      ...state,
      ingredients,
    };
  }),
  on(deleteIngredient, (state, { index }) => ({
    ...state,
    ingredients: state.ingredients.filter((_, i) => index != i),
  })),
  on(setPendingEditIngredientIndex, (state, { index }) => ({
    ...state,
    pendingEditIngredientIndex: index,
  })),
);
