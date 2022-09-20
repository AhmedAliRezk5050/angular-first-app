import {NgModule} from "@angular/core";
import {
  RouterModule,
  Routes,
} from "@angular/router";
import {RecipesComponent} from "./recipes/recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {AppRoutes} from "./shared/AppRoutes";



const routes: Routes = [
  {path: '', redirectTo: `/${AppRoutes.Recipes}`, pathMatch: "full"},
  {path: AppRoutes.Recipes, component: RecipesComponent},
  {path: AppRoutes.ShoppingList, component: ShoppingListComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {
}
