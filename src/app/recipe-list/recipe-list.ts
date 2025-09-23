import { Component, computed, effect, inject, signal } from '@angular/core';
import { MOCK_RECIPES } from '../mock-recipes';
import { RecipeModel } from '../models';
import { RecipeDetail } from '../recipe-detail/recipe-detail';
import { FormsModule } from '@angular/forms';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    RecipeDetail,
    FormsModule
  ],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css'
})
export class RecipeList {
  protected readonly title = signal('My Recipe Box');
 
  private recipeService = inject(Recipe);
  protected readonly recipes = this.recipeService.getRecipes();

  protected currentRecipe = signal<RecipeModel | null>(this.recipes[0]);
  
  searchTerm = signal('');
  protected filteredRecipes = computed(() => {
    const search = this.searchTerm();

    return this.recipes.filter(recipe => {
      return recipe.name.toLowerCase().includes(search.toLowerCase());
    })
  });

  constructor() {
    effect(() => {
      const filtered = this.filteredRecipes();
      this.currentRecipe.set(filtered.length > 0 ? filtered[0] : null);
    })
  }

  // 一個受保護的方法，用來處理點擊事件
  protected onSelect(id: number): void {
    const findRecipe = this.recipes.find(recipe => recipe.id === id);
    if (findRecipe) {
      this.currentRecipe.set(findRecipe);
    }
  }

}
