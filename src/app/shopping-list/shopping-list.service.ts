import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientsUpdated = new EventEmitter<Ingredient[]>();

  private _ingredients: Ingredient[] = [
    new Ingredient('Apples', 236),
    new Ingredient('Meat', 936),
  ];

  get ingredients() {
    return this._ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this._ingredients.push(ingredient);
    this.ingredientsUpdated.emit(this._ingredients.slice());
  }
}
