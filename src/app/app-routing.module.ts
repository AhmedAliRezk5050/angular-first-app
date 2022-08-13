import { ChildBComponent } from "./pract/first-component/child-b/child-b.component";
import { ChildAComponent } from "./pract/first-component/child-a/child-a.component";
import { NotFoundComponent } from "./pract/not-found/not-found.component";
import { Injectable, NgModule } from "@angular/core";
import {
  Resolve,
  RouterModule,
  RouterStateSnapshot,
  Routes,
  TitleStrategy,
} from "@angular/router";
import { FirstComponent } from "./pract/first/first.component";
import { SecondComponent } from "./pract/second/second.component";
import { Title } from "@angular/platform-browser";
import { ThirdComponent } from "./pract/third/third.component";
import { AuthGuard } from "./pract/auth-guard.service";
import { NotAllowedComponent } from "./pract/not-allowed/not-allowed.component";
import { CanDeactivateGuard } from "./pract/can-deactivate-guard.service";

@Injectable({ providedIn: "root" })
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`My Application | ${title}`);
    }
  }
}

@Injectable({ providedIn: "root" })
export class ResolvedChildATitle implements Resolve<string> {
  resolve() {
    return Promise.resolve("child a");
  }
}

const routes: Routes = [
  {
    path: "first-component/:name",
    component: FirstComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: "child-a",
        component: ChildAComponent,
        title: ResolvedChildATitle,
        // can be just a string
        // title: child-a,
      },
      { path: "child-b", component: ChildBComponent },
    ],
  },
  {
    path: "second-component/:name",
    component: SecondComponent,
    canDeactivate: [CanDeactivateGuard],
  },
  {
    path: "third-component",
    component: ThirdComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "not-allowed",
    component: NotAllowedComponent,
  },
  {
    path: "",
    redirectTo: "first-component/",
    pathMatch: "full",
  },
  { path: "**", component: NotFoundComponent, data: {message: "Page is not found!"} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: TitleStrategy, useClass: TemplatePageTitleStrategy }],
})
export class AppRoutingModule {}
