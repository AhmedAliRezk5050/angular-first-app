import { selectIngredients } from './store/shopping-list.selectors';
import { Ingredient } from './../shared/ingredient.model';
import { setPendingEditIngredientIndex } from './store/shopping-list.actions';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  ShoppingListFeatureState,
  shoppingListFeatureKey,
} from './store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!: Observable<Ingredient[]>;

  private listServiceSub?: Subscription;

  constructor(
    private store: Store<{
      [shoppingListFeatureKey]: ShoppingListFeatureState;
    }>,
  ) {}

  ngOnInit(): void {
    this.ingredients = this.store.select(selectIngredients);
  }

  ngOnDestroy(): void {
    this.listServiceSub?.unsubscribe();
  }

  onEditIngredient(i: number) {
    this.store.dispatch(setPendingEditIngredientIndex({ index: i }));
  }
}
