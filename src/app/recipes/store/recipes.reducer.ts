import { createReducer } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import { immerOn } from 'ngrx-immer/store';
import {
  deleteRecipe,
  editRecipe,
  fetchRecipesFail,
  fetchRecipesStart,
  fetchRecipesSuccess,
} from './recipes.actions';

export const recipesFeatureKey = 'recipes';

export interface RecipesFeatureState {
  recipes: Recipe[] | null;
  loading: boolean;
  error: string | null;
}

const recipesInitialState: RecipesFeatureState = {
  recipes: null,
  loading: false,
  error: null,
};

export const recipesReducer = createReducer(
  recipesInitialState,
  immerOn(fetchRecipesStart, (state) => {
    state.recipes = null;
    state.loading = true;
    state.error = null;
  }),
  immerOn(fetchRecipesSuccess, (state, { recipes }) => {
    state.recipes = recipes;
    state.loading = false;
    state.error = null;
  }),
  immerOn(fetchRecipesFail, (state, { error }) => {
    state.recipes = null;
    state.loading = false;
    state.error = error;
  }),
  immerOn(deleteRecipe, (state, { id }) => {
    const recipes = state.recipes;
    if (recipes) {
      state.recipes = recipes.filter((r) => r.id !== id);
    }
  }),
  immerOn(editRecipe, (state, { recipe }) => {
    const recipes = state.recipes;
    if (recipes) {
      state.recipes = recipes.map((r) => (r.id === recipe.id ? recipe : r));
    }
  }),
);
