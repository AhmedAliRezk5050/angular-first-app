import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { v4 as uuidv4 } from 'uuid';
import { Subject } from 'rxjs';
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
  recipesUpdated = new Subject<Recipe[]>();

  private _recipes: Recipe[] = [];

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

  get recipes() {
    return this._recipes.slice();
  }

  getRecipe(id: string) {
    return this.recipes.find((r) => r.id === id);
  }

  setRecipes(recipes: Recipe[]) {
    this._recipes = recipes;
    this.recipesUpdated.next(this.recipes);
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
