package ibf2021.assessment.csf.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.List;
import ibf2021.assessment.csf.server.models.Recipe;

import ibf2021.assessment.csf.server.services.RecipeService;
import jakarta.json.Json;
import jakarta.json.JsonObject;

@RestController
@RequestMapping(path="/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class RecipesRestController {
    @Autowired
    RecipeService recipeService;

    @GetMapping(path="/recipes") 
    public ResponseEntity<String> getRecipes() {
        System.out.println("getRecipes() hit");
        List<Recipe> recipes = recipeService.getAllRecipes();
        List<String> recipesString = new LinkedList<String>();
        
        
        for (Recipe recipeObj: recipes) {
            JsonObject jo = Json.createObjectBuilder()
                .add("id", recipeObj.getId())
                .add("title", recipeObj.getTitle())
                .build();
            
            recipesString.add(jo.toString());
        }

        String responseBody = recipesString.toString();

        return ResponseEntity.ok(responseBody);
    }
}
