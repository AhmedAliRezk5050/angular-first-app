import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
  imports: [FormsModule, ShoppingListRoutingModule, SharedModule],
  declarations: [ShoppingListComponent, ShoppingEditComponent],
})
export class ShoppingListModule {}
