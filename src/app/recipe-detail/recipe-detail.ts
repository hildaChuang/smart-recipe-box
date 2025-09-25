import { Component, computed, inject, input, signal } from '@angular/core';
import { Recipe } from '../recipe';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css'
})
export class RecipeDetail {
  private router = inject(ActivatedRoute);
  private readonly recipeService = inject(Recipe);

  protected readonly recipe = computed(() => {
    const id = Number(this.router.snapshot.paramMap.get('id'));
    if (id) {
      return this.recipeService.recipes().find(recipe => recipe.id === id);
    }
    return null;
  });

  protected servings = signal(1);
  protected readonly adjustedIngredients = computed(() => {
    const currentRecipe = this.recipe();
    const servings = this.servings();

    return currentRecipe ? currentRecipe.ingredients.map(ingredient => ({
      ...ingredient,
      quantity: ingredient.quantity * servings
    })) : [];
  });

  updateServings(isAdd: boolean) {
    if (isAdd) {
      this.servings.update(s => s + 1)
    } else {
      this.servings.update(s => s - 1)
    }
  }
}
