import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AppRoutes } from './shared/AppRoutes';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo: `/${AppRoutes.Recipes}`, pathMatch: 'full' },
  { path: AppRoutes.ShoppingList, component: ShoppingListComponent },
  { path: AppRoutes.Auth, component: AuthComponent },
  { path: AppRoutes.NotFound, component: NotFoundComponent },
  { path: '**', redirectTo: AppRoutes.NotFound },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
