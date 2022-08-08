import { Ingredient } from './../../shared/ingredient.model';
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

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

  @ViewChild('amountInput') amountInput!: ElementRef<HTMLInputElement>;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  addIngredient() {
    this.shoppingListService.addIngredient(
      new Ingredient(
        this.nameInput.nativeElement.value,
        +this.amountInput.nativeElement.value,
      ),
    );
  }
}
