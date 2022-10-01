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
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  addIngredient(form: NgForm) {
    const formValue = form.value;
    this.shoppingListService.addIngredient(
      new Ingredient(
        formValue.name,
        +formValue.amount,
      ),
    );
  }
}
