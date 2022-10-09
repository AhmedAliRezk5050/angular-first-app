import * as ShoppingListActions from './../store/shopping-list.actions';
import {
  selectIngredient,
  selectIngredients,
} from './../store/shopping-list.selectors';
import { Store } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ContentChild,
} from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription, Observable, lastValueFrom, firstValueFrom } from 'rxjs';
import {
  shoppingListFeatureKey,
  ShoppingListFeatureState,
} from '../store/shopping-list.reducer';
import {
  deleteIngredient,
  updateIngredient,
} from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') form?: NgForm;
  startUpdatingIngredientSubscription?: Subscription;
  editMode = false;
  pendingEditIngredientIndex!: number;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{
      [shoppingListFeatureKey]: ShoppingListFeatureState;
    }>,
  ) {}

  ngOnInit(): void {
    this.startUpdatingIngredientSubscription =
      this.shoppingListService.startUpdatingIngredient.subscribe(
        (index: number) => {
          this.editMode = true;
          this.pendingEditIngredientIndex = index;
          firstValueFrom(this.store.select(selectIngredient(index))).then(
            (ingredient) => {
              this.form?.setValue({
                name: ingredient.name,
                amount: ingredient.amount,
              });
            },
          );
        },
      );
  }

  async upsertIngredient(form: NgForm) {
    const formValue = form.value;
    const pendingUpsertIngredient = new Ingredient(
      formValue.name,
      +formValue.amount,
    );
    if (this.editMode) {
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
  }

  deleteIngredient() {
    // this.shoppingListService.deleteIngredient(this.pendingEditIngredientIndex);
    this.store.dispatch(
      ShoppingListActions.deleteIngredient({
        index: this.pendingEditIngredientIndex,
      }),
    );
    this.clearForm();
  }
}
