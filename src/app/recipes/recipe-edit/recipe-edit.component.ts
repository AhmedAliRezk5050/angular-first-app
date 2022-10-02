import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id?: string;
  editMode: boolean = false;
  modeMessage = "new"
  recipeForm!: FormGroup

  get recipeFormControls()  {
    return this.recipeForm.controls;
}

get ingredientsFormArray() {
    return (this.recipeForm.get('ingredients') as FormArray)
}

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(({id}) => {
      this.id = id;
      this.editMode = !!id;
      this.modeMessage = this.editMode ? "edit" : "new"
      this.initForm()
    })
  }

  private initForm() {
    let name = ''
    let description = ''
    let imagePath = ''
    let ingredients: Ingredient[] = [];

    if(this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id!);
      name = recipe!.name;
      description = recipe!.description;
      imagePath = recipe!.imagePath;
      ingredients = recipe!.ingredients;
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(name),
      'description': new FormControl(description),
      'imagePath': new FormControl(imagePath),
      'ingredients': new FormArray([])
    });

    ingredients.forEach(ing => {
      this.ingredientsFormArray.push(new FormGroup({
        'name': new FormControl(ing.name),
        'amount': new FormControl(ing.amount)
      }))
    })
  }

  onSubmit() {
    console.log(this.recipeForm.value)
  }

  onAddIngredient() {
    this.ingredientsFormArray.push(new FormGroup({
      'name': new FormControl(null),
      'amount': new FormControl(null)
    }))
  }
}
