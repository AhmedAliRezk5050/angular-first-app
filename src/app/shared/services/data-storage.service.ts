import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../../recipes/recipe.service";
import {Recipe} from "../../recipes/recipe.model";
import {exhaustMap, map, take, tap} from "rxjs/operators";
import {pipe} from "rxjs";
import {AuthService} from "../../auth/auth.service";

@Injectable({providedIn: 'root'})
export default class DataStorageService {

  private url = 'https://angular-practise-caf1f-default-rtdb.firebaseio.com/recipes.json'

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService
  ) {
  }

  storeRecipes() {
    const recipes = this.recipeService.recipes;

    this.http.put(this.url, recipes).subscribe()
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.url,
      {
        params: {
          'print': 'pretty'
        }
      }).pipe(
      map(
        data => {
          return data.map(recipe => {
            if (recipe.ingredients) return recipe;
            recipe.ingredients = [];
            return recipe;
          })
        }),
      tap(data => this.recipeService.setRecipes(data))
    )
  }
}
