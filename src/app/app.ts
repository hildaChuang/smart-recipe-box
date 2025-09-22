/*!
 * @license
 * Copyright 2025 Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { RecipeModel } from './models';
import { MOCK_RECIPES } from './mock-recipes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('My Recipe Box');
  recipes: RecipeModel[] = MOCK_RECIPES;
  protected currentRecipe = signal(this.recipes[0]);
  servings = signal(1);

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
