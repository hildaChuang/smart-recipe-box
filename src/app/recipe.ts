import { Injectable, signal } from '@angular/core';
import { Ingredient, RecipeModel } from './models';
import { MOCK_RECIPES } from './mock-recipes';

@Injectable({
  providedIn: 'root'
})
export class Recipe {
  protected readonly recipeList = signal<RecipeModel[]>(MOCK_RECIPES);
  public readonly recipes = this.recipeList.asReadonly();

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
