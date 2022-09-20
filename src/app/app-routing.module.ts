import {NgModule} from "@angular/core";
import {
  RouterModule,
  Routes,
} from "@angular/router";
import {RecipesComponent} from "./recipes/recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {AppRoutes} from "./shared/AppRoutes";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
import {RecipeResolver} from "./resolvers/RecipeResolver";
import {NotFoundComponent} from "./not-found/not-found.component";
import {RecipeStartComponent} from "./recipes/recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";



const routes: Routes = [
  {path: '', redirectTo: `/${AppRoutes.Recipes}`, pathMatch: "full"},
  {path: AppRoutes.Recipes, component: RecipesComponent, children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent},
      {path: ':id/edit', component: RecipeEditComponent},
    ]},
  {path: AppRoutes.ShoppingList, component: ShoppingListComponent},
  {path: AppRoutes.NotFound, component: NotFoundComponent},
  {path: '**', redirectTo: AppRoutes.NotFound},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {
}
