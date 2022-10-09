import {
  shoppingListFeatureKey,
  ShoppingListFeatureState,
} from './shopping-list.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectShoppingList =
  createFeatureSelector<ShoppingListFeatureState>(shoppingListFeatureKey);

export const selectIngredients = createSelector(
  selectShoppingList,
  (state) => state.ingredients,
);

export const selectIngredient = (index: number) =>
  createSelector(selectIngredients, (ingredients) => ingredients[index]);

export const selectPendingEditIngredientIndex = createSelector(
  selectShoppingList,
  (shoppingList) => shoppingList.pendingEditIngredientIndex,
);
