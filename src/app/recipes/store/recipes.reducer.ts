import { createReducer } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import { immerOn } from 'ngrx-immer/store';
import {
  createRecipe,
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
    state.recipes = [];
    state.loading = true;
    state.error = null;
  }),
  immerOn(fetchRecipesSuccess, (state, { recipes }) => {
    state.recipes = recipes;
    state.loading = false;
    state.error = null;
  }),
  immerOn(fetchRecipesFail, (state, { error }) => {
    state.recipes = [];
    state.loading = false;
    state.error = error;
  }),
  immerOn(deleteRecipe, (state, { id }) => {
    if (state.recipes) {
      state.recipes = state.recipes.filter((r) => r.id !== id);
    }
  }),
  immerOn(editRecipe, (state, { recipe }) => {
    if (state.recipes) {
      state.recipes = state.recipes.map((r) =>
        r.id === recipe.id ? recipe : r,
      );
    }
  }),
  immerOn(createRecipe, (state, { recipe }) => {
    if (!state.recipes) {
      state.recipes = [];
    }
    state.recipes.push(recipe);
  }),
);
