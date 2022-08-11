import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientsUpdated = new EventEmitter<Ingredient[]>();

  private _ingredients: Ingredient[] = [];

  get ingredients() {
    return this._ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this._ingredients.push(ingredient);
    this.ingredientsUpdated.emit(this._ingredients.slice());
  }

  loadIngredientsFromRecipe(ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
    this.ingredientsUpdated.emit(this._ingredients.slice());
  }
}
