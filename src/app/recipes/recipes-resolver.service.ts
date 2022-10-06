import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "./recipe.model";
import {EMPTY, Observable} from "rxjs";
import DataStorageService from "../shared/services/data-storage.service";
import {catchError} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export default class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService: DataStorageService, private router: Router) {

  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot
  ): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    return this.dataStorageService.fetchRecipes();
  }
}
