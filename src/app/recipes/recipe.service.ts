import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Recipe} from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private _recipes = [
    new Recipe(
      'r1',
      'Recipe Name test',
      'Recipe Description 1',
      'https://images.immediate.co.uk/production/volatile/sites/2/2019/04/Dum-Aloo-e163632.jpg?quality=45&resize=768,574',
      [new Ingredient('Meat', 30), new Ingredient('Salad', 10)],
    ),
    new Recipe(
      'r2',
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
}
