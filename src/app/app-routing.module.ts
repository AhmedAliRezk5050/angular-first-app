import { NotFoundComponent } from './pract/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponent } from './pract/first/first.component';
import { SecondComponent } from './pract/second/second.component';

const routes: Routes = [
  { path: 'first-component/:name', component: FirstComponent },
  { path: 'second-component/:name', component: SecondComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
