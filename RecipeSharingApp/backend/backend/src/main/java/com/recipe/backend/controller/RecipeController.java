package com.recipe.backend.controller;

import com.recipe.backend.entity.Recipe;
import com.recipe.backend.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "http://localhost:4200") // Allow Angular app
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @GetMapping
    public List<Recipe> getAllRecipes() {
        return recipeService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Long id) {
        return recipeService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public List<Recipe> searchRecipes(
            @RequestParam(required = false) String ingredient,
            @RequestParam(required = false) String cuisine,
            @RequestParam(required = false) String dietary) {
        return recipeService.searchRecipes(ingredient, cuisine, dietary);
    }

    // Query 1: whatCanIMake
    @GetMapping("/queries/what-can-i-make")
    public List<Recipe> whatCanIMake() {
        return recipeService.whatCanIMake();
    }

    // Query 2: sendNoods
    @GetMapping("/queries/send-noods")
    public List<Recipe> sendNoods() {
        return recipeService.sendNoods();
    }

    // Query 3: theAlbannaBrothers
    @GetMapping("/queries/albanna-brothers")
    public List<Recipe> theAlbannaBrothers() {
        return recipeService.theAlbannaBrothers();
    }

    // Query 4: numberOfIngredients
    @GetMapping("/queries/not-alison")
    public List<Recipe> numberOfIngredients() {
        return recipeService.numberOfIngredients();
    }

    // Query 5: soupsFromFoodNetwork
    @GetMapping("/queries/foodnetwork-soups")
    public List<Recipe> soupsFromFoodNetwork() {
        return recipeService.soupsFromFoodNetwork();
    }
}
