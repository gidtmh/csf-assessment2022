package ibf2021.assessment.csf.server.controllers;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ibf2021.assessment.csf.server.models.Recipe;
import ibf2021.assessment.csf.server.services.RecipeService;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import jakarta.json.JsonValue;

@RestController
@RequestMapping(path="/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class RecipeRestController {

    @Autowired
    RecipeService recipeService;

    @GetMapping(path="/recipe/{recipeId}")
    public ResponseEntity<String> getRecipe(@PathVariable String recipeId) {
        Optional<Recipe> optRecipe = recipeService.getRecipeById(recipeId);
        System.out.println("getRecipe hit with id: " + recipeId);

        if (optRecipe.isPresent()) {
            System.out.println("Recipe exists!");
            Recipe recipe = optRecipe.get();
            JsonArrayBuilder ingredientsBuilder = Json.createArrayBuilder();
            for (String ingredient: recipe.getIngredients()) {
                ingredientsBuilder.add(ingredient);
            }
            JsonArray ingredients = ingredientsBuilder.build();

            JsonObject jo = Json.createObjectBuilder()
                .add("title", recipe.getTitle())
                .add("id", recipe.getId())
                .add("image", recipe.getImage())
                .add("instruction", recipe.getInstruction())
                .add("ingredients", ingredients)
                .build();
            
                return ResponseEntity.status(HttpStatus.CREATED).body(jo.toString());
        } else {
            System.out.println("Recipe does not exist!");
            JsonObject jo = Json.createObjectBuilder()
                .add("message", "The id does not exist")
                .build();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(jo.toString());
        }
        
    }

    @PostMapping(path="/recipe")
    public ResponseEntity<String> saveRecipe(@RequestBody String requestBody) {
        System.out.println("saveRecipe hit");
        System.out.println(requestBody);
        
        Recipe recipe = new Recipe();

        try (InputStream is = new ByteArrayInputStream(requestBody.getBytes())) {
            JsonReader reader = Json.createReader(is);
            JsonObject data = reader.readObject();

            recipe.setTitle(data.getString("title"));
            recipe.setImage(data.getString("image"));
            recipe.setInstruction(data.getString("instruction"));
            JsonArray ingredients = data.getJsonArray("ingredients");
            for (JsonValue ingredient: ingredients) {
                System.out.println(ingredient.toString());
                recipe.addIngredient(ingredient.toString().replaceAll("^\"|\"$", ""));
            }

            recipeService.addRecipe(recipe);

            JsonObject jo = Json.createObjectBuilder()
                .add("message", "created!")
                .build();

            return ResponseEntity.status(HttpStatus.CREATED).body(jo.toString());
        } catch (Exception e) {
            System.out.println(e);
            
            JsonObject jo = Json.createObjectBuilder()
                .add("error", e.toString())
                .build();

            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(jo.toString());
        }

        

    }

}
