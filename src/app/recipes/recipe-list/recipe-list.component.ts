import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {

  recipesUpdatedSubscription?: Subscription

  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.recipes;
    this.recipesUpdatedSubscription =  this.recipeService.recipesUpdated.subscribe(recipes => {
      this.recipes = recipes;
    })
  }

  createRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
