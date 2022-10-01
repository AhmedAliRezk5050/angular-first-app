import { Ingredient } from './../shared/ingredient.model';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];

  private listServiceSub?: Subscription

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.ingredients;

    this.listServiceSub = this.shoppingListService.ingredientsUpdated.subscribe(
      (updatedIngredients) => (this.ingredients = updatedIngredients),
    );
  }

  ngOnDestroy(): void {
    this.listServiceSub?.unsubscribe();
  }

  onEditIngredient(i: number) {
    this.shoppingListService.startUpdatingIngredient.next(i);
  }
}
