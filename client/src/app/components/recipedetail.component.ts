import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipedetail',
  templateUrl: './recipedetail.component.html',
  styleUrls: ['./recipedetail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeId: string = "id"
  recipeTitle: string = "title"
  recipe!: Recipe

  constructor(
    private recipeSvc: RecipeService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipeId = this.activatedRoute.snapshot.params['recipeId']
    this.recipeSvc.getRecipe(this.recipeId)
      .then(result => {
        this.recipe = result
        console.info("Response for recipeId %s: %s", this.recipeId, JSON.stringify(result))
      })
      .catch(error => {
        console.error("ERROR in recipedetails ngOnInit: ", error)
      })
  }

}
