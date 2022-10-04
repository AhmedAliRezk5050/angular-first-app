import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../../recipes/recipe.service";

@Injectable({providedIn: 'root'})
export default class DataStorageService {

  private url = 'https://angular-practise-caf1f-default-rtdb.firebaseio.com/recipes.json'

  constructor(private http: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.recipes;

    this.http.put(this.url, recipes).subscribe(res=> console.log(res))
  }
}
