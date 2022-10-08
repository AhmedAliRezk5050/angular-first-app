import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './shared/AppRoutes';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: `/${AppRoutes.Recipes}`, pathMatch: 'full' },
  { path: AppRoutes.NotFound, component: NotFoundComponent },
  { path: '**', redirectTo: AppRoutes.NotFound },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
