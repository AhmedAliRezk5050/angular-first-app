import { Recipe } from './../recipe.model';
import { Component, Input, OnInit } from '@angular/core';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(({recipe}) => {
      this.recipe = recipe;
      this.recipeService.recipeSelected.emit(recipe);
    })
  }

  updateShoppingList() {
    this.recipeService.updateShoppingListIngredientsFromRecipe(
      this.recipe!.ingredients,
    );
  }
}
