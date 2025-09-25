import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Recipe } from '../recipe';
import { RecipeForm } from '../recipe-form/recipe-form';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    FormsModule,
    RecipeForm,
    RouterLink
],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css'
})
export class RecipeList {
  private readonly recipeService = inject(Recipe);
  protected readonly title = signal('My Recipe Box');

  searchTerm = signal('');
  protected filteredRecipes = computed(() => {
    const search = this.searchTerm();

    return this.recipeService.recipes().filter(recipe => {
      return recipe.name.toLowerCase().includes(search.toLowerCase());
    })
  });

}
