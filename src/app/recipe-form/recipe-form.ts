import { Component, inject } from '@angular/core';
import { Recipe } from '../recipe';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipeModel } from '../models';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.css'
})
export class RecipeForm {
  private recipeService = inject(Recipe);
  private fb = inject(FormBuilder);

  protected recipeForm = this.fb.group<RecipeFormModel>({
    name: this.fb.control('', Validators.required),
    description: this.fb.control(''),
    // imgUrl: this.fb.control(''),
    ingredients: this.fb.array<FormGroup<IngredientFormModel>>([])
  });

  protected addIngredient() {
    this.recipeForm.controls.ingredients.push(this.fb.group({
      name: this.fb.control('', Validators.required),
      quantity: this.fb.control(0, Validators.required),
      unit: this.fb.control('', Validators.required)
    }))
  }

  protected removeIngredient(index: number) {
    this.recipeForm.controls.ingredients.removeAt(index);
  }

  protected onSubmit(): void {
    this.recipeService.addRecipe(this.recipeForm.value as RecipeModel);
    this.recipeForm.reset();
  }
}

interface RecipeFormModel {
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  ingredients: FormArray<FormGroup<IngredientFormModel>>;
}

interface IngredientFormModel {
  name: FormControl<string | null>;
  quantity: FormControl<number | null>;
  unit: FormControl<string | null>;
}
