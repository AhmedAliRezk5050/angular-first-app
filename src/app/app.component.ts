import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {authFeatureKey, AuthFeatureState} from "./auth/store/auth.reducer";
import * as AuthAction from "./auth/store/auth.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<{ [authFeatureKey]: AuthFeatureState }>) {}

  ngOnInit(): void {
   this.store.dispatch(AuthAction.autoLogin())
  }
}
