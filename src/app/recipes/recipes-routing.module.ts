import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from '../auth/auth-guard.service';
import {AppRoutes} from '../shared/AppRoutes';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import RecipesResolverService from './recipes-resolver.service';
import {RecipesComponent} from './recipes.component';

const routes: Routes = [
  {
    path: AppRoutes.Recipes,
    component: RecipesComponent,
    canActivate: [AuthGuardService],
    children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},
      {
        path: ':id', component: RecipeDetailComponent,
        resolve: {recipes: RecipesResolverService}
      },
      {
        path: ':id/edit', component: RecipeEditComponent,
        resolve: {recipes: RecipesResolverService},
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {
}
