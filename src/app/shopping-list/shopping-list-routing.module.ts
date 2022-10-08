import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppRoutes } from '../shared/AppRoutes';
import { ShoppingListComponent } from './shopping-list.component';

const routes: Routes = [
  { path: AppRoutes.ShoppingList, component: ShoppingListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingListRoutingModule {}
