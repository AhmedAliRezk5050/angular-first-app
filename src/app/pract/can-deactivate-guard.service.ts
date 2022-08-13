import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";

export interface ICanDeactivateComponent {
  canDeactivate(): boolean | Observable<boolean> | Promise<boolean>;
}

export class CanDeactivateGuard
  implements CanDeactivate<ICanDeactivateComponent>
{
  canDeactivate(
    component: ICanDeactivateComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }
}
