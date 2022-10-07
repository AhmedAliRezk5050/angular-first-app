import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAlertHost]',
})
export class AlertHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
