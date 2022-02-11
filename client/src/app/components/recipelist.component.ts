import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipelist',
  templateUrl: './recipelist.component.html',
  styleUrls: ['./recipelist.component.css']
})
export class RecipeListComponent implements OnInit {

  jsonArray: JSON[] = []
  demoString: string = ""
  recipes: Recipe[] = []

  constructor(private recipeSvc: RecipeService) { }

  ngOnInit(): void {
    this.recipeSvc.getAllRecipes()
      .then(result => {
        this.recipes = result
        this.demoString = JSON.stringify(result)
        console.info("Response from server for all recipes: ", JSON.stringify(result))
      })
      .catch(error => {
        console.error("ERROR in RecipeListComponent ngOnInit: ", error)
      })
  }

}
