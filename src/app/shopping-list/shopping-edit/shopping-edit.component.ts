import {Ingredient} from '../../shared/ingredient.model';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ContentChild,
} from '@angular/core';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') form?: NgForm
  startUpdatingIngredientSubscription?: Subscription;
  editMode = false;
  pendingEditIngredientIndex!: number;
  pendingEditIngredient!: Ingredient;


  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.startUpdatingIngredientSubscription = this.shoppingListService.startUpdatingIngredient
      .subscribe((index: number) => {

        this.editMode = true;
        this.pendingEditIngredientIndex = index;
        this.pendingEditIngredient = this.shoppingListService.getIngredient(index);
        console.log(this.pendingEditIngredient)
        console.log(this.form?.value)
        this.form?.setValue({
          name: this.pendingEditIngredient.name,
          amount: this.pendingEditIngredient.amount,
        })
      })
  }

  upsertIngredient(form: NgForm) {
    const formValue = form.value;
    const pendingUpsertIngredient =  new Ingredient(formValue.name, +formValue.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.pendingEditIngredientIndex, pendingUpsertIngredient);
      this.editMode = false;
    } else {
      this.shoppingListService.addIngredient(pendingUpsertIngredient);
    }
    this.form?.reset();
  }

  clearForm() {
    this.form?.reset();
    this.editMode = false;
  }
}
