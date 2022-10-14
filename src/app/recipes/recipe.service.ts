import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Recipe} from './recipe.model';
import {v4 as uuidv4} from 'uuid';
import {Subject} from 'rxjs';
import DataStorageService from '../shared/services/data-storage.service';
import {map, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesUpdated = new Subject<Recipe[]>();

  private _recipes: Recipe[] = [];

  private url = 'https://angular-practise-caf1f-default-rtdb.firebaseio.com/recipes.json'

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.url,
      {
        params: {
          'print': 'pretty'
        }
      }).pipe(
      map(
        data => {
          return data.map(recipe => {
            if (recipe.ingredients) return recipe;
            recipe.ingredients = [];
            return recipe;
          })
        })
    )
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
    this._recipes.push({
      ...recipe,
      id: uuidv4(),
    });
    this.recipesUpdated.next(this.recipes);
  }

  editRecipe(recipe: Recipe) {
    const recipeIndex = this._recipes.findIndex((r) => r.id == recipe.id);
    this._recipes[recipeIndex] = recipe;
    this.recipesUpdated.next(this.recipes);
  }

  deleteRecipe(id: string) {
    this._recipes = this._recipes.filter((r) => r.id !== id);
    this.recipesUpdated.next(this.recipes);
  }

  constructor(private http: HttpClient) {
  }
}
