import { Component, computed, effect, inject, signal } from '@angular/core';
import { RecipeDetail } from '../recipe-detail/recipe-detail';
import { FormsModule } from '@angular/forms';
import { Recipe } from '../recipe';
import { RecipeForm } from '../recipe-form/recipe-form';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    RecipeDetail,
    FormsModule,
    RecipeForm
  ],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css'
})
export class RecipeList {
  private readonly recipeService = inject(Recipe);
  protected readonly title = signal('My Recipe Box');
  protected selectedRecipeId = signal<number | null>(null);

  protected currentRecipe = computed(() => {
    const filtered = this.filteredRecipes();
    const id = this.selectedRecipeId();
    if (id) {
      return this.recipeService.recipes().find(recipe => recipe.id === id);
    }
    return filtered.length > 0 ? filtered[0] : null;
  });

  searchTerm = signal('');
  protected filteredRecipes = computed(() => {
    const search = this.searchTerm();

    return this.recipeService.recipes().filter(recipe => {
      return recipe.name.toLowerCase().includes(search.toLowerCase());
    })
  });

  // 一個受保護的方法，用來處理點擊事件
  protected onSelect(id: number): void {
    this.selectedRecipeId.set(id);
  }

}
