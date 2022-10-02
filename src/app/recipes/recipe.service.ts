import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Recipe} from './recipe.model';
import { v4 as uuidv4 } from 'uuid';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesUpdated = new Subject<Recipe[]>();

  private _recipes = [
    new Recipe(
      '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      'Recipe Name test',
      'Recipe Description 1',
      'https://images.immediate.co.uk/production/volatile/sites/2/2019/04/Dum-Aloo-e163632.jpg?quality=45&resize=768,574',
      [new Ingredient('Meat', 30), new Ingredient('Salad', 10)],
    ),
    new Recipe(
      '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
      'Recipe Name test2',
      'Recipe Description 2',
      'https://images.immediate.co.uk/production/volatile/sites/2/2019/04/Dum-Aloo-e163632.jpg?quality=45&resize=768,574',
      [
        new Ingredient('chicken', 10),
        new Ingredient('Salt', 5),
        new Ingredient('onion', 6),
      ],
    ),
  ];

  get recipes() {
    return this._recipes.slice();
  }

  getRecipe(id: string) {
    return this.recipes.find(r => r.id === id)
  }

  recipeSelected = new EventEmitter<Recipe>();

  constructor(private shoppingListService: ShoppingListService) {
  }

  updateShoppingListIngredientsFromRecipe(ingredients: Ingredient[]) {
    this.shoppingListService.loadIngredientsFromRecipe(ingredients);
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

}
