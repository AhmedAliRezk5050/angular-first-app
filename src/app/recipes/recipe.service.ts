import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { v4 as uuidv4 } from 'uuid';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import {
  recipesFeatureKey,
  RecipesFeatureState,
} from './store/recipes.reducer';
import * as RecipesActions from './store/recipes.actions';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private url =
    'https://angular-practise-caf1f-default-rtdb.firebaseio.com/recipes.json';

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(this.url, {
        params: {
          print: 'pretty',
        },
      })
      .pipe(
        map((data) => {
          return data.map((recipe) => {
            if (recipe.ingredients) return recipe;
            recipe.ingredients = [];
            return recipe;
          });
        }),
      );
  }

  addRecipe(recipe: Recipe) {
    this.store.dispatch(
      RecipesActions.createRecipe({ recipe: { ...recipe, id: uuidv4() } }),
    );
  }

  constructor(
    private http: HttpClient,
    private store: Store<{
      [recipesFeatureKey]: RecipesFeatureState;
    }>,
  ) {}
}
