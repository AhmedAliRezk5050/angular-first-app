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

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

  @ViewChild('amountInput') amountInput!: ElementRef<HTMLInputElement>;

  constructor() {}

  ngOnInit(): void {}

  addIngredient() {
    this.ingredientAdded.emit(
      new Ingredient(
        this.nameInput.nativeElement.value,
        +this.amountInput.nativeElement.value,
      ),
    );
  }
}
