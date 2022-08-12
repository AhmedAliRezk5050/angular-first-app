import { ChildBComponent } from './pract/first-component/child-b/child-b.component';
import { ChildAComponent } from './pract/first-component/child-a/child-a.component';
import { NotFoundComponent } from './pract/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponent } from './pract/first/first.component';
import { SecondComponent } from './pract/second/second.component';

const routes: Routes = [
  {
    path: 'first-component/:name',
    component: FirstComponent,
    children: [
      { path: 'child-a', component: ChildAComponent },
      { path: 'child-b', component: ChildBComponent },
    ],
  },
  { path: 'second-component/:name', component: SecondComponent },
  {
    path: '',
    redirectTo: 'first-component/',
    pathMatch: 'full',
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
