import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';
import { CoreModule } from './core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [AppComponent, HeaderComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RecipesModule,
    ShoppingListModule,
    AuthModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
