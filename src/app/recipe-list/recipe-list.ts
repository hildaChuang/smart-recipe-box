import { Component, computed, signal } from '@angular/core';
import { MOCK_RECIPES } from '../mock-recipes';
import { RecipeModel } from '../models';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css'
})
export class RecipeList {
  protected readonly title = signal('My Recipe Box');
  recipes: RecipeModel[] = MOCK_RECIPES;
  servings = signal(1);
  
  protected currentRecipe = signal(this.recipes[0]);
  protected adjustedIngredients = computed(() => {
    const recipe = this.currentRecipe();
    const servings = this.servings();
    
    return recipe.ingredients.map(ingredient =>({
      ...ingredient,
      quantity: ingredient.quantity * servings
    }))
  });

  // 一個受保護的方法，用來處理點擊事件
  protected increment(no: number): void {
    this.currentRecipe.set(this.recipes[no-1]);
    switch(no) {
      case 1:
        console.log('Show first recipe');
        break;
      case 2:
        console.log('Show second recipe');
        break;
    }
    // 我們之後會學習如何更新 signal 的值
  }

  updateServings(isAdd: boolean) {
    if(isAdd) {
      this.servings.update(s => s + 1)
    } else {
      this.servings.update(s => s - 1)
    }
    console.log(this.servings())
  }
}
