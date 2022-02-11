import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ingredient, Recipe } from '../models';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipeadd',
  templateUrl: './recipeadd.component.html',
  styleUrls: ['./recipeadd.component.css']
})
export class RecipeAddComponent implements OnInit {

  addForm!: FormGroup
  ingredientsArray!: FormArray
  recipe: Partial<Recipe> = {}

  constructor(
    private fb: FormBuilder,
    private recipeSvc: RecipeService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.addForm = this.createRecipeForm(this.recipe)
    this.ingredientsArray = this.addForm.get('ingredients') as FormArray
  }

  createRecipeForm(recipe: Partial<Recipe>): FormGroup {
    this.ingredientsArray = this.createIngredients([])
    return this.fb.group({
      title: this.fb.control(recipe?.title || '', [
        Validators.required,
        Validators.minLength(3)]),
      ingredients: this.createIngredients(recipe?.ingredients),
      instruction: this.fb.control(recipe?.instruction || '', [
        Validators.required,
        Validators.minLength(3)]),
      image: this.fb.control(recipe?.image || '', [Validators.required])
    })
  }

  addIngredient(ing: Ingredient) {
    this.ingredientsArray.push(this.createIngredient(ing))
  }

  createIngredient(ing: Partial<Ingredient>): FormGroup {
    return this.fb.group ({
      ingredientLine: this.fb.control(ing?.ingredient || '', [
        Validators.required,
        Validators.minLength(3)])
    })
  }

  createIngredients(ingredients: Ingredient[] = []): FormArray {
    const ingredientList = this.fb.array([], [Validators.required])
    for (let i of ingredients)
      ingredientList.push(this.createIngredient(i))
    return ingredientList
  }

  deleteIngredient(i: number) {
    this.ingredientsArray.removeAt(i)
  }

  sendRecipe() {
    let recipe = this.addForm.value as Recipe
    console.info("Sending Recipe Details: ", JSON.stringify(recipe))
    console.info("Recipe ingredients before: ", JSON.stringify(recipe.ingredients))
    let newIngredients = []
    for (let i of recipe.ingredients) {
      var a = JSON.stringify(i)
      let newLine1 = a.replace(String.raw`{"ingredientLine":"`, "")
      let newLine = newLine1.replace(String.raw`"}`, "")
      newIngredients.push(newLine as unknown as Ingredient)
    }
    recipe.ingredients = newIngredients
    console.info("Recipe ingredients after: ", JSON.stringify(recipe.ingredients))

    this.recipeSvc.addRecipe(recipe)
      .then(result => {
        console.info("Added succesfully: ", result)
        this.router.navigate([''])
      })
      .catch(error => {
        console.error("ERROR in recipeAdd sendRecipe: ", error)
        this.router.navigate([''])
      })


  }

}
