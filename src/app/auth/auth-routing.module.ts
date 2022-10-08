import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppRoutes } from '../shared/AppRoutes';
import { AuthComponent } from './auth.component';

const routes: Routes = [{ path: AppRoutes.Auth, component: AuthComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
