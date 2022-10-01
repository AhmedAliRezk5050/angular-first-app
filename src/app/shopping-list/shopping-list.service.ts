import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import {Subject} from "rxjs";

export class ShoppingListService {
  ingredientsUpdated = new Subject<Ingredient[]>();
  startUpdatingIngredient = new Subject<number>()

  private _ingredients: Ingredient[] = [];

  get ingredients() {
    return this._ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this._ingredients.push(ingredient);
    this.ingredientsUpdated.next(this._ingredients.slice());
  }

  getIngredient = (index: number) => {
    return this.ingredients[index];
  }

  updateIngredient = (index: number, ingredient: Ingredient) => {
    this._ingredients[index] = ingredient;
    this.ingredientsUpdated.next(this.ingredients)
  }

  loadIngredientsFromRecipe(ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
    this.ingredientsUpdated.next(this.ingredients);
  }
}
