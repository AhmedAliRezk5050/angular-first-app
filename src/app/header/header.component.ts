import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import DataStorageService from "../shared/services/data-storage.service";
import {RecipeService} from "../recipes/recipe.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import User from "../auth/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  userSubjectSubscription?: Subscription


  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userSubjectSubscription = this.authService.userSubject
      .subscribe(user => {
        this.isAuthenticated = !!user;
      })
  }

  saveRecipes() {
    this.dataStorageService.storeRecipes();
  }

  fetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
    this.userSubjectSubscription?.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}
