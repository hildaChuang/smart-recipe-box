/*!
 * @license
 * Copyright 2025 Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Routes } from '@angular/router';
import { RecipeList } from './recipe-list/recipe-list';
import { RecipeDetail } from './recipe-detail/recipe-detail';

export const routes: Routes = [
    // 1. 如果 URL 是 /recipes，就顯示 RecipeList 元件
    { path: 'recipes', component: RecipeList },

    // 2. 如果 URL 是 /recipes/一個ID (例如 /recipes/1)，就顯示 RecipeDetail 元件
    { path: 'recipes/:id', component: RecipeDetail },

    // 3. 如果是空路徑 (例如網站根目錄)，就自動重新導向到 /recipes
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
];
