import { recipesFeatureKey, RecipesFeatureState } from './recipes.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectRecipesFeature =
  createFeatureSelector<RecipesFeatureState>(recipesFeatureKey);

export const selectRecipes = createSelector(
  selectRecipesFeature,
  (state) => state.recipes,
);

export const selectRecipe = (id: string) =>
  createSelector(selectRecipes, (recipes) =>
    recipes?.find((recipe) => recipe.id == id),
  );
