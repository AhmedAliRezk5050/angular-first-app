import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { RecipeItemComponent } from "./recipes/recipe-list/recipe-item/recipe-item.component";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { ShoppingEditComponent } from "./shopping-list/shopping-edit/shopping-edit.component";
import { PractComponent } from "./pract/pract.component";
import { DropdownDirective } from "./shared/directives/dropdown.directive";
import { AppRoutingModule } from "./app-routing.module";
import { FirstComponent } from "./pract/first/first.component";
import { SecondComponent } from "./pract/second/second.component";
import { NotFoundComponent } from "./pract/not-found/not-found.component";
import { ChildAComponent } from "./pract/first-component/child-a/child-a.component";
import { ChildBComponent } from "./pract/first-component/child-b/child-b.component";
import { ThirdComponent } from "./pract/third/third.component";
import { AuthService } from "./pract/auth.service";
import { AuthGuard } from "./pract/auth-guard.service";
import { NotAllowedComponent } from "./pract/not-allowed/not-allowed.component";
import { CanDeactivateGuard } from "./pract/can-deactivate-guard.service";
import {UserDataResolver} from "./pract/user-data-resolver.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    PractComponent,
    DropdownDirective,
    FirstComponent,
    SecondComponent,
    NotFoundComponent,
    ChildAComponent,
    ChildBComponent,
    ThirdComponent,
    NotAllowedComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [ShoppingListService, AuthService, AuthGuard, CanDeactivateGuard, UserDataResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
