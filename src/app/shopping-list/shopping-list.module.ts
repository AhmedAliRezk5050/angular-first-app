import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
  imports: [CommonModule, FormsModule, ShoppingListRoutingModule],
  declarations: [ShoppingListComponent, ShoppingEditComponent],
})
export class ShoppingListModule {}
