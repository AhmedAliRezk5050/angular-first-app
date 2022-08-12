import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { PractComponent } from './pract/pract.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';

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
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [ShoppingListService],
  bootstrap: [AppComponent],
})
export class AppModule {}
