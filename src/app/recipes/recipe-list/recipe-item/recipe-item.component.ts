import { Recipe } from './../../recipe.model';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe!: Recipe;

  @Output() recipeAdded = new EventEmitter<Recipe>();

  @Output() recipeSelected = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['recipe']);
  }

  addRecipe(recipe: Recipe) {
    this.recipeAdded.emit(recipe);
  }

  onRecipeSelected(e: Event) {
    e.preventDefault();
    this.recipeSelected.emit();
  }
}
