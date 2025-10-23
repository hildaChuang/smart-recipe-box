import { Injectable, signal } from '@angular/core';
import { Ingredient, RecipeModel } from './models';
import { MOCK_RECIPES } from './mock-recipes';

@Injectable({
  providedIn: 'root'
})
export class Recipe {
  protected readonly recipeList = signal<RecipeModel[]>(MOCK_RECIPES);
  public readonly recipes = this.recipeList.asReadonly();

  public getRecipes(): RecipeModel[] {
    // 關鍵！我們回傳的是內部陣列的一個「複本」
    return [...this.recipeList()]; 
    // 或者用 .slice() 也可以: return this.recipeList().slice();
  }

  public getRecipeById(id: number): RecipeModel | undefined {
    // 從 recipeList 信號中取得陣列，並使用 find 方法尋找符合 id 的食譜
    return this.recipeList().find(recipe => recipe.id === id);
  }

  addRecipe(recipe: Omit<RecipeModel, 'id' | 'isFavorite' | 'imgUrl'>): void {
    this.recipeList.update(recipes => {
      const id = Math.max(...recipes.map(r => r.id)) + 1;
      const newRecipe: RecipeModel = {
        ...recipe,
        id,
        imgUrl: '',
        isFavorite: false,
      };
      
      return [...recipes, newRecipe];
    });

    console.log('current:', this.recipes);
  }

  addIngredient(recipeId: number, ingredient: Ingredient): void {
    const recipe = this.recipeList().find(r => r.id === recipeId);
    if (recipe) {
      recipe.ingredients.push(ingredient);
    }
  }
}
