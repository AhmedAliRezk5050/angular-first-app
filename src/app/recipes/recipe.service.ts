import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Recipe} from './recipe.model';
import {v4 as uuidv4} from 'uuid';
import {Subject} from "rxjs";
import DataStorageService from "../shared/services/data-storage.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesUpdated = new Subject<Recipe[]>();

  private _recipes: Recipe[] = [];

  get recipes() {
    return this._recipes.slice();
  }

  getRecipe(id: string) {
    return this.recipes.find(r => r.id === id)
  }

  constructor(private shoppingListService: ShoppingListService) {
  }


  setRecipes(recipes: Recipe[]) {
    this._recipes = recipes;
    this.recipesUpdated.next(this.recipes);
  }

  addRecipe(recipe: Recipe) {
    this._recipes.push({
      ...recipe,
      id: uuidv4()
    })
    this.recipesUpdated.next(this.recipes);
  }

  editRecipe(recipe: Recipe) {
    const recipeIndex = this._recipes.findIndex(r => r.id == recipe.id);
    this._recipes[recipeIndex] = recipe;
    this.recipesUpdated.next(this.recipes);
  }

  deleteRecipe(id: string) {
    this._recipes = this._recipes.filter(r => r.id !== id);
    this.recipesUpdated.next(this.recipes);
  }

  updateShoppingListIngredientsFromRecipe(ingredients: Ingredient[]) {
    this.shoppingListService.loadIngredientsFromRecipe(ingredients);
  }

}
