import * as ShoppingListActions from './../store/shopping-list.actions';
import {
  selectIngredient,
  selectIngredients,
  selectPendingEditIngredientIndex,
} from './../store/shopping-list.selectors';
import { Store } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, firstValueFrom } from 'rxjs';
import {
  shoppingListFeatureKey,
  ShoppingListFeatureState,
} from '../store/shopping-list.reducer';
import {
  deleteIngredient,
  updateIngredient,
  setPendingEditIngredientIndex,
} from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form?: NgForm;
  editMode = false;
  pendingEditIngredientIndex!: number;
  pendingEditSubscription?: Subscription;
  constructor(
    private store: Store<{
      [shoppingListFeatureKey]: ShoppingListFeatureState;
    }>,
  ) {}

  ngOnInit(): void {
    this.pendingEditSubscription = this.store
      .select(selectPendingEditIngredientIndex)
      .subscribe((pendingEditIngredientIndex) => {
        if (pendingEditIngredientIndex != null) {
          this.editMode = true;
          this.pendingEditIngredientIndex = pendingEditIngredientIndex;
          firstValueFrom(
            this.store.select(selectIngredient(pendingEditIngredientIndex)),
          ).then((ingredient) => {
            this.form?.setValue({
              name: ingredient.name,
              amount: ingredient.amount,
            });
          });
        }
      });
  }

  async upsertIngredient(form: NgForm) {
    const formValue = form.value;
    const pendingUpsertIngredient = new Ingredient(
      formValue.name,
      +formValue.amount,
    );
    if (this.editMode) {
      this.store.dispatch(setPendingEditIngredientIndex({ index: null }));
      this.store.dispatch(
        updateIngredient({
          index: this.pendingEditIngredientIndex,
          ingredient: pendingUpsertIngredient,
        }),
      );
      this.editMode = false;
    } else {
      this.store.dispatch(
        ShoppingListActions.addIngredient({
          ingredient: pendingUpsertIngredient,
        }),
      );
    }
    this.form?.reset();
  }

  clearForm() {
    this.form?.reset();
    this.editMode = false;
    this.store.dispatch(setPendingEditIngredientIndex({ index: null }));
  }

  deleteIngredient() {
    this.store.dispatch(
      ShoppingListActions.deleteIngredient({
        index: this.pendingEditIngredientIndex,
      }),
    );
    this.clearForm();
  }

  ngOnDestroy(): void {
    this.store.dispatch(setPendingEditIngredientIndex({ index: null }));
    this.pendingEditSubscription?.unsubscribe();
  }
}
