import { recipesFeatureKey, RecipesFeatureState } from './recipes.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectRecipesFeature =
  createFeatureSelector<RecipesFeatureState>(recipesFeatureKey);

export const selectRecipes = createSelector(
  selectRecipesFeature,
  (state) => state.recipes,
);
