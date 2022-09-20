import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Route, Router, RouterStateSnapshot} from "@angular/router";
import {RecipeService} from "../recipes/recipe.service";
import {EMPTY, Observable, of} from "rxjs";
import {Recipe} from "../recipes/recipe.model";

@Injectable({ providedIn: 'root' })
export class RecipeResolver implements Resolve<Recipe> {
  constructor(private recipeService: RecipeService, private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Recipe>|Promise<Recipe>|Recipe{
    const recipe = this.recipeService.recipes.find(r => r.id === route.paramMap.get('id'));

    if (recipe) return recipe;

    this.router.navigate(['404']);

    return EMPTY;
  }
}
