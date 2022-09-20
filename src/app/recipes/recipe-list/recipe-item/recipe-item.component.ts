import { Recipe } from './../../recipe.model';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe!: Recipe;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {}

  addRecipe(recipe: Recipe) {
    // this.recipeService.addRecipe(recipe);
  }

  onRecipeSelected() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
