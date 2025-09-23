export interface Ingredient {
    name: string;
    quantity: number;
    unit: string;
}
  
export interface RecipeModel {
id: number;
name: string;
description: string;
imgUrl: string; // 新增這一行
ingredients: Ingredient[];
}
  