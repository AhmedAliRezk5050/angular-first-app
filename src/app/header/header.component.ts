import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import DataStorageService from "../shared/services/data-storage.service";
import {RecipeService} from "../recipes/recipe.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) {}
  ngOnInit(): void {}

  saveRecipes() {
    this.dataStorageService.storeRecipes()
  }

  fetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
