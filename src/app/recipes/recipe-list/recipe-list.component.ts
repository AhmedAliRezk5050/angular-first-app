import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() recipeSelected = new EventEmitter<Recipe>();

  recipes = [
    new Recipe(
      'r1',
      'Recipe Name test',
      'Recipe Description 1',
      'https://images.immediate.co.uk/production/volatile/sites/2/2019/04/Dum-Aloo-e163632.jpg?quality=45&resize=768,574',
    ),
    new Recipe(
      'r2',
      'Recipe Name test2',
      'Recipe Description 2',
      'https://images.immediate.co.uk/production/volatile/sites/2/2019/04/Dum-Aloo-e163632.jpg?quality=45&resize=768,574',
    ),
  ];

  constructor() {}

  ngOnInit(): void {}

  onRecipeAdded(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  onRecipeSelected(id: string) {
    const selectedRecipe = this.recipes.find((r) => r.id === id);
    this.recipeSelected.emit(selectedRecipe);
  }
}
