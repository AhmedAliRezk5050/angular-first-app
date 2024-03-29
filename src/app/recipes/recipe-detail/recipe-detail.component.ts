import { map, switchMap, tap, catchError } from 'rxjs/operators';
import {
  recipesFeatureKey,
  RecipesFeatureState,
} from '../store/recipes.reducer';
import { addIngredients } from '../../shopping-list/store/shopping-list.actions';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  shoppingListFeatureKey,
  ShoppingListFeatureState,
} from 'src/app/shopping-list/store/shopping-list.reducer';
import * as RecipesActions from '../store/recipes.actions';
import { EMPTY } from 'rxjs';
import { AppRoutes } from 'src/app/shared/AppRoutes';

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
        switchMap(({ id }) => {
          return this.route.data.pipe(
            tap((rcp) => {
              this.recipe = rcp['recipes'].find((r: Recipe) => r.id === id);
              if (!this.recipe) {
                throw new Error('Recipe is not found');
              }
            }),
            catchError(() => {
              this.router.navigate([`/${AppRoutes.NotFound}`]);
              return EMPTY;
            }),
          );
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
    this.store.dispatch(RecipesActions.deleteRecipe({ id: this.recipe?.id! }));
    this.router.navigate(['recipes']);
  }
}
