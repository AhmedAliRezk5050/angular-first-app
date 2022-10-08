import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { AlertHostDirective } from './directives/alert-host.directive';
import { DropdownDirective } from './directives/dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    AlertComponent,
    DropdownDirective,
    AlertHostDirective,
  ],

  imports: [CommonModule],
  exports: [
    LoadingSpinnerComponent,
    AlertComponent,
    DropdownDirective,
    AlertHostDirective,
    CommonModule,
  ],
})
export class SharedModule {}
