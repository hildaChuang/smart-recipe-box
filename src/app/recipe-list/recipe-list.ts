import { Component, signal } from '@angular/core';
import { MOCK_RECIPES } from '../mock-recipes';
import { RecipeModel } from '../models';
import { RecipeDetail } from '../recipe-detail/recipe-detail';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    RecipeDetail
  ],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css'
})
export class RecipeList {
  protected readonly title = signal('My Recipe Box');
  recipes: RecipeModel[] = MOCK_RECIPES;
  
  protected currentRecipe = signal<RecipeModel>(this.recipes[0]);


  // 一個受保護的方法，用來處理點擊事件
  protected onSelect(no: number): void {
    this.currentRecipe.set(this.recipes[no]);
  }

}
