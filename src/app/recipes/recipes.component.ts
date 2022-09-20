import {RecipeService} from './recipe.service';
import {Recipe} from './recipe.model';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesComponent implements OnInit {
  selectedRecipe?: Recipe;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private cd: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe(
      (r) => {
        this.selectedRecipe = r;
        this.cd.detectChanges();
      },
    );
  }
}
