import { addIngredients } from './../../shopping-list/store/shopping-list.actions';
import { Store } from '@ngrx/store';
import { Recipe } from './../recipe.model';
import { Component, Input, OnInit } from '@angular/core';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  shoppingListFeatureKey,
  ShoppingListFeatureState,
} from 'src/app/shopping-list/store/shopping-list.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe?: Recipe;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{
      [shoppingListFeatureKey]: ShoppingListFeatureState;
    }>,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      ({ id }) => (this.recipe = this.recipeService.getRecipe(id)),
    );
  }

  updateShoppingList() {
    this.store.dispatch(
      addIngredients({ ingredients: this.recipe!.ingredients }),
    );
  }

  editRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe!.id);
    this.router.navigate(['recipes']);
  }
}
