import { Recipe } from './../recipe.model';
import { selectRecipe } from './../store/recipes.selectors';
import { firstValueFrom } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../shared/ingredient.model';
import { Store } from '@ngrx/store';
import {
  recipesFeatureKey,
  RecipesFeatureState,
} from '../store/recipes.reducer';
import * as RecipesActions from '../store/recipes.actions';
import { AppRoutes } from 'src/app/shared/AppRoutes';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id?: string;
  editMode: boolean = false;
  modeMessage = 'new';
  recipeForm!: FormGroup;
  recipe?: Recipe;
  get ingredientsFormArray() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private store: Store<{
      [recipesFeatureKey]: RecipesFeatureState;
    }>,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      debugger;
      this.id = id;
      this.editMode = !!id;
      this.modeMessage = this.editMode ? 'edit' : 'new';
      this.initForm();
    });
  }

  private initForm = async () => {
    let name = '';
    let description = '';
    let imagePath = '';
    let ingredients: Ingredient[] = [];

    if (this.editMode) {
      this.recipe = await firstValueFrom(
        this.store.select(selectRecipe(this.id!)),
      );
      if (!this.recipe) {
        this.router.navigate([`/${AppRoutes.NotFound}`]);
      }
      name = this.recipe!.name;
      description = this.recipe!.description;
      imagePath = this.recipe!.imagePath;
      ingredients = this.recipe!.ingredients;
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      description: new FormControl(description, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      ingredients: new FormArray([]),
    });

    ingredients.forEach((ing) => {
      this.ingredientsFormArray.push(
        new FormGroup({
          name: new FormControl(ing.name, Validators.required),
          amount: new FormControl(ing.amount, [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/),
          ]),
        }),
      );
    });
  };

  onSubmit() {
    const formValue = this.recipeForm.value;
    if (this.editMode) {
      this.store.dispatch(
        RecipesActions.editRecipe({ recipe: { id: this.id!, ...formValue } }),
      );
    } else {
      this.recipeService.addRecipe({ ...formValue });
    }
    this.router.navigate(['/recipes']);
  }

  onAddIngredient() {
    this.ingredientsFormArray.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      }),
    );
  }

  onCancel() {
    this.router.navigate(['/recipes']);
  }

  onDeleteIngredient(index: number) {
    this.ingredientsFormArray.removeAt(index);
  }
}
