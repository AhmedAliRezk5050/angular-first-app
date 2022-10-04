import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "./recipe.model";
import {Observable} from "rxjs";
import DataStorageService from "../shared/services/data-storage.service";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export default class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService: DataStorageService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    return this.dataStorageService.fetchRecipes()
  }
}
