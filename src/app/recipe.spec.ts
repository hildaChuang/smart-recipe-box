import { TestBed } from '@angular/core/testing';

import { Recipe } from './recipe';

describe('Recipe', () => {
  let service: Recipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Recipe]
    });
    service = TestBed.inject(Recipe);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // getRecipes() 回傳一個包含兩個食譜的陣列
  it('should get recipes length of 2', () => {
    const recipes = service.getRecipes();

    expect(recipes.length).toEqual(2);
  });

  // getRecipeById(1) 是否能成功回傳 id 為 1 的食譜，
  // 且該食譜的 name 應該是 'Spaghetti Carbonara'
  it('get recipe by id 1', () => {
    let recipe = service.getRecipeById(1);
    // 斷言 1: 驗證 recipe 變數不是 null 或 undefined
    expect(recipe).toBeTruthy();
    expect(recipe?.name).toBe('Spaghetti Carbonara');
  });
});
