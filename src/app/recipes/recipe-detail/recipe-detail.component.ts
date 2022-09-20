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
  recipe?: Recipe;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(({id}) => this.recipe = this.recipeService.getRecipe(id))
  }

  updateShoppingList() {
    this.recipeService.updateShoppingListIngredientsFromRecipe(
      this.recipe!.ingredients,
    );
  }
}
