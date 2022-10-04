import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import DataStorageService from "../../shared/services/data-storage.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipesUpdatedSubscription?: Subscription

  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService,
              private dataStorageService: DataStorageService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(({recipes}) => {
      this.recipes = recipes;
    })
  }

  createRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.recipesUpdatedSubscription?.unsubscribe();
  }
}
