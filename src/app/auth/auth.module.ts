import { authFeatureKey, authReducer } from './store/auth.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import AuthEffects from './store/auth.effects';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    FormsModule,
    AuthRoutingModule,
    SharedModule,
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature(authFeatureKey, authReducer),
  ],
})
export class AuthModule {}
