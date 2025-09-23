import { Component, computed, input, signal } from '@angular/core';
import { RecipeModel } from '../models';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css'
})
export class RecipeDetail {
  readonly recipe = input.required<RecipeModel>();

  protected servings = signal(1);
  protected readonly adjustedIngredients = computed(() => {
    const recipe = this.recipe();
    const servings = this.servings();

    return recipe.ingredients.map(ingredient =>({
      ...ingredient,
      quantity: ingredient.quantity * servings
    }))
  });

  updateServings(isAdd: boolean) {
    if(isAdd) {
      this.servings.update(s => s + 1)
    } else {
      this.servings.update(s => s - 1)
    }
    console.log(this.servings())
  }
}
