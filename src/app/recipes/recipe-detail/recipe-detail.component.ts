import { tap } from 'rxjs/operators';
import {
  recipesFeatureKey,
  RecipesFeatureState,
} from './../store/recipes.reducer';
import { addIngredients } from './../../shopping-list/store/shopping-list.actions';
import { Store } from '@ngrx/store';
import { Recipe } from './../recipe.model';
import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  shoppingListFeatureKey,
  ShoppingListFeatureState,
} from 'src/app/shopping-list/store/shopping-list.reducer';
import { selectRecipe } from '../store/recipes.selectors';

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
      [recipesFeatureKey]: RecipesFeatureState;
    }>,
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap(({ id }) => {
          this.store
            .select(selectRecipe(id))
            .pipe(
              tap((rcp) => {
                this.recipe = rcp;
              }),
            )
            .subscribe();
        }),
      )
      .subscribe();
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
